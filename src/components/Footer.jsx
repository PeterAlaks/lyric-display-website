import React from 'react';
import { Github, Heart } from 'lucide-react';
import logoWhite from '../assets/images/LyricDisplay logo-white.png';

export default function Footer() {
    const year = new Date().getFullYear();
    const links = {
        Product:   [
            { label: 'Integration',  href: '/#integration' },
            { label: 'Outputs',      href: '/#outputs' },
            { label: 'Advantages',   href: '/#advantages' },
            { label: 'Features',     href: '/#features' },
            { label: 'Use Cases',    href: '/#use-cases' },
            { label: 'Download',     href: '/download' },
        ],
        Resources: [
            { label: 'Blog',               href: '/blog' },
            { label: 'Documentation',      href: "/documentation" },
            { label: 'Integration Guide',  href: '/integration-guide' },
            { label: 'EasyWorship Import', href: '/easyworship-import' },
        ],
        Help: [
            { label: 'Create Issue',        href: 'https://github.com/PeterAlaks/lyric-display-app/issues', ext: true },
            { label: 'Feedback',            href: '/feedback' },
            { label: 'Contact',             href: 'https://linktr.ee/peteralaks', ext: true },
            { label: 'Support Development', href: 'https://buymeacoffee.com/lyricdisplay', ext: true },
        ],
    };

    const linkStyle = { color: 'var(--text-muted)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' };

    return (
        <footer style={{ background: 'var(--ink-soft)', borderTop: '1px solid var(--border)' }}>
            {/* Top strip */}
            <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    <div>
                        <div style={{ marginBottom: 12 }}>
                            <img src={logoWhite} alt="LyricDisplay" style={{ height: 28 }} />
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 340, lineHeight: 1.7 }}>
                            Professional real-time lyric display for live events, church services, and multimedia productions. Built with passion by Peter Alakembi and David Okaliwe.
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <a href="https://github.com/PeterAlaks/lyric-display-app" target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                            <Github size={20} />
                        </a>
                        <a href="https://buymeacoffee.com/lyricdisplay" target="_blank" rel="noopener noreferrer" className="btn-donate" style={{ padding: '10px 16px', fontSize: '0.78rem' }}>
                            <Heart size={13} /> Donate
                        </a>
                        <a href="/download" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.82rem' }}>
                            Download Free
                        </a>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-3 gap-10">
                {Object.entries(links).map(([section, items]) => (
                    <div key={section}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--primary-bright)', marginBottom: '1rem' }}>
                            {section}
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            {items.map(item => (
                                <li key={item.label}>
                                    <a href={item.href} target={item.ext ? '_blank' : undefined} rel={item.ext ? 'noopener noreferrer' : undefined}
                                        style={linkStyle}
                                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: '1px solid var(--border)', padding: '1.25rem 0' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                        © {year} LyricDisplay · All Rights Reserved
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                        GPL-2.0 License · Built by Peter Alakembi &amp; David Okaliwe
                    </p>
                </div>
            </div>
        </footer>
    );
}