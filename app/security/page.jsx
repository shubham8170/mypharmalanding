import Link from 'next/link';
import {
  Pill,
  ShieldCheck,
  Lock,
  Eye,
  FileCheck,
  UserCheck,
  KeyRound,
  Database,
} from 'lucide-react';

export const metadata = {
  title: 'Security | CureMitra',
};

export default function SecurityPage() {
  const rights = [
    { icon: UserCheck, label: 'Right to Access' },
    { icon: KeyRound, label: 'Right to Deletion' },
    { icon: Database, label: 'Data Portability' },
  ];

  return (
    <main className="subpage">
      <header className="subpage-topbar">
        <div className="container topbar-inner">
          <Link href="/" className="brand-mark">
            <Pill size={22} className="brand-icon" strokeWidth={2} />
            <span>CureMitra</span>
          </Link>
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
            <div className="eyebrow-badge">
              <ShieldCheck size={16} />
              <span>Secure by default</span>
            </div>
            <h1 className="sub-title">
              Privacy &amp;{' '}
              <span className="gradient-text">Data Sovereignty</span>
            </h1>
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
            <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
              <Lock size={28} strokeWidth={1.5} />
            </div>
            <h3>HIPAA Compliance &amp; PHI</h3>
            <p>
              Access controls, audit trails, and secure handling of sensitive records.
            </p>
          </article>

          <article className="sub-card">
            <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
              <Eye size={28} strokeWidth={1.5} />
            </div>
            <h3>Data Collection &amp; OCR Processing</h3>
            <p>
              Transparent handling policies with strict boundaries on processing scope.
            </p>
          </article>

          <article className="sub-card deep security-wide">
            <div className="feature-icon-wrap" style={{ marginBottom: 20, background: 'rgba(255,255,255,0.1)' }}>
              <FileCheck size={28} strokeWidth={1.5} />
            </div>
            <h3>Security Standards</h3>
            <p>
              Encrypted data channels, hardened storage controls, and ongoing policy
              monitoring for clinical-grade protection.
            </p>
          </article>

          <article className="sub-card rights-card">
            <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
              <ShieldCheck size={28} strokeWidth={1.5} />
            </div>
            <h3>Your Rights &amp; Data Control</h3>
            <ul className="rights-list">
              {rights.map((r) => (
                <li key={r.label}>
                  <r.icon size={18} style={{ color: 'var(--primary)' }} />
                  {r.label}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
