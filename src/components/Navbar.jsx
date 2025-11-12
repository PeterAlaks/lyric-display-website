import React, { useState } from 'react';
import { Menu, X, Github, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/images/LyricDisplay logo.png';

export default function Navbar({ isHomePage = false }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    // Use relative links for home page, absolute for others
    const prefix = isHomePage ? '' : '/';

    const navLinks = [
        { href: '#features', label: 'Features' },
                { href: '#integration', label: 'Integration' },
        { href: '#outputs', label: 'Outputs' },
        { href: '#use-cases', label: 'Use Cases' },
        { href: '/download', label: 'Download' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <a href="/" className="flex items-center gap-3">
                        <img src={logo} alt="LyricDisplay" className="h-8" />
                    </a>

                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a key={link.label} href={link.href.startsWith('/') ? link.href : `${prefix}${link.href}`} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                                {link.label}
                            </a>
                        ))}
                        <a href="https://github.com/PeterAlaks/lyric-display-app" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="/download" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 whitespace-nowrap">
                            <Download className="w-5 h-5" />
                            Download Now
                        </a>
                    </div>

                    <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed top-20 right-0 w-64 h-[calc(100vh-80px)] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col p-8 gap-6 h-full overflow-y-auto">
                    {navLinks.map(link => (
                        <a key={link.label} href={link.href.startsWith('/') ? link.href : `${prefix}${link.href}`} onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2">
                            {link.label}
                        </a>
                    ))}
                    <a href="https://github.com/PeterAlaks/lyric-display-app" target="_blank" rel="noopener noreferrer" onClick={toggleMobileMenu} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors py-2">
                        <Github className="w-5 h-5" />
                        GitHub
                    </a>
                    <a href="/download" onClick={toggleMobileMenu} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-200">
                        Download Now
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}