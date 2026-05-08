import React, { useState, useEffect, useRef } from 'react';
import { Download, ArrowLeft, CheckCircle, ArrowRight, BookOpen, ExternalLink, GitBranch, AlertTriangle, ChevronDown, X, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import BackToTopButton from '../components/BackToTopButton';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useNavbarHeight } from '../hooks/useNavbarHeight';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: 'easeOut' },
};

const MotionDiv = motion.div;

const initialDownloadForm = {
    name: '',
    email: '',
    organization: '',
    role: '',
    useCase: '',
    country: '',
    contactConsent: false,
};

const DOWNLOAD_FORM_DRAFT_KEY = 'lyricDisplayDownloadFormDraft';
const DOWNLOAD_UNLOCKS_KEY = 'lyricDisplayDownloadUnlocks';
const DOWNLOAD_UNLOCK_DURATION = 30 * 24 * 60 * 60 * 1000;
const MACOS_SECURITY_COMMAND = 'xattr -cr /Applications/LyricDisplay.app';

const getDownloadAccessKey = download => [
    download?.platform,
    download?.version,
    download?.href,
].filter(Boolean).join('::');

const readDownloadUnlocks = () => {
    if (typeof window === 'undefined') return [];
    try {
        const unlocks = JSON.parse(window.localStorage.getItem(DOWNLOAD_UNLOCKS_KEY) || '[]');
        const now = Date.now();
        return Array.isArray(unlocks)
            ? unlocks.filter(unlock => unlock?.key && unlock?.createdAt && now - unlock.createdAt < DOWNLOAD_UNLOCK_DURATION)
            : [];
    } catch {
        return [];
    }
};

const rememberDownloadUnlock = download => {
    if (typeof window === 'undefined') return;
    const key = getDownloadAccessKey(download);
    if (!key) return;

    try {
        const unlocks = readDownloadUnlocks().filter(unlock => unlock.key !== key);
        const nextUnlocks = [
            {
                key,
                href: download.href,
                platform: download.platform,
                version: download.version,
                createdAt: Date.now(),
            },
            ...unlocks,
        ].slice(0, 12);
        window.localStorage.setItem(DOWNLOAD_UNLOCKS_KEY, JSON.stringify(nextUnlocks));
    } catch {
        // Local retry memory is a convenience; downloads should still work without it.
    }
};

const findDownloadUnlock = download => {
    const key = getDownloadAccessKey(download);
    if (!key) return null;
    return readDownloadUnlocks().find(unlock => unlock.key === key) || null;
};

export default function DownloadPage() {
    const [macOSDropdownOpen, setMacOSDropdownOpen] = useState(false);
    const [releaseData, setReleaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFallback, setIsFallback] = useState(false);
    const [selectedDownload, setSelectedDownload] = useState(null);
    const [completedDownload, setCompletedDownload] = useState(null);
    const [downloadForm, setDownloadForm] = useState(initialDownloadForm);
    const [downloadFormDraftReady, setDownloadFormDraftReady] = useState(false);
    const [submittingDownload, setSubmittingDownload] = useState(false);
    const [countries, setCountries] = useState([]);
    const [countriesLoading, setCountriesLoading] = useState(true);
    const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
    const [countrySearch, setCountrySearch] = useState('');
    const [copiedCommandSource, setCopiedCommandSource] = useState(null);
    const navbarHeight = useNavbarHeight();
    const dropdownRef = useRef(null);
    const downloadFormBodyRef = useRef(null);
    const countryDropdownRef = useRef(null);
    const countrySearchInputRef = useRef(null);
    const RELEASES_PAGE = 'https://github.com/PeterAlaks/lyric-display-app/releases/latest';

    useEffect(() => {
        try {
            const cached = window.localStorage.getItem(DOWNLOAD_FORM_DRAFT_KEY);
            if (cached) {
                const { data } = JSON.parse(cached);
                if (data && typeof data === 'object') {
                    setDownloadForm(prev => ({ ...prev, ...data }));
                }
            }
        } catch {
            // Ignore stale or blocked storage; the form can still be filled manually.
        } finally {
            setDownloadFormDraftReady(true);
        }
    }, []);

    useEffect(() => {
        if (!downloadFormDraftReady) return;

        try {
            const hasDraft = Object.entries(downloadForm).some(([key, value]) => (
                key === 'contactConsent' ? value : Boolean(String(value).trim())
            ));

            if (hasDraft) {
                window.localStorage.setItem(DOWNLOAD_FORM_DRAFT_KEY, JSON.stringify({
                    data: downloadForm,
                    updatedAt: Date.now(),
                }));
            } else {
                window.localStorage.removeItem(DOWNLOAD_FORM_DRAFT_KEY);
            }
        } catch {
            // Local form memory is optional and should not affect the form itself.
        }
    }, [downloadForm, downloadFormDraftReady]);

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

    useEffect(() => {
        let cancelled = false;
        const CACHE_KEY = 'lyricDisplayCountries';
        const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;

        const normalizeCountries = data => data
            .map(country => ({ code: country.cca2, name: country.name?.common }))
            .filter(country => country.code && country.name)
            .sort((a, b) => a.name.localeCompare(b.name));

        const fetchCountries = async () => {
            try {
                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    const { data, timestamp } = JSON.parse(cached);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        if (!cancelled) {
                            setCountries(data);
                            setCountriesLoading(false);
                        }
                        return;
                    }
                }

                const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
                if (!res.ok) throw new Error('Failed to fetch countries');
                const data = normalizeCountries(await res.json());
                localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
                if (!cancelled) setCountries(data);
            } catch {
                if (!cancelled) setCountries([]);
            } finally {
                if (!cancelled) setCountriesLoading(false);
            }
        };

        fetchCountries();
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        const handler = e => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
                setCountryDropdownOpen(false);
                setCountrySearch('');
            }
        };
        if (countryDropdownOpen) document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [countryDropdownOpen]);

    useEffect(() => {
        if (!countryDropdownOpen) return;
        const scrollTimer = window.setTimeout(() => {
            const body = downloadFormBodyRef.current;
            const field = countryDropdownRef.current;

            if (body && field) {
                const bodyRect = body.getBoundingClientRect();
                const fieldRect = field.getBoundingClientRect();
                const fieldTop = body.scrollTop + fieldRect.top - bodyRect.top;
                const visibleFieldHeight = Math.min(fieldRect.height, bodyRect.height - 24);
                const targetTop = fieldTop - Math.max(12, (bodyRect.height - visibleFieldHeight) / 2);

                body.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
            } else {
                field?.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
            }
        }, 0);

        const focusTimer = window.setTimeout(() => {
            try {
                countrySearchInputRef.current?.focus({ preventScroll: true });
            } catch {
                countrySearchInputRef.current?.focus();
            }
        }, 220);

        return () => {
            window.clearTimeout(scrollTimer);
            window.clearTimeout(focusTimer);
        };
    }, [countryDropdownOpen]);

    const v = releaseData?.version;
    const dl = releaseData?.downloads;
    const modalVersion = isFallback ? 'Latest release' : (v ? `v${v}` : 'Latest release');
    const filteredCountries = countries.filter(country => (
        country.name.toLowerCase().includes(countrySearch.trim().toLowerCase())
    ));
    const isDownloadFormComplete = Boolean(
        downloadForm.name.trim() &&
        downloadForm.role &&
        downloadForm.useCase &&
        downloadForm.country
    );
    const completedDownloadIsMacOS = completedDownload?.platform?.toLowerCase().includes('macos');

    useEffect(() => {
        if (!selectedDownload && !completedDownload) return undefined;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [selectedDownload, completedDownload]);

    const openDownloadModal = ({ href, platform, label }) => {
        const downloadDetails = { href, platform, label, version: modalVersion };
        const existingUnlock = findDownloadUnlock(downloadDetails);

        setMacOSDropdownOpen(false);
        setCompletedDownload(null);

        if (existingUnlock) {
            const downloadStartedAt = new Date().toISOString();
            setSelectedDownload(null);
            setCompletedDownload({ ...downloadDetails, downloadStartedAt, isRetry: true });
            window.setTimeout(() => startDownload(downloadDetails.href), 120);
            return;
        }

        setSelectedDownload(downloadDetails);
    };

    const closeDownloadModal = () => {
        if (submittingDownload) return;
        setSelectedDownload(null);
        setCountryDropdownOpen(false);
        setCountrySearch('');
    };

    const closeCompletedDownloadModal = () => {
        setCompletedDownload(null);
    };

    const updateDownloadForm = e => {
        const { name, value, type, checked } = e.target;
        setDownloadForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const selectCountry = countryName => {
        setDownloadForm(prev => ({ ...prev, country: countryName }));
        setCountryDropdownOpen(false);
        setCountrySearch('');
    };

    const startDownload = href => {
        if (!href) return;
        const link = document.createElement('a');
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const copyMacOSCommand = async source => {
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(MACOS_SECURITY_COMMAND);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = MACOS_SECURITY_COMMAND;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }
            setCopiedCommandSource(source);
            window.setTimeout(() => {
                setCopiedCommandSource(current => current === source ? null : current);
            }, 1600);
        } catch {
            setCopiedCommandSource(null);
        }
    };

    const handleDownloadSubmit = async e => {
        e.preventDefault();
        if (!selectedDownload || !isDownloadFormComplete) return;

        setSubmittingDownload(true);
        const downloadDetails = selectedDownload;
        const downloadStartedAt = new Date().toISOString();
        const downloadAccessKey = getDownloadAccessKey(downloadDetails);
        const payload = {
            'form-name': 'downloads',
            name: downloadForm.name,
            email: downloadForm.email,
            organization: downloadForm.organization,
            role: downloadForm.role,
            useCase: downloadForm.useCase,
            country: downloadForm.country,
            contactConsent: downloadForm.contactConsent ? 'yes' : 'no',
            platform: downloadDetails.platform,
            version: downloadDetails.version,
            downloadUrl: downloadDetails.href,
            downloadAccessKey,
            downloadStartedAt,
            userAgent: window.navigator.userAgent,
            sourcePage: window.location.href,
            'bot-field': '',
        };

        let formSubmitted = false;
        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(payload).toString(),
            });
            formSubmitted = response.ok;
        } catch {
            // Do not block the download if the notification form fails.
        } finally {
            if (formSubmitted) rememberDownloadUnlock(downloadDetails);
            setSubmittingDownload(false);
            setSelectedDownload(null);
            setCompletedDownload({ ...downloadDetails, downloadStartedAt });
            setCountryDropdownOpen(false);
            setCountrySearch('');
            window.setTimeout(() => startDownload(downloadDetails.href), 120);
        }
    };

    const Skeleton = () => (
        <div style={{ height: 48, background: 'var(--surface-up)', borderRadius: 8, animation: 'pulse 1.5s ease-in-out infinite' }} />
    );

    const PlatformCard = ({ title, subtitle, specs, downloadEl }) => (
        <MotionDiv variants={fadeUp} className="card-dark" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflow: 'visible' }}>
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
        </MotionDiv>
    );

    const DownloadBtn = ({ href, label, platform }) => (
        <button type="button" onClick={() => openDownloadModal({ href, platform, label })} className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
            <Download size={16} /> {label}
        </button>
    );

    return (
        <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
            <SEO
                title="Download LyricDisplay - Free Lyric Presentation Software"
                description="Download LyricDisplay for Windows, macOS, and Linux. Free, open-source professional lyric presentation software for live production and worship."
                keywords="LyricDisplay download, free lyric software, OBS lyrics display, church projection software"
            />
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
                        Latest stable release for your platform, completely free forever. No signup or payment details required.
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
                            specs={['Windows 10 / 11', 'Auto-Updates']}
                            downloadEl={loading ? <Skeleton /> : isFallback
                                ? <DownloadBtn href={RELEASES_PAGE} label="Download Latest" platform="Windows" />
                                : <DownloadBtn href={dl.windows} label={`Download v${v}`} platform="Windows" />}
                        />

                        <PlatformCard
                            title="macOS"
                            subtitle={loading ? 'Loading…' : isFallback ? 'Latest release' : `v${v}`}
                            specs={['Apple Silicon & Intel', 'Auto-Updates']}
                            downloadEl={loading ? <Skeleton /> : isFallback
                                ? <DownloadBtn href={RELEASES_PAGE} label="Download Latest" platform="macOS" />
                                : (
                                    <div ref={dropdownRef} style={{ position: 'relative' }}>
                                        <button onClick={() => setMacOSDropdownOpen(!macOSDropdownOpen)}
                                            className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                            <Download size={16} /> Download v{v}
                                            <ChevronDown size={15} style={{ marginLeft: 'auto', transition: 'transform 0.2s', transform: macOSDropdownOpen ? 'rotate(180deg)' : 'none' }} />
                                        </button>
                                        <AnimatePresence>
                                            {macOSDropdownOpen && (
                                                <MotionDiv
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.15, ease: 'easeOut' }}
                                                    style={{ position: 'absolute', bottom: '110%', left: 0, right: 0, background: 'var(--surface-up)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 10 }}
                                                >
                                                    {[
                                                        { href: dl.macosArm, platform: 'macOS Apple Silicon', label: 'Apple Silicon (M1/M2/M3+)', sub: 'For newer Macs with Apple chips' },
                                                        { href: dl.macosIntel, platform: 'macOS Intel', label: 'Intel Mac', sub: 'For older Macs with Intel processors' },
                                                    ].map(opt => (
                                                        <button key={opt.href} type="button" onClick={() => openDownloadModal({ href: opt.href, platform: opt.platform, label: opt.label })}
                                                            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '1rem 1.25rem', textAlign: 'left', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.15s' }}
                                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,85,247,0.08)'}
                                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                            <Download size={16} style={{ color: 'var(--primary-bright)', flexShrink: 0 }} />
                                                            <div>
                                                                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{opt.label}</div>
                                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{opt.sub}</div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </MotionDiv>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                        />

                        <PlatformCard
                            title="Linux"
                            subtitle={loading ? 'Loading…' : isFallback ? 'Latest release (AppImage)' : `v${v} · AppImage`}
                            specs={['Universal AppImage', 'Auto-Updates']}
                            downloadEl={loading ? <Skeleton /> : isFallback
                                ? <DownloadBtn href={RELEASES_PAGE} label="Download Latest" platform="Linux" />
                                : <DownloadBtn href={dl.linux} label={`Download v${v}`} platform="Linux" />}
                        />
                    </div>

                    {/* Security notice */}
                    <div style={{ marginTop: '1.5rem', border: '1px solid rgba(245,158,11,0.24)', borderRadius: 14, background: 'linear-gradient(135deg, rgba(245,158,11,0.10), rgba(124,58,237,0.05))', boxShadow: '0 18px 48px rgba(0,0,0,0.18)', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.95rem', padding: '1.1rem 1.2rem', borderBottom: '1px solid rgba(245,158,11,0.16)' }}>
                            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(245,158,11,0.13)', border: '1px solid rgba(245,158,11,0.24)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <AlertTriangle size={18} />
                            </div>
                            <div>
                                <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '0.98rem' }}>Installer security notice</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                                    LyricDisplay is open source, but the installers are not code-signed yet. Your browser or operating system may show an extra confirmation before opening the app.
                                </p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-3" style={{ padding: '1rem 1.2rem' }}>
                            {[
                                { label: 'Windows', body: 'Choose More info, then Run anyway if SmartScreen appears.' },
                                { label: 'macOS', body: 'Gatekeeper may require approval the first time you open the app.' },
                                { label: 'Linux', body: 'Mark the AppImage as executable before opening it.' },
                            ].map(item => (
                                <div key={item.label} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '0.85rem', background: 'rgba(9,9,15,0.22)' }}>
                                    <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.25rem' }}>{item.label}</p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.55 }}>{item.body}</p>
                                </div>
                            ))}
                        </div>
                        <div style={{ margin: '0 1.2rem 1rem', border: '1px solid rgba(245,158,11,0.20)', borderRadius: 12, background: 'rgba(9,9,15,0.18)', padding: '0.95rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.65rem' }}>
                                <AlertTriangle size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
                                <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.88rem' }}>macOS first-open steps</p>
                            </div>
                            <ol style={{ color: 'var(--text-secondary)', fontSize: '0.83rem', lineHeight: 1.7, paddingLeft: '1.1rem', marginBottom: '0.75rem' }}>
                                <li>Open the DMG and drag LyricDisplay into Applications.</li>
                                <li>If macOS blocks the app, open System Settings &gt; Privacy &amp; Security and allow LyricDisplay.</li>
                                <li>If macOS says the app is damaged, open the Terminal app and run the command below once.</li>
                            </ol>
                            <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.5rem', background: 'rgba(9,9,15,0.55)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.35rem' }}>
                                <code style={{ flex: 1, color: 'var(--primary-bright)', padding: '0.35rem 0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                    {MACOS_SECURITY_COMMAND}
                                </code>
                                <button type="button" onClick={() => copyMacOSCommand('notice')} aria-label="Copy macOS Terminal command"
                                    style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, background: copiedCommandSource === 'notice' ? 'var(--teal-dim)' : 'rgba(255,255,255,0.04)', color: copiedCommandSource === 'notice' ? 'var(--teal)' : 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 0.65rem', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                    {copiedCommandSource === 'notice' ? <CheckCircle size={14} /> : <Copy size={14} />}
                                    {copiedCommandSource === 'notice' ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', padding: '0 1.2rem 1rem' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                                Browser warnings for uncommon downloads are expected. Choose Keep or Keep anyway to continue.
                            </p>
                            <a href="https://buymeacoffee.com/lyricdisplay" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-bright)', fontSize: '0.82rem', textDecoration: 'none', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                Help fund code signing <ExternalLink size={12} style={{ display: 'inline', verticalAlign: '-1px', marginLeft: 3 }} />
                            </a>
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
                <MotionDiv {...fadeUp} style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                        Need help getting started?
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
                        Check out our video tutorial or reach out to the maintainers.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://drive.google.com/file/d/1fP4fSSWSNvSocI8fK7hktdJ7dY6xnCM-/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-primary">
                            <BookOpen size={15} /> Watch Tutorial
                        </a>
                        <a href="https://linktr.ee/peteralaks" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            <ExternalLink size={15} /> Contact Maintainers
                        </a>
                    </div>
                </MotionDiv>
            </section>

            <AnimatePresence>
                {selectedDownload && (
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(9,9,15,0.76)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem' }}
                        onMouseDown={closeDownloadModal}
                    >
                        <MotionDiv
                            initial={{ opacity: 0, y: 18, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 18, scale: 0.96 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="card-dark download-modal-card"
                            style={{ width: 'min(100%, 560px)', maxHeight: 'calc(100dvh - 1.5rem)', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, boxShadow: '0 28px 90px rgba(0,0,0,0.55)' }}
                            onMouseDown={e => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="download-modal-title"
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', padding: '1.1rem 1.25rem 1rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0 }}>
                                <div>
                                    <span className="section-label" style={{ marginBottom: '0.35rem' }}>Download</span>
                                    <h2 id="download-modal-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                        Before you download
                                    </h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5, marginTop: '0.4rem' }}>
                                        Tell us a little about who is using LyricDisplay. Your download starts after submission.
                                    </p>
                                </div>
                                <button type="button" onClick={closeDownloadModal} aria-label="Close download form"
                                    style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                                    <X size={17} />
                                </button>
                            </div>

                            <form name="downloads" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleDownloadSubmit}
                                style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
                                <input type="hidden" name="form-name" value="downloads" />
                                <input type="hidden" name="bot-field" />
                                <input type="hidden" name="platform" value={selectedDownload.platform} />
                                <input type="hidden" name="version" value={selectedDownload.version} />
                                <input type="hidden" name="downloadUrl" value={selectedDownload.href} />
                                <input type="hidden" name="downloadAccessKey" value={getDownloadAccessKey(selectedDownload)} />
                                <input type="hidden" name="country" value={downloadForm.country} />

                                <div ref={downloadFormBodyRef} style={{ display: 'grid', gap: '0.9rem', padding: '1rem 1.25rem', overflowY: 'auto', minHeight: 0, flex: 1 }}>
                                    <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '0.75rem 0.9rem', background: 'rgba(255,255,255,0.025)' }}>
                                        <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.15rem' }}>{selectedDownload.platform}</p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', fontFamily: 'var(--font-mono)' }}>{selectedDownload.version}</p>
                                    </div>

                                    <label style={{ display: 'grid', gap: '0.45rem' }}>
                                        <span className="label-dark">Name</span>
                                        <input className="input-dark" name="name" value={downloadForm.name} onChange={updateDownloadForm} required placeholder="Your name" />
                                    </label>

                                    <label style={{ display: 'grid', gap: '0.45rem' }}>
                                        <span className="label-dark">Email <span style={{ color: 'var(--text-muted)', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></span>
                                        <input className="input-dark" name="email" type="email" value={downloadForm.email} onChange={updateDownloadForm} placeholder="you@example.com" />
                                    </label>

                                    <label style={{ display: 'grid', gap: '0.45rem' }}>
                                        <span className="label-dark">Organization / Church <span style={{ color: 'var(--text-muted)', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></span>
                                        <input className="input-dark" name="organization" value={downloadForm.organization} onChange={updateDownloadForm} placeholder="Organization name" />
                                    </label>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <label style={{ display: 'grid', gap: '0.45rem' }}>
                                            <span className="label-dark">Role</span>
                                            <div style={{ position: 'relative' }}>
                                                <select className="input-dark" name="role" value={downloadForm.role} onChange={updateDownloadForm} required style={{ paddingRight: 42, cursor: 'pointer' }}>
                                                    <option value="">Select role</option>
                                                    <option>Worship leader</option>
                                                    <option>Media / production</option>
                                                    <option>Pastor / minister</option>
                                                    <option>Event producer</option>
                                                    <option>Developer</option>
                                                    <option>Other</option>
                                                </select>
                                                <ChevronDown size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                                            </div>
                                        </label>

                                        <label style={{ display: 'grid', gap: '0.45rem' }}>
                                            <span className="label-dark">Use case</span>
                                            <div style={{ position: 'relative' }}>
                                                <select className="input-dark" name="useCase" value={downloadForm.useCase} onChange={updateDownloadForm} required style={{ paddingRight: 42, cursor: 'pointer' }}>
                                                    <option value="">Select use case</option>
                                                    <option>Church worship</option>
                                                    <option>Live streaming</option>
                                                    <option>Concert / event</option>
                                                    <option>Karaoke / entertainment</option>
                                                    <option>Testing / evaluation</option>
                                                    <option>Other</option>
                                                </select>
                                                <ChevronDown size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                                            </div>
                                        </label>
                                    </div>

                                    <div ref={countryDropdownRef} style={{ display: 'grid', gap: '0.45rem' }}>
                                        <span className="label-dark">Country</span>
                                        {!countriesLoading && countries.length === 0 ? (
                                            <input className="input-dark" value={downloadForm.country} onChange={e => setDownloadForm(prev => ({ ...prev, country: e.target.value }))}
                                                placeholder="Enter country" />
                                        ) : (
                                            <>
                                                <button type="button" className="input-dark" onClick={() => setCountryDropdownOpen(open => !open)}
                                                    aria-expanded={countryDropdownOpen} aria-haspopup="listbox"
                                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', textAlign: 'left', cursor: 'pointer', paddingRight: 14 }}>
                                                    <span style={{ color: downloadForm.country ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                                        {countriesLoading ? 'Loading countries...' : downloadForm.country || 'Select country'}
                                                    </span>
                                                    <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, transition: 'transform 0.2s', transform: countryDropdownOpen ? 'rotate(180deg)' : 'none' }} />
                                                </button>
                                                <AnimatePresence>
                                                    {countryDropdownOpen && (
                                                        <MotionDiv
                                                            initial={{ opacity: 0, y: -6 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -6 }}
                                                            transition={{ duration: 0.16, ease: 'easeOut' }}
                                                            style={{ background: 'var(--surface-up)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', boxShadow: '0 18px 42px rgba(0,0,0,0.48)' }}
                                                        >
                                                            <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                                                                <input ref={countrySearchInputRef} className="input-dark" value={countrySearch} onChange={e => setCountrySearch(e.target.value)}
                                                                    placeholder="Search country" aria-label="Search country" style={{ padding: '11px 13px' }} />
                                                            </div>
                                                            <div role="listbox" style={{ maxHeight: 210, overflowY: 'auto', padding: '0.35rem' }}>
                                                                {countriesLoading ? (
                                                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', padding: '0.75rem' }}>Loading countries...</p>
                                                                ) : filteredCountries.length > 0 ? filteredCountries.map(country => (
                                                                    <button key={country.code} type="button" role="option" aria-selected={downloadForm.country === country.name}
                                                                        onClick={() => selectCountry(country.name)}
                                                                        style={{ width: '100%', padding: '0.72rem 0.8rem', border: 'none', borderRadius: 8, background: downloadForm.country === country.name ? 'rgba(124,58,237,0.14)' : 'transparent', color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem' }}
                                                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.12)'}
                                                                        onMouseLeave={e => e.currentTarget.style.background = downloadForm.country === country.name ? 'rgba(124,58,237,0.14)' : 'transparent'}>
                                                                        {country.name}
                                                                    </button>
                                                                )) : (
                                                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', padding: '0.75rem' }}>No countries found.</p>
                                                                )}
                                                            </div>
                                                        </MotionDiv>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        )}
                                    </div>

                                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                                        <input name="contactConsent" type="checkbox" checked={downloadForm.contactConsent} onChange={updateDownloadForm}
                                            style={{ marginTop: 3, accentColor: 'var(--primary)' }} />
                                        <span>You may contact me about LyricDisplay updates and release news.</span>
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem', padding: '0.9rem 1.25rem calc(0.9rem + env(safe-area-inset-bottom, 0px))', borderTop: '1px solid var(--border)', background: 'var(--surface)', flexWrap: 'wrap', flexShrink: 0 }}>
                                    <button type="submit" className="btn-primary" disabled={submittingDownload || !isDownloadFormComplete} style={{ flex: 1, justifyContent: 'center', minWidth: 180 }}>
                                        <Download size={16} /> Download
                                    </button>
                                    <button type="button" className="btn-ghost" onClick={closeDownloadModal} disabled={submittingDownload} style={{ justifyContent: 'center' }}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </MotionDiv>
                    </MotionDiv>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {completedDownload && (
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(9,9,15,0.72)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
                        onMouseDown={closeCompletedDownloadModal}
                    >
                        <MotionDiv
                            initial={{ opacity: 0, y: 14, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 14, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="card-dark download-modal-card"
                            style={{ width: `min(100%, ${completedDownloadIsMacOS ? '520px' : '420px'})`, padding: '1.35rem', boxShadow: '0 24px 72px rgba(0,0,0,0.55)', maxHeight: 'calc(100vh - 2rem)', overflowY: 'auto' }}
                            onMouseDown={e => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="download-confirmation-title"
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div className="icon-wrap" style={{ width: 42, height: 42, borderRadius: 10, color: 'var(--teal)', background: 'var(--teal-dim)', borderColor: 'rgba(94,234,212,0.22)' }}>
                                    <CheckCircle size={20} />
                                </div>
                                <button type="button" onClick={closeCompletedDownloadModal} aria-label="Close confirmation"
                                    style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                                    <X size={16} />
                                </button>
                            </div>

                            <h2 id="download-confirmation-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.55rem' }}>
                                {completedDownload.isRetry ? 'Retrying your download' : 'Your download is starting'}
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1rem' }}>
                                {completedDownload.isRetry
                                    ? `The ${completedDownload.platform} download is starting again. If it does not start, retry it manually below.`
                                    : `The ${completedDownload.platform} download should start automatically. If it does not, start it manually below.`}
                            </p>
                            <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '0.75rem 0.9rem', background: 'rgba(255,255,255,0.025)', marginBottom: '1.15rem' }}>
                                <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.15rem' }}>{completedDownload.platform}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', fontFamily: 'var(--font-mono)' }}>{completedDownload.version}</p>
                            </div>
                            {completedDownloadIsMacOS && (
                                <div style={{ border: '1px solid rgba(245,158,11,0.24)', borderRadius: 12, background: 'rgba(245,158,11,0.07)', padding: '0.95rem', marginBottom: '1.15rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.65rem' }}>
                                        <AlertTriangle size={16} style={{ color: '#f59e0b', flexShrink: 0 }} />
                                        <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem' }}>Opening on macOS</p>
                                    </div>
                                    <ol style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.7, paddingLeft: '1.1rem', marginBottom: '0.75rem' }}>
                                        <li>Open the DMG and drag LyricDisplay into Applications.</li>
                                        <li>If macOS blocks the app, open System Settings &gt; Privacy &amp; Security and allow LyricDisplay.</li>
                                        <li>If macOS says the app is damaged, open the Terminal app and run the command below once.</li>
                                    </ol>
                                    <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.5rem', background: 'rgba(9,9,15,0.55)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.35rem' }}>
                                        <code style={{ flex: 1, color: 'var(--primary-bright)', padding: '0.35rem 0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                            {MACOS_SECURITY_COMMAND}
                                        </code>
                                        <button type="button" onClick={() => copyMacOSCommand('modal')} aria-label="Copy macOS Terminal command"
                                            style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, background: copiedCommandSource === 'modal' ? 'var(--teal-dim)' : 'rgba(255,255,255,0.04)', color: copiedCommandSource === 'modal' ? 'var(--teal)' : 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 0.65rem', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                            {copiedCommandSource === 'modal' ? <CheckCircle size={14} /> : <Copy size={14} />}
                                            {copiedCommandSource === 'modal' ? 'Copied' : 'Copy'}
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                <a href={completedDownload.href} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, justifyContent: 'center', minWidth: 180 }}>
                                    <Download size={16} /> {completedDownload.isRetry ? 'Retry manually' : 'Start manually'}
                                </a>
                                <button type="button" className="btn-ghost" onClick={closeCompletedDownloadModal} style={{ justifyContent: 'center' }}>
                                    Close
                                </button>
                            </div>
                        </MotionDiv>
                    </MotionDiv>
                )}
            </AnimatePresence>

            <Footer />
            <BackToTopButton />
        </div>
    );
}
