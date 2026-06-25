import Link from 'next/link';
import {
  Pill,
  ArrowRight,
  Search,
  ScanLine,
  BrainCircuit,
  RefreshCw,
  HelpCircle,
  MessageSquare,
  Phone,
} from 'lucide-react';

export const metadata = {
  title: 'Customer Support | CureMitra',
};

export default function CustomerSupportPage() {
  const supportCards = [
    {
      icon: ScanLine,
      title: 'OCR Billing Troubleshooting',
      text: 'Fix extraction anomalies, template mismatches, and bill submission issues.',
    },
    {
      icon: BrainCircuit,
      title: 'Billing AI Assistance',
      text: 'Resolve workflow and recommendation logic issues with guided diagnostics.',
    },
    {
      icon: RefreshCw,
      title: 'Real-time Inventory Sync',
      text: 'Support for stock updates, sync delays, and channel consistency issues.',
    },
  ];

  const faqs = [
    {
      q: 'How do I connect CureMitra to my existing POS system?',
      a: 'Use the integration wizard in settings and map your billing schema.',
    },
    {
      q: 'What browsers and devices are supported?',
      a: 'Current Chrome, Edge, Safari, and Firefox on modern desktop and mobile devices.',
    },
    {
      q: 'Can your team help with onboarding and training?',
      a: 'Yes, onboarding specialists provide implementation and workflow training.',
    },
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
              <HelpCircle size={16} />
              <span>Need help now?</span>
            </div>
            <h1 className="sub-title">
              How can we{' '}
              <span className="gradient-text">help you</span> today?
            </h1>
            <p className="subcopy">
              Support for onboarding, billing operations, product guidance, and
              urgent pharmacy workflow issues.
            </p>
            <div className="support-search">
              <div style={{ position: 'relative' }}>
                <Search
                  size={18}
                  style={{
                    position: 'absolute',
                    left: 18,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--muted)',
                  }}
                />
                <input
                  type="text"
                  placeholder="Search for support articles and solutions"
                  style={{ paddingLeft: 48 }}
                />
              </div>
            </div>
          </div>
          <div className="sub-hero-visual support-visual" />
        </div>
      </section>

      <section className="sub-section">
        <div className="container sub-grid-3">
          {supportCards.map((card) => (
            <article className="sub-card" key={card.title}>
              <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                <card.icon size={28} strokeWidth={1.5} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sub-section faq">
        <div className="container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sub-section cta-row">
        <div className="container">
          <div className="support-cta">
            <div>
              <h3>Need expert medical billing assistance?</h3>
              <p>Our specialists can help your clinic optimize workflows quickly.</p>
            </div>
            <div className="hero-actions" style={{ margin: 0 }}>
              <Link href="/" className="btn btn-white">
                <Phone size={18} />
                Schedule a Call
              </Link>
              <Link href="/" className="btn btn-outline">
                <MessageSquare size={18} />
                Message Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
