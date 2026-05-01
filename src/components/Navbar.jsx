import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Download, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/images/LyricDisplay logo-white.png';

const MotionNav = motion.nav;
const MotionDiv = motion.div;

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [bannerVisible, setBannerVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { href: '/#integration', label: 'Integration' },
        { href: '/#outputs',     label: 'Outputs' },
        { href: '/#advantages',  label: 'Advantages' },
        { href: '/#features',    label: 'Features' },
        { href: '/#use-cases',   label: 'Use Cases' },
    ];

    const bannerH = bannerVisible ? 44 : 0;
    const navH    = 72;

    return (
        <MotionNav
            className={`site-navbar ${bannerVisible ? 'site-navbar--banner' : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50 }}
        >
            {/* Banner */}
            <AnimatePresence>
                {bannerVisible && (
                    <MotionDiv
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 44, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-primary-gradient"
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 3rem' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase', textAlign: 'center' }}>
                                How's your experience?{' '}
                                <Link to="/feedback" style={{ fontWeight: 700, textDecoration: 'underline', color: 'var(--primary-pale)' }}>
                                    Share feedback →
                                </Link>
                            </p>
                            <button onClick={() => setBannerVisible(false)}
                                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={16} />
                            </button>
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>

            {/* Main bar */}
            <div className="site-navbar-main" style={{
                height: navH,
                background: scrolled ? 'rgba(9,9,15,0.93)' : 'transparent',
                borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                transition: 'background 0.4s, border-color 0.4s',
            }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logoWhite} alt="LyricDisplay" style={{ height: 30 }} />
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-7">
                        {navLinks.map(l => (
                            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
                        ))}
                    </div>

                    {/* Desktop actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a href="https://github.com/PeterAlaks/lyric-display-app" target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                            <Github size={18} />
                        </a>
                        <a href="https://buymeacoffee.com/lyricdisplay" target="_blank" rel="noopener noreferrer" className="btn-donate" style={{ padding: '10px 16px', fontSize: '0.78rem' }}>
                            <Heart size={13} />
                            Donate
                        </a>
                        <a href="/download" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.82rem' }}>
                            <Download size={15} />
                            Download
                        </a>
                    </div>

                    {/* Mobile burger */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden"
                        style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <MotionDiv
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeInOut' }}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                                position: 'fixed', top: `calc(${bannerH + navH}px + env(safe-area-inset-top, 0px))`, left: 0, right: 0,
                                height: `calc(100dvh - ${bannerH + navH}px - env(safe-area-inset-top, 0px))`,
                                background: 'transparent', zIndex: 48
                            }}
                        />
                        {/* Drawer */}
                        <MotionDiv
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ duration: 0.28, ease: 'easeInOut' }}
                            style={{
                                position: 'fixed', top: `calc(${bannerH + navH}px + env(safe-area-inset-top, 0px))`, right: 0,
                                width: 270, height: `calc(100dvh - ${bannerH + navH}px - env(safe-area-inset-top, 0px))`,
                                background: 'var(--surface)', borderLeft: '1px solid var(--border)',
                                padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem',
                                overflowY: 'auto', zIndex: 49
                            }}
                        >
                            {navLinks.map(l => (
                                <a key={l.label} href={l.href} className="nav-link" onClick={() => setMobileMenuOpen(false)}
                                    style={{ fontSize: '0.82rem' }}>{l.label}</a>
                            ))}
                            <hr className="dark-rule" />
                            <a href="https://github.com/PeterAlaks/lyric-display-app" target="_blank" rel="noopener noreferrer"
                                className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Github size={15} /> GitHub
                            </a>
                            <a href="https://buymeacoffee.com/lyricdisplay" target="_blank" rel="noopener noreferrer"
                                className="btn-donate" style={{ padding: '10px 16px', fontSize: '0.78rem', justifyContent: 'center' }}>
                                <Heart size={13} /> Donate
                            </a>
                            <a href="/download" className="btn-primary" style={{ justifyContent: 'center' }}>
                                <Download size={15} /> Download
                            </a>
                        </MotionDiv>
                    </>
                )}
            </AnimatePresence>
        </MotionNav>
    );
}
