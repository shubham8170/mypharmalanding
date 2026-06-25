import Link from 'next/link';
import {
  Pill,
  ArrowRight,
  ScanLine,
  BarChart3,
  BrainCircuit,
  Activity,
} from 'lucide-react';

export const metadata = {
  title: 'Features | CureMitra',
};

export default function FeaturesPage() {
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
              <Activity size={16} />
              <span>Powerful modules</span>
            </div>
            <h1 className="sub-title">
              Precision in every{' '}
              <span className="gradient-text">clinical scan</span>
            </h1>
            <p className="subcopy">
              Built to automate billing, optimize inventory, and improve pharmacy
              operations with low-friction workflows.
            </p>
          </div>
          <div className="sub-hero-visual feature-hero-visual" />
        </div>
      </section>

      <section className="sub-section">
        <div className="container feature-kpi-grid">
          <article className="sub-card">
            <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
              <BrainCircuit size={28} strokeWidth={1.5} />
            </div>
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
            <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
              <ScanLine size={28} strokeWidth={1.5} />
            </div>
            <h3>Scan &amp; Bill in Seconds</h3>
            <p>
              Auto-capture medicine lines, taxes, and patient data directly into
              billing flow.
            </p>
          </div>
          <div className="sub-card">
            <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
              <BarChart3 size={28} strokeWidth={1.5} />
            </div>
            <h3>Engineered for Modern Healthcare</h3>
            <p>
              Optimized for pharmacy and clinic use-cases with consistent data
              integrity.
            </p>
          </div>
        </div>
      </section>

      <section className="sub-section cta-row">
        <div className="container">
          <div className="mini-cta">
            <h2>Ready to digitize your pharmacy?</h2>
            <div className="hero-actions center">
              <Link href="/" className="btn btn-white">
                Start Free Trial
                <ArrowRight size={18} />
              </Link>
              <Link href="/customer-support" className="btn btn-outline">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
