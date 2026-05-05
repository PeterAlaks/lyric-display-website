import React, { useState, useMemo } from 'react';
import { motion as Motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';
import SEO from '../components/SEO';
import { getAllPosts, getAllCategories } from '../utils/blogLoader';
import { useNavbarHeight } from '../hooks/useNavbarHeight';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: 'easeOut' },
};
const stagger = {
    initial: {},
    animate: { transition: { staggerChildren: 0.08 } },
};

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navbarHeight = useNavbarHeight();

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        window.scrollTo(0, 0);
    };

    const blogPosts = useMemo(() => getAllPosts(), []);
    const categories = useMemo(() => getAllCategories(), []);

    const filtered = blogPosts.filter(p => {
        const ms = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const mc = selectedCategory === 'All' || p.category === selectedCategory;
        return ms && mc;
    });

    return (
        <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
            <SEO
                title="Blog - Expert Guides & Tips for Lyric Display"
                description="Expert insights, tips, and guides for mastering lyric presentation in live productions."
                keywords="lyric display blog, worship presentation tips, OBS lyrics guide, church tech blog"
            />
            <Navbar />

            {/* Hero */}
            <section style={{ paddingTop: navbarHeight + 72, paddingBottom: 64, background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 300, background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.06), transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.06), transparent)' }} />

                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <span className="section-label">The LyricDisplay Blog</span>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
                            Insights for live<br />
                            <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>production teams.</em>
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 2.5rem' }}>
                            Expert guides, tips, and tutorials for mastering lyric presentation in live productions and streaming.
                        </p>

                        {/* Search */}
                        <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
                            <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%', paddingLeft: 44, paddingRight: 16,
                                    paddingTop: 13, paddingBottom: 13,
                                    background: 'var(--ink)', border: '1px solid var(--border)',
                                    borderRadius: 10, color: 'var(--text-primary)',
                                    fontFamily: 'var(--font-body)', fontSize: '0.92rem',
                                    outline: 'none', transition: 'border-color 0.2s',
                                }}
                                onFocus={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.06)'}
                                onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                            />
                        </div>
                    </Motion.div>
                </div>
            </section>

            {/* Category filter */}
            <div style={{ background: 'var(--ink)', borderBottom: '1px solid var(--border)', padding: '16px 0', position: 'sticky', top: navbarHeight, zIndex: 40 }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {categories.map(cat => (
                        <button key={cat} onClick={() => handleCategoryChange(cat)}
                            className={selectedCategory === cat ? 'bg-primary-gradient' : ''}
                            style={{
                                padding: '6px 16px', borderRadius: 999, border: '1px solid',
                                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.09em',
                                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
                                background: selectedCategory === cat ? 'var(--primary-gradient)' : 'transparent',
                                borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--border)',
                                color: selectedCategory === cat ? 'var(--ink)' : 'var(--text-secondary)',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Posts grid */}
            <section style={{ padding: '64px 0 96px', background: 'var(--ink)' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {filtered.length === 0 ? (
                        <Motion.div {...fadeUp} style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                            No articles found matching your criteria.
                        </Motion.div>
                    ) : (
                        <Motion.div
                            key={selectedCategory + searchQuery}
                            variants={stagger} initial="initial" animate="animate"
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                        >
                            {filtered.map(post => (
                                <Motion.article
                                    key={post.id}
                                    variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                                    className="card-dark"
                                    style={{ overflow: 'hidden', cursor: 'pointer' }}
                                    onClick={() => window.location.href = `/blog/${post.slug}`}
                                >
                                    {/* Image */}
                                    <div style={{ height: 188, overflow: 'hidden', position: 'relative' }}>
                                        <img src={post.image} alt={post.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.6), transparent 55%)' }} />
                                        <div style={{ position: 'absolute', top: 12, left: 12 }}>
                                            <span className="pill pill-primary">
                                                <Tag size={10} /> {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                                                <Calendar size={11} />
                                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                                                <Clock size={11} /> {post.readTime}
                                            </span>
                                        </div>

                                        <h2 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.6rem', lineHeight: 1.4, transition: 'color 0.2s' }}
                                            onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                                        >
                                            {post.title}
                                        </h2>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '1.25rem',
                                            overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                            {post.excerpt}
                                        </p>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                                            Read More <ArrowRight size={13} />
                                        </span>
                                    </div>
                                </Motion.article>
                            ))}
                        </Motion.div>
                    )}
                </div>
            </section>

            {/* Newsletter */}
            <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '80px 0' }}>
                <Motion.div {...fadeUp} style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
                    <span className="section-label">Stay Updated</span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.15 }}>
                        Get the latest<br />in your inbox.
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
                        Tips, guides, and updates delivered occasionally. No spam.
                    </p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            style={{
                                flex: 1, minWidth: 200,
                                padding: '13px 16px', borderRadius: 8,
                                background: 'var(--ink)', border: '1px solid var(--border)',
                                color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
                                fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.06)'}
                            onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                        />
                        <button className="btn-primary">Subscribe</button>
                    </div>
                </Motion.div>
            </section>

            <Footer />
            <BackToTopButton />
        </div>
    );
}