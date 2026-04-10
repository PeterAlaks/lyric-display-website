import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft, Tag, Download, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';
import SEO from '../components/SEO';
import { getPostBySlug } from '../utils/blogLoader';
import { useNavbarHeight } from '../hooks/useNavbarHeight';

export default function BlogPostPage() {
    const { slug } = useParams();
    const navigate  = useNavigate();
    const post      = getPostBySlug(slug);
    const navbarHeight = useNavbarHeight();

    useEffect(() => { if (!post) navigate('/blog'); }, [post, navigate]);
    if (!post) return null;

    return (
        <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
            <SEO
                title={post.title}
                description={post.excerpt}
                keywords={`${post.category}, worship lyrics, church presentation, lyric display`}
                image={post.image}
                type="article"
                author={post.author}
                publishedTime={post.date}
                category={post.category}
            />
            <Navbar />

            {/* Hero */}
            <section style={{ paddingTop: navbarHeight + 48, paddingBottom: 64, background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.06), transparent)' }} />

                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        {/* Back */}
                        <button
                            onClick={() => navigate('/blog')}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                            <ArrowLeft size={14} /> Back to Blog
                        </button>

                        {/* Category */}
                        <div style={{ marginBottom: '1.25rem' }}>
                            <span className="pill pill-primary"><Tag size={10} /> {post.category}</span>
                        </div>

                        {/* Title */}
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>
                                <Calendar size={13} />
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>
                                <Clock size={13} /> {post.readTime}
                            </span>
                            {post.author && (
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>
                                    By {post.author}
                                </span>
                            )}
                        </div>

                        {/* Featured image */}
                        {post.image && (
                            <div className="img-frame" style={{ marginTop: 8 }}>
                                <img src={post.image} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Article */}
            <article style={{ padding: '64px 0 80px', background: 'var(--ink)' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="max-w-3xl mx-auto px-6 lg:px-8"
                >
                    <div className="blog-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                    </div>
                </motion.div>
            </article>

            {/* Share */}
            <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '64px 0' }}>
                <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Found this helpful?</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>Share this article with your production team.</p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            className="btn-primary"
                            onClick={() => {
                                if (navigator.share) navigator.share({ title: post.title, url: window.location.href });
                                else { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }
                            }}
                        >
                            Share Article
                        </button>
                        <button className="btn-ghost" onClick={() => navigate('/blog')}>
                            More Articles
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'var(--ink)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 400, background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.06), transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.06), transparent)' }} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 1 }}
                >
                    <span className="section-label">Get Started</span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.15 }}>
                        Ready to elevate your<br /><em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>lyric display?</em>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                        Download LyricDisplay and experience professional lyric presentation — completely free.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/download" className="btn-primary"><Download size={15} /> Download Now</a>
                        <a href="/documentation" className="btn-ghost">
                            <ExternalLink size={15} /> Documentation
                        </a>
                    </div>
                </motion.div>
            </section>

            <Footer />
            <BackToTopButton />
        </div>
    );
}