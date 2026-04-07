import Link from "next/link";

export const metadata = {
  title: "Customer Support | MyPharma",
};

export default function CustomerSupportPage() {
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
            <p className="eyebrow">Need help now?</p>
            <h1 className="sub-title">How can we help you today?</h1>
            <p className="subcopy">
              Support for onboarding, billing operations, product guidance, and
              urgent pharmacy workflow issues.
            </p>
            <div className="support-search">
              <input type="text" placeholder="Search for support articles and solutions" />
            </div>
          </div>
          <div className="sub-hero-visual support-visual" />
        </div>
      </section>

      <section className="sub-section">
        <div className="container sub-grid-3">
          <article className="sub-card">
            <h3>OCR Billing Troubleshooting</h3>
            <p>Fix extraction anomalies, template mismatches, and bill submission issues.</p>
          </article>
          <article className="sub-card">
            <h3>Billing AI Assistance</h3>
            <p>Resolve workflow and recommendation logic issues with guided diagnostics.</p>
          </article>
          <article className="sub-card">
            <h3>Real-time Inventory Sync</h3>
            <p>Support for stock updates, sync delays, and channel consistency issues.</p>
          </article>
        </div>
      </section>

      <section className="sub-section faq">
        <div className="container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            <details>
              <summary>How do I connect MyPharma to my existing POS system?</summary>
              <p>Use the integration wizard in settings and map your billing schema.</p>
            </details>
            <details>
              <summary>What browsers and devices are supported?</summary>
              <p>Current Chrome, Edge, Safari, and Firefox on modern desktop and mobile devices.</p>
            </details>
            <details>
              <summary>Can your team help with onboarding and training?</summary>
              <p>Yes, onboarding specialists provide implementation and workflow training.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="sub-section cta-row">
        <div className="container support-cta">
          <div>
            <h3>Need expert medical billing assistance?</h3>
            <p>Our specialists can help your clinic optimize workflows quickly.</p>
          </div>
          <div className="hero-actions">
            <Link href="/" className="btn btn-primary">Schedule a Call</Link>
            <Link href="/" className="btn btn-secondary">Message Support</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
