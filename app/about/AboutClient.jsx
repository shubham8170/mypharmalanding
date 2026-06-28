'use client';

import Link from 'next/link';
import logoImg from '../assets/logo.png';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Heart,
  Users,
  Target,
  Globe,
  Menu,
  X,
  ChevronRight,
  Mail,
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const values = [
  {
    icon: Heart,
    title: 'Patient First',
    text: 'Every feature we build starts with one question: does this give pharmacy staff more time to focus on the patient in front of them?',
  },
  {
    icon: ShieldCheck,
    title: 'Clinical-Grade Trust',
    text: 'Healthcare data is sacred. We implement HIPAA-compliant encryption, role-based access, and signed API requests as a baseline — not an add-on.',
  },
  {
    icon: Zap,
    title: 'Speed That Matters',
    text: 'A billing system that takes 90 seconds per transaction still wastes an hour on 40 patients. We obsess over milliseconds so your staff never waits.',
  },
  {
    icon: Globe,
    title: 'Built for India',
    text: 'GST compliance with Cleartax and Mastersindia, Indian medicine databases, Hindi-first support, and pricing that works for tier-2 and tier-3 cities.',
  },
];

const milestones = [
  { year: '2024', event: 'CureMitra founded — built first OCR billing prototype in 30 days' },
  { year: '2024', event: 'Launched AI-driven inventory with distributor auto-ordering' },
  { year: '2025', event: 'Reached 200+ pharmacy customers across 8 Indian states' },
  { year: '2025', event: 'Added multi-GSP GST sync (Cleartax, Mastersindia, Vayana)' },
  { year: '2026', event: 'Crossed 500+ healthcare facilities on the platform' },
];

export default function AboutClient() {
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
      <section className="sub-hero">
        <div className="container">
          <motion.div
            className="about-hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow-badge" style={{ margin: '0 auto 24px' }}>
              <Users size={16} />
              <span>Our Story</span>
            </div>
            <h1 className="about-title">
              We're Building the
              <span className="gradient-text"> Operating System</span>
              {' '}for India's Pharmacies
            </h1>
            <p className="about-subtitle">
              India has over 800,000 pharmacies. Most still run on manual billing, Excel sheets, and
              phone calls to distributors. CureMitra exists to change that — one pharmacy at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="about-section">
        <div className="container about-mission-grid">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2>
              The Problem
              <span className="gradient-text"> We're Solving</span>
            </h2>
            <p className="about-body">
              A pharmacy owner in Patna processes 150 bills a day. Each one requires reading a
              handwritten prescription, looking up the medicine, entering quantities manually, and
              calculating GST — all while a queue of patients waits. One typo means a wrong
              medicine. One missed HSN code means a GST notice.
            </p>
            <p className="about-body">
              CureMitra's OCR engine reads the prescription in under 3 seconds. The AI pre-fills
              the bill, flags substitutions, and syncs GST automatically. The pharmacist reviews
              and approves. What took 90 seconds now takes 8.
            </p>
            <p className="about-body">
              That time difference is a patient who gets their medicine faster. A pharmacist who
              ends the day without eye strain. A business that handles 40% more volume without
              adding staff.
            </p>
          </motion.div>
          <motion.div
            className="about-mission-stats"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {[
              { value: '800K+', label: 'Pharmacies in India' },
              { value: '60%', label: 'Avg. billing time saved' },
              { value: '99.9%', label: 'OCR accuracy' },
              { value: '500+', label: 'Facilities on platform' },
            ].map((stat) => (
              <div key={stat.label} className="about-stat-card">
                <div className="about-stat-value">{stat.value}</div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-section about-section--alt">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>
              What We
              <span className="gradient-text"> Stand For</span>
            </h2>
          </motion.div>
          <div className="sub-grid-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="sub-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                  <v.icon size={24} strokeWidth={1.5} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="about-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>
              Our
              <span className="gradient-text"> Journey</span>
            </h2>
          </motion.div>
          <div className="about-timeline">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="about-timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="about-timeline-year">{m.year}</div>
                <div className="about-timeline-dot" />
                <div className="about-timeline-event">{m.event}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="about-section">
        <div className="container">
          <motion.div
            className="mini-cta"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow-badge" style={{ margin: '0 auto 16px' }}>
              <Target size={16} />
              <span>Get in Touch</span>
            </div>
            <h2>Let's Build the Future of Pharmacy Together</h2>
            <p className="section-sub" style={{ margin: '16px auto 0' }}>
              Questions about CureMitra? Partnership inquiries? We respond to every email.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 28 }}>
              <a href="mailto:curemitrapharma@gmail.com" className="btn btn-primary glow">
                <Mail size={18} />
                curemitrapharma@gmail.com
              </a>
              <Link href="/pricing" className="btn btn-secondary">
                View Pricing
                <ArrowRight size={18} />
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
