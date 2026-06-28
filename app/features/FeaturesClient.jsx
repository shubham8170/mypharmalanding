'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import logoImg from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pill,
  ArrowRight,
  ScanLine,
  BarChart3,
  BrainCircuit,
  Activity,
  ChevronRight,
  Menu,
  X,
  PackageOpen,
  CalendarCheck,
  TrendingUp,
  MessageSquare,
  ClipboardList,
  Smartphone,
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

/* ─────────── Stats Counter — starts at real value for SSR ─────────── */
function AnimatedCounter({ value, suffix = '', prefix = '', label }) {
  const ref = useRef(null);
  const [count, setCount] = useState(value); // start at real value so SSR/initial render shows correct number
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * value));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(value);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <div ref={ref} className="kpi">
      <p className="kpi-value">
        {prefix}
        {count}
        {suffix}
      </p>
      <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '6px' }}>{label}</p>
    </div>
  );
}

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

export default function FeaturesClient() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="subpage" role="main">
      {/* ── Particle Background on Page Level ── */}
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
            style={{ perspective: 1000 }}
          >
            <Card3D className="sub-hero-visual feature-hero-visual">
              <div className="hero-card-glow" />
              <div style={{ padding: 40, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                <BrainCircuit size={48} className="brand-icon" style={{ marginBottom: 16, color: 'var(--primary)' }} />
                <h3 style={{ margin: 0, color: 'var(--text)', fontSize: '24px', fontWeight: 700 }}>Clinical Intelligence</h3>
                <p style={{ margin: '8px 0 0', color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
                  Real-time OCR matching at 99.9% accuracy with automated stock reconciliation.
                </p>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </section>

      {/* ── KPI Grid ── */}
      <section className="sub-section">
        <div className="container">
          <div className="feature-kpi-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <Card3D className="sub-card" style={{ transform: 'translateZ(0)' }}>
                <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                  <BrainCircuit size={28} strokeWidth={1.5} />
                </div>
                <h3>Core Pillars</h3>
                <p>Clinical-grade OCR engine with resilient real-time pipelines.</p>
              </Card3D>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card3D className="sub-card" style={{ transform: 'translateZ(0)' }}>
                <AnimatedCounter value={99} suffix=".9%" label="OCR Accuracy" />
              </Card3D>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card3D className="sub-card" style={{ transform: 'translateZ(0)' }}>
                <AnimatedCounter value={40} prefix="+" suffix="%" label="Billing Throughput" />
              </Card3D>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card3D className="sub-card" style={{ transform: 'translateZ(0)' }}>
                <AnimatedCounter value={1} prefix="<" suffix="s" label="Inventory Latency" />
              </Card3D>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Feature Pillars ── */}
      <section className="sub-section feature-pillars">
        <div className="container">
          <div className="feature-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              style={{ height: '100%' }}
            >
              <Card3D className="sub-card" style={{ transform: 'translateZ(0)', height: '100%' }}>
                <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                  <ScanLine size={28} strokeWidth={1.5} />
                </div>
                <h3>Clinical-Grade OCR Billing</h3>
                <p>
                  Capture medicines, quantities, batch details, and HSN codes instantly from prescriptions or invoice images. Evaluates text snippets with 99.9% accuracy using local OCR parsing.
                </p>
              </Card3D>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ height: '100%' }}
            >
              <Card3D className="sub-card" style={{ transform: 'translateZ(0)', height: '100%' }}>
                <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                  <PackageOpen size={28} strokeWidth={1.5} />
                </div>
                <h3>AI-Driven Predictive Inventory</h3>
                <p>
                  Analyze store sales rates to auto-generate distributor purchase orders. Supports detailed branch stock levels and real-time transit transfers.
                </p>
              </Card3D>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ height: '100%' }}
            >
              <Card3D className="sub-card" style={{ transform: 'translateZ(0)', height: '100%' }}>
                <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                  <CalendarCheck size={28} strokeWidth={1.5} />
                </div>
                <h3>Doctor Chamber &amp; Scheduling</h3>
                <p>
                  Manage patient consultation queues. Tracks physician specialties, active license keys, and appointment calendar slots synced directly to checkout billing logs.
                </p>
              </Card3D>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ height: '100%' }}
            >
              <Card3D className="sub-card" style={{ transform: 'translateZ(0)', height: '100%' }}>
                <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                  <TrendingUp size={28} strokeWidth={1.5} />
                </div>
                <h3>Multi-GSP Tax Sync</h3>
                <p>
                  Automate compliance with dynamic GST parsing. Interlinks directly with Government GST providers (Cleartax, Mastersindia, Vayana) to generate GSTR-1 files.
                </p>
              </Card3D>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ height: '100%' }}
            >
              <Card3D className="sub-card" style={{ transform: 'translateZ(0)', height: '100%' }}>
                <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                  <MessageSquare size={28} strokeWidth={1.5} />
                </div>
                <h3>Multi-Channel Dispatch Hub</h3>
                <p>
                  Generate purchase order links and alerts sent instantly to patients and suppliers via integrated WhatsApp, SMS, and Email notification channels.
                </p>
              </Card3D>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ height: '100%' }}
            >
              <Card3D className="sub-card" style={{ transform: 'translateZ(0)', height: '100%' }}>
                <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                  <ClipboardList size={28} strokeWidth={1.5} />
                </div>
                <h3>EHR Vitals &amp; Patient CRM</h3>
                <p>
                  Maintains detailed patient medical history records. Graph and monitor weight logs, blood pressure trends, vaccination timelines, and prescription checkups.
                </p>
              </Card3D>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{ height: '100%' }}
            >
              <Card3D className="sub-card" style={{ transform: 'translateZ(0)', height: '100%' }}>
                <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                  <Smartphone size={28} strokeWidth={1.5} />
                </div>
                <h3>Mobile GPS &amp; Print SDK</h3>
                <p>
                  Run deliveries with latitude/longitude tracking, connect with wireless Bluetooth thermal printers for checkout slips, and collect payments via Razorpay.
                </p>
              </Card3D>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mini CTA ── */}
      <section className="cta" style={{ paddingTop: '40px' }}>
        <div className="container">
          <motion.div
            className="mini-cta"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Ready to digitize your pharmacy?</h2>
            <div className="hero-actions center" style={{ marginTop: 24 }}>
              <a href="mailto:curemitrapharma@gmail.com" className="btn btn-white glow">
                Start Free Trial
                <ArrowRight size={18} />
              </a>
              <Link href="/customer-support" className="btn btn-outline">
                Contact Support
              </Link>
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
