import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';
import SEO from '../components/SEO';
import { getPostBySlug } from '../utils/blogLoader';
import { useNavbarHeight } from '../hooks/useNavbarHeight';
import '../styles/blog-content.css';

export default function BlogPostPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = getPostBySlug(slug);
    const navbarHeight = useNavbarHeight();

    useEffect(() => {
        if (!post) {
            navigate('/blog');
        }
    }, [post, navigate]);

    if (!post) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title={post.title}
                description={post.excerpt}
                keywords={`${post.category}, worship lyrics, church presentation, lyric display, ${post.title}`}
                image={post.image}
                type="article"
                author={post.author}
                publishedTime={post.date}
                category={post.category}
            />
            <Navbar />

            {/* Hero Section */}
            <section className="pb-16 px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-white" style={{ paddingTop: `${navbarHeight + 32}px` }}>
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Back Button */}
                        <button
                            onClick={() => navigate('/blog')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </button>

                        {/* Category Badge */}
                        <div className="mb-4">
                            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                <Tag className="w-4 h-4" />
                                {post.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {post.title}
                        </h1>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                {post.readTime}
                            </span>
                            {post.author && (
                                <span>By {post.author}</span>
                            )}
                        </div>

                        {/* Featured Image */}
                        {post.image && (
                            <div className="rounded-2xl overflow-hidden shadow-2xl mb-8">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Article Content */}
            <article className="py-16 px-6 lg:px-8 bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="blog-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </motion.div>
            </article>

            {/* Share Section */}
            <section className="py-12 px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Found this helpful?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Share this article with your production team
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => {
                                const url = window.location.href;
                                const text = `Check out this article: ${post.title}`;
                                if (navigator.share) {
                                    navigator.share({ title: post.title, text, url });
                                } else {
                                    navigator.clipboard.writeText(url);
                                    alert('Link copied to clipboard!');
                                }
                            }}
                            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                        >
                            Share Article
                        </button>
                        <button
                            onClick={() => navigate('/blog')}
                            className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-colors"
                        >
                            Read More Articles
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-blue-500 to-purple-600">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center text-white"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Ready to elevate your lyric display?
                    </h2>
                    <p className="text-lg mb-8 text-blue-100">
                        Download LyricDisplay and experience professional lyric presentation
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/download"
                            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-200"
                        >
                            Download Now
                        </a>
                        <a
                            href="https://github.com/PeterAlaks/lyric-display-app#readme"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-200"
                        >
                            View Documentation
                        </a>
                    </div>
                </motion.div>
            </section>

            <Footer />
            <BackToTopButton />
        </div>
    );
}