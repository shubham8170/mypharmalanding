import Link from "next/link";

export const metadata = {
  title: "Features | MyPharma",
};

export default function FeaturesPage() {
  return (
    <main className="subpage">
      <header className="subpage-topbar">
        <div className="container topbar-inner">
          <Link href="/" className="brand-mark">MyPharma</Link>
          <nav className="top-links">
            <Link href="/">Product</Link>
            <Link href="/features">Features</Link>
            <Link href="/security">Security</Link>
            <Link href="/customer-support">Support</Link>
          </nav>
          <Link href="/" className="btn btn-primary btn-sm">Get Started</Link>
        </div>
      </header>

      <section className="sub-hero">
        <div className="container sub-hero-grid">
          <div>
            <p className="eyebrow">Powerful modules</p>
            <h1 className="sub-title">Precision in every clinical scan.</h1>
            <p className="subcopy">
              Built to automate billing, optimize inventory, and improve
              pharmacy operations with low-friction workflows.
            </p>
          </div>
          <div className="sub-hero-visual feature-hero-visual" />
        </div>
      </section>

      <section className="sub-section">
        <div className="container feature-kpi-grid">
          <article className="sub-card">
            <h3>Core Engineering Pillars</h3>
            <p>Clinical-grade OCR engine with resilient real-time pipelines.</p>
          </article>
          <article className="sub-card kpi">
            <p className="kpi-value">99.9%</p>
            <p>OCR Accuracy</p>
          </article>
          <article className="sub-card kpi">
            <p className="kpi-value">+40%</p>
            <p>Billing Throughput</p>
          </article>
          <article className="sub-card kpi">
            <p className="kpi-value">&lt;1s</p>
            <p>Inventory Latency</p>
          </article>
        </div>
      </section>

      <section className="sub-section feature-pillars">
        <div className="container sub-grid-2">
          <div className="sub-card">
            <h3>Scan &amp; Bill in Seconds</h3>
            <p>Auto-capture medicine lines, taxes, and patient data directly into billing flow.</p>
          </div>
          <div className="sub-card">
            <h3>Engineered for Modern Healthcare</h3>
            <p>Optimized for pharmacy and clinic use-cases with consistent data integrity.</p>
          </div>
        </div>
      </section>

      <section className="sub-section cta-row">
        <div className="container mini-cta">
          <h2>Ready to digitize your pharmacy?</h2>
          <div className="hero-actions center">
            <Link href="/" className="btn btn-primary">Start Free Trial</Link>
            <Link href="/customer-support" className="btn btn-secondary">Contact Support</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
