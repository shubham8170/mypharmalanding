'use client';

import Link from 'next/link';
import logoImg from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Star,
  Menu,
  X,
  ChevronRight,
  Zap,
} from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    tagline: 'For a single pharmacy getting started',
    price: 'Free',
    priceNote: 'Forever free',
    cta: 'Start Free — No Card Required',
    ctaHref: 'mailto:curemitrapharma@gmail.com',
    highlight: false,
    features: [
      'OCR billing — up to 50 bills/day',
      'Basic inventory management',
      'GST invoice generation',
      'Android & web app access',
      'WhatsApp/SMS dispatch',
      'Email support',
    ],
    missing: [
      'AI predictive inventory',
      'Multi-branch management',
      'GST filing sync (Cleartax / Mastersindia)',
      'Priority support',
      'Dedicated onboarding',
    ],
  },
  {
    name: 'Professional',
    tagline: 'For growing pharmacies that need full AI power',
    price: '₹199',
    priceNote: 'per month, billed monthly',
    cta: 'Start 30-Day Free Trial',
    ctaHref: 'mailto:curemitrapharma@gmail.com',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Unlimited OCR billing',
      'AI-driven predictive inventory',
      'Distributor auto-ordering',
      'Multi-GSP GST sync (Cleartax, Mastersindia, Vayana)',
      'Doctor chamber & scheduling',
      'EHR vitals & patient CRM',
      'GPS delivery tracking',
      'Bluetooth printer SDK',
      'Razorpay payment integration',
      'Priority email & chat support',
      'Setup support included',
    ],
    missing: [
      'Multi-branch management',
      'Custom SLA',
      'Dedicated account manager',
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'For clinic chains and hospital networks',
    price: 'Custom',
    priceNote: 'Talk to our sales team',
    cta: 'Contact Sales',
    ctaHref: 'mailto:curemitrapharma@gmail.com',
    highlight: false,
    features: [
      'Everything in Professional',
      'Multi-branch & multi-location management',
      'Centralized inventory across branches',
      'Role-based access for all staff types',
      'Custom GST & compliance reporting',
      'Dedicated onboarding specialist',
      'Custom SLA & uptime guarantee',
      'Dedicated account manager',
      'On-site training available',
      'HIPAA-compliant data processing agreement',
    ],
    missing: [],
  },
];

const faqs = [
  {
    question: 'Is the Starter plan really free forever?',
    answer:
      'Yes. The Starter plan has no time limit and no credit card required. It covers basic OCR billing and inventory for a single pharmacy location. You can upgrade anytime.',
  },
  {
    question: 'What happens after the 30-day free trial on Professional?',
    answer:
      "After 30 days, your account moves to a paid Professional subscription (₹199/month). We'll remind you 7 days before the trial ends. You can cancel any time before that at no charge.",
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes — you can upgrade or downgrade at any time from your account dashboard. Upgrades take effect immediately. Downgrades take effect at the end of your current billing cycle.',
  },
  {
    question: 'Is there a setup fee?',
    answer:
      'No setup fees on any plan. Professional includes setup support as part of the subscription. Enterprise includes a dedicated onboarding specialist at no additional cost.',
  },
  {
    question: 'How does billing work for Enterprise?',
    answer:
      'Enterprise pricing is customised based on number of branches, transaction volume, and support requirements. Contact us at curemitrapharma@gmail.com and we\'ll send a proposal within 24 hours.',
  },
];

function FaqItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`pricing-faq-item${open ? ' pricing-faq-item--open' : ''}`}>
      <button className="pricing-faq-question" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{question}</span>
        <span className={`pricing-faq-arrow${open ? ' pricing-faq-arrow--open' : ''}`}>›</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="pricing-faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingClient() {
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
      <section className="sub-hero pricing-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow-badge" style={{ margin: '0 auto 24px' }}>
              <Zap size={16} />
              <span>Simple, Transparent Pricing</span>
            </div>
            <h1 className="sub-title" style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
              Start Free.
              <span className="gradient-text"> Scale as You Grow.</span>
            </h1>
            <p className="section-sub" style={{ margin: '20px auto 0' }}>
              No lock-in contracts. No setup fees. Cancel anytime. Every plan includes
              a 30-day free trial of Professional features.
            </p>
            <div className="pricing-trust-row">
              {[
                'No credit card required',
                'Setup support included',
                'Cancel anytime',
                'HIPAA compliant',
              ].map((badge) => (
                <span key={badge} className="pricing-trust-badge">
                  <ShieldCheck size={14} />
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="pricing-plans-section">
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`pricing-card${plan.highlight ? ' pricing-card--highlight' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                {plan.badge && (
                  <div className="pricing-badge">
                    <Star size={12} fill="#f59e0b" stroke="#f59e0b" />
                    {plan.badge}
                  </div>
                )}
                <div className="pricing-card-name">{plan.name}</div>
                <div className="pricing-card-tagline">{plan.tagline}</div>
                <div className="pricing-card-price">
                  <span className="pricing-price-value">{plan.price}</span>
                  {plan.price !== 'Custom' && plan.price !== 'Free' && (
                    <span className="pricing-price-period">/mo</span>
                  )}
                </div>
                <div className="pricing-price-note">{plan.priceNote}</div>
                <a
                  href={plan.ctaHref}
                  className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'} pricing-cta-btn`}
                >
                  {plan.cta}
                  <ArrowRight size={16} />
                </a>
                {plan.highlight && (
                  <p className="pricing-cta-micro">No credit card required · Cancel anytime</p>
                )}
                <div className="pricing-divider" />
                <ul className="pricing-features-list">
                  {plan.features.map((f) => (
                    <li key={f} className="pricing-feature-item pricing-feature-item--yes">
                      <Check size={16} className="pricing-check" />
                      {f}
                    </li>
                  ))}
                  {plan.missing.map((f) => (
                    <li key={f} className="pricing-feature-item pricing-feature-item--no">
                      <span className="pricing-dash">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sub-section">
        <div className="container" style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Pricing <span className="gradient-text">FAQ</span></h2>
          </motion.div>
          <div className="pricing-faq-list">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <FaqItem question={faq.question} answer={faq.answer} defaultOpen={i < 2} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="sub-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <motion.div
            className="mini-cta"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2>Still Have Questions?</h2>
            <p className="section-sub" style={{ margin: '12px auto 0' }}>
              Talk to our team or book a 20-minute demo — we respond within 24 hours.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 28 }}>
              <a href="mailto:curemitrapharma@gmail.com?subject=Book%20a%20Demo" className="btn btn-primary glow">
                Book a Demo
                <ArrowRight size={18} />
              </a>
              <a href="mailto:curemitrapharma@gmail.com" className="btn btn-secondary">
                Email Us
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
              <a href="https://linkedin.com/company/curemitra" target="_blank" rel="noopener noreferrer" aria-label="CureMitra on LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://youtube.com/@curemitra" target="_blank" rel="noopener noreferrer" aria-label="CureMitra on YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9"/></svg>
              </a>
              <a href="https://twitter.com/curemitra" target="_blank" rel="noopener noreferrer" aria-label="CureMitra on Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16H20L8.267 4z"/><path d="M4 20l6.768-6.768M20 4l-6.768 6.768"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h5>Solutions</h5>
            <ul>
              <li><Link href="/features"><ChevronRight size={14} />Billing OCR</Link></li>
              <li><Link href="/features"><ChevronRight size={14} />Inventory AI</Link></li>
              <li><Link href="/features"><ChevronRight size={14} />Clinic Management</Link></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/about"><ChevronRight size={14} />About Us</Link></li>
              <li><Link href="/pricing"><ChevronRight size={14} />Pricing</Link></li>
              <li><Link href="/privacy-policy"><ChevronRight size={14} />Privacy Policy</Link></li>
              <li><Link href="/security"><ChevronRight size={14} />Security</Link></li>
            </ul>
          </div>
          <div>
            <h5>Support</h5>
            <ul>
              <li><Link href="/customer-support"><ChevronRight size={14} />Customer Support</Link></li>
              <li><Link href="/customer-support"><ChevronRight size={14} />Documentation</Link></li>
              <li><Link href="/customer-support"><ChevronRight size={14} />Status</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
