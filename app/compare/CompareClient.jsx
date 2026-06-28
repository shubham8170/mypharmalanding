'use client';

import Link from 'next/link';
import logoImg from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowRight,
  Check,
  X,
  Menu,
  ChevronRight,
  Zap,
  ShieldCheck,
  Star,
} from 'lucide-react';

const SOCIAL_SVG = {
  linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
  youtube: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9"/></svg>,
  twitter: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16H20L8.267 4z"/><path d="M4 20l6.768-6.768M20 4l-6.768 6.768"/></svg>,
};

const rows = [
  {
    feature: 'Deployment',
    curemitra: 'Cloud + Android app',
    marg: 'Desktop (Windows only)',
    gofrugal: 'Cloud + Android',
    win: 'curemitra',
  },
  {
    feature: 'Pricing model',
    curemitra: 'Free Starter · ₹2,499/mo Professional',
    marg: 'One-time ₹8,000–₹25,000 + annual AMC',
    gofrugal: '₹999–₹3,999/mo subscription',
    win: 'curemitra',
  },
  {
    feature: 'OCR prescription billing',
    curemitra: '99.9% accuracy, local ML engine',
    marg: 'Manual entry only',
    gofrugal: 'Basic barcode scan',
    win: 'curemitra',
  },
  {
    feature: 'AI predictive inventory',
    curemitra: true,
    marg: false,
    gofrugal: false,
    win: 'curemitra',
  },
  {
    feature: 'GST filing sync',
    curemitra: 'Cleartax · Mastersindia · Vayana',
    marg: 'Cleartax only',
    gofrugal: 'Cleartax only',
    win: 'curemitra',
  },
  {
    feature: 'HIPAA compliance',
    curemitra: true,
    marg: false,
    gofrugal: false,
    win: 'curemitra',
  },
  {
    feature: 'Multi-branch management',
    curemitra: 'Enterprise plan',
    marg: 'Add-on license',
    gofrugal: 'All plans',
    win: 'all',
  },
  {
    feature: 'EHR & Patient CRM',
    curemitra: true,
    marg: false,
    gofrugal: false,
    win: 'curemitra',
  },
  {
    feature: 'GPS delivery tracking',
    curemitra: true,
    marg: false,
    gofrugal: false,
    win: 'curemitra',
  },
  {
    feature: 'Bluetooth thermal printer',
    curemitra: true,
    marg: 'USB/LAN printers only',
    gofrugal: true,
    win: 'curemitra',
  },
  {
    feature: 'WhatsApp / SMS dispatch',
    curemitra: true,
    marg: false,
    gofrugal: 'SMS only',
    win: 'curemitra',
  },
  {
    feature: 'Razorpay payments',
    curemitra: true,
    marg: false,
    gofrugal: 'Paytm / Stripe',
    win: 'all',
  },
  {
    feature: 'Free trial',
    curemitra: '30 days — no card needed',
    marg: 'Demo only',
    gofrugal: '14 days',
    win: 'curemitra',
  },
  {
    feature: 'Setup time',
    curemitra: 'Under 24 hours',
    marg: '2–5 business days + dealer visit',
    gofrugal: '1–2 days',
    win: 'curemitra',
  },
  {
    feature: 'Hindi-first UI',
    curemitra: true,
    marg: true,
    gofrugal: false,
    win: 'all',
  },
];

function CellValue({ value, isWinner }) {
  if (value === true) return <Check size={18} className={isWinner ? 'cmp-check-yes cmp-winner-check' : 'cmp-check-yes'} />;
  if (value === false) return <X size={18} className="cmp-check-no" />;
  return <span className={isWinner ? 'cmp-text cmp-text--winner' : 'cmp-text'}>{value}</span>;
}

const testimonials = [
  {
    quote: 'We switched from Marg ERP after 8 years. CureMitra\'s OCR eliminated 90% of manual entry within the first week. The cloud access means I can check stock from home.',
    name: 'Rajesh Kumar',
    role: 'Owner, Kumar Medical Hall, Patna',
  },
  {
    quote: 'GoFrugal didn\'t have HIPAA compliance or EHR vitals. Those were non-negotiable for our clinic network. CureMitra had both out of the box, plus the AI inventory is genuinely useful.',
    name: 'Dr. Meena Iyer',
    role: 'Medical Director, Iyer Clinic Chain, Chennai',
  },
];

export default function CompareClient() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="subpage">
      {/* ── Header ── */}
      <header className="subpage-topbar">
        <div className="container topbar-inner">
          <Link href="/" className="brand-mark">
            <img src={logoImg.src} alt="CureMitra Logo" className="brand-logo" />
            <span>CureMitra</span>
          </Link>
          <nav className="top-links" aria-label="Main navigation">
            <Link href="/">Product</Link>
            <Link href="/features">Features</Link>
            <Link href="/compare">Compare</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/customer-support">Support</Link>
          </nav>
          <div className="header-cta-group">
            <a href="mailto:curemitrapharma@gmail.com?subject=Book%20a%20Demo" className="btn btn-secondary btn-sm">Book a Demo</a>
            <a href="mailto:curemitrapharma@gmail.com" className="btn btn-primary btn-sm">Start Free Trial</a>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" onClick={() => setMenuOpen(false)}>Product</Link>
              <Link href="/features" onClick={() => setMenuOpen(false)}>Features</Link>
              <Link href="/compare" onClick={() => setMenuOpen(false)}>Compare</Link>
              <Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
              <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
              <Link href="/customer-support" onClick={() => setMenuOpen(false)}>Support</Link>
              <a href="mailto:curemitrapharma@gmail.com?subject=Book%20a%20Demo" className="btn btn-secondary" onClick={() => setMenuOpen(false)}>Book a Demo</a>
              <a href="mailto:curemitrapharma@gmail.com" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Start Free Trial</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section className="sub-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow-badge" style={{ margin: '0 auto 24px' }}>
              <Zap size={16} />
              <span>Pharmacy Software Comparison</span>
            </div>
            <h1 className="sub-title" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
              CureMitra vs Marg ERP vs GoFrugal —
              <span className="gradient-text"> Which Is Right for Your Pharmacy?</span>
            </h1>
            <p className="section-sub" style={{ margin: '20px auto 0', maxWidth: 640 }}>
              A transparent, feature-by-feature comparison so you can make the right choice
              for your pharmacy or clinic network.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="sub-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cmp-table-wrap"
          >
            <table className="cmp-table" aria-label="Pharmacy software feature comparison">
              <thead>
                <tr>
                  <th className="cmp-th cmp-th-feature">Feature</th>
                  <th className="cmp-th cmp-th-winner">
                    <ShieldCheck size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                    CureMitra
                  </th>
                  <th className="cmp-th">Marg ERP</th>
                  <th className="cmp-th">GoFrugal</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <motion.tr
                    key={row.feature}
                    className={`cmp-row${i % 2 === 1 ? ' cmp-row--alt' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                  >
                    <td className="cmp-td cmp-td-feature">{row.feature}</td>
                    <td className="cmp-td cmp-td-winner">
                      <CellValue value={row.curemitra} isWinner={true} />
                    </td>
                    <td className="cmp-td">
                      <CellValue value={row.marg} isWinner={false} />
                    </td>
                    <td className="cmp-td">
                      <CellValue value={row.gofrugal} isWinner={false} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <p className="cmp-footnote">
            Data based on publicly available product information as of June 2026. Features may vary by plan.
          </p>
        </div>
      </section>

      {/* ── Why Switch ── */}
      <section className="sub-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>
              Why Pharmacies
              <span className="gradient-text"> Switch to CureMitra</span>
            </h2>
            <p className="section-sub">
              From pharmacies that made the move from legacy software.
            </p>
          </motion.div>
          <div className="sub-grid-2">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="sub-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div style={{ marginBottom: 20 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="#f59e0b" stroke="#f59e0b" />
                  ))}
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.7, margin: '0 0 20px' }}>
                  "{t.quote}"
                </p>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                  <strong style={{ color: 'var(--text)', fontSize: 14 }}>{t.name}</strong>
                  <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 13 }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key advantages ── */}
      <section className="sub-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>
              The CureMitra
              <span className="gradient-text"> Advantage</span>
            </h2>
          </motion.div>
          <div className="cmp-advantage-grid">
            {[
              {
                title: 'Cloud-first, no IT overhead',
                desc: 'Marg ERP requires Windows desktop installation, manual backups, and dealer support. CureMitra runs in any browser and syncs automatically — no server room needed.',
              },
              {
                title: '99.9% OCR vs. manual entry',
                desc: 'Marg and GoFrugal rely on barcode scanning or manual data entry. CureMitra\'s clinical-grade OCR reads handwritten prescriptions in under 3 seconds.',
              },
              {
                title: 'True multi-GSP compliance',
                desc: 'CureMitra integrates with Cleartax, Mastersindia, and Vayana simultaneously — not just one provider. This means your GSTR-1 filing works regardless of your distributor\'s GSP preference.',
              },
              {
                title: 'Free tier that actually works',
                desc: 'Most competitors offer time-limited trials. CureMitra\'s Starter plan is free forever for single-location pharmacies — no credit card, no expiry, no catch.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="sub-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <h3 style={{ marginBottom: 12 }}>{item.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sub-section">
        <div className="container">
          <motion.div
            className="mini-cta"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2>Ready to Switch?</h2>
            <p className="section-sub" style={{ margin: '12px auto 0' }}>
              Migration from Marg ERP or GoFrugal takes under 24 hours. Our team handles the transition.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 28 }}>
              <a href="mailto:curemitrapharma@gmail.com" className="btn btn-primary glow">
                Start Free — No Card Required
                <ArrowRight size={18} />
              </a>
              <a href="mailto:curemitrapharma@gmail.com?subject=Migration%20from%20Marg%20ERP" className="btn btn-secondary">
                Talk to Migration Team
                <ChevronRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer" role="contentinfo">
        <div className="container footer-grid">
          <div className="brand">
            <Link href="/" className="brand-mark">
              <img src={logoImg.src} alt="CureMitra Logo" className="brand-logo" />
              <span>CureMitra</span>
            </Link>
            <p>Smart OCR and billing for the modern healthcare facility.</p>
            <div className="footer-social">
              <a href="https://linkedin.com/company/curemitra" target="_blank" rel="noopener noreferrer" aria-label="CureMitra on LinkedIn">{SOCIAL_SVG.linkedin}</a>
              <a href="https://youtube.com/@curemitra" target="_blank" rel="noopener noreferrer" aria-label="CureMitra on YouTube">{SOCIAL_SVG.youtube}</a>
              <a href="https://twitter.com/curemitra" target="_blank" rel="noopener noreferrer" aria-label="CureMitra on Twitter">{SOCIAL_SVG.twitter}</a>
            </div>
          </div>
          <div>
            <h5>Solutions</h5>
            <ul>
              <li><Link href="/features"><ChevronRight size={14} />Billing OCR</Link></li>
              <li><Link href="/features"><ChevronRight size={14} />Inventory AI</Link></li>
              <li><Link href="/compare"><ChevronRight size={14} />Compare Plans</Link></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/about"><ChevronRight size={14} />About Us</Link></li>
              <li><Link href="/pricing"><ChevronRight size={14} />Pricing</Link></li>
              <li><Link href="/blog"><ChevronRight size={14} />Blog</Link></li>
              <li><Link href="/security"><ChevronRight size={14} />Security</Link></li>
            </ul>
          </div>
          <div>
            <h5>Support</h5>
            <ul>
              <li><Link href="/customer-support"><ChevronRight size={14} />Customer Support</Link></li>
              <li><Link href="/privacy-policy"><ChevronRight size={14} />Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
