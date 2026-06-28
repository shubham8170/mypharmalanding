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

/* ─────────── Stats Counter ─────────── */
function AnimatedCounter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
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
            start = Math.floor(ease * value);
            setCount(start);
            if (progress < 1) requestAnimationFrame(animate);
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
  { value: 40, suffix: '%', label: 'Efficiency Boost' },
  { value: 500, suffix: '+', label: 'Clinics Trust Us' },
  { value: 24, suffix: '/7', label: 'AI Monitoring' },
];

const trustBadges = ['Core Partners', 'MediLab', 'Clinical+', 'Care Connect', 'Top Pharmasoft'];

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

export default function HomeClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="page">
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
          <nav className="top-links">
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
              <span>Next-Gen Healthcare OS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Streamline Your
              <span className="gradient-text"> Pharmacy </span>
              &amp; Clinic
            </motion.h1>

            <motion.p
              className="subcopy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Automate complex billing workflows with clinical-grade OCR. Reduce
              administrative overhead, synchronize AI-driven inventory, and focus
              more on patient care.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a
                href="mailto:curemitrapharma@gmail.com"
                className="btn btn-primary glow"
              >
                Get Started
                <ArrowRight size={18} />
              </a>
              <a
                className="btn btn-secondary"
                href={ANDROID_APP_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Smartphone size={18} />
                Android App
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
                <div className="floating-stat-value">+40%</div>
                <div className="floating-stat-label">Efficiency</div>
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
            Trusted by pharmacies, clinics, and healthcare teams
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
              Bring OCR-first billing, predictive inventory, and reliable patient
              workflows into one precision platform.
            </p>
            <div className="hero-actions center">
              <a
                href="mailto:curemitrapharma@gmail.com"
                className="btn btn-white glow"
              >
                Start Free Trial
                <ArrowRight size={18} />
              </a>
              <a
                href="mailto:curemitrapharma@gmail.com"
                className="btn btn-outline"
              >
                Talk to Sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
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
