import React, { useState } from 'react';
import { Menu, X, Github, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/images/LyricDisplay logo.png';

export default function Navbar({ isHomePage = false }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [bannerVisible, setBannerVisible] = useState(true);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const handleDismissBanner = () => {
        setBannerVisible(false);
    };

    const navLinks = [
        { href: '/#integration', label: 'Integration' },
        { href: '/#outputs', label: 'Outputs' },
        { href: '/#advantages', label: 'Advantages' },
        { href: '/#features', label: 'Features' },
        { href: '/#use-cases', label: 'Use Cases' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40"
        >
            {/* Review Banner */}
            <AnimatePresence>
                {bannerVisible && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-blue-500 text-white overflow-hidden"
                    >
                        <div className="relative py-3 px-4">
                            <div className="max-w-7xl mx-auto text-center">
                                <p className="text-sm font-medium pr-8">
                                    How's your LyricDisplay experience been?{' '}
                                    <Link
                                        to="/feedback"
                                        className="underline hover:text-blue-100 transition-colors"
                                    >
                                        Let us know
                                    </Link>
                                </p>
                            </div>
                            <button
                                onClick={handleDismissBanner}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-100 transition-colors"
                                aria-label="Dismiss banner"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <a href="/" className="flex items-center gap-3">
                        <img src={logo} alt="LyricDisplay" className="h-8" />
                    </a>

                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="https://github.com/PeterAlaks/lyric-display-app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="/download"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                        >
                            <Download className="w-5 h-5" />
                            Download
                        </a>
                    </div>

                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed right-0 w-64 bg-white shadow-xl transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{
                    top: bannerVisible ? '124px' : '80px',
                    height: bannerVisible ? 'calc(100vh - 124px)' : 'calc(100vh - 80px)'
                }}
            >
                <div className="flex flex-col p-8 gap-6 h-full overflow-y-auto">
                    {navLinks.map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={toggleMobileMenu}
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="https://github.com/PeterAlaks/lyric-display-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={toggleMobileMenu}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors py-2"
                    >
                        <Github className="w-5 h-5" />
                        GitHub
                    </a>
                    <a
                        href="/download"
                        onClick={toggleMobileMenu}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-200"
                    >
                        Download
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}