'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import logoImg from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

/* ─────────── Particle Canvas ─────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;
    const particles = [];
    const PARTICLE_COUNT = 40;
    const CONNECTION_DIST = 120;

    function resize() {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    class Particle {
      constructor() {
        this.x = Math.random() * (w / window.devicePixelRatio);
        this.y = Math.random() * (h / window.devicePixelRatio);
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        const W = w / window.devicePixelRatio;
        const H = h / window.devicePixelRatio;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(14, 165, 233, 0.4)';
        ctx.fill();
      }
    }

    function init() {
      resize();
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
    }

    function animate() {
      const W = w / window.devicePixelRatio;
      const H = h / window.devicePixelRatio;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.1 * (1 - dist / CONNECTION_DIST)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

/* ─────────── 3D Card Component ─────────── */
function Card3D({ children, className = '', style = {} }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

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
    a: 'Use the integration wizard in settings and map your billing schema. Our interface supports standard formats and custom exports.',
  },
  {
    q: 'What browsers and devices are supported?',
    a: 'Current Chrome, Edge, Safari, and Firefox on modern desktop and mobile devices. We also provide native mobile app integrations.',
  },
  {
    q: 'Can your team help with onboarding and training?',
    a: 'Yes, onboarding specialists provide implementation and workflow training, showing your team how to optimize scanning operations.',
  },
];

const footerColumns = [
  {
    heading: 'Solutions',
    links: [
      { label: 'Billing OCR', href: '/features' },
      { label: 'Inventory AI', href: '/features' },
      { label: 'Clinic Management', href: '/features' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Customer Support', href: '/customer-support' },
      { label: 'Documentation', href: '/customer-support' },
      { label: 'Status', href: '/customer-support' },
    ],
  },
];

export default function SupportClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = supportCards.filter(card =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="subpage" role="main">
      {/* ── Particle Background ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <ParticleCanvas />
      </div>

      {/* ── Header ── */}
      <motion.header
        className="topbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="container topbar-inner">
          <Link href="/" className="brand-mark">
            <img src={logoImg.src} alt="CureMitra Logo" className="brand-logo" />
            <span>CureMitra</span>
          </Link>
          <nav className="top-links" aria-label="Main navigation">
            <Link href="/">Product</Link>
            <Link href="/features">Features</Link>
            <Link href="/security">Security</Link>
            <Link href="/customer-support">Support</Link>
          </nav>
          <a href="mailto:curemitrapharma@gmail.com" className="btn btn-primary btn-sm header-cta">Get Started</a>
          
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
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
              <Link href="/security" onClick={() => setMenuOpen(false)}>Security</Link>
              <Link href="/customer-support" onClick={() => setMenuOpen(false)}>Support</Link>
              <a href="mailto:curemitrapharma@gmail.com" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Started</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Sub-Hero ── */}
      <section className="sub-hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="container sub-hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
            style={{ perspective: 1000 }}
          >
            <Card3D className="sub-hero-visual support-visual">
              <div className="hero-card-glow" />
              <div style={{ padding: 40, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                <MessageSquare size={48} className="brand-icon" style={{ marginBottom: 16, color: 'var(--primary)' }} />
                <h3 style={{ margin: 0, color: 'var(--text)', fontSize: '24px', fontWeight: 700 }}>24/7 Diagnostics</h3>
                <p style={{ margin: '8px 0 0', color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
                  Our automated billing systems monitor processing integrity around the clock. Reach out anytime.
                </p>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </section>

      {/* ── Support Cards ── */}
      {filteredCards.length > 0 && (
        <section className="sub-section">
          <div className="container">
            <div className="sub-grid-3">
              {filteredCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  style={{ height: '100%' }}
                >
                  <Card3D className="sub-card" style={{ transform: 'translateZ(0)', height: '100%' }}>
                    <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                      <card.icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ Section ── */}
      {filteredFaqs.length > 0 && (
        <section className="sub-section faq">
          <div className="container">
            <motion.h2
              className="faq-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>
            
            <div className="faq-list">
              {filteredFaqs.map((faq, i) => (
                <motion.details
                  key={faq.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── No Results Found ── */}
      {filteredCards.length === 0 && filteredFaqs.length === 0 && (
        <section className="sub-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)', width: '100%' }}
            >
              <HelpCircle size={48} style={{ margin: '0 auto 16px', color: 'var(--primary)' }} />
              <h3 style={{ color: 'var(--text)', fontSize: '20px', marginBottom: '8px' }}>No matching articles found</h3>
              <p>Try searching for terms like "billing", "POS", "browser", or "sync".</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Support CTA ── */}
      <section className="sub-section cta-row">
        <div className="container">
          <motion.div
            className="support-cta"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <h3>Need expert medical billing assistance?</h3>
              <p>Our specialists can help your clinic optimize workflows quickly.</p>
            </div>
            <div className="hero-actions" style={{ margin: 0 }}>
              <a
                href="mailto:curemitrapharma@gmail.com"
                className="btn btn-white glow"
              >
                <Phone size={18} />
                Schedule a Call (Email)
              </a>
              <a
                href="mailto:curemitrapharma@gmail.com"
                className="btn btn-outline"
              >
                <MessageSquare size={18} />
                Email Support
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
            <p>
              Smart OCR and billing for the modern healthcare facility. Precision
              engineering for clinical excellence.
            </p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h5>{column.heading}</h5>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <ChevronRight size={14} />
                      {link.label}
                    </Link>
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
