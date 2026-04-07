import Link from "next/link";

const featureCards = [
  {
    title: "Scan & Bill in Seconds",
    text: "Advanced OCR technology interprets prescriptions and invoices with 99.9% accuracy, auto-filling your billing engine instantly.",
  },
  {
    title: "Never Out of Stock",
    text: "AI-driven inventory management predicts demand peaks and automates reordering before you even notice a shortage.",
  },
  {
    title: "Effortless Appointments",
    text: "Integrated patient portal for seamless scheduling that syncs directly with clinical staff availability and billing records.",
  },
];

const workflowPoints = [
  {
    title: "Automatic Compliance",
    text: "Generate tax-ready invoices with policy-aligned validation and audit trails.",
  },
  {
    title: "Predictive Intelligence",
    text: "Forecast stock shortages and optimize procurement before disruption occurs.",
  },
  {
    title: "Real-time Synchronization",
    text: "Billing, inventory, and appointments stay in sync across every channel.",
  },
];

const footerColumns = [
  {
    heading: "Solutions",
    links: [
      { label: "Billing OCR", href: "/features" },
      { label: "Inventory AI", href: "/features" },
      { label: "Clinic Management", href: "/features" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Customer Support", href: "/customer-support" },
      { label: "Documentation", href: "/customer-support" },
      { label: "Status", href: "/customer-support" },
    ],
  },
];

const trustBadges = ["Core Partners", "MediLab", "Clinical+", "Care Connect", "Top Pharmasoft"];

function Icon({ type }) {
  if (type === "arrow") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M4 10h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "scan") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 12h8M8 9h4M8 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "stock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 17V7m6 10V4m6 13v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="6" cy="18" r="2" fill="currentColor" />
        <circle cx="12" cy="4" r="2" fill="currentColor" />
        <circle cx="18" cy="12" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l7 3v6c0 4.6-3.1 7.8-7 9-3.9-1.2-7-4.4-7-9V6l7-3z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.5 12.5l1.7 1.8 3.3-3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "spark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="page">
      <header className="topbar">
        <div className="container topbar-inner">
          <p className="brand-mark">MyPharma</p>
          <nav className="top-links">
            <Link href="/">Product</Link>
            <Link href="/features">Features</Link>
            <Link href="/security">Security</Link>
            <Link href="/customer-support">Support</Link>
          </nav>
          <button className="btn btn-primary btn-sm">Get Started</button>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">MyPharma</p>
            <h1>Streamline Your Pharmacy &amp; Clinic</h1>
            <p className="subcopy">
              Automate complex billing workflows with clinical-grade OCR. Reduce
              administrative overhead, synchronize AI-driven inventory, and
              focus more on patient care.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">
                Get Started
                <span className="btn-icon">
                  <Icon type="arrow" />
                </span>
              </button>
              <button className="btn btn-secondary">Book a Demo</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="mock-panel" />
            <div className="mock-floating">99.9% OCR Accuracy</div>
          </div>
        </div>
      </section>

      <section className="social-proof">
        <div className="container">
          <p>Trusted by pharmacies, clinics, and healthcare teams</p>
          <div className="trust-grid">
            {trustBadges.map((badge) => (
              <span key={badge}>
                <span className="badge-icon">
                  <Icon type="shield" />
                </span>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Optimized for Clinical Efficiency</h2>
          <p className="section-sub">
            Purpose-built modules that reduce friction across billing, stock,
            and operations.
          </p>
          <div className="feature-grid">
            {featureCards.map((card, index) => (
              <article className="card" key={card.title}>
                <div className="icon-dot">
                  <Icon type={index === 0 ? "scan" : index === 1 ? "stock" : "calendar"} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="workflow">
        <div className="container workflow-grid">
          <div>
            <h2>Unified Workflow, Zero Friction.</h2>
            <p className="section-sub">
              One source of truth for your entire clinical operations.
            </p>
            <div className="workflow-list">
              {workflowPoints.map((point) => (
                <div className="workflow-item" key={point.title}>
                  <div className="icon-dot sm">
                    <Icon type={point.title === "Automatic Compliance" ? "shield" : point.title === "Predictive Intelligence" ? "spark" : "stock"} />
                  </div>
                  <div>
                    <h4>{point.title}</h4>
                    <p>{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="workflow-visual">
            <div className="mock-panel large" />
            <div className="workflow-float">
              <p className="label">Billing Efficiency</p>
              <p className="value">+40%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-box">
          <h2>Ready to Elevate Your Practice?</h2>
          <p>
            Bring OCR-first billing, predictive inventory, and reliable patient
            workflows into one precision platform.
          </p>
          <div className="hero-actions center">
            <button className="btn btn-primary">
              Start Free Trial
              <span className="btn-icon">
                <Icon type="arrow" />
              </span>
            </button>
            <button className="btn btn-secondary">Talk to Sales</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="brand">
            <h5>MyPharma</h5>
            <p>
              Smart OCR and billing for the modern healthcare facility.
              Precision engineering for clinical excellence.
            </p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h5>{column.heading}</h5>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}
