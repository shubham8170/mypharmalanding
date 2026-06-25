# Graph Report - .  (2026-06-18)

## Corpus Check
- Corpus is ~2,140 words - fits in a single context window. You may not need a graph.

## Summary
- 73 nodes · 89 edges · 12 communities (5 shown, 7 thin omitted)
- Extraction: 74% EXTRACTED · 26% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Product Pages & Concepts|Product Pages & Concepts]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_App Icon Branding|App Icon Branding]]
- [[_COMMUNITY_Home Page Data|Home Page Data]]
- [[_COMMUNITY_Project Stack|Project Stack]]
- [[_COMMUNITY_Customer Support|Customer Support]]
- [[_COMMUNITY_Features Page|Features Page]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Privacy Policy|Privacy Policy]]
- [[_COMMUNITY_Security Page|Security Page]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_CureMitra Brand|CureMitra Brand]]

## God Nodes (most connected - your core abstractions)
1. `HomePage` - 13 edges
2. `PrivacyPolicyPage` - 9 edges
3. `OCR Billing` - 8 edges
4. `CustomerSupportPage` - 7 edges
5. `SecurityPage` - 7 edges
6. `FeaturesPage` - 7 edges
7. `scripts` - 5 edges
8. `RootLayout` - 5 edges
9. `footerColumns` - 5 edges
10. `CureMitra App Icon` - 5 edges

## Surprising Connections (you probably didn't know these)
- `ESLint Next Core Web Vitals Config` --rationale_for--> `curemitra-landingpage`  [INFERRED]
  .eslintrc.json → package.json
- `FeaturesPage` --semantically_similar_to--> `HomePage`  [INFERRED] [semantically similar]
  app/features/page.jsx → app/page.jsx
- `HomePage` --references--> `CureMitra`  [EXTRACTED]
  app/page.jsx → app/layout.jsx
- `FeaturesPage` --semantically_similar_to--> `featureCards`  [INFERRED] [semantically similar]
  app/features/page.jsx → app/page.jsx
- `RootLayout` --implements--> `HomePage`  [INFERRED]
  app/layout.jsx → app/page.jsx

## Hyperedges (group relationships)
- **CureMitra Icon Visual Composition** — app_icon_squircle_shape, app_icon_diagonal_gradient, app_icon_white_medical_cross [EXTRACTED 1.00]

## Communities (12 total, 7 thin omitted)

### Community 0 - "Product Pages & Concepts"
Cohesion: 0.26
Nodes (18): Camera OCR Extraction, HIPAA Compliance and PHI, AI-Driven Inventory Management, OCR Billing, RootLayout, ANDROID_APP_DRIVE_URL, CustomerSupportPage, featureCards (+10 more)

### Community 1 - "Package Dependencies"
Cohesion: 0.13
Nodes (14): dependencies, next, react, react-dom, engines, node, name, private (+6 more)

### Community 2 - "App Icon Branding"
Cohesion: 0.29
Nodes (10): Five-Square Plus Cross Grid, CureMitra App Icon, Diagonal Gradient Background, Lime Green Gradient Tone, Modern Health-Tech Aesthetic, Pharmacy Healthcare Brand Identity, Small-Size Favicon Recognition, Squircle Container Shape (+2 more)

### Community 3 - "Home Page Data"
Cohesion: 0.29
Nodes (4): featureCards, footerColumns, trustBadges, workflowPoints

### Community 4 - "Project Stack"
Cohesion: 0.50
Nodes (4): ESLint Next Core Web Vitals Config, curemitra-landingpage, Next.js 13.5.11, React 18.2.0

## Knowledge Gaps
- **32 isolated node(s):** `name`, `version`, `private`, `node`, `dev` (+27 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `HomePage` connect `Product Pages & Concepts` to `CureMitra Brand`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `HomePage` (e.g. with `FeaturesPage` and `RootLayout`) actually correct?**
  _`HomePage` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `PrivacyPolicyPage` (e.g. with `Shared Subpage Navigation Pattern` and `SecurityPage`) actually correct?**
  _`PrivacyPolicyPage` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `OCR Billing` (e.g. with `HomePage` and `workflowPoints`) actually correct?**
  _`OCR Billing` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `CustomerSupportPage` (e.g. with `Shared Subpage Navigation Pattern` and `RootLayout`) actually correct?**
  _`CustomerSupportPage` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `SecurityPage` (e.g. with `Shared Subpage Navigation Pattern` and `PrivacyPolicyPage`) actually correct?**
  _`SecurityPage` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _32 weakly-connected nodes found - possible documentation gaps or missing edges._