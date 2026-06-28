'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import logoImg from './assets/logo.png';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ScanLine,
  PackageOpen,
  CalendarCheck,
  ShieldCheck,
  Zap,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Star,
  Pill,
  Activity,
  HeartPulse,
  Microscope,
  Stethoscope,
  Smartphone,
  Lock,
  Clock,
  Users,
  Menu,
  X,
  MessageSquare,
  ClipboardList,
  Quote,
  ChevronDown,
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
    const PARTICLE_COUNT = 80;
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
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
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
        ctx.fillStyle = 'rgba(14, 165, 233, 0.6)';
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
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.15 * (1 - dist / CONNECTION_DIST)})`;
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

/* ─────────── Feature Card ─────────── */
function FeatureCard({ icon: Icon, title, text, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
      style={{ height: '100%' }}
    >
      <Card3D className="feature-card" style={{ transform: 'translateZ(0)', height: '100%' }}>
        <div className="feature-icon-wrap">
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <h3>{title}</h3>
        <p>{text}</p>
      </Card3D>
    </motion.div>
  );
}

/* ─────────── Stats Counter — starts at real value for SSR ─────────── */
function AnimatedCounter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const [count, setCount] = useState(value); // SSR renders real value, not 0
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
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
    <div ref={ref} className="stat-item">
      <div className="stat-value">
        {count}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ─────────── FAQ Item ─────────── */
function FaqItem({ question, answer, delay }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className={`hp-faq-item${open ? ' hp-faq-item--open' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
    >
      <button
        className="hp-faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <ChevronDown size={20} className={`hp-faq-chevron${open ? ' hp-faq-chevron--open' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="hp-faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────── Data ─────────── */
const ANDROID_APP_DRIVE_URL =
  'https://drive.google.com/drive/folders/16O7LgzrYN4GziEUktbibBWYxwvXeYQab?usp=drive_link';

const features = [
  {
    icon: ScanLine,
    title: 'Clinical-Grade OCR Billing',
    text: 'Capture medicines, quantities, batch details, and HSN codes instantly from prescriptions or invoice images. Evaluates text snippets with 99.9% accuracy using local OCR parsing.',
  },
  {
    icon: PackageOpen,
    title: 'AI-Driven Predictive Inventory',
    text: 'Analyze store sales rates to auto-generate distributor purchase orders. Supports detailed branch stock levels and real-time transit transfers.',
  },
  {
    icon: CalendarCheck,
    title: 'Doctor Chamber & Scheduling',
    text: 'Manage patient consultation queues. Tracks physician specialties, active license keys, and appointment calendar slots synced directly to checkout billing logs.',
  },
  {
    icon: TrendingUp,
    title: 'Multi-GSP Tax Sync',
    text: 'Automate compliance with dynamic GST parsing. Interlinks directly with Government GST providers (Cleartax, Mastersindia, Vayana) to generate GSTR-1 files.',
  },
  {
    icon: MessageSquare,
    title: 'Multi-Channel Dispatch Hub',
    text: 'Generate purchase order links and alerts sent instantly to patients and suppliers via integrated WhatsApp, SMS, and Email notification channels.',
  },
  {
    icon: ClipboardList,
    title: 'EHR Vitals & Patient CRM',
    text: 'Maintains detailed patient medical history records. Graph and monitor weight logs, blood pressure trends, vaccination timelines, and prescription checkups.',
  },
  {
    icon: Smartphone,
    title: 'Mobile GPS & Print SDK',
    text: 'Run deliveries with latitude/longitude tracking, connect with wireless Bluetooth thermal printers for checkout slips, and collect payments via Razorpay.',
  },
];

const workflowPoints = [
  {
    icon: ShieldCheck,
    title: 'Automatic Compliance',
    text: 'Generate tax-ready invoices with policy-aligned validation and audit trails.',
  },
  {
    icon: Zap,
    title: 'Predictive Intelligence',
    text: 'Forecast stock shortages and optimize procurement before disruption occurs.',
  },
  {
    icon: TrendingUp,
    title: 'Real-time Synchronization',
    text: 'Billing, inventory, and appointments stay in sync across every channel.',
  },
];

const stats = [
  { value: 99, suffix: '.9%', label: 'OCR Accuracy' },
  { value: 60, suffix: '%', label: 'Less Time on Billing' },
  { value: 500, suffix: '+', label: 'Clinics Trust Us' },
  { value: 24, suffix: '/7', label: 'AI Monitoring' },
];

const trustBadges = [
  'Nair Medical Store, Kochi',
  'Wellness Pharma, Bengaluru',
  'Sunrise Clinic Network, Mumbai',
  'HealthFirst Pharmacies, Hyderabad',
  'MediCare Plus, Delhi',
];

const testimonials = [
  {
    quote:
      'CureMitra cut our billing time by more than half. The OCR scanner reads prescriptions in seconds — our staff went from dreading billing to completing it before the next patient arrives.',
    name: 'Dr. Ramesh Nair',
    role: 'Owner',
    company: 'Nair Medical Store, Kochi',
    stars: 5,
  },
  {
    quote:
      'We used to run out of stock on fast-moving medicines every few weeks. The AI inventory alerts have nearly eliminated that problem. Setup took less than a day.',
    name: 'Priya Venkatesh',
    role: 'Pharmacy Manager',
    company: 'Wellness Pharma, Bengaluru',
    stars: 5,
  },
  {
    quote:
      'The GST sync with Cleartax alone saves us two full days of manual reconciliation every month. The HIPAA compliance was the deciding factor for our hospital chain.',
    name: 'Arjun Mehta',
    role: 'IT Head',
    company: 'Sunrise Clinic Network, Mumbai',
    stars: 5,
  },
];

const faqItems = [
  {
    question: 'Is CureMitra free to use?',
    answer:
      'Yes — CureMitra offers a free Starter plan for individual pharmacies. Paid plans (Professional and Enterprise) unlock advanced AI features, priority support, and multi-branch management. See our Pricing page for full details.',
  },
  {
    question: 'Is CureMitra HIPAA compliant?',
    answer:
      'Yes. CureMitra is built with clinical-grade data protection: end-to-end encryption, role-based access control (RBAC) with ADMIN / PHARMACIST / MANAGER / SALESMAN roles, signed API requests, and hardened storage controls that meet HIPAA requirements.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Most pharmacies are fully operational within 24 hours. Our onboarding team assists with initial inventory import, POS configuration, and staff training. Enterprise customers receive a dedicated implementation specialist.',
  },
  {
    question: 'Does CureMitra integrate with my existing POS system?',
    answer:
      'CureMitra works as a standalone POS or alongside existing hardware. It supports Bluetooth thermal printers, Android and iOS devices, Windows desktops, and web browsers — no proprietary hardware required.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. There are no lock-in contracts. You can cancel or downgrade your plan at any time from your account dashboard. Your data remains exportable for 30 days after cancellation.',
  },
  {
    question: 'What support is available?',
    answer:
      'All plans include email support. Professional and Enterprise plans include priority response, live chat, and access to our onboarding specialists. You can also reach us directly at curemitrapharma@gmail.com.',
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
      { label: 'About Us', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
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

export default function HomeClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="page" role="main">
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

      {/* ── Hero ── */}
      <section className="hero">
        <ParticleCanvas />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        <motion.div className="container hero-grid" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="hero-copy">
            <motion.div
              className="eyebrow-badge"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Activity size={16} />
              <span>India's AI-Powered Pharmacy Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Pharmacies Using CureMitra Spend
              <span className="gradient-text"> 60% Less Time </span>
              on Billing
            </motion.h1>

            <motion.p
              className="subcopy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Clinical-grade OCR reads prescriptions in seconds. AI-driven inventory
              prevents stockouts before they happen. HIPAA-compliant from day one.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="hero-cta-group">
                <a
                  href="mailto:curemitrapharma@gmail.com"
                  className="btn btn-primary glow"
                >
                  Start My Free 30-Day Trial
                  <ArrowRight size={18} />
                </a>
                <p className="cta-microcopy">No credit card required · Setup support included · Cancel anytime</p>
              </div>
              <a
                href="mailto:curemitrapharma@gmail.com?subject=Book%20a%20Demo"
                className="btn btn-secondary"
              >
                <CalendarCheck size={18} />
                Book a Demo
              </a>
            </motion.div>

            <motion.div
              className="hero-proof"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="avatar-stack">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="avatar" style={{ backgroundPosition: `-${i * 40}px 0` }} />
                ))}
              </div>
              <div className="hero-proof-text">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                     <Star key={i} size={14} fill="#f59e0b" stroke="#f59e0b" />
                  ))}
                </div>
                <span>Trusted by 500+ healthcare facilities</span>
              </div>
            </motion.div>
          </div>

          {/* 3D Hero Visual */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.5, duration: 1, type: 'spring' }}
            style={{ perspective: 1200 }}
          >
            <Card3D className="hero-card-3d" style={{ width: '100%' }}>
              <div className="hero-card-glow" />
              <div className="hero-card-content">
                <div className="hero-card-header">
                  <div className="hero-card-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="hero-card-badge">
                    <HeartPulse size={14} />
                    Live
                  </div>
                </div>
                <div className="hero-card-body">
                  <div className="scan-animation">
                    <div className="scan-line" />
                    <div className="scan-doc">
                      <div className="scan-line-placeholder" />
                      <div className="scan-line-placeholder short" />
                      <div className="scan-line-placeholder" />
                      <div className="scan-line-placeholder short" />
                    </div>
                  </div>
                  <div className="ocr-result">
                    <div className="ocr-row">
                      <Microscope size={16} />
                      <span>Paracetamol 500mg</span>
                      <strong className="ocr-match">99.9% match</strong>
                    </div>
                    <div className="ocr-row">
                      <Pill size={16} />
                      <span>Amoxicillin 250mg</span>
                      <strong className="ocr-match">99.8% match</strong>
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>

            <motion.div
              className="floating-stat"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="floating-stat-icon">
                <ScanLine size={20} />
              </div>
              <div>
                <div className="floating-stat-value">99.9%</div>
                <div className="floating-stat-label">OCR Accuracy</div>
              </div>
            </motion.div>

            <motion.div
              className="floating-stat floating-stat-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <div className="floating-stat-icon green">
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="floating-stat-value">60% Less</div>
                <div className="floating-stat-label">Billing Time</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <AnimatedCounter value={s.value} suffix={s.suffix} label={s.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="social-proof">
        <div className="container">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Trusted by 500+ pharmacies, clinics, and hospital networks across India
          </motion.p>
          <div className="trust-grid">
            {trustBadges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <ShieldCheck size={16} />
                {badge}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2>
              What Healthcare Professionals
              <span className="gradient-text"> Say About Us</span>
            </h2>
            <p className="section-sub">
              Real results from pharmacies and clinics using CureMitra every day.
            </p>
          </motion.div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="testimonial-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <Quote size={28} className="testimonial-quote-icon" />
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-footer">
                  <div className="testimonial-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div className="testimonial-meta">
                    <div className="testimonial-stars">
                      {Array.from({ length: t.stars }).map((_, si) => (
                        <Star key={si} size={13} fill="#f59e0b" stroke="#f59e0b" />
                      ))}
                    </div>
                    <strong>{t.name}</strong>
                    <span>{t.role}, {t.company}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2>
              Optimized for
              <span className="gradient-text"> Clinical Efficiency</span>
            </h2>
            <p className="section-sub">
              Purpose-built modules that reduce friction across billing, stock, and
              operations.
            </p>
          </motion.div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} text={f.text} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow ── */}
      <section className="workflow">
        <div className="container workflow-grid">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <h2>
              Unified Workflow,
              <span className="gradient-text"> Zero Friction</span>
            </h2>
            <p className="section-sub">
              One source of truth for your entire clinical operations.
            </p>
            <div className="workflow-list">
              {workflowPoints.map((point, i) => (
                <motion.div
                  className="workflow-item"
                  key={point.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  <div className="workflow-icon">
                    <point.icon size={22} />
                  </div>
                  <div>
                    <h4>{point.title}</h4>
                    <p>{point.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="workflow-visual"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="workflow-visual-inner">
              <div className="workflow-ring ring-1" />
              <div className="workflow-ring ring-2" />
              <div className="workflow-ring ring-3" />
              <div className="workflow-center">
                <Stethoscope size={40} />
              </div>
              <div className="workflow-node node-1">
                <Lock size={18} />
                <span>Secure</span>
              </div>
              <div className="workflow-node node-2">
                <Clock size={18} />
                <span>Real-time</span>
              </div>
              <div className="workflow-node node-3">
                <Users size={18} />
                <span>Collaborative</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="hp-faq-section">
        <div className="container hp-faq-inner">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2>
              Common
              <span className="gradient-text"> Questions</span>
            </h2>
            <p className="section-sub">
              Everything you need to know before getting started.
            </p>
          </motion.div>
          <div className="hp-faq-list">
            {faqItems.map((item, i) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <div className="container">
          <motion.div
            className="cta-box"
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="cta-glow" />
            <div className="cta-stars">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="cta-star" style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }} />
              ))}
            </div>
            <h2>Ready to Elevate Your Practice?</h2>
            <p>
              Join 500+ healthcare facilities already saving hours every day with
              CureMitra's OCR billing and AI inventory platform.
            </p>
            <div className="hero-actions center">
              <div className="hero-cta-group">
                <a
                  href="mailto:curemitrapharma@gmail.com"
                  className="btn btn-white glow"
                >
                  Start My Free 30-Day Trial
                  <ArrowRight size={18} />
                </a>
                <p className="cta-microcopy cta-microcopy--light">No credit card required · Cancel anytime</p>
              </div>
              <a
                href="mailto:curemitrapharma@gmail.com?subject=Book%20a%20Demo"
                className="btn btn-outline"
              >
                <CalendarCheck size={18} />
                Book a Demo
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
