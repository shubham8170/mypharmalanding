#!/usr/bin/env python3
"""Marketing Audit PDF Report Generator for Claude Code AI Marketing Suite."""

import sys
import json
import math
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.graphics.shapes import Drawing, Circle, Wedge, String, Line, Rect
from reportlab.graphics.charts.barcharts import HorizontalBarChart
from reportlab.graphics import renderPDF
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

# Color palette
C_NAVY   = colors.HexColor("#1B2A4A")
C_BLUE   = colors.HexColor("#2D5BFF")
C_ORANGE = colors.HexColor("#FF6B35")
C_GREEN  = colors.HexColor("#00C853")
C_AMBER  = colors.HexColor("#FFB300")
C_RED    = colors.HexColor("#FF1744")
C_LIGHT  = colors.HexColor("#F5F7FA")
C_BODY   = colors.HexColor("#2C3E50")
C_GRAY   = colors.HexColor("#7F8C9B")
C_BORDER = colors.HexColor("#E0E6ED")
C_WHITE  = colors.white

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm


def score_color(score):
    if score >= 80:
        return C_GREEN
    elif score >= 60:
        return C_BLUE
    elif score >= 40:
        return C_AMBER
    return C_RED


def score_grade(score):
    if score >= 90: return "A+"
    if score >= 80: return "A"
    if score >= 70: return "B+"
    if score >= 60: return "B"
    if score >= 50: return "C"
    if score >= 40: return "D"
    return "F"


def score_label(score):
    if score >= 80: return "Strong"
    if score >= 60: return "Solid"
    if score >= 40: return "Needs Work"
    return "Critical"


def severity_color(severity):
    s = severity.lower()
    if s == "critical": return C_RED
    if s == "high":     return C_ORANGE
    if s == "medium":   return C_AMBER
    return C_BLUE


def make_gauge(score, size=120):
    """Draw a semicircle score gauge."""
    d = Drawing(size, size * 0.65)
    cx, cy = size / 2, size * 0.55
    r = size * 0.42
    stroke_w = size * 0.08

    # Background arc (grey)
    steps = 100
    for i in range(steps):
        angle = 180 - (i / steps) * 180
        next_a = 180 - ((i + 1) / steps) * 180
        w = Wedge(cx, cy, r, angle, next_a + 0.5,
                  fillColor=C_BORDER, strokeColor=None)
        d.add(w)

    # Filled arc
    fill_steps = int(score)
    col = score_color(score)
    for i in range(fill_steps):
        angle = 180 - (i / 100) * 180
        next_a = 180 - ((i + 1) / 100) * 180
        w = Wedge(cx, cy, r, angle, next_a + 0.5,
                  fillColor=col, strokeColor=None)
        d.add(w)

    # Inner white circle
    inner = Circle(cx, cy, r - stroke_w * 1.2,
                   fillColor=C_WHITE, strokeColor=None)
    d.add(inner)

    # Score text
    score_str = String(cx, cy + 2, str(int(score)),
                       textAnchor='middle', fontSize=size * 0.22,
                       fillColor=C_NAVY, fontName='Helvetica-Bold')
    d.add(score_str)

    grade = String(cx, cy - size * 0.14, score_grade(score),
                   textAnchor='middle', fontSize=size * 0.12,
                   fillColor=col, fontName='Helvetica-Bold')
    d.add(grade)

    label = String(cx, cy - size * 0.25, "/ 100",
                   textAnchor='middle', fontSize=size * 0.08,
                   fillColor=C_GRAY, fontName='Helvetica')
    d.add(label)

    return d


def make_bar_chart(categories):
    """Horizontal bar chart for category scores."""
    names = list(categories.keys())
    scores = [categories[n]['score'] for n in names]
    n = len(names)
    bar_h = 14
    gap = 6
    chart_h = n * (bar_h + gap) + 20
    chart_w = PAGE_W - 2 * MARGIN - 10 * mm

    d = Drawing(chart_w, chart_h)

    label_w = 130
    bar_area_w = chart_w - label_w - 40

    for i, (name, score) in enumerate(zip(names, scores)):
        y = chart_h - 20 - i * (bar_h + gap)
        # Label
        lbl = String(label_w - 6, y + bar_h * 0.3, name,
                     textAnchor='end', fontSize=8.5,
                     fillColor=C_BODY, fontName='Helvetica')
        d.add(lbl)

        # Background bar
        bg = Rect(label_w, y, bar_area_w, bar_h,
                  fillColor=C_LIGHT, strokeColor=None, rx=3, ry=3)
        d.add(bg)

        # Filled bar
        fill_w = (score / 100) * bar_area_w
        bar = Rect(label_w, y, fill_w, bar_h,
                   fillColor=score_color(score), strokeColor=None, rx=3, ry=3)
        d.add(bar)

        # Score text
        sc_lbl = String(label_w + fill_w + 5, y + bar_h * 0.3,
                        f"{score}",
                        textAnchor='start', fontSize=8.5,
                        fillColor=score_color(score), fontName='Helvetica-Bold')
        d.add(sc_lbl)

    return d


def build_styles():
    styles = getSampleStyleSheet()

    def add(name, **kw):
        styles.add(ParagraphStyle(name=name, **kw))

    add('ReportTitle', fontName='Helvetica-Bold', fontSize=26, textColor=C_NAVY,
        spaceAfter=4, alignment=TA_CENTER)
    add('SubTitle', fontName='Helvetica', fontSize=12, textColor=C_GRAY,
        spaceAfter=2, alignment=TA_CENTER)
    add('SectionHead', fontName='Helvetica-Bold', fontSize=14, textColor=C_NAVY,
        spaceBefore=12, spaceAfter=6)
    add('BodyText2', fontName='Helvetica', fontSize=10, textColor=C_BODY,
        spaceAfter=4, leading=15)
    add('SmallGray', fontName='Helvetica', fontSize=8, textColor=C_GRAY,
        spaceAfter=2)
    add('BulletItem', fontName='Helvetica', fontSize=10, textColor=C_BODY,
        spaceAfter=3, leftIndent=12, bulletIndent=0, leading=14)
    add('TableHeader', fontName='Helvetica-Bold', fontSize=9, textColor=C_WHITE,
        alignment=TA_LEFT)
    add('ExecSummary', fontName='Helvetica', fontSize=11, textColor=C_BODY,
        spaceAfter=6, leading=17, alignment=TA_CENTER)

    return styles


def cover_page(data, styles):
    elems = []

    elems.append(Spacer(1, 8 * mm))

    # Header bar
    header_data = [[Paragraph("MARKETING AUDIT REPORT", ParagraphStyle(
        'HH', fontName='Helvetica-Bold', fontSize=22,
        textColor=C_WHITE, alignment=TA_CENTER))]]
    header_tbl = Table(header_data,
                       colWidths=[PAGE_W - 2 * MARGIN],
                       rowHeights=[14 * mm])
    header_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_NAVY),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
    ]))
    elems.append(header_tbl)
    elems.append(Spacer(1, 5 * mm))

    brand = data.get('brand_name', 'Your Brand')
    url = data.get('url', '')
    date = data.get('date', '')

    elems.append(Paragraph(brand, ParagraphStyle(
        'BN', fontName='Helvetica-Bold', fontSize=18,
        textColor=C_NAVY, alignment=TA_CENTER, spaceAfter=2)))
    elems.append(Paragraph(url, ParagraphStyle(
        'URL', fontName='Helvetica', fontSize=10,
        textColor=C_BLUE, alignment=TA_CENTER, spaceAfter=2)))
    elems.append(Paragraph(f"Report Date: {date}", ParagraphStyle(
        'DT', fontName='Helvetica', fontSize=9,
        textColor=C_GRAY, alignment=TA_CENTER, spaceAfter=6)))

    elems.append(HRFlowable(width="100%", thickness=1, color=C_BORDER))
    elems.append(Spacer(1, 6 * mm))

    # Gauge
    score = data.get('overall_score', 0)
    gauge = make_gauge(score, size=160)
    gauge_tbl = Table([[gauge]], colWidths=[PAGE_W - 2 * MARGIN])
    gauge_tbl.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER')]))
    elems.append(gauge_tbl)
    elems.append(Spacer(1, 4 * mm))

    elems.append(Paragraph("Overall Marketing Health Score", ParagraphStyle(
        'GL', fontName='Helvetica-Bold', fontSize=11,
        textColor=C_GRAY, alignment=TA_CENTER, spaceAfter=8)))

    # Executive summary box
    summary = data.get('executive_summary', '')
    summary_data = [[Paragraph(summary, ParagraphStyle(
        'ES', fontName='Helvetica', fontSize=10.5,
        textColor=C_BODY, leading=16, alignment=TA_LEFT))]]
    summary_tbl = Table(summary_data, colWidths=[PAGE_W - 2 * MARGIN - 16 * mm])
    summary_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_LIGHT),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
        ('BOX', (0, 0), (-1, -1), 1, C_BORDER),
    ]))

    summary_outer = Table([[summary_tbl]],
                          colWidths=[PAGE_W - 2 * MARGIN])
    summary_outer.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER')]))
    elems.append(summary_outer)

    elems.append(PageBreak())
    return elems


def scores_page(data, styles):
    elems = []
    elems.append(Paragraph("Score Breakdown", styles['SectionHead']))
    elems.append(HRFlowable(width="100%", thickness=1.5, color=C_NAVY))
    elems.append(Spacer(1, 5 * mm))

    categories = data.get('categories', {})
    if categories:
        chart = make_bar_chart(categories)
        chart_tbl = Table([[chart]], colWidths=[PAGE_W - 2 * MARGIN])
        chart_tbl.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'LEFT')]))
        elems.append(chart_tbl)
        elems.append(Spacer(1, 6 * mm))

        # Score table
        hdr = [
            Paragraph("Category", ParagraphStyle('TH', fontName='Helvetica-Bold',
                       fontSize=9, textColor=C_WHITE)),
            Paragraph("Score", ParagraphStyle('TH', fontName='Helvetica-Bold',
                       fontSize=9, textColor=C_WHITE, alignment=TA_CENTER)),
            Paragraph("Weight", ParagraphStyle('TH', fontName='Helvetica-Bold',
                       fontSize=9, textColor=C_WHITE, alignment=TA_CENTER)),
            Paragraph("Status", ParagraphStyle('TH', fontName='Helvetica-Bold',
                       fontSize=9, textColor=C_WHITE, alignment=TA_CENTER)),
        ]
        rows = [hdr]
        for cat, vals in categories.items():
            sc = vals.get('score', 0)
            wt = vals.get('weight', '')
            col = score_color(sc)
            status_style = ParagraphStyle('ST', fontName='Helvetica-Bold',
                                          fontSize=9, textColor=col,
                                          alignment=TA_CENTER)
            rows.append([
                Paragraph(cat, ParagraphStyle('TD', fontName='Helvetica',
                                               fontSize=9, textColor=C_BODY)),
                Paragraph(str(sc), ParagraphStyle('SC', fontName='Helvetica-Bold',
                                                   fontSize=9, textColor=col,
                                                   alignment=TA_CENTER)),
                Paragraph(wt, ParagraphStyle('WT', fontName='Helvetica',
                                              fontSize=9, textColor=C_GRAY,
                                              alignment=TA_CENTER)),
                Paragraph(score_label(sc), status_style),
            ])

        col_w = PAGE_W - 2 * MARGIN
        tbl = Table(rows, colWidths=[col_w * 0.42, col_w * 0.14,
                                      col_w * 0.16, col_w * 0.28])
        style = TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), C_NAVY),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_WHITE, C_LIGHT]),
            ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
            ('TOPPADDING', (0, 0), (-1, -1), 7),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ])
        tbl.setStyle(style)
        elems.append(tbl)

    elems.append(PageBreak())
    return elems


def findings_page(data, styles):
    elems = []
    elems.append(Paragraph("Key Findings", styles['SectionHead']))
    elems.append(HRFlowable(width="100%", thickness=1.5, color=C_NAVY))
    elems.append(Spacer(1, 5 * mm))

    findings = data.get('findings', [])
    if not findings:
        elems.append(Paragraph("No findings recorded.", styles['BodyText2']))
        elems.append(PageBreak())
        return elems

    hdr = [
        Paragraph("Severity", ParagraphStyle('TH', fontName='Helvetica-Bold',
                   fontSize=9, textColor=C_WHITE)),
        Paragraph("Finding", ParagraphStyle('TH', fontName='Helvetica-Bold',
                   fontSize=9, textColor=C_WHITE)),
    ]
    rows = [hdr]
    for f in findings:
        sev = f.get('severity', 'Low')
        col = severity_color(sev)
        sev_p = Paragraph(sev, ParagraphStyle('SV', fontName='Helvetica-Bold',
                                               fontSize=9, textColor=col))
        finding_p = Paragraph(f.get('finding', ''),
                               ParagraphStyle('FD', fontName='Helvetica',
                                              fontSize=9, textColor=C_BODY,
                                              leading=14))
        rows.append([sev_p, finding_p])

    col_w = PAGE_W - 2 * MARGIN
    tbl = Table(rows, colWidths=[col_w * 0.15, col_w * 0.85])
    tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_NAVY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_WHITE, C_LIGHT]),
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    elems.append(tbl)
    elems.append(PageBreak())
    return elems


def action_plan_page(data, styles):
    elems = []
    elems.append(Paragraph("Prioritized Action Plan", styles['SectionHead']))
    elems.append(HRFlowable(width="100%", thickness=1.5, color=C_NAVY))
    elems.append(Spacer(1, 5 * mm))

    sections = [
        ("Quick Wins — This Week", data.get('quick_wins', []), C_GREEN),
        ("Medium Term — 1 to 3 Months", data.get('medium_term', []), C_BLUE),
        ("Strategic — 3 to 6 Months", data.get('strategic', []), C_NAVY),
    ]

    col_w = PAGE_W - 2 * MARGIN

    for title, items, col in sections:
        if not items:
            continue
        title_data = [[Paragraph(title, ParagraphStyle(
            'AT', fontName='Helvetica-Bold', fontSize=11,
            textColor=C_WHITE))]]
        title_tbl = Table(title_data, colWidths=[col_w])
        title_tbl.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), col),
            ('TOPPADDING', (0, 0), (-1, -1), 7),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
            ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ]))
        elems.append(title_tbl)

        item_rows = []
        for i, item in enumerate(items, 1):
            item_rows.append([
                Paragraph(f"{i}.", ParagraphStyle(
                    'NUM', fontName='Helvetica-Bold', fontSize=10,
                    textColor=col, alignment=TA_CENTER)),
                Paragraph(item, ParagraphStyle(
                    'IT', fontName='Helvetica', fontSize=9.5,
                    textColor=C_BODY, leading=14)),
            ])

        item_tbl = Table(item_rows, colWidths=[col_w * 0.06, col_w * 0.94])
        item_tbl.setStyle(TableStyle([
            ('ROWBACKGROUNDS', (0, 0), (-1, -1), [C_WHITE, C_LIGHT]),
            ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        elems.append(item_tbl)
        elems.append(Spacer(1, 4 * mm))

    elems.append(PageBreak())
    return elems


def competitors_page(data, styles):
    competitors = data.get('competitors', [])
    if not competitors:
        return []

    elems = []
    elems.append(Paragraph("Competitive Landscape", styles['SectionHead']))
    elems.append(HRFlowable(width="100%", thickness=1.5, color=C_NAVY))
    elems.append(Spacer(1, 5 * mm))

    brand = data.get('brand_name', 'Us')
    comp_names = [c.get('name', f'Competitor {i+1}')
                  for i, c in enumerate(competitors[:3])]

    col_w = PAGE_W - 2 * MARGIN
    n_cols = 1 + len(comp_names)
    widths = [col_w * 0.18] + [col_w * (0.82 / len(comp_names))] * len(comp_names)

    def hdr_cell(txt, bg=C_NAVY):
        return Paragraph(txt, ParagraphStyle(
            'CH', fontName='Helvetica-Bold', fontSize=9,
            textColor=C_WHITE, alignment=TA_CENTER))

    def td_cell(txt):
        return Paragraph(txt, ParagraphStyle(
            'CD', fontName='Helvetica', fontSize=9,
            textColor=C_BODY, leading=13))

    hdr = [hdr_cell(brand)] + [hdr_cell(n) for n in comp_names]
    hdr.insert(0, hdr_cell(""))

    rows = [hdr]
    fields = ['positioning', 'pricing', 'social_proof', 'content']
    labels = ['Positioning', 'Pricing', 'Social Proof', 'Content']

    for field, label in zip(fields, labels):
        row = [Paragraph(label, ParagraphStyle(
            'RL', fontName='Helvetica-Bold', fontSize=9, textColor=C_NAVY))]
        row.append(td_cell("—"))  # placeholder for brand column
        for comp in competitors[:3]:
            row.append(td_cell(comp.get(field, '—')))
        rows.append(row)

    col_widths = [col_w * 0.15, col_w * 0.15] + \
                 [col_w * (0.70 / len(comp_names))] * len(comp_names)

    tbl = Table(rows, colWidths=col_widths[:n_cols + 1])
    tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_NAVY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_WHITE, C_LIGHT]),
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    elems.append(tbl)
    elems.append(PageBreak())
    return elems


def methodology_page(styles):
    elems = []
    elems.append(Paragraph("Methodology", styles['SectionHead']))
    elems.append(HRFlowable(width="100%", thickness=1.5, color=C_NAVY))
    elems.append(Spacer(1, 5 * mm))

    elems.append(Paragraph(
        "This report evaluates marketing effectiveness across six weighted dimensions. "
        "Each category is scored 0–100 based on observed signals, benchmarked against "
        "industry best practices for SaaS and B2B software products.",
        ParagraphStyle('MT', fontName='Helvetica', fontSize=10,
                       textColor=C_BODY, leading=15, spaceAfter=8)))

    categories_meta = [
        ("Content & Messaging", "25%",
         "Copy clarity, value proposition, headline effectiveness, CTA quality, voice consistency"),
        ("Conversion Optimization", "20%",
         "Social proof, form design, CTA placement, objection handling, urgency signals"),
        ("SEO & Discoverability", "20%",
         "Title tags, meta descriptions, schema markup, internal linking, page speed"),
        ("Competitive Positioning", "15%",
         "Differentiation, pricing clarity, comparison content, market awareness"),
        ("Brand & Trust", "10%",
         "Design quality, trust badges, security signals, professional appearance"),
        ("Growth & Strategy", "10%",
         "Lead capture, content marketing, email, multi-channel acquisition"),
    ]

    hdr = [
        Paragraph("Category", ParagraphStyle('TH', fontName='Helvetica-Bold',
                   fontSize=9, textColor=C_WHITE)),
        Paragraph("Weight", ParagraphStyle('TH', fontName='Helvetica-Bold',
                   fontSize=9, textColor=C_WHITE, alignment=TA_CENTER)),
        Paragraph("What Is Measured", ParagraphStyle('TH', fontName='Helvetica-Bold',
                   fontSize=9, textColor=C_WHITE)),
    ]
    rows = [hdr]
    for name, weight, desc in categories_meta:
        rows.append([
            Paragraph(name, ParagraphStyle('TD', fontName='Helvetica-Bold',
                                            fontSize=9, textColor=C_NAVY)),
            Paragraph(weight, ParagraphStyle('WT', fontName='Helvetica-Bold',
                                              fontSize=9, textColor=C_BLUE,
                                              alignment=TA_CENTER)),
            Paragraph(desc, ParagraphStyle('DS', fontName='Helvetica',
                                            fontSize=9, textColor=C_BODY,
                                            leading=13)),
        ])

    col_w = PAGE_W - 2 * MARGIN
    tbl = Table(rows, colWidths=[col_w * 0.30, col_w * 0.10, col_w * 0.60])
    tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_NAVY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_WHITE, C_LIGHT]),
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    elems.append(tbl)
    elems.append(Spacer(1, 8 * mm))

    elems.append(Paragraph(
        "Generated by AI Marketing Suite for Claude Code",
        ParagraphStyle('FT', fontName='Helvetica', fontSize=8,
                       textColor=C_GRAY, alignment=TA_CENTER)))

    return elems


def add_page_number(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(C_GRAY)
    page_num = canvas.getPageNumber()
    canvas.drawRightString(PAGE_W - MARGIN, 10 * mm,
                           f"Page {page_num}")
    canvas.drawString(MARGIN, 10 * mm, "CureMitra — Marketing Audit Report")
    canvas.restoreState()


def generate_report(data, output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=16 * mm,
    )

    styles = build_styles()
    story = []

    story += cover_page(data, styles)
    story += scores_page(data, styles)
    story += findings_page(data, styles)
    story += action_plan_page(data, styles)
    story += competitors_page(data, styles)
    story += methodology_page(styles)

    doc.build(story, onFirstPage=add_page_number,
              onLaterPages=add_page_number)
    print(f"Report generated: {output_path}")


SAMPLE_DATA = {
    "url": "https://example.com",
    "date": "June 29, 2026",
    "brand_name": "Example Co",
    "overall_score": 62,
    "executive_summary": (
        "Example Co shows solid fundamentals in SEO and brand trust but has critical "
        "gaps in competitive positioning and growth strategy. Implementing the quick wins "
        "identified in this report could increase trial conversions by an estimated 20-30% "
        "within 60 days. Priority: add a competitor comparison page and launch content marketing."
    ),
    "categories": {
        "Content & Messaging":      {"score": 72, "weight": "25%"},
        "Conversion Optimization":  {"score": 58, "weight": "20%"},
        "SEO & Discoverability":    {"score": 67, "weight": "20%"},
        "Competitive Positioning":  {"score": 45, "weight": "15%"},
        "Brand & Trust":            {"score": 70, "weight": "10%"},
        "Growth & Strategy":        {"score": 52, "weight": "10%"},
    },
    "findings": [
        {"severity": "Critical", "finding": "Sample critical finding."},
        {"severity": "High", "finding": "Sample high finding."},
        {"severity": "Medium", "finding": "Sample medium finding."},
        {"severity": "Low", "finding": "Sample low finding."},
    ],
    "quick_wins": ["Quick win 1", "Quick win 2", "Quick win 3"],
    "medium_term": ["Medium term 1", "Medium term 2"],
    "strategic": ["Strategic 1", "Strategic 2"],
    "competitors": [
        {"name": "Competitor A", "positioning": "Enterprise focus",
         "pricing": "High", "social_proof": "Fortune 500 logos",
         "content": "Whitepapers"},
    ],
}


if __name__ == '__main__':
    if len(sys.argv) >= 2:
        json_path = sys.argv[1]
        output_path = sys.argv[2] if len(sys.argv) >= 3 else 'MARKETING-REPORT-output.pdf'
        with open(json_path) as f:
            data = json.load(f)
    else:
        data = SAMPLE_DATA
        output_path = 'MARKETING-REPORT-sample.pdf'

    generate_report(data, output_path)
