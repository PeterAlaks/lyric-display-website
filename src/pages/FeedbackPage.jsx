import React, { useState } from 'react';
import { Star, Send, ExternalLink, AlertCircle, MessageSquare, Bug } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';

export default function FeedbackPage() {
    const [activeTab, setActiveTab] = useState('review');
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        email: '',
        platform: '',
        description: ''
    });
    const [issueData, setIssueData] = useState({
        name: '',
        email: '',
        platform: '',
        issueType: '',
        description: ''
    });
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (activeTab === 'review') {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setIssueData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ type: 'loading', message: 'Submitting...' });

        try {
            const formElement = e.target;
            const formDataToSend = new FormData(formElement);

            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formDataToSend).toString()
            });

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Thank you for your review! We\'ll review it and publish it soon.'
                });
                setFormData({ name: '', organization: '', email: '', platform: '', description: '' });
                setRating(0);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Something went wrong. Please try again or contact us directly.'
            });
        }
    };

    const handleIssueSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ type: 'loading', message: 'Submitting...' });

        try {
            const formElement = e.target;
            const formDataToSend = new FormData(formElement);

            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formDataToSend).toString()
            });

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Thank you for reporting this issue! We\'ll look into it as soon as possible.'
                });
                setIssueData({ name: '', email: '', platform: '', issueType: '', description: '' });
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Something went wrong. Please try again or contact us directly.'
            });
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-52 pb-24 px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-12">
                        <h1 className="text-4xl tracking-tight md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            We'd love to hear from you
                        </h1>
                        <p className="text-lg text-gray-600">
                            Share your experience or report any issues you've encountered
                        </p>
                    </motion.div>

                    {/* Tab Switcher */}
                    <motion.div {...fadeInUp} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 mb-8">
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => {
                                    setActiveTab('review');
                                    setSubmitStatus({ type: '', message: '' });
                                }}
                                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'review'
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <MessageSquare className="w-5 h-5" />
                                Leave a Review
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('issues');
                                    setSubmitStatus({ type: '', message: '' });
                                }}
                                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'issues'
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Bug className="w-5 h-5" />
                                Report an Issue
                            </button>
                        </div>
                    </motion.div>

                    {/* Status Message */}
                    {submitStatus.message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-6 p-4 rounded-xl ${submitStatus.type === 'success'
                                ? 'bg-green-50 text-green-800 border border-green-200'
                                : submitStatus.type === 'error'
                                    ? 'bg-red-50 text-red-800 border border-red-200'
                                    : 'bg-blue-50 text-blue-800 border border-blue-200'
                                }`}
                        >
                            {submitStatus.message}
                        </motion.div>
                    )}

                    {/* Review Form */}
                    {activeTab === 'review' && (
                        <motion.div
                            key="review"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
                        >
                            <form onSubmit={handleReviewSubmit} name="reviews" method="POST" data-netlify="true" netlify-honeypot="bot-field">
                                <input type="hidden" name="form-name" value="reviews" />
                                <input type="hidden" name="bot-field" />
                                <input type="hidden" name="rating" value={rating} />

                                {/* Star Rating */}
                                <div className="mb-8">
                                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                                        Rate your experience *
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                className="transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`w-10 h-10 ${star <= (hoveredRating || rating)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Name */}
                                <div className="mb-6">
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Organization */}
                                <div className="mb-6">
                                    <label htmlFor="organization" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Organization Name <span className="text-gray-500 font-normal">(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="organization"
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Your Church or Organization"
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-6">
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Platform */}
                                <div className="mb-6">
                                    <label htmlFor="platform" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Platform *
                                    </label>
                                    <select
                                        id="platform"
                                        name="platform"
                                        value={formData.platform}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                                    >
                                        <option value="">Select your platform</option>
                                        <option value="Windows">Windows</option>
                                        <option value="macOS">macOS</option>
                                        <option value="Linux">Linux</option>
                                    </select>
                                </div>

                                {/* Review Description */}
                                <div className="mb-6">
                                    <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Your Review *
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Tell us about your experience with LyricDisplay..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={rating === 0 || submitStatus.type === 'loading'}
                                    className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Submit Review
                                </button>
                            </form>

                            {/* CTA Section */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="bg-blue-50 rounded-xl p-6">
                                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-blue-500" />
                                        Have feature suggestions?
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Join the discussion on the OBS Forum to share your ideas and connect with other users.
                                    </p>
                                    <a
                                        href="https://obsproject.com/forum/threads/lyricdisplay-professional-lyrics-overlay-for-production-streaming-software.191349/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors"
                                    >
                                        Join Discussion
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Issue Report Form */}
                    {activeTab === 'issues' && (
                        <motion.div
                            key="issues"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
                        >
                            <form onSubmit={handleIssueSubmit} name="issues" method="POST" data-netlify="true" netlify-honeypot="bot-field">
                                <input type="hidden" name="form-name" value="issues" />
                                <input type="hidden" name="bot-field" />

                                {/* Name */}
                                <div className="mb-6">
                                    <label htmlFor="issue-name" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="issue-name"
                                        name="name"
                                        value={issueData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-6">
                                    <label htmlFor="issue-email" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="issue-email"
                                        name="email"
                                        value={issueData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Platform */}
                                <div className="mb-6">
                                    <label htmlFor="issue-platform" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Platform *
                                    </label>
                                    <select
                                        id="issue-platform"
                                        name="platform"
                                        value={issueData.platform}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                                    >
                                        <option value="">Select your platform</option>
                                        <option value="Windows">Windows</option>
                                        <option value="macOS">macOS</option>
                                        <option value="Linux">Linux</option>
                                    </select>
                                </div>

                                {/* Issue Type */}
                                <div className="mb-6">
                                    <label htmlFor="issueType" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Issue Type *
                                    </label>
                                    <select
                                        id="issueType"
                                        name="issueType"
                                        value={issueData.issueType}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                                    >
                                        <option value="">Select issue type</option>
                                        <option value="Bug">Bug / Error</option>
                                        <option value="Performance">Performance Issue</option>
                                        <option value="UI/UX">UI/UX Problem</option>
                                        <option value="Compatibility">Compatibility Issue</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Issue Description */}
                                <div className="mb-6">
                                    <label htmlFor="issue-description" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Describe the Issue *
                                    </label>
                                    <textarea
                                        id="issue-description"
                                        name="description"
                                        value={issueData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Please provide as much detail as possible, including steps to reproduce the issue..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={submitStatus.type === 'loading'}
                                    className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Submit Issue Report
                                </button>
                            </form>

                            {/* CTA Section */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="bg-orange-50 rounded-xl p-6">
                                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-orange-500" />
                                        Need immediate help?
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        You can also submit issues directly on GitHub or get help from the community on the OBS Forum.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <a
                                            href="https://github.com/PeterAlaks/lyric-display-app/issues"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
                                        >
                                            GitHub Issues
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                        <a
                                            href="https://obsproject.com/forum/threads/lyricdisplay-professional-lyrics-overlay-for-production-streaming-software.191349/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors"
                                        >
                                            OBS Forum
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
            <BackToTopButton />
        </div>
    );
}