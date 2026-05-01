import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Code, Book, Zap, Shield, Users, Settings, Monitor, Keyboard, Wifi, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import BackToTopButton from '../components/BackToTopButton';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useNavbarHeight } from '../hooks/useNavbarHeight';

const MotionDiv = motion.div;

const NAV_ITEMS = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'features', label: 'Key Features', icon: Zap },
    { id: 'system-requirements', label: 'System Requirements', icon: Monitor },
    { id: 'installation', label: 'Installation', icon: Settings },
    { id: 'quickstart', label: 'Quick Start', icon: Zap },
    { id: 'loading-lyrics', label: 'Loading Lyrics', icon: Book },
    { id: 'live-operation', label: 'Live Operation', icon: Monitor },
    { id: 'fileformat', label: 'File Format', icon: Code },
    { id: 'browsersources', label: 'Browser Source Setup', icon: Wifi },
    { id: 'network', label: 'Network Setup', icon: Wifi },
    { id: 'mobile-controllers', label: 'Mobile Controllers', icon: Users },
    { id: 'external-control', label: 'External Control', icon: Settings },
    { id: 'developer-api', label: 'Developer API', icon: Code },
    { id: 'keyboard-shortcuts', label: 'Keyboard Shortcuts', icon: Keyboard },
    { id: 'architecture', label: 'Architecture', icon: Code },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: Shield },
];

const CodeBlock = ({ children }) => (
    <pre style={{
        background: 'var(--ink)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '1rem 1.25rem',
        margin: '1rem 0',
        overflowX: 'auto',
        fontSize: '0.8125rem',
        lineHeight: 1.7,
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-mono)',
    }}><code>{children}</code></pre>
);

const InlineCode = ({ children }) => (
    <code style={{
        background: 'rgba(168,85,247,0.08)',
        border: '1px solid rgba(168,85,247,0.15)',
        borderRadius: '4px',
        padding: '0.1em 0.4em',
        fontSize: '0.85em',
        fontFamily: 'var(--font-mono)',
        color: 'var(--accent)',
    }}>{children}</code>
);

const Note = ({ children, type = 'info' }) => {
    const colors = {
        info: { bg: 'rgba(168,85,247,0.05)', border: 'rgba(168,85,247,0.3)', accent: 'var(--accent)' },
        warning: { bg: 'rgba(234,179,8,0.05)', border: 'rgba(234,179,8,0.3)', accent: '#eab308' },
        tip: { bg: 'rgba(34,197,94,0.05)', border: 'rgba(34,197,94,0.25)', accent: '#22c55e' },
    };
    const c = colors[type];
    return (
        <div style={{
            background: c.bg,
            borderLeft: `3px solid ${c.border}`,
            borderRadius: '0 var(--radius) var(--radius) 0',
            padding: '0.875rem 1.125rem',
            margin: '1rem 0',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
        }}>{children}</div>
    );
};

const SectionHeading = ({ id, children }) => (
    <h2 id={id} style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.5rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        letterSpacing: '-0.015em',
        marginTop: '2.5rem',
        marginBottom: '1rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--border)',
        scrollMarginTop: '100px',
    }}>{children}</h2>
);

const SubHeading = ({ children }) => (
    <h3 style={{
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginTop: '1.5rem',
        marginBottom: '0.625rem',
    }}>{children}</h3>
);

const Prose = ({ children }) => (
    <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.9375rem',
        lineHeight: 1.75,
        marginBottom: '0.75rem',
    }}>{children}</p>
);

const DocList = ({ items, ordered = false }) => {
    const Tag = ordered ? 'ol' : 'ul';
    return (
        <Tag style={{
            paddingLeft: '1.5rem',
            display: 'grid',
            gap: '0.375rem',
            color: 'var(--text-secondary)',
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            margin: '0.5rem 0',
        }}>
            {items.map((item, i) => <li key={i}>{item}</li>)}
        </Tag>
    );
};

export default function DocumentationPage() {
    const navbarHeight = useNavbarHeight();
    const [activeSection, setActiveSection] = useState('overview');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const contentRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -70% 0px' }
        );

        NAV_ITEMS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const scrollToSection = (id) => {
        setDropdownOpen(false);
        const el = document.getElementById(id);
        if (el) {
            const offset = el.getBoundingClientRect().top + window.scrollY - (navbarHeight + 80);
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    };

    return (
        <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
            <SEO
                title="Documentation - Complete Guide to LyricDisplay Features"
                description="Comprehensive documentation covering installation, setup, quick start, file formats, browser sources, network configuration, and troubleshooting guide."
                keywords="LyricDisplay documentation, setup guide, installation, configuration, troubleshooting"
            />
            <Navbar />

            {/* Page Header */}
            <section style={{
                paddingTop: navbarHeight + 48,
                paddingBottom: 40,
                background: 'var(--surface)',
                position: 'relative',
                overflow: 'hidden',
                borderBottom: '1px solid var(--border)',
            }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 240, background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.06), transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)' }} />
                <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '1.5rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                        <ArrowLeft size={14} /> Back to Home
                    </a>
                    <span className="section-label">Documentation</span>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '0.625rem', marginTop: '0.5rem' }}>
                        LyricDisplay Documentation
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', maxWidth: '560px' }}>
                        Complete guide to installation, configuration, and live operation.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                        Last updated: May 1, 2026
                    </p>
                </div>
            </section>

            {/* Mobile Sticky Section Nav — hidden on lg+ */}
            <div className="doc-mobile-nav" style={{
                position: 'sticky',
                top: navbarHeight,
                zIndex: 40,
                borderBottom: '1px solid var(--border)',
                background: 'var(--surface)',
                backdropFilter: 'blur(12px)',
                display: 'block',
            }}>
                <div ref={dropdownRef} style={{ position: 'relative', maxWidth: '100%' }}>
                    <button
                        onClick={() => setDropdownOpen(v => !v)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '0.75rem 1.25rem',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-primary)',
                            gap: '0.75rem',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
                            <ChevronRight size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                            <span style={{
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: 'var(--text-primary)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {NAV_ITEMS.find(n => n.id === activeSection)?.label ?? 'Overview'}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            flexShrink: 0,
                        }}>
                            <span style={{
                                fontSize: '0.6875rem',
                                fontFamily: 'var(--font-mono)',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                            }}>
                                {NAV_ITEMS.findIndex(n => n.id === activeSection) + 1} / {NAV_ITEMS.length}
                            </span>
                            <svg
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                style={{
                                    color: 'var(--text-muted)',
                                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease',
                                }}
                            >
                                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </button>

                    {/* Dropdown panel */}
                    {dropdownOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderTop: 'none',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                            zIndex: 50,
                            maxHeight: '60vh',
                            overflowY: 'auto',
                            padding: '0.5rem',
                        }}>
                            <p style={{
                                fontSize: '0.6875rem',
                                fontFamily: 'var(--font-mono)',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                                padding: '0.375rem 0.75rem 0.625rem',
                            }}>On this page</p>
                            {NAV_ITEMS.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '0.5rem 0.75rem',
                                        borderRadius: '6px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: activeSection === id ? 500 : 400,
                                        color: activeSection === id ? 'var(--accent)' : 'var(--text-secondary)',
                                        background: activeSection === id ? 'rgba(168,85,247,0.08)' : 'transparent',
                                        transition: 'all 0.15s',
                                        marginBottom: '0.125rem',
                                    }}
                                >
                                    {activeSection === id && (
                                        <ChevronRight size={12} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                    )}
                                    {label}
                                </button>
                            ))}
                            <div style={{ borderTop: '1px solid var(--border)', margin: '0.5rem 0', paddingTop: '0.5rem' }}>
                                <p style={{
                                    fontSize: '0.6875rem',
                                    fontFamily: 'var(--font-mono)',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: 'var(--text-muted)',
                                    padding: '0 0.75rem 0.5rem',
                                }}>Resources</p>
                                {[
                                    { href: 'https://github.com/PeterAlaks/lyric-display-app', label: 'GitHub Repository', icon: Github },
                                    { href: 'https://github.com/PeterAlaks/lyric-display-app/releases/latest', label: 'Latest Release', icon: ExternalLink },
                                    { href: 'https://github.com/PeterAlaks/lyric-display-app/issues', label: 'Report Issue', icon: ExternalLink },
                                ].map((item) => (
                                    <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        padding: '0.5rem 0.75rem', fontSize: '0.875rem',
                                        color: 'var(--text-secondary)', textDecoration: 'none',
                                        borderRadius: '6px', transition: 'all 0.15s',
                                        marginBottom: '0.125rem',
                                    }}
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        {React.createElement(item.icon, { size: 13, style: { flexShrink: 0 } })} {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Body: Sidebar + Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ display: 'flex', gap: '3rem', paddingTop: '2.5rem', paddingBottom: '4rem', alignItems: 'flex-start' }}>

                {/* Sidebar */}
                <aside style={{
                    width: 220,
                    flexShrink: 0,
                    position: 'sticky',
                    top: navbarHeight + 24,
                    maxHeight: `calc(100vh - ${navbarHeight + 48}px)`,
                    overflowY: 'auto',
                    display: 'none',
                }} className="lg:block doc-sidebar">
                    <nav>
                        <p style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', paddingLeft: '0.75rem' }}>On this page</p>
                        {NAV_ITEMS.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '0.375rem 0.75rem',
                                    borderRadius: '6px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.8125rem',
                                    fontWeight: activeSection === id ? 500 : 400,
                                    color: activeSection === id ? 'var(--accent)' : 'var(--text-secondary)',
                                    background: activeSection === id ? 'rgba(168,85,247,0.08)' : 'transparent',
                                    transition: 'all 0.15s',
                                    marginBottom: '0.125rem',
                                }}
                                onMouseEnter={e => { if (activeSection !== id) e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = activeSection !== id ? 'rgba(255,255,255,0.04)' : 'rgba(168,85,247,0.08)'; }}
                                onMouseLeave={e => { if (activeSection !== id) e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = activeSection === id ? 'rgba(168,85,247,0.08)' : 'transparent'; }}
                            >
                                {activeSection === id && <ChevronRight size={12} style={{ color: 'var(--accent)', flexShrink: 0 }} />}
                                {label}
                            </button>
                        ))}
                    </nav>

                    {/* Quick links */}
                    <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
                        <p style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', paddingLeft: '0.75rem' }}>Resources</p>
                        {[
                            { href: 'https://github.com/PeterAlaks/lyric-display-app', label: 'GitHub', icon: Github },
                            { href: 'https://github.com/PeterAlaks/lyric-display-app/releases/latest', label: 'Latest Release', icon: ExternalLink },
                            { href: 'https://github.com/PeterAlaks/lyric-display-app/issues', label: 'Report Issue', icon: ExternalLink },
                        ].map((item) => (
                            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.75rem', fontSize: '0.8125rem',
                                color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: '6px', transition: 'all 0.15s', marginBottom: '0.125rem',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'rgba(168,85,247,0.06)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}>
                                {React.createElement(item.icon, { size: 12 })} {item.label}
                            </a>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main ref={contentRef} style={{ flex: 1, minWidth: 0, maxWidth: '780px' }}>

                    {/* ── OVERVIEW ── */}
                    <MotionDiv initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <SectionHeading id="overview">Overview</SectionHeading>
                        <Prose>
                            LyricDisplay is a free, open-source Electron desktop application built for professional live production environments. It provides real-time, perfectly transparent lyric overlays for streaming software such as OBS Studio, vMix, and Wirecast — making it the go-to choice for church services, concerts, live streams, and multi-language presentations.
                        </Prose>
                        <Prose>
                            The app runs a local Express + Socket.IO server that drives browser-source outputs over WebSocket in real time. A single control panel manages all lyric content, styling, and output visibility — while secondary controllers on mobile or web browsers can assist from anywhere on the same network.
                        </Prose>
                        <Note type="info">
                            <strong>License:</strong> GPL-2.0 &nbsp;·&nbsp; <strong>Authors:</strong> Peter Alakembi (Lead Developer), David Okaliwe (Co-Developer)
                        </Note>
                    </MotionDiv>

                    {/* ── KEY FEATURES ── */}
                    <SectionHeading id="features">Key Features</SectionHeading>
                    <Prose>LyricDisplay ships with a comprehensive feature set designed for demanding live production workflows:</Prose>

                    <SubHeading>Display & Output</SubHeading>
                    <DocList items={[
                        'Two default output pages (Output 1 & 2) plus up to four user-creatable custom outputs (Output 3–6)',
                        'Dedicated Stage output for use on stage monitors',
                        'Each output has fully independent styling, positioning, and visibility controls',
                        'Pure transparent background support for overlay compositing',
                        'NDI® output support via optional companion module (lyricdisplay-ndi)',
                    ]} />

                    <SubHeading>Lyric Management</SubHeading>
                    <DocList items={[
                        'Load .txt and .lrc (timestamp-synced) lyric files',
                        'Drag-and-drop file loading directly into the control panel',
                        'New Song Canvas — create and edit lyrics in-app with translation line support',
                        'EasyWorship song import and conversion to .txt format',
                        'Online lyrics search from providers including LRCLIB and ChartLyrics',
                        'Setlists — queue up to 50 songs and switch between them during a live event',
                        'Auto-cleanup: removes stray periods, capitalises proper nouns (God, Jesus, etc.)',
                        'Autoplay — interval-based or LRC-timestamp-driven automatic line progression',
                    ]} />

                    <SubHeading>Styling & Presentation</SubHeading>
                    <DocList items={[
                        '10 featured fonts with full typography controls (size, weight, spacing)',
                        'Custom text and background colours with opacity control',
                        'Configurable line position (lower third, center, upper, or custom)',
                        'Background media support — upload images or short video loops per output',
                        'Framer Motion transitions between lyric lines',
                        'Full-screen mode for dedicated display windows',
                    ]} />

                    <SubHeading>Live Control & Workflow</SubHeading>
                    <DocList items={[
                        'Keyboard-first workflow with full shortcut coverage',
                        'Intelligent search bar with Shift+Up/Down match navigation',
                        'Secondary mobile/web controllers via 6-digit join code (JWT-secured)',
                        'Manual Sync Outputs button for immediate refresh',
                        'Dark mode with system theme sync',
                        'Auto-updates delivered via GitHub Releases (electron-updater)',
                        'Cross-platform: Windows 10/11, macOS (Intel + Apple Silicon), Linux (AppImage)',
                    ]} />

                    {/* ── SYSTEM REQUIREMENTS ── */}
                    <SectionHeading id="system-requirements">System Requirements</SectionHeading>

                    <SubHeading>Minimum</SubHeading>
                    <DocList items={[
                        'Windows 10/11 (64-bit), macOS 11+, or Linux (64-bit)',
                        '8 GB RAM',
                        'Dual-display capable GPU',
                        '500 MB free disk space',
                        'Node.js 18+ (for development builds only)',
                    ]} />

                    <SubHeading>Recommended</SubHeading>
                    <DocList items={[
                        '16 GB RAM',
                        'Dedicated GPU',
                        'Dual monitors — one for the LyricDisplay control panel, one for output preview',
                        'Ethernet connection when using network/multi-PC setup',
                    ]} />

                    {/* ── INSTALLATION ── */}
                    <SectionHeading id="installation">Installation</SectionHeading>

                    <SubHeading>Pre-built Releases (Recommended)</SubHeading>
                    <Prose>Download the installer for your platform from <a href="https://github.com/PeterAlaks/lyric-display-app/releases/latest" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>GitHub Releases</a>:</Prose>
                    <DocList items={[
                        <><strong>Windows:</strong> <InlineCode>LyricDisplay-6.3.11-Windows-Setup.exe</InlineCode></>,
                        <><strong>macOS Apple Silicon (M1/M2/M3):</strong> <InlineCode>LyricDisplay-6.3.11-macOS-arm64.dmg</InlineCode></>,
                        <><strong>macOS Intel:</strong> <InlineCode>LyricDisplay-6.3.11-macOS-x64.dmg</InlineCode></>,
                        <><strong>Linux:</strong> <InlineCode>LyricDisplay-6.3.11-Linux.AppImage</InlineCode></>,
                    ]} />

                    <SubHeading>Windows</SubHeading>
                    <DocList ordered items={[
                        'Right-click the installer → Run as Administrator',
                        "If Windows SmartScreen appears, click More info → Run anyway",
                        'Follow the setup wizard and accept defaults',
                        'Create a desktop shortcut when prompted (recommended)',
                        'Launch LyricDisplay from the shortcut or Start Menu',
                    ]} />

                    <SubHeading>macOS</SubHeading>
                    <Prose>Because LyricDisplay is not code-signed with an Apple Developer certificate, macOS Gatekeeper will show a "damaged" or "can't be verified" error. This is expected for unsigned apps downloaded from the internet.</Prose>
                    <DocList ordered items={[
                        'Download the appropriate .dmg for your Mac (Apple Silicon or Intel)',
                        'Open the .dmg and drag LyricDisplay to your Applications folder',
                        <>Before opening the app, run this in Terminal (<InlineCode>Applications → Utilities → Terminal</InlineCode>):</>,
                    ]} />
                    <CodeBlock>xattr -cr /Applications/LyricDisplay.app</CodeBlock>
                    <DocList ordered items={[
                        'Open LyricDisplay from Applications',
                        <><strong>If still blocked:</strong> System Preferences → Security &amp; Privacy → General → click "Open Anyway"</>,
                    ]} />
                    <Note type="tip">You only need to run the <InlineCode>xattr</InlineCode> command once. macOS remembers your choice after the first successful launch.</Note>

                    <SubHeading>Linux</SubHeading>
                    <CodeBlock>{`# Make the AppImage executable
chmod +x LyricDisplay-*.AppImage

# Run
./LyricDisplay-*.AppImage`}</CodeBlock>

                    <SubHeading>Development Setup</SubHeading>
                    <Prose>To run from source (requires Node.js 18+):</Prose>
                    <CodeBlock>{`# Clone the repository
git clone https://github.com/PeterAlaks/lyric-display-app.git
cd lyric-display-app

# Install frontend + Electron dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..

# Start in development mode (Vite + Electron + backend)
npm run electron-dev

# Build installers for distribution
npm run electron-pack`}</CodeBlock>
                    <Note type="info">
                        <strong>NDI support (optional):</strong> Clone the companion repo into the project root — <InlineCode>git clone https://github.com/PeterAlaks/lyricdisplay-ndi.git</InlineCode> then <InlineCode>cd lyricdisplay-ndi && npm install</InlineCode>. The app detects it automatically in dev mode. Without it, the NDI feature shows "Not Installed" and everything else works normally.
                    </Note>

                    {/* ── QUICK START ── */}
                    <SectionHeading id="quickstart">Quick Start Guide</SectionHeading>
                    <Prose>Get LyricDisplay running in your first session in under five minutes.</Prose>

                    <SubHeading>1. Load lyrics</SubHeading>
                    <Prose>Use any of the methods described in the <a href="#loading-lyrics" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Loading Lyrics</a> section below. The fastest route:</Prose>
                    <DocList items={[
                        <>Press <InlineCode>Ctrl/Cmd + O</InlineCode> and select a <InlineCode>.txt</InlineCode> or <InlineCode>.lrc</InlineCode> file</>,
                        'Lyric lines appear in the control panel list',
                    ]} />

                    <SubHeading>2. Configure outputs</SubHeading>
                    <DocList ordered items={[
                        'Open File Menu → Preview Outputs to open the output window(s)',
                        'In the Settings panel on the right, select the Output 1 tab',
                        'Set Position to Lower Third, choose a font (Montserrat or Open Sans recommended), and set Font Size to 48–60 px',
                        'Add output windows as browser sources in OBS/vMix (see Browser Source Setup)',
                    ]} />

                    <SubHeading>3. Go live</SubHeading>
                    <DocList items={[
                        'Click any lyric line to send it to all enabled outputs instantly',
                        <>Use <InlineCode>↑</InlineCode> / <InlineCode>↓</InlineCode> arrow keys (or Numpad) to navigate lines</>,
                        <>Press <InlineCode>Spacebar</InlineCode> to toggle output visibility on/off</>,
                        <>Use <InlineCode>Ctrl/Cmd + F</InlineCode> to jump to the search bar and filter lyrics</>,
                        'Click "Sync Outputs" if changes don\'t propagate immediately',
                    ]} />

                    {/* ── LOADING LYRICS ── */}
                    <SectionHeading id="loading-lyrics">Loading Lyrics</SectionHeading>

                    <SubHeading>Method 1 — Load a file</SubHeading>
                    <DocList items={[
                        <>Click the Load Lyrics File button, or go to <strong>File → Load Lyrics File</strong> (<InlineCode>Ctrl/Cmd + O</InlineCode>)</>,
                        <>Browse to and select a <InlineCode>.txt</InlineCode> or <InlineCode>.lrc</InlineCode> file, then click Open</>,
                    ]} />

                    <SubHeading>Method 2 — Drag & Drop</SubHeading>
                    <Prose>Drag any <InlineCode>.txt</InlineCode> or <InlineCode>.lrc</InlineCode> file from your file manager directly into the LyricDisplay control panel window.</Prose>

                    <SubHeading>Method 3 — New Song Canvas</SubHeading>
                    <DocList ordered items={[
                        <>Press <InlineCode>Ctrl/Cmd + N</InlineCode> or go to <strong>File → New Lyrics File</strong></>,
                        'Type or paste your lyrics into the canvas',
                        <>Press <InlineCode>Ctrl/Cmd + T</InlineCode> on a line to add a translation line beneath it</>,
                        <>Press <InlineCode>Ctrl/Cmd + D</InlineCode> to duplicate a line</>,
                        'Enter a title, then click Save to write a .txt file, or Save and Load to load it into the app immediately',
                    ]} />

                    <SubHeading>Method 4 — Online Lyrics Search</SubHeading>
                    <Prose>Click the search icon in the top bar to search lyrics online from providers including LRCLIB and ChartLyrics. Select a result to load it directly into the control panel.</Prose>

                    <SubHeading>Method 5 — EasyWorship Import</SubHeading>
                    <Prose>Use <strong>File → Import from EasyWorship</strong> to import songs from EasyWorship and convert them to <InlineCode>.txt</InlineCode> files for use in LyricDisplay.</Prose>

                    {/* ── LIVE OPERATION ── */}
                    <SectionHeading id="live-operation">Live Operation</SectionHeading>
                    <DocList items={[
                        'Click any line in the lyric list to display it on all enabled outputs instantly',
                        <>Use <InlineCode>↑</InlineCode> / <InlineCode>↓</InlineCode> arrow keys or Numpad arrows to move to the previous or next line</>,
                        <>Toggle the <strong>Display Output</strong> switch (or press <InlineCode>Spacebar</InlineCode>) to show or hide lyrics on all outputs simultaneously</>,
                        <>Use the search bar (<InlineCode>Ctrl/Cmd + F</InlineCode>) to filter the lyric list — press <InlineCode>Shift + ↑/↓</InlineCode> to navigate through matches</>,
                        'Click "Sync Outputs" to manually force a refresh if outputs fall out of sync',
                        'The status indicator (shield icon) in the top bar shows the Socket.IO connection state — it should be green when connected',
                    ]} />

                    <SubHeading>Autoplay</SubHeading>
                    <Prose>For LRC files with timestamps, autoplay will advance lines automatically in sync with the timestamps. For plain text files, interval-based autoplay advances the line at a configurable interval.</Prose>
                    <DocList items={[
                        <>Toggle autoplay with <InlineCode>Ctrl/Cmd + P</InlineCode></>,
                        'Configure autoplay interval in Settings',
                        'Autoplay can be started/stopped at any time while connected clients remain synced',
                    ]} />

                    <SubHeading>Setlists</SubHeading>
                    <Prose>Build a setlist to queue multiple songs for a service or event (maximum 50 items).</Prose>
                    <DocList items={[
                        'Add the current song to the setlist from the Setlist panel',
                        'Reorder items by dragging them',
                        'Click a setlist entry to immediately load that song',
                        <>Save the setlist as a <InlineCode>.ldset</InlineCode> file for future use</>,
                    ]} />

                    {/* ── FILE FORMAT ── */}
                    <SectionHeading id="fileformat">File Format</SectionHeading>
                    <Prose>LyricDisplay accepts two file types:</Prose>

                    <SubHeading>Plain Text (.txt)</SubHeading>
                    <Prose>Each line in the file becomes one lyric line in the control panel. Blank lines create visual separators.</Prose>
                    <CodeBlock>{`First verse line
(Translation in brackets)

Second line

Another line`}</CodeBlock>

                    <SubHeading>LRC (.lrc)</SubHeading>
                    <Prose>Standard LRC format with timestamps for autoplay sync:</Prose>
                    <CodeBlock>{`[00:12.34]First verse line
[00:15.00]Second verse line
[00:18.50]Bridge line`}</CodeBlock>

                    <SubHeading>Translation Lines</SubHeading>
                    <Prose>Wrap a line in any of the following bracket types to mark it as a translation. It will be visually grouped with the line above it in the control panel and displayed together:</Prose>
                    <DocList items={[
                        <><InlineCode>(parentheses)</InlineCode></>,
                        <><InlineCode>[square brackets]</InlineCode></>,
                        <><InlineCode>{'<angle brackets>'}</InlineCode></>,
                        <><InlineCode>{'{curly braces}'}</InlineCode></>,
                    ]} />
                    <Note type="info">
                        Auto-cleanup removes stray periods and special characters and capitalises recognised proper nouns such as "God" and "Jesus".
                    </Note>

                    {/* ── BROWSER SOURCE SETUP ── */}
                    <SectionHeading id="browsersources">Browser Source Setup</SectionHeading>
                    <Prose>LyricDisplay outputs are served as web pages on port 4000. Add them as browser sources in your production software to display transparent lyric overlays.</Prose>

                    <SubHeading>Available output URLs (same computer)</SubHeading>
                    <CodeBlock>{`http://localhost:4000/#/output1   ← Output 1 (default)
http://localhost:4000/#/output2   ← Output 2 (default)
http://localhost:4000/#/output3   ← Custom output
http://localhost:4000/#/output4
http://localhost:4000/#/output5
http://localhost:4000/#/output6
http://localhost:4000/#/stage     ← Stage monitor output`}</CodeBlock>

                    <SubHeading>OBS Studio</SubHeading>
                    <DocList ordered items={[
                        'In your OBS scene, click [+] in the Sources panel → Browser Source',
                        'Name it "Lyrics – Output 1" (or whichever output)',
                        <>Set URL to <InlineCode>http://localhost:4000/#/output1</InlineCode></>,
                        'Set Width and Height to match your canvas (e.g. 1920 × 1080)',
                        'Set FPS to 30',
                        <>Enable <strong>Shutdown source when not visible</strong> (improves performance)</>,
                        <>Enable <strong>Refresh browser when scene becomes active</strong></>,
                        'Click OK — the transparent lyric overlay is ready',
                    ]} />
                    <Note type="tip">
                        LyricDisplay manages positioning internally via its settings panel. There is no need to transform or reposition the browser source in OBS unless you have a specific compositing requirement.
                    </Note>

                    <SubHeading>vMix</SubHeading>
                    <DocList ordered items={[
                        'Add Input → Web Browser',
                        <>Enter the same URL format: <InlineCode>http://localhost:4000/#/output1</InlineCode></>,
                        'Set Width to 1920 and Height to 1080 (or your broadcast resolution)',
                        'Drag the input to an Overlay channel (1–4)',
                        'Transparent background works automatically',
                    ]} />

                    <SubHeading>Wirecast & Other Software</SubHeading>
                    <Prose>Any software that supports browser/web sources uses the same URL pattern. Add a web browser input and point it to the appropriate output URL.</Prose>

                    <SubHeading>OBS Settings Reference</SubHeading>
                    <Prose>Recommended styling defaults to start with (configurable in the Settings panel):</Prose>
                    <DocList items={[
                        'Position: Lower Third',
                        'Font: Montserrat or Open Sans',
                        'Font Size: 48–60 px',
                        'Font Color: #FFFFFF',
                        'Drop Shadow Opacity: 5–7',
                    ]} />

                    {/* ── NETWORK SETUP ── */}
                    <SectionHeading id="network">Network Setup (Multi-PC)</SectionHeading>
                    <Prose>Use this configuration when LyricDisplay runs on one computer and OBS (or vMix) runs on a separate machine — for example, a dedicated lyric PC feeding a streaming/broadcast PC.</Prose>
                    <Note type="warning">
                        Both computers must be on the same local network (LAN or Wi-Fi). An Ethernet connection on the LyricDisplay PC is strongly recommended for stability.
                    </Note>

                    <SubHeading>Step 1 — Find your router's gateway</SubHeading>
                    <Prose>Routers vary — some use 192.168.0.1, others 192.168.1.1 or 192.168.8.1. Find yours before setting a static IP.</Prose>
                    <CodeBlock>{`# On Windows — press Win + R, type cmd, then:
ipconfig
# Look for the "Default Gateway" line`}</CodeBlock>

                    <SubHeading>Step 2 — Set a static IP on the LyricDisplay PC</SubHeading>
                    <DocList ordered items={[
                        <>Press <InlineCode>Win + R</InlineCode>, type <InlineCode>ncpa.cpl</InlineCode>, press Enter</>,
                        'Right-click your active network adapter → Properties',
                        'Double-click "Internet Protocol Version 4 (TCP/IPv4)"',
                        'Select "Use the following IP address" and enter:',
                    ]} />
                    <CodeBlock>{`# If your gateway is 192.168.1.1:
IP address:      192.168.1.100
Subnet mask:     255.255.255.0
Default gateway: 192.168.1.1
Preferred DNS:   8.8.8.8

# If your gateway is 192.168.0.1:
IP address:      192.168.0.100
Subnet mask:     255.255.255.0
Default gateway: 192.168.0.1
Preferred DNS:   8.8.8.8`}</CodeBlock>
                    <Note type="info">The first three octets of your static IP must match your router's gateway. The last number (100–199) is your choice.</Note>

                    <SubHeading>Step 3 — Configure OBS on the second PC</SubHeading>
                    <Prose>Replace <InlineCode>localhost</InlineCode> with the static IP you set:</Prose>
                    <CodeBlock>{`http://192.168.1.100:4000/#/output1
http://192.168.1.100:4000/#/output2
# ... through output6
# Replace 192.168.1.100 with your actual static IP`}</CodeBlock>

                    <SubHeading>Step 4 — Verify the connection</SubHeading>
                    <Prose>On the OBS computer, open a browser and navigate to <InlineCode>http://192.168.1.100:4000</InlineCode>. You should see a secondary control panel with a join-code prompt — this confirms the connection is working. Close the tab; the main control is done from the desktop app.</Prose>

                    <SubHeading>Firewall Fix (if connection fails)</SubHeading>
                    <DocList ordered items={[
                        'On the LyricDisplay PC, search for "Windows Defender Firewall"',
                        'Click "Allow an app through firewall" → "Change settings" → "Allow another app"',
                        <>Browse to <InlineCode>C:\Program Files\LyricDisplay\LyricDisplay.exe</InlineCode></>,
                        'Check both Private and Public, then click OK',
                    ]} />

                    {/* ── MOBILE CONTROLLERS ── */}
                    <SectionHeading id="mobile-controllers">Mobile & Web Controllers</SectionHeading>
                    <Prose>Secondary controllers allow phones, tablets, or other computers to remotely control LyricDisplay from anywhere on the same network — without needing the desktop app installed.</Prose>

                    <SubHeading>Connecting a controller</SubHeading>
                    <DocList ordered items={[
                        <>In LyricDisplay, go to <strong>File → Connect Mobile Controller</strong>, or click the shield icon in the top bar. This shows the QR code and the current 6-digit join code.</>,
                        'On the secondary device (connected to the same network), scan the QR code — or open a browser and navigate to the LyricDisplay PC\'s IP address on port 4000:',
                    ]} />
                    <CodeBlock>{`http://<lyricdisplay-pc-ip>:4000/
# Example: http://192.168.1.100:4000/`}</CodeBlock>
                    <DocList ordered items={[
                        'Enter the 6-digit join code when prompted. The code resets each time the app restarts.',
                        'After pairing, the controller can: trigger lyric lines, toggle output display, load songs from the setlist, run a manual sync, and submit lyric drafts for approval on the desktop.',
                    ]} />
                    <Note type="info">The join code is JWT-secured with rate limiting. Multiple controllers can be connected simultaneously.</Note>

                    {/* ── KEYBOARD SHORTCUTS ── */}
                    <SubHeading>Controller authentication details</SubHeading>
                    <DocList items={[
                        <>The QR code uses <InlineCode>?client=mobile</InlineCode> and may include <InlineCode>joinCode</InlineCode> so the mobile controller can prefill the pairing code.</>,
                        <>Controller tokens are requested from <InlineCode>/api/auth/token</InlineCode> with <InlineCode>clientType</InlineCode> set to <InlineCode>web</InlineCode> or <InlineCode>mobile</InlineCode>.</>,
                        'A valid join code is required for web and mobile controllers. Invalid attempts are rate-limited and can temporarily lock out new attempts.',
                        'Controller tokens are invalidated when the app restarts because the join code is regenerated.',
                    ]} />

                    {/* EXTERNAL CONTROL */}
                    <SectionHeading id="external-control">External Control: MIDI & OSC</SectionHeading>
                    <Prose>LyricDisplay can be controlled by external hardware and automation tools through MIDI and OSC. These controls are configured from <strong>User Preferences - External Control</strong> in the desktop app.</Prose>

                    <SubHeading>MIDI control</SubHeading>
                    <DocList ordered items={[
                        'Open User Preferences, then choose External Control.',
                        'Select or refresh the MIDI input device.',
                        'Enable MIDI after a port is selected.',
                        'Use Quick Assign to map a button, pad, foot switch, or knob to a control action. Learn mode waits for an unmapped MIDI note or control change for up to 10 seconds.',
                    ]} />
                    <Prose>Default MIDI mappings are available before custom mapping:</Prose>
                    <DocList items={[
                        <>Notes <InlineCode>36</InlineCode> through <InlineCode>42</InlineCode>: previous line, next line, toggle output, clear output, toggle autoplay, previous song, next song.</>,
                        <>Notes <InlineCode>60</InlineCode> through <InlineCode>84</InlineCode>: direct line selection for lines 1-25.</>,
                        <>Control changes <InlineCode>1</InlineCode> and <InlineCode>7</InlineCode>: scroll/select lyric lines by controller value.</>,
                    ]} />
                    <Note type="tip">MIDI mappings are stored locally and can be reset to defaults from the External Control preferences panel.</Note>

                    <SubHeading>OSC control</SubHeading>
                    <Prose>OSC is useful for show-control systems, Stream Deck plugins, Bitfocus Companion modules, DAWs, lighting consoles, or any tool that can send UDP OSC messages.</Prose>
                    <DocList items={[
                        <>Default OSC listen port: <InlineCode>8000</InlineCode></>,
                        <>Default feedback port: <InlineCode>9000</InlineCode></>,
                        <>Default address prefix: <InlineCode>/lyricdisplay</InlineCode></>,
                        'Changing the OSC listen port requires restarting the app before the new port takes effect.',
                        'When feedback is enabled, LyricDisplay sends state updates back to OSC clients it has heard from recently.',
                    ]} />
                    <CodeBlock>{`# Common OSC input addresses
/lyricdisplay/line [int]          # Select a 0-based line index
/lyricdisplay/line/next           # Next lyric line
/lyricdisplay/line/prev           # Previous lyric line
/lyricdisplay/output [0|1]        # Toggle or set main output
/lyricdisplay/output/1 [0|1]      # Toggle or set Output 1
/lyricdisplay/output/2 [0|1]      # Toggle or set Output 2
/lyricdisplay/output/stage [0|1]  # Toggle or set stage output
/lyricdisplay/autoplay [0|1]      # Toggle or set autoplay
/lyricdisplay/autoplay/start
/lyricdisplay/autoplay/stop
/lyricdisplay/setlist/next
/lyricdisplay/setlist/prev
/lyricdisplay/setlist/load [int]  # Load a 0-based setlist item
/lyricdisplay/clear               # Clear selected line
/lyricdisplay/sync                # Force output sync`}</CodeBlock>
                    <CodeBlock>{`# OSC feedback messages sent to known clients
/lyricdisplay/state/line
/lyricdisplay/state/output
/lyricdisplay/state/output/1
/lyricdisplay/state/output/2
/lyricdisplay/state/stage
/lyricdisplay/state/songname
/lyricdisplay/state/linecount
/lyricdisplay/state/autoplay`}</CodeBlock>

                    {/* DEVELOPER API */}
                    <SectionHeading id="developer-api">Developer API</SectionHeading>
                    <Prose>The app exposes a local REST API and an authenticated Socket.IO API on port 4000. Use these APIs for custom controllers, automation panels, diagnostics, and integrations that need direct access to LyricDisplay state.</Prose>
                    <Note type="warning">
                        These APIs are intended for the local trusted network where LyricDisplay is running. Do not expose port 4000 directly to the public internet.
                    </Note>

                    <SubHeading>Specs in the source repository</SubHeading>
                    <DocList items={[
                        <><a href="https://github.com/PeterAlaks/lyric-display-app/blob/main/docs/openapi.yaml" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>OpenAPI REST spec</a> documents HTTP endpoints, request bodies, and response shapes.</>,
                        <><a href="https://github.com/PeterAlaks/lyric-display-app/blob/main/docs/asyncapi.yaml" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>AsyncAPI Socket.IO spec</a> documents real-time events, payloads, and server broadcasts.</>,
                    ]} />

                    <SubHeading>Client types and permissions</SubHeading>
                    <Prose>Tokens are scoped by client type. The server enforces these permissions on REST and Socket.IO operations.</Prose>
                    <DocList items={[
                        <><InlineCode>desktop</InlineCode>: full read/write, setlist management, output control, settings write, and admin access.</>,
                        <><InlineCode>web</InlineCode> and <InlineCode>mobile</InlineCode>: lyrics read/write, draft submission, setlist read, output control, settings read/write.</>,
                        <><InlineCode>output1</InlineCode>, <InlineCode>output2</InlineCode>, and custom <InlineCode>outputN</InlineCode> clients: lyrics read and settings read.</>,
                        <><InlineCode>stage</InlineCode>: lyrics read and settings read.</>,
                    ]} />

                    <SubHeading>Authentication flow</SubHeading>
                    <DocList ordered items={[
                        <>Request a token from <InlineCode>POST /api/auth/token</InlineCode>.</>,
                        <>For web or mobile controllers, include the current 6-digit <InlineCode>joinCode</InlineCode>.</>,
                        <>Connect Socket.IO with the token in <InlineCode>auth.token</InlineCode>. Query-string tokens are rejected.</>,
                        <>Send <InlineCode>clientConnect</InlineCode> with the same client type after the socket connects.</>,
                        <>Refresh long-running sessions with <InlineCode>POST /api/auth/refresh</InlineCode>.</>,
                    ]} />
                    <CodeBlock>{`// Browser/mobile controller token request
const response = await fetch('http://192.168.1.100:4000/api/auth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clientType: 'mobile',
    deviceId: 'my-controller-01',
    sessionId: 'service-operator-a',
    joinCode: '123456'
  })
});

const { token } = await response.json();`}</CodeBlock>
                    <CodeBlock>{`// Socket.IO connection
import { io } from 'socket.io-client';

const socket = io('http://192.168.1.100:4000', {
  auth: { token }
});

socket.on('connect', () => {
  socket.emit('clientConnect', { type: 'mobile' });
  socket.emit('requestCurrentState');
});

socket.on('currentState', (state) => {
  console.log(state.lyrics, state.selectedLine, state.isOutputOn);
});`}</CodeBlock>

                    <SubHeading>REST endpoint summary</SubHeading>
                    <DocList items={[
                        <><InlineCode>POST /api/auth/token</InlineCode> - mint a JWT for desktop, web, mobile, output, or stage clients.</>,
                        <><InlineCode>GET /api/auth/join-code</InlineCode> - read the current join code for local pairing UI.</>,
                        <><InlineCode>POST /api/auth/refresh</InlineCode> - refresh an existing JWT.</>,
                        <><InlineCode>POST /api/auth/validate</InlineCode> - validate a JWT and inspect its permissions.</>,
                        <><InlineCode>GET /api/connection/clients</InlineCode> - list connected client sessions. Requires <InlineCode>lyrics:read</InlineCode>.</>,
                        <><InlineCode>GET /api/outputs</InlineCode> and <InlineCode>GET /api/outputs/:outputId</InlineCode> - inspect available output routes.</>,
                        <><InlineCode>POST /api/media/backgrounds</InlineCode> - upload image/video backgrounds. Requires <InlineCode>settings:write</InlineCode>, accepts common image/video MIME types, max 200 MB.</>,
                        <><InlineCode>GET /api/health</InlineCode> and <InlineCode>GET /api/health/ready</InlineCode> - health and readiness checks.</>,
                    ]} />

                    <SubHeading>Common Socket.IO client events</SubHeading>
                    <DocList items={[
                        <><InlineCode>requestCurrentState</InlineCode> - fetch full current app state.</>,
                        <><InlineCode>requestSetlist</InlineCode>, <InlineCode>setlistAdd</InlineCode>, <InlineCode>setlistLoad</InlineCode>, <InlineCode>setlistRemove</InlineCode>, <InlineCode>setlistReorder</InlineCode> - manage queued setlist items.</>,
                        <><InlineCode>lineUpdate</InlineCode> with <InlineCode>{'{ index }'}</InlineCode> - select or clear the active lyric line.</>,
                        <><InlineCode>outputToggle</InlineCode> and <InlineCode>individualOutputToggle</InlineCode> - control global and per-output visibility.</>,
                        <><InlineCode>lyricsLoad</InlineCode>, <InlineCode>lyricsTimestampsUpdate</InlineCode>, <InlineCode>fileNameUpdate</InlineCode> - load lyrics and related metadata.</>,
                        <><InlineCode>styleUpdate</InlineCode> - update output or stage settings.</>,
                        <><InlineCode>stageTimerUpdate</InlineCode> and <InlineCode>stageMessagesUpdate</InlineCode> - update stage display state.</>,
                        <><InlineCode>lyricsDraftSubmit</InlineCode>, <InlineCode>lyricsDraftApprove</InlineCode>, <InlineCode>lyricsDraftReject</InlineCode> - controller draft workflow.</>,
                        <><InlineCode>autoplayStateUpdate</InlineCode> and <InlineCode>heartbeat</InlineCode> - sync playback status and connection health.</>,
                    ]} />

                    <SubHeading>Important server broadcasts</SubHeading>
                    <DocList items={[
                        <><InlineCode>currentState</InlineCode> and <InlineCode>periodicStateSync</InlineCode> contain lyrics, selected line, timestamps, settings, setlist, permissions, and sync timestamps.</>,
                        <><InlineCode>lyricsLoad</InlineCode>, <InlineCode>lyricsSectionsUpdate</InlineCode>, <InlineCode>lineUpdate</InlineCode>, <InlineCode>outputToggle</InlineCode>, <InlineCode>individualOutputToggle</InlineCode>, and <InlineCode>styleUpdate</InlineCode> mirror live state changes to all connected clients.</>,
                        <><InlineCode>lyricsDraftReceived</InlineCode> is sent to desktop clients when a controller submits a draft for approval.</>,
                        <><InlineCode>permissionError</InlineCode>, <InlineCode>setlistError</InlineCode>, <InlineCode>draftError</InlineCode>, and <InlineCode>authError</InlineCode> should be handled by custom clients.</>,
                    ]} />

                    <SectionHeading id="keyboard-shortcuts">Keyboard Shortcuts</SectionHeading>
                    <Prose>LyricDisplay is designed for a keyboard-first workflow. All critical live operations can be performed without touching the mouse.</Prose>

                    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', margin: '1rem 0' }}>
                        {[
                            { key: 'Ctrl/Cmd + O', action: 'Load lyrics file' },
                            { key: 'Ctrl/Cmd + N', action: 'New song canvas' },
                            { key: 'Ctrl/Cmd + P', action: 'Toggle autoplay' },
                            { key: 'Ctrl/Cmd + F', action: 'Jump to search bar' },
                            { key: 'Ctrl/Cmd + 1', action: 'Preview Output 1 window' },
                            { key: 'Ctrl/Cmd + 2', action: 'Preview Output 2 window' },
                            { key: '↑ / Numpad ↑', action: 'Navigate to previous lyric line' },
                            { key: '↓ / Numpad ↓', action: 'Navigate to next lyric line' },
                            { key: 'Spacebar', action: 'Toggle output display on/off' },
                            { key: 'Shift + ↑/↓', action: 'Navigate through search results' },
                            { key: 'Ctrl/Cmd + T', action: 'Add translation line (in editor)' },
                            { key: 'Ctrl/Cmd + D', action: 'Duplicate line (in editor)' },
                            { key: 'Ctrl/Cmd + L', action: 'Select line (in editor)' },
                        ].map(({ key, action }, i) => (
                            <div key={key} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.625rem 1rem',
                                borderBottom: i < 12 ? '1px solid var(--border)' : 'none',
                                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                            }}>
                                <InlineCode>{key}</InlineCode>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{action}</span>
                            </div>
                        ))}
                    </div>

                    {/* ── ARCHITECTURE ── */}
                    <SectionHeading id="architecture">Technical Architecture</SectionHeading>
                    <Prose>LyricDisplay is an Electron application with three main layers: a React frontend, an Electron main process, and a Node.js backend server.</Prose>

                    <SubHeading>Frontend (src/)</SubHeading>
                    <DocList items={[
                        'React 19 + Vite with HashRouter (production) for SPA routing',
                        'Tailwind CSS + Radix UI / shadcn/ui component primitives',
                        'Zustand state management (LyricsStore.js) with persistence-friendly shapes',
                        'Framer Motion for lyric line transitions',
                        'Socket.IO client via useSocket / useControlSocket hooks',
                        'Output pages (Output1, Output2, Stage) are socket-driven displays with autosizing and background media support',
                    ]} />

                    <SubHeading>Backend (server/)</SubHeading>
                    <DocList items={[
                        'Express.js HTTP server on port 4000',
                        'Socket.IO for real-time WebSocket events to all connected clients',
                        'JWT authentication — desktop tokens require admin key; controller tokens require the 6-digit join code',
                        'Rate limiting on controller auth endpoints',
                        'Media upload endpoint (/api/media/backgrounds) — 200 MB max, strict MIME type filtering',
                        'Automatic cleanup of old background media files per output',
                        'Secret rotation support for JWT keys',
                    ]} />

                    <SubHeading>Electron Main Process (main/)</SubHeading>
                    <DocList items={[
                        'Window creation, IPC bridges, and display assignment management',
                        'electron-updater for GitHub Releases auto-update',
                        'EasyWorship import and shared lyric parsing (shared/lyricsParsing.js)',
                        'Secure token storage via keytar',
                        'Single-instance lock and macOS file-open event handling',
                        'User preferences (hardware acceleration toggle, close confirmation, etc.)',
                    ]} />

                    <SubHeading>Key Libraries</SubHeading>
                    <DocList items={[
                        'better-sqlite3 — local database for setlists and templates',
                        'fuse.js — fuzzy search for the intelligent lyrics search bar',
                        '@julusian/midi — MIDI input support',
                        'pdfkit — PDF export capability',
                        'qrcode — QR code generation for mobile controller pairing',
                        'electron-store — persistent settings storage',
                        'paradox-reader — EasyWorship file parsing',
                    ]} />

                    {/* ── TROUBLESHOOTING ── */}
                    <SectionHeading id="troubleshooting">Troubleshooting</SectionHeading>

                    <SubHeading>Browser source is black or empty</SubHeading>
                    <DocList items={[
                        'Confirm LyricDisplay is running and the backend server has started (check the status indicator in the top bar)',
                        <>Verify the browser source URL exactly matches <InlineCode>http://localhost:4000/#/output1</InlineCode> (note the <InlineCode>#</InlineCode>)</>,
                        'In OBS, click on the browser source in the Sources panel and click Refresh in the Properties pane',
                        'Restart both LyricDisplay and OBS',
                        'Check that Windows Firewall is not blocking port 4000',
                    ]} />

                    <SubHeading>Network connection not working</SubHeading>
                    <DocList items={[
                        'Verify both PCs are on the same local network',
                        <>Make sure you are using <InlineCode>http://</InlineCode> not <InlineCode>https://</InlineCode> in the URL</>,
                        'Confirm the static IP is set correctly and matches the URL in OBS',
                        'Temporarily disable the firewall on the LyricDisplay PC to test — then add the firewall exception described above',
                        'Check your router is not blocking local traffic (client isolation disabled)',
                    ]} />

                    <SubHeading>Lyrics not updating in real time</SubHeading>
                    <DocList items={[
                        'Click "Sync Outputs" in the LyricDisplay settings panel',
                        'Refresh the browser source in OBS',
                        'Check the Socket.IO connection — the shield icon in the control panel top bar should be green',
                        'Restart LyricDisplay',
                    ]} />

                    <SubHeading>OBS performance issues</SubHeading>
                    <DocList items={[
                        'Enable "Shutdown source when not visible" on all lyric browser sources',
                        'Close unused preview windows in LyricDisplay',
                        'Monitor CPU usage — consider moving LyricDisplay to a dedicated PC',
                        'Use a dedicated GPU for encoding if possible',
                    ]} />

                    <SubHeading>Styling changes not applying</SubHeading>
                    <DocList items={[
                        'Click "Sync Outputs" in the settings panel',
                        'Refresh the browser source in OBS',
                        <>Open browser DevTools (<InlineCode>F12</InlineCode>) on the output URL to check for console errors</>,
                    ]} />

                    <SubHeading>macOS: app is "damaged" or "can't be opened"</SubHeading>
                    <DocList items={[
                        <><>Open Terminal and run: <InlineCode>xattr -cr /Applications/LyricDisplay.app</InlineCode></></>,
                        'Try opening the app again',
                        'If still blocked: System Preferences → Security & Privacy → General → click "Open Anyway"',
                        'Alternatively, right-click the app and select Open instead of double-clicking',
                    ]} />

                    <SubHeading>Need more help?</SubHeading>
                    <Prose>For bug reports, feature requests, or technical support:</Prose>
                    <DocList items={[
                        <><a href="https://github.com/PeterAlaks/lyric-display-app/issues" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Open an issue on GitHub</a></>,
                        <><a href="https://linktr.ee/peteralaks" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Contact the developer directly</a></>,
                        <><a href="https://drive.google.com/file/d/1fP4fSSWSNvSocI8fK7hktdJ7dY6xnCM-/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Watch the video setup guide</a></>,
                        <><a href="https://github.com/PeterAlaks/lyric-display-app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Browse the source code on GitHub</a></>,
                    ]} />

                    {/* Bottom spacer */}
                    <div style={{ height: '2rem' }} />

                </main>
            </div>

            <BackToTopButton />
            <Footer />

            {/* Sidebar visibility style — show on lg screens */}
            <style>{`
                @media (min-width: 1024px) {
                    .doc-sidebar { display: block !important; }
                    .doc-mobile-nav { display: none !important; }
                }
                .doc-sidebar::-webkit-scrollbar { width: 4px; }
                .doc-sidebar::-webkit-scrollbar-track { background: transparent; }
                .doc-sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
                .doc-mobile-nav [style*="overflowY"]::-webkit-scrollbar { width: 4px; }
                .doc-mobile-nav [style*="overflowY"]::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
            `}</style>
        </div>
    );
}
