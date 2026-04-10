import React, { useState, useEffect, useRef } from 'react';
import { Download, Github, ArrowLeft, CheckCircle, ArrowRight, BookOpen, ExternalLink, GitBranch, AlertTriangle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import BackToTopButton from '../components/BackToTopButton';
import Footer from '../components/Footer';
import { useNavbarHeight } from '../hooks/useNavbarHeight';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: 'easeOut' },
};

export default function DownloadPage() {
    const [macOSDropdownOpen, setMacOSDropdownOpen] = useState(false);
    const [releaseData, setReleaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFallback, setIsFallback] = useState(false);
    const navbarHeight = useNavbarHeight();
    const dropdownRef = useRef(null);
    const RELEASES_PAGE = 'https://github.com/PeterAlaks/lyric-display-app/releases/latest';

    useEffect(() => {
        const CACHE_KEY = 'lyricDisplayReleaseData';
        const CACHE_DURATION = 10 * 60 * 1000;
        const fetchLatestRelease = async () => {
            try {
                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    const { data, timestamp } = JSON.parse(cached);
                    if (Date.now() - timestamp < CACHE_DURATION) { setReleaseData(data); setLoading(false); return; }
                }
                const res = await fetch('https://api.github.com/repos/PeterAlaks/lyric-display-app/releases/latest');
                if (!res.ok) throw new Error('Failed');
                const api = await res.json();
                const version = api.tag_name.replace('v', '');
                const assets = api.assets;
                const w  = assets.find(a => a.name.includes('Windows') && a.name.endsWith('.exe'));
                const mA = assets.find(a => a.name.includes('macOS') && a.name.includes('arm64'));
                const mI = assets.find(a => a.name.includes('macOS') && a.name.includes('x64'));
                const l  = assets.find(a => a.name.includes('Linux') && a.name.endsWith('.AppImage'));
                if (!w || !mA || !mI || !l) throw new Error('Assets not found');
                const info = { version, downloads: { windows: w.browser_download_url, macosArm: mA.browser_download_url, macosIntel: mI.browser_download_url, linux: l.browser_download_url } };
                localStorage.setItem(CACHE_KEY, JSON.stringify({ data: info, timestamp: Date.now() }));
                setReleaseData(info);
            } catch { setIsFallback(true); }
            finally { setLoading(false); }
        };
        fetchLatestRelease();
    }, []);

    useEffect(() => {
        const handler = e => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setMacOSDropdownOpen(false); };
        if (macOSDropdownOpen) document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [macOSDropdownOpen]);

    const v = releaseData?.version;
    const dl = releaseData?.downloads;

    const Skeleton = () => (
        <div style={{ height: 48, background: 'var(--surface-up)', borderRadius: 8, animation: 'pulse 1.5s ease-in-out infinite' }} />
    );

    const PlatformCard = ({ title, subtitle, specs, downloadEl }) => (
        <motion.div variants={fadeUp} className="card-dark" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>{title}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                {specs.map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle size={14} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{s}</span>
                    </div>
                ))}
            </div>
            {downloadEl}
        </motion.div>
    );

    const DownloadBtn = ({ href, label }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
            <Download size={16} /> {label}
        </a>
    );

    return (
        <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
            <Navbar />

            {/* Header */}
            <section style={{ paddingTop: navbarHeight + 48, paddingBottom: 64, background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 300, background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.06), transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)' }} />
                <div className="max-w-5xl mx-auto px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '2rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                        <ArrowLeft size={14} /> Back to Home
                    </a>
                    <span className="section-label">Download</span>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '0.75rem' }}>
                        Get LyricDisplay.
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                        Latest stable release for your platform
                    </p>
                </div>
            </section>

            {/* Platform cards */}
            <section style={{ padding: '64px 0', background: 'var(--ink)' }}>
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-5" style={{ marginBottom: '2rem' }}>
                        <PlatformCard
                            title="Windows"
                            subtitle={loading ? 'Loading…' : isFallback ? 'Latest release (64-bit)' : `v${v} · 64-bit`}
                            specs={['Windows 10 / 11', 'Auto-Updates', 'Free & Open Source']}
                            downloadEl={loading ? <Skeleton /> : isFallback
                                ? <DownloadBtn href={RELEASES_PAGE} label="Download Latest" />
                                : <DownloadBtn href={dl.windows} label={`Download v${v}`} />}
                        />

                        <PlatformCard
                            title="macOS"
                            subtitle={loading ? 'Loading…' : isFallback ? 'Latest release' : `v${v}`}
                            specs={['Apple Silicon & Intel', 'Auto-Updates', 'Free & Open Source']}
                            downloadEl={loading ? <Skeleton /> : isFallback
                                ? <DownloadBtn href={RELEASES_PAGE} label="Download Latest" />
                                : (
                                    <div ref={dropdownRef} style={{ position: 'relative' }}>
                                        <button onClick={() => setMacOSDropdownOpen(!macOSDropdownOpen)}
                                            className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                            <Download size={16} /> Download v{v}
                                            <ChevronDown size={15} style={{ marginLeft: 'auto', transition: 'transform 0.2s', transform: macOSDropdownOpen ? 'rotate(180deg)' : 'none' }} />
                                        </button>
                                        <AnimatePresence>
                                            {macOSDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.15, ease: 'easeOut' }}
                                                    style={{ position: 'absolute', bottom: '110%', left: 0, right: 0, background: 'var(--surface-up)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 10 }}
                                                >
                                                    {[
                                                        { href: dl.macosArm, label: 'Apple Silicon (M1/M2/M3+)', sub: 'For newer Macs with Apple chips' },
                                                        { href: dl.macosIntel, label: 'Intel Mac', sub: 'For older Macs with Intel processors' },
                                                    ].map(opt => (
                                                        <a key={opt.href} href={opt.href} target="_blank" rel="noopener noreferrer"
                                                            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '1rem 1.25rem', textDecoration: 'none', transition: 'background 0.15s', borderBottom: '1px solid var(--border)' }}
                                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,85,247,0.08)'}
                                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                            <Download size={16} style={{ color: 'var(--primary-bright)', flexShrink: 0 }} />
                                                            <div>
                                                                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{opt.label}</div>
                                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{opt.sub}</div>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                        />

                        <PlatformCard
                            title="Linux"
                            subtitle={loading ? 'Loading…' : isFallback ? 'Latest release (AppImage)' : `v${v} · AppImage`}
                            specs={['Universal AppImage', 'Auto-Updates', 'Free & Open Source']}
                            downloadEl={loading ? <Skeleton /> : isFallback
                                ? <DownloadBtn href={RELEASES_PAGE} label="Download Latest" />
                                : <DownloadBtn href={dl.linux} label={`Download v${v}`} />}
                        />
                    </div>

                    {/* Security notice */}
                    <div className="alert-box alert-warning" style={{ marginTop: '1.5rem' }}>
                        <AlertTriangle size={18} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 2 }} />
                        <div>
                            <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Security Warning Notice</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                                Installers are not yet code-signed. Security warnings on download are expected and safe to proceed through.
                            </p>
                            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                                <li><strong style={{ color: 'var(--text-primary)' }}>Windows:</strong> Click "More info" → "Run anyway" in SmartScreen.</li>
                                <li><strong style={{ color: 'var(--text-primary)' }}>macOS:</strong> Run <code style={{ background: 'var(--primary-dim)', color: 'var(--primary-bright)', padding: '1px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>xattr -cr /Applications/LyricDisplay.app</code> if blocked, or allow in System Settings → Privacy & Security.</li>
                                <li><strong style={{ color: 'var(--text-primary)' }}>Linux:</strong> <code style={{ background: 'var(--primary-dim)', color: 'var(--primary-bright)', padding: '1px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>chmod +x</code> before running.</li>
                                <li><strong style={{ color: 'var(--text-primary)' }}>Browsers:</strong> Click "Keep" or "Keep anyway" if warned about uncommon downloads.</li>
                            </ul>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.75rem' }}>
                                LyricDisplay is open source and safe. <a href="https://buymeacoffee.com/lyricdisplay" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-bright)' }}>Support development</a> to help purchase code signing certificates.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources */}
            <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '64px 0' }}>
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <span className="section-label">Resources</span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
                        Other resources
                    </h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { href: '/documentation', ext: false, icon: <BookOpen size={20} />, title: 'Documentation', desc: 'Read the complete documentation for setup, features, and advanced guides.' },
                            { href: 'https://github.com/PeterAlaks/lyric-display-app', ext: true, icon: <GitBranch size={20} />, title: 'Source Code', desc: 'Access the full source code on GitHub to contribute or audit.' },
                        ].map(r => (
                            <a key={r.title} href={r.href} target={r.ext ? '_blank' : undefined} rel={r.ext ? 'noopener noreferrer' : undefined}
                                className="card-dark" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                                <div className="icon-wrap">{r.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{r.title}</p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{r.desc}</p>
                                </div>
                                <ArrowRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Help CTA */}
            <section style={{ background: 'var(--ink)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 300, background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.05), transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.25), transparent)' }} />
                <motion.div {...fadeUp} style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                        Need help getting started?
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
                        Check out our video tutorial or reach out for technical support.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://drive.google.com/file/d/1fP4fSSWSNvSocI8fK7hktdJ7dY6xnCM-/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-primary">
                            <BookOpen size={15} /> Watch Tutorial
                        </a>
                        <a href="https://linktr.ee/peteralaks" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            <ExternalLink size={15} /> Contact Support
                        </a>
                    </div>
                </motion.div>
            </section>

            <Footer />
            <BackToTopButton />
        </div>
    );
}