import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';
import SEO from '../components/SEO';
import { getAllPosts, getAllCategories } from '../utils/blogLoader';
import { useNavbarHeight } from '../hooks/useNavbarHeight';

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const navbarHeight = useNavbarHeight();

    const blogPosts = useMemo(() => getAllPosts(), []);
    const categories = useMemo(() => getAllCategories(), []);

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        initial: {},
        whileInView: { transition: { staggerChildren: 0.1 } },
        viewport: { once: true, margin: "-100px" }
    };

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Blog - Expert Guides & Tips for Lyric Display"
                description="Expert insights, tips, and guides for mastering lyric presentation in live productions, church worship, and streaming. Learn about multi-output displays, OBS integration, and more."
                keywords="lyric display blog, worship presentation tips, OBS lyrics guide, church tech blog, live streaming lyrics, worship software tutorials"
            />
            <Navbar />

            {/* Hero Section */}
            <section className="pb-16 px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-white" style={{ paddingTop: `${navbarHeight + 90}px` }}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            LyricDisplay <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Blog</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Expert insights, tips, and guides for mastering lyric presentation in live productions and streaming
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section
                className="py-5 px-6 lg:px-8 bg-white border-b border-gray-100 sticky z-40"
                style={{ top: `${navbarHeight}px` }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategory === category
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {filteredPosts.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-20"
                        >
                            <p className="text-xl text-gray-500">No articles found matching your criteria.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={selectedCategory + searchQuery}
                            initial="initial"
                            animate="whileInView"
                            variants={staggerContainer}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredPosts.map((post) => (
                                <motion.article
                                    key={post.id}
                                    variants={fadeInUp}
                                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                    onClick={() => window.location.href = `/blog/${post.slug}`}
                                >
                                    {/* Post Image */}
                                    <div className="relative h-48 overflow-hidden bg-gray-100">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                <Tag className="w-3 h-3" />
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Post Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {post.readTime}
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-200">
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-blue-500 to-purple-600">
                <motion.div
                    {...fadeInUp}
                    className="max-w-4xl mx-auto text-center text-white"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Stay Updated
                    </h2>
                    <p className="text-lg mb-8 text-blue-100">
                        Get the latest tips, guides, and updates delivered to your inbox
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                        <input
    type="email"
    placeholder="Enter your email"
    className="flex-1 px-6 py-4 rounded-xl
               bg-white/20 border border-white/50
               text-gray-900 placeholder-white/70
               focus:bg-white focus:text-gray-900
               focus:border-white focus:outline-none
               focus:ring-2 focus:ring-white
               transition-all duration-200"
/>
                        <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-200">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-sm text-blue-100 mt-4">
                        No spam. Unsubscribe anytime.
                    </p>
                </motion.div>
            </section>

            <Footer />
            <BackToTopButton />
        </div>
    );
}
