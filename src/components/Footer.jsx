import React from 'react';
import { Github } from 'lucide-react';
import logoWhite from '../assets/images/LyricDisplay logo-white.png';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-16 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <a href="/">
                                <img src={logoWhite} alt="LyricDisplay" className="h-8" />
                            </a>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                            Professional real-time lyric display application for live events, church services, and multimedia presentations. Built with passion by Peter Alakembi and David Okaliwe.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/PeterAlaks/lyric-display-app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Product
                        </h4>
                        <ul className="space-y-2">
                            <li><a href="/#integration" className="hover:text-white transition-colors">Integration</a></li>
                            <li><a href="/#outputs" className="hover:text-white transition-colors">Outputs</a></li>
                            <li><a href="/#advantages" className="hover:text-white transition-colors">Advantages</a></li>
                            <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="/#use-cases" className="hover:text-white transition-colors">Use Cases</a></li>
                            <li><a href="/download" className="hover:text-white transition-colors">Download</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Resources
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://github.com/PeterAlaks/lyric-display-app#readme"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/PeterAlaks/lyric-display-app/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    Support
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://linktr.ee/peteralaks"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://paystack.shop/pay/lyricdisplay-support"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    Support Development
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm">
                    <p>© 2025 LyricDisplay. All Rights Reserved. Designed and developed by Peter Alakembi and David Okaliwe.</p>
                </div>
            </div>
        </footer>
    );
}