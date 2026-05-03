import React from 'react';
import {
    Download, Github, ExternalLink, Monitor, Zap, Palette, FilePen,
    Globe2, Smartphone, Check, Tv, Play, Gauge, BookOpen,
    Church, Video, Mic2, Music, ArrowRight, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import BackToTopButton from '../components/BackToTopButton';
import Footer from '../components/Footer';
import ReviewSlider from '../components/ReviewSlider';
import SEO from '../components/SEO';
import { useNavbarHeight } from '../hooks/useNavbarHeight';
import heroLeft from '../assets/images/hero-img-left.jpg';
import heroRight from '../assets/images/hero-img-right.jpg';
import streamDisplay from '../assets/images/stream-display.jpg';
import auditoriumDisplay from '../assets/images/auditorium-display.jpg';
import stageDisplay from '../assets/images/stage-display.jpg';
import laptopCutout from '../assets/images/laptop-app-display-cutout.jpg';
import phoneHandMockup from '../assets/images/phone-hand-display-mockup.png';
import reviewsData from '../data/reviews.json';

const fadeUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.65, ease: 'easeOut' },
};

const stagger = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true, margin: '-80px' },
};

const integrations = ['OBS Studio', 'vMix', 'Wirecast', 'Streamlabs', 'XSplit', 'ProPresenter'];

export default function LyricDisplayLanding() {
    const navbarHeight = useNavbarHeight();

    React.useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) {
                    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
                }
            }, 100);
        }
        return () => { document.documentElement.style.scrollBehavior = 'auto'; };
    }, []);

    const approvedReviews = reviewsData.reviews.filter(r => r.approved);

    return (
        <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
            <SEO />
            <Navbar isHomePage />

            {/* ── HERO ──────────────────────────────────────────── */}
            <section
                className="relative overflow-hidden"
                style={{
                    paddingTop: navbarHeight + 64,
                    paddingBottom: 0,
                    background: 'var(--ink)',
                }}
            >
                {/* Ambient spotlight */}
                <div style={{
                    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                    width: '80%', height: 480,
                    background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(168,85,247,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                {/* Top accent line */}
                <div style={{ position: 'absolute', top: navbarHeight, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)' }} />

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto relative z-10" style={{ paddingBottom: 0 }}>
                        {/* Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ marginBottom: '1.5rem' }}
                        >
                            <span className="pill pill-primary">Free & Open Source · GPL-2.0</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.1 }}
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                                fontWeight: 600,
                                lineHeight: 1.05,
                                letterSpacing: '-0.025em',
                                color: 'var(--text-primary)',
                                marginBottom: '1.5rem',
                            }}
                        >
                            Lyrics that move{' '}
                            <em style={{ fontStyle: 'italic', color: 'var(--primary-bright)' }}>with</em>
                            <br />your production.
                        </motion.h1>

                        {/* Sub */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                            style={{
                                color: 'var(--text-secondary)',
                                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                                lineHeight: 1.75,
                                maxWidth: 560,
                                margin: '0 auto 2.5rem',
                            }}
                        >
                            Crystal-clear, real-time lyric overlays across unlimited displays.
                            Seamlessly integrated with OBS, vMix, Wirecast, and any browser-source software.
                        </motion.p>

                        {/* CTA row */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}
                        >
                            <a href="/download" className="btn-primary">
                                <Download size={16} />
                                Download Free
                            </a>
                            <a href="https://github.com/PeterAlaks/lyric-display-app" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                                <Github size={16} />
                                View on GitHub
                            </a>
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
                        >
                            {['Cross-Platform', 'Auto-Updates', 'No Subscription'].map(badge => (
                                <span key={badge} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                                    <Check size={12} color="var(--teal)" />
                                    {badge}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Hero images */}
                    <div className="relative" style={{ marginTop: '3rem', height: 320, overflow: 'hidden' }}>
                        {/* Mobile hero image */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.5 }}
                            style={{
                                position: 'absolute', left: 0, right: 0, bottom: 0,
                                width: '100%', height: '100%',
                                borderRadius: '16px 16px 0 0',
                                overflow: 'hidden',
                                border: '1px solid var(--border)',
                                borderBottom: 'none',
                                boxShadow: '0 -20px 60px rgba(0,0,0,0.5)',
                            }}
                            className="md:hidden"
                        >
                            <img src={heroRight} alt="Live performance" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.3), transparent 60%)' }} />
                        </motion.div>

                        {/* Desktop left hero image */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.5 }}
                            style={{
                                position: 'absolute', left: 0, bottom: 0,
                                width: '48%', height: '100%',
                                borderRadius: '16px 16px 0 0',
                                overflow: 'hidden',
                                border: '1px solid var(--border)',
                                borderBottom: 'none',
                                boxShadow: '0 -20px 60px rgba(0,0,0,0.5)',
                            }}
                            className="hidden md:block"
                        >
                            <img src={heroLeft} alt="Live worship service" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.3), transparent 60%)' }} />
                        </motion.div>

                        {/* Desktop right hero image */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.65 }}
                            style={{
                                position: 'absolute', right: 0, bottom: 0,
                                width: '48%', height: '100%',
                                borderRadius: '16px 16px 0 0',
                                overflow: 'hidden',
                                border: '1px solid var(--border)',
                                borderBottom: 'none',
                                boxShadow: '0 -20px 60px rgba(0,0,0,0.5)',
                            }}
                            className="hidden md:block"
                        >
                            <img src={heroRight} alt="Live performance" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.3), transparent 60%)' }} />
                        </motion.div>

                        {/* Center separator */}
                        <div className="hidden md:block" style={{ position: 'absolute', left: '50%', top: '10%', bottom: 0, width: 2, background: 'linear-gradient(to bottom, transparent, var(--primary-bright), transparent)', opacity: 0.6, transform: 'translateX(-50%)' }} />
                    </div>
                </div>

                {/* Bottom fade into next section */}
                <div style={{ height: 80, background: 'linear-gradient(to bottom, transparent, var(--surface))' }} />
            </section>

            {/* ── INTEGRATION MARQUEE ───────────────────────────── */}
            <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 4, justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        Integrates with
                    </span>
                </div>
                <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)' }}>
                    <div className="marquee-track" style={{ gap: '3rem', padding: '8px 0' }}>
                        {[...integrations, ...integrations].map((name, i) => (
                            <span key={i} style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-secondary)', letterSpacing: '0.02em', whiteSpace: 'nowrap', flexShrink: 0 }}>
                                {name}
                                <span style={{ color: 'var(--primary-bright)', margin: '0 1.5rem', fontSize: '0.7rem' }}>✦</span>
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INTEGRATION SECTION ───────────────────────────── */}
            <section id="integration" style={{ background: 'var(--surface)', padding: '96px 0' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div {...fadeUp} style={{ marginBottom: '4rem' }}>
                        <span className="section-label">Integration</span>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.15 }}>
                            Plays well with your<br />existing setup.
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 480, lineHeight: 1.7 }}>
                            LyricDisplay plugs straight into industry-leading streaming and production software via browser source — no plugins, no capture cards.
                        </p>
                    </motion.div>

                    <motion.div variants={stagger} initial="initial" whileInView="whileInView"
                        className="grid md:grid-cols-3 gap-5" style={{ marginBottom: '2.5rem' }}>
                        {[
                            { name: 'OBS Studio', desc: 'The world\'s most popular streaming software. Add as a browser source with transparent backgrounds for perfect overlay integration.' },
                            { name: 'vMix', desc: 'Professional live production trusted by broadcasters. Use LyricDisplay\'s web browser input for multi-camera worship productions.' },
                            { name: 'Wirecast', desc: 'Industry-standard live streaming platform. Integrate through web display sources for broadcast-quality lyric overlays.' },
                        ].map((app, i) => (
                            <motion.div key={i} variants={fadeUp} className="card-dark" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)' }}>{app.name}</h3>
                                    <button type="button" className="pill pill-dim compatibility-badge" aria-label={`${app.name} is 100% compatible`}>
                                        100%
                                        <span className="compatibility-popover" role="tooltip">
                                            <strong>100% compatible</strong>
                                            <span>Tested with LyricDisplay browser-source output.</span>
                                        </span>
                                    </button>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>{app.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div {...fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="/integration-guide" className="btn-primary">
                            <BookOpen size={15} />
                            Integration Guide
                        </a>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                            + any browser-source compatible software
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── MULTI-OUTPUT ──────────────────────────────────── */}
            <section id="outputs" style={{ background: 'var(--ink)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span className="section-label">Outputs</span>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.15 }}>
                            Six independent outputs,<br />one control surface.
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
                            Run up to six completely independent display outputs simultaneously — all synchronized in perfect real-time from a single interface.
                        </p>
                    </motion.div>

                    <motion.div variants={stagger} initial="initial" whileInView="whileInView"
                        className="grid md:grid-cols-3 gap-5">
                        {[
                            { name: 'Output 1', label: 'Broadcast Overlay', img: streamDisplay, desc: 'Transparent browser source overlay for OBS, vMix, or Wirecast with custom branding.' },
                            { name: 'Output 2', label: 'In-House Projection', img: auditoriumDisplay, desc: 'Configured for auditorium display with independent font sizing and positioning.' },
                            { name: 'Stage Monitor', label: 'Performer Display', img: stageDisplay, desc: 'High-contrast, optimized readability for stage confidence monitoring.' },
                        ].map((output, i) => (
                            <motion.div key={i} variants={fadeUp} className="card-dark" style={{ overflow: 'hidden' }}>
                                <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                                    <img src={output.img} alt={output.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.7), transparent 50%)' }} />
                                    <div style={{ position: 'absolute', bottom: 12, left: 16 }}>
                                        <span className="pill pill-primary">{output.label}</span>
                                    </div>
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{output.name}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>{output.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── ADVANTAGES ────────────────────────────────────── */}
            <section id="advantages" style={{ background: 'var(--surface)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: text */}
                        <motion.div {...fadeUp}>
                            <span className="section-label">Advantages</span>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '2rem', lineHeight: 1.15 }}>
                                Built for the demands<br />of live production.
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {[
                                    { icon: <Gauge size={20} />, title: 'Incredibly Lightweight', desc: 'Minimal CPU and memory footprint keeps your production PC responsive — perfect for mid-range to lower-tier gear.' },
                                    { icon: <Tv size={20} />, title: 'Crystal-Clear Overlay', desc: 'No chroma keying or video capture needed. Browser source integration delivers pixel-perfect clarity with zero performance drain.' },
                                    { icon: <Play size={20} />, title: 'True Real-Time Control', desc: 'Socket.io-powered sync ensures every display updates the instant you click. Zero lag, zero delays, zero manual syncing.' },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                        <div className="icon-wrap">{item.icon}</div>
                                        <div>
                                            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>{item.title}</h3>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: laptop image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="hidden lg:block"
                        >
                            <div className="img-frame float">
                                <img src={laptopCutout} alt="LyricDisplay Control Panel" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ──────────────────────────────────────── */}
            <section id="features" style={{ background: 'var(--ink)', padding: '96px 0' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span className="section-label">Features</span>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.15 }}>
                            Everything for pro-grade<br />presentations.
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                            Packed with features designed specifically for live production environments, churches, and professional events.
                        </p>
                    </motion.div>

                    <motion.div variants={stagger} initial="initial" whileInView="whileInView"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            { icon: <Monitor size={20} />, title: 'Scalable Multi-Output', desc: 'Run Output 1, 2, Stage, and custom outputs 3–6 with independent styling and positioning for every screen context.' },
                            { icon: <Zap size={20} />, title: 'Real-Time Sync', desc: 'Instant updates across all displays powered by Socket.io. Zero lag, built for live production.' },
                            { icon: <Palette size={20} />, title: 'Advanced Styling', desc: '13 professional fonts, full typography controls, colors, shadows, borders, precise positioning and more.' },
                            { icon: <FilePen size={20} />, title: 'Rich In-App Editor', desc: 'Feature-packed editor for formatting and arranging lyric content for polished presentations.' },
                            { icon: <Smartphone size={20} />, title: 'Mobile Controllers', desc: 'Authorize devices with 6-digit codes. Remote operators can trigger lines and submit drafts for approval.' },
                            { icon: <Globe2 size={20} />, title: 'Online Lyrics Fetch', desc: 'Instantly load lyrics from the best free online libraries to enhance your workflow.' },
                        ].map((f, i) => (
                            <motion.div key={i} variants={fadeUp} className="card-dark" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="icon-wrap">{f.icon}</div>
                                <div>
                                    <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{f.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── NDI OUTPUTS SECTION ────────────────────────────– */}
            <section id="ndi" style={{ background: 'var(--surface)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span className="section-label">Advanced Distribution</span>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.15 }}>
                            NDI output support<br />for enterprise workflows.
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
                            Beyond browser sources, LyricDisplay now supports NDI (Network Device Interface) output, enabling seamless integration with professional broadcast equipment and workflow software without requiring additional capture solutions.
                        </p>
                    </motion.div>

                    <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        <div className="card-dark" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Browser Source Method</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>Direct integration with OBS, vMix, Wirecast, and compatible software. Perfect for standard streaming and overlay workflows.</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <CheckCircle size={14} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Zero-latency overlay</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <CheckCircle size={14} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Hardware acceleration</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <CheckCircle size={14} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Transparent background</span>
                                </div>
                            </div>
                        </div>

                        <div className="card-dark" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>NDI Output Method</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>Professional network-based distribution for enterprise productions. Ideal for distributed systems and multi-site deployments.</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <CheckCircle size={14} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Network distribution</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <CheckCircle size={14} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Multi-destination broadcast</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <CheckCircle size={14} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Compatible with SDI workflows</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── USE CASES ─────────────────────────────────────── */}
            <section id="use-cases" style={{ background: 'var(--surface)', padding: '96px 0' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div {...fadeUp} style={{ marginBottom: '4rem' }}>
                        <span className="section-label">Use Cases</span>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.15 }}>
                            Trusted by communities<br />worldwide.
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 480, lineHeight: 1.7 }}>
                            From intimate worship gatherings to large-scale productions, LyricDisplay adapts to your unique needs.
                        </p>
                    </motion.div>

                    <motion.div variants={stagger} initial="initial" whileInView="whileInView"
                        className="grid md:grid-cols-2 gap-5">
                        {[
                            {
                                icon: <Church size={22} />, title: 'Church Worship Services',
                                desc: 'Synchronized lyrics for in-house and online viewing with multi-language support and mobile team control.',
                                benefits: ['Multi-language support', 'Quick song switching', 'In-house & online sync', 'Mobile team control'],
                                img: 'https://images.pexels.com/photos/208315/pexels-photo-208315.jpeg?auto=compress&cs=tinysrgb&w=1200',
                            },
                            {
                                icon: <Video size={22} />, title: 'Live Streaming & Broadcasting',
                                desc: 'Professional-grade overlays for OBS, vMix, and Wirecast with custom branding and broadcast quality.',
                                benefits: ['Transparent overlays', 'Brand customization', 'Multi-camera support', 'Broadcast quality'],
                                img: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1200',
                            },
                            {
                                icon: <Mic2 size={22} />, title: 'Concerts & Live Events',
                                desc: 'Multi-screen coordination with custom styling, zero-lag performance, and venue-wide scalability.',
                                benefits: ['Multi-screen coordination', 'Custom branding', 'Zero-lag performance', 'Scalable solution'],
                                img: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200',
                            },
                            {
                                icon: <Music size={22} />, title: 'Karaoke & Entertainment',
                                desc: 'Full LRC support for timed lyrics with easy queue management and crystal-clear display.',
                                benefits: ['LRC file support', 'Timed synchronization', 'Song queue management', 'Crystal-clear display'],
                                img: 'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1200',
                            },
                        ].map((uc, i) => (
                            <motion.div key={i} variants={fadeUp} className="card-dark use-case-image-card" style={{ minHeight: 360, overflow: 'hidden' }}>
                                <img
                                    src={uc.img}
                                    alt={uc.title}
                                    loading="lazy"
                                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.55s ease' }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(9,9,15,0.08) 0%, rgba(9,9,15,0.54) 42%, rgba(9,9,15,0.92) 100%)' }} />
                                <div style={{ position: 'relative', zIndex: 2, minHeight: 360, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem' }}>
                                    <div className="icon-wrap" style={{ width: 48, height: 48, background: 'rgba(9,9,15,0.62)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.18)' }}>{uc.icon}</div>
                                    <div>
                                        <h3 style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', textShadow: '0 2px 16px rgba(0,0,0,0.55)' }}>{uc.title}</h3>
                                        <p style={{ color: 'rgba(237,233,246,0.82)', fontSize: '0.92rem', lineHeight: 1.65, maxWidth: 520, marginBottom: '1.25rem' }}>{uc.desc}</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {uc.benefits.map((b, j) => (
                                                <span key={j} className="pill pill-teal" style={{ background: 'rgba(9,9,15,0.5)', backdropFilter: 'blur(10px)' }}>{b}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── MOBILE CONTROL ────────────────────────────────── */}
            <section style={{ background: 'var(--ink)', padding: '96px 0', position: 'relative', overflow: 'hidden', minHeight: 580 }}>
                {/* Ambient glow */}
                <div style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(168,85,247,0.04), transparent 70%)', pointerEvents: 'none' }} />

                {/* Phone mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85 }}
                    className="hidden lg:block"
                    style={{ position: 'absolute', bottom: 0, left: 0, height: '90%', pointerEvents: 'none', transform: 'scale(0.85)' }}
                >
                    <img src={phoneHandMockup} alt="Mobile Controller" style={{ height: '100%', width: 'auto', objectFit: 'contain', objectPosition: 'bottom left' }} />
                </motion.div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="hidden lg:block" />
                        <motion.div {...fadeUp}>
                            <span className="section-label">Mobile Control</span>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
                                Control from anywhere<br />in the room.
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 420 }}>
                                Empower your team with secure mobile and tablet controllers. Authorize any device with a simple 6-digit code and enable distributed control.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    'Trigger lyric lines remotely from anywhere in your venue',
                                    'Toggle outputs on and off for seamless transitions',
                                    'Submit lyric drafts for desktop approval workflow',
                                    'Secure authentication with rotating join codes',
                                ].map((item, i) => (
                                    <div key={i} className="check-item">
                                        <Check size={15} className="ci-icon" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── REVIEWS ───────────────────────────────────────── */}
            {approvedReviews.length >= 3 && (
                <section id="reviews" style={{ background: 'var(--surface)', padding: '96px 0', overflow: 'hidden' }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span className="section-label">Reviews</span>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.15 }}>
                                Loved by production<br />teams worldwide.
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
                                See what users are saying about their experience with LyricDisplay.
                            </p>
                        </motion.div>

                        <ReviewSlider reviews={approvedReviews} />

                        <motion.div {...fadeUp} style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <a href="/feedback" className="btn-primary">
                                Share Your Experience
                                <ArrowRight size={15} />
                            </a>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ── CTA ───────────────────────────────────────────── */}
            <section id="download" style={{ background: 'var(--ink)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
                {/* Dramatic spotlight */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 500, background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(168,85,247,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.35), transparent)' }} />

                <motion.div {...fadeUp} style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                    <span className="section-label" style={{ display: 'block', marginBottom: '1.5rem' }}>Get Started</span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1.08, marginBottom: '1.5rem' }}>
                        Transform your<br />
                        <em style={{ fontStyle: 'italic', color: 'var(--primary-bright)' }}>presentations</em><br />
                        today.
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: 480, margin: '0 auto 2.5rem' }}>
                        Join thousands of worship leaders, event producers, and content creators who trust LyricDisplay. Free, open source, and built for live.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <a href="/download" className="btn-primary">
                            <Download size={16} />
                            Download Free
                        </a>
                        <a href="/documentation" className="btn-ghost">
                            <ExternalLink size={16} />
                            Documentation
                        </a>
                    </div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        Cross-Platform · Free & Open Source · GPL-2.0
                    </p>
                </motion.div>
            </section>

            <Footer />
            <BackToTopButton />
        </div>
    );
}
