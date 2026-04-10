import React, { useState } from 'react';
import { Star, Send, ExternalLink, AlertCircle, MessageSquare, Bug } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';
import { useNavbarHeight } from '../hooks/useNavbarHeight';

const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: 'var(--ink)', border: '1px solid var(--border)',
    borderRadius: 10, color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)', fontSize: '0.92rem',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
};

function DarkInput({ id, name, type = 'text', value, onChange, required, placeholder }) {
    return (
        <input id={id} name={name} type={type} value={value} onChange={onChange}
            required={required} placeholder={placeholder}
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = 'rgba(168,85,247,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.08)'; }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
        />
    );
}
function DarkSelect({ id, name, value, onChange, required, children }) {
    return (
        <select id={id} name={name} value={value} onChange={onChange} required={required}
            style={{ ...inputStyle, appearance: 'none', WebkitAppearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239d98b3' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 40 }}
            onFocus={e => { e.target.style.borderColor = 'rgba(168,85,247,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.08)'; }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}>
            {children}
        </select>
    );
}
function DarkTextarea({ id, name, value, onChange, required, placeholder, rows = 6 }) {
    return (
        <textarea id={id} name={name} value={value} onChange={onChange} required={required}
            placeholder={placeholder} rows={rows}
            style={{ ...inputStyle, resize: 'none', lineHeight: 1.65 }}
            onFocus={e => { e.target.style.borderColor = 'rgba(168,85,247,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.08)'; }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
        />
    );
}

function Field({ label, optional, children }) {
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                {label} {optional && <span style={{ color: 'var(--text-muted)', fontStyle: 'normal' }}>(optional)</span>}
            </label>
            {children}
        </div>
    );
}

export default function FeedbackPage() {
    const [activeTab, setActiveTab] = useState('review');
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const navbarHeight = useNavbarHeight();
    const [formData, setFormData] = useState({ name: '', organization: '', email: '', platform: '', description: '' });
    const [issueData, setIssueData] = useState({ name: '', email: '', platform: '', issueType: '', description: '' });
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setSubmitStatus({ type: '', message: '' });
        window.scrollTo(0, 0);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        if (activeTab === 'review') setFormData(p => ({ ...p, [name]: value }));
        else setIssueData(p => ({ ...p, [name]: value }));
    };

    const handleSubmit = async (e, formName) => {
        e.preventDefault();
        setSubmitStatus({ type: 'loading', message: 'Submitting…' });
        try {
            const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(e.target)).toString() });
            if (res.ok) {
                setSubmitStatus({ type: 'success', message: formName === 'reviews' ? 'Thank you for your review! We\'ll review it and publish it soon.' : 'Thank you for reporting this issue! We\'ll look into it as soon as possible.' });
                if (formName === 'reviews') { setFormData({ name: '', organization: '', email: '', platform: '', description: '' }); setRating(0); }
                else setIssueData({ name: '', email: '', platform: '', issueType: '', description: '' });
            } else throw new Error();
        } catch { setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' }); }
    };

    const tabs = [
        { id: 'review', icon: <MessageSquare size={16} />, label: 'Leave a Review' },
        { id: 'issues', icon: <Bug size={16} />, label: 'Report an Issue' },
    ];

    return (
        <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
            <Navbar />

            {/* Header */}
            <section style={{ paddingTop: navbarHeight + 64, paddingBottom: 64, background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 300, background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.06), transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)' }} />
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                    style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <span className="section-label">Feedback</span>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1rem' }}>
                        We'd love to hear<br /><em style={{ fontStyle: 'italic', color: 'var(--primary-bright)' }}>from you.</em>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                        Share your experience or report any issues you've encountered.
                    </p>
                </motion.div>
            </section>

            <section style={{ padding: '56px 0 96px', background: 'var(--ink)' }}>
                <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px' }}>
                    {/* Tab switcher */}
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 6, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: '2rem' }}>
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => handleTabChange(tab.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    padding: '12px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem',
                                    transition: 'all 0.2s',
                                    background: activeTab === tab.id ? 'var(--primary-gradient)' : 'transparent',
                                    color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                                }}>
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Status */}
                    <AnimatePresence>
                        {submitStatus.message && (
                            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className={`alert-box ${submitStatus.type === 'success' ? 'alert-success' : submitStatus.type === 'error' ? 'alert-error' : 'alert-info'}`}
                                style={{ marginBottom: '1.5rem' }}>
                                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{submitStatus.message}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {activeTab === 'review' && (
                            <motion.div key="review" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}
                                className="card-dark" style={{ padding: '2rem' }}>
                                <form onSubmit={e => handleSubmit(e, 'reviews')} name="reviews" method="POST" data-netlify="true" netlify-honeypot="bot-field">
                                    <input type="hidden" name="form-name" value="reviews" />
                                    <input type="hidden" name="bot-field" />
                                    <input type="hidden" name="rating" value={rating} />

                                    {/* Stars */}
                                    <Field label="Rate your experience">
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            {[1,2,3,4,5].map(star => (
                                                <button key={star} type="button"
                                                    onClick={() => setRating(star)}
                                                    onMouseEnter={() => setHoveredRating(star)}
                                                    onMouseLeave={() => setHoveredRating(0)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, transition: 'transform 0.15s' }}
                                                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
                                                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                                >
                                                    <Star size={36} style={{ color: star <= (hoveredRating || rating) ? '#a855f7' : 'var(--border)', fill: star <= (hoveredRating || rating) ? '#a855f7' : 'none', transition: 'all 0.15s' }} />
                                                </button>
                                            ))}
                                        </div>
                                    </Field>

                                    <Field label="Your Name"><DarkInput id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" /></Field>
                                    <Field label="Organization" optional><DarkInput id="organization" name="organization" value={formData.organization} onChange={handleChange} placeholder="Your Church or Organization" /></Field>
                                    <Field label="Email Address"><DarkInput id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" /></Field>
                                    <Field label="Platform">
                                        <DarkSelect id="platform" name="platform" value={formData.platform} onChange={handleChange} required>
                                            <option value="">Select your platform</option>
                                            <option value="Windows">Windows</option>
                                            <option value="macOS">macOS</option>
                                            <option value="Linux">Linux</option>
                                        </DarkSelect>
                                    </Field>
                                    <Field label="Your Review">
                                        <DarkTextarea id="description" name="description" value={formData.description} onChange={handleChange} required placeholder="Tell us about your experience with LyricDisplay…" />
                                    </Field>

                                    <button type="submit" disabled={rating === 0 || submitStatus.type === 'loading'}
                                        className="btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: (rating === 0 || submitStatus.type === 'loading') ? 0.5 : 1, cursor: rating === 0 ? 'not-allowed' : 'pointer' }}>
                                        <Send size={15} /> Submit Review
                                    </button>
                                </form>

                                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                                    <div className="alert-box alert-info">
                                        <AlertCircle size={16} style={{ color: 'var(--primary-bright)', flexShrink: 0, marginTop: 2 }} />
                                        <div>
                                            <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Have feature suggestions?</p>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                                                Join the discussion on the OBS Forum to share ideas and connect with other users.
                                            </p>
                                            <a href="https://obsproject.com/forum/threads/lyricdisplay-professional-lyrics-overlay-for-production-streaming-software.191349/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '9px 18px', fontSize: '0.82rem' }}>
                                                Join Discussion <ExternalLink size={13} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'issues' && (
                            <motion.div key="issues" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.25 }}
                                className="card-dark" style={{ padding: '2rem' }}>
                                <form onSubmit={e => handleSubmit(e, 'issues')} name="issues" method="POST" data-netlify="true" netlify-honeypot="bot-field">
                                    <input type="hidden" name="form-name" value="issues" />
                                    <input type="hidden" name="bot-field" />

                                    <Field label="Your Name"><DarkInput id="issue-name" name="name" value={issueData.name} onChange={handleChange} required placeholder="John Doe" /></Field>
                                    <Field label="Email Address"><DarkInput id="issue-email" name="email" type="email" value={issueData.email} onChange={handleChange} required placeholder="john@example.com" /></Field>
                                    <Field label="Platform">
                                        <DarkSelect id="issue-platform" name="platform" value={issueData.platform} onChange={handleChange} required>
                                            <option value="">Select your platform</option>
                                            <option value="Windows">Windows</option>
                                            <option value="macOS">macOS</option>
                                            <option value="Linux">Linux</option>
                                        </DarkSelect>
                                    </Field>
                                    <Field label="Issue Type">
                                        <DarkSelect id="issueType" name="issueType" value={issueData.issueType} onChange={handleChange} required>
                                            <option value="">Select issue type</option>
                                            <option value="Bug">Bug / Error</option>
                                            <option value="Performance">Performance Issue</option>
                                            <option value="UI/UX">UI/UX Problem</option>
                                            <option value="Compatibility">Compatibility Issue</option>
                                            <option value="Other">Other</option>
                                        </DarkSelect>
                                    </Field>
                                    <Field label="Describe the Issue">
                                        <DarkTextarea id="issue-description" name="description" value={issueData.description} onChange={handleChange} required placeholder="Please provide as much detail as possible, including steps to reproduce the issue…" />
                                    </Field>

                                    <button type="submit" disabled={submitStatus.type === 'loading'}
                                        className="btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: submitStatus.type === 'loading' ? 0.5 : 1 }}>
                                        <Send size={15} /> Submit Issue Report
                                    </button>
                                </form>

                                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                                    <div className="alert-box alert-warning">
                                        <AlertCircle size={16} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 2 }} />
                                        <div>
                                            <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Need immediate help?</p>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                                                Submit issues directly on GitHub or get help from the community on the OBS Forum.
                                            </p>
                                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                <a href="https://github.com/PeterAlaks/lyric-display-app/issues" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                                                    GitHub Issues <ExternalLink size={13} />
                                                </a>
                                                <a href="https://obsproject.com/forum/threads/lyricdisplay-professional-lyrics-overlay-for-production-streaming-software.191349/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                                                    OBS Forum <ExternalLink size={13} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <Footer />
            <BackToTopButton />
        </div>
    );
}