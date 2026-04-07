import Link from "next/link";

export const metadata = {
  title: "Security | MyPharma",
};

export default function SecurityPage() {
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
            <p className="eyebrow">Secure by default</p>
            <h1 className="sub-title">Privacy &amp; Data Sovereignty Policy</h1>
            <p className="subcopy">
              Clinical data protection built around role-based controls,
              encrypted storage, and compliance-oriented governance.
            </p>
          </div>
          <div className="sub-hero-visual security-visual">
            <div className="policy-form">
              <p>Compliance Tier</p>
              <div />
              <p>Data Region</p>
              <div />
              <p>Retention Policy</p>
              <div />
            </div>
          </div>
        </div>
      </section>

      <section className="sub-section">
        <div className="container security-grid">
          <article className="sub-card">
            <h3>HIPAA Compliance &amp; PHI</h3>
            <p>Access controls, audit trails, and secure handling of sensitive records.</p>
          </article>
          <article className="sub-card">
            <h3>Data Collection &amp; OCR Processing</h3>
            <p>Transparent handling policies with strict boundaries on processing scope.</p>
          </article>
          <article className="sub-card deep security-wide">
            <h3>Security Standards</h3>
            <p>
              Encrypted data channels, hardened storage controls, and ongoing
              policy monitoring for clinical-grade protection.
            </p>
          </article>
          <article className="sub-card rights-card">
            <h3>Your Rights &amp; Data Control</h3>
            <ul className="rights-list">
              <li>Right to Access</li>
              <li>Right to Deletion</li>
              <li>Data Portability</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
