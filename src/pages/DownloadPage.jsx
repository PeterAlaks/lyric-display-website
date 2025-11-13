import React from 'react';
import { Download, Github, ArrowLeft, CheckCircle, ArrowRight, BookOpen, ExternalLink, GitBranch, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import BackToTopButton from '../components/BackToTopButton';
import Footer from '../components/Footer';

export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Navbar */}
            <Navbar isHomePage={false} />

            {/* Header */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
                <div className="max-w-5xl mx-auto px-6 py-12">
                    <a href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </a>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Downloads
                    </h1>
                    <p className="text-md text-blue-100">
                        Get the latest stable release of LyricDisplay for your platform
                    </p>
                </div>
            </div>

            {/* Download Options */}
            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Windows (Active) */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-500 flex flex-col">
                        <div className="flex-shrink-0 mb-4">
                            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                Latest Version
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Windows</h2>
                        <p className="text-gray-600 mb-6">Version 5.7.0 (64-bit)</p>
                        <div className="flex-grow space-y-3 mb-8">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Windows 10 / 11</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Auto-Updates</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Free & Open Source</span>
                            </div>
                        </div>
                        <a
                            href="https://mega.nz/file/hyIE0DLa#Br_7L0pJ5TtceaHb7xUCF-7rmDNTNHC5_ZofT_sADKE"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Download className="w-5 h-5" />
                            Download v5.7.0
                        </a>
                    </div>

                    {/* macOS (Coming Soon) */}
                    <div className="bg-gray-100 p-8 rounded-2xl border border-gray-200 flex flex-col opacity-70">
                        <div className="flex-shrink-0 mb-4">
                            <span className="inline-block bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                                Coming Soon
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold mb-2 text-gray-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>macOS</h2>
                        <p className="text-gray-500 mb-6">Apple Silicon & Intel</p>
                        <div className="flex-grow space-y-3 mb-8">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>In development</span>
                            </div>
                        </div>
                        <button
                            disabled
                            className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 cursor-not-allowed"
                        >
                            <Download className="w-5 h-5" />
                            Coming Soon
                        </button>
                    </div>

                    {/* Linux (Coming Soon) */}
                    <div className="bg-gray-100 p-8 rounded-2xl border border-gray-200 flex flex-col opacity-70">
                        <div className="flex-shrink-0 mb-4">
                            <span className="inline-block bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                                Coming Soon
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold mb-2 text-gray-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Linux</h2>
                        <p className="text-gray-500 mb-6">.deb / .AppImage</p>
                        <div className="flex-grow space-y-3 mb-8">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>In development</span>
                            </div>
                        </div>
                        <button
                            disabled
                            className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 cursor-not-allowed"
                        >
                            <Download className="w-5 h-5" />
                            Coming Soon
                        </button>
                    </div>
                </div>
            </div>

            {/* Other Resources */}
            <div className="max-w-5xl mx-auto px-6 pb-16">
                <div className="border-t border-gray-200 pt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Other Resources
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <a href="https://github.com/PeterAlaks/lyric-display-app#readme" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group">
                            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">View Documentation</h3>
                                <p className="text-sm text-gray-600">Read the official README on GitHub for setup and features.</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-purple-600 transition-colors" />
                        </a>
                        <a href="https://github.com/PeterAlaks/lyric-display-app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group">
                            <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                                <GitBranch className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">Source Code</h3>
                                <p className="text-sm text-gray-600">Access the full source code on GitHub to contribute or audit.</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-green-600 transition-colors" />
                        </a>
                    </div>
                </div>
            </div>


            {/* Footer CTA */}
            <div className="bg-gray-900 text-white py-16 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Need More Help?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Check out our video tutorial or reach out for technical support
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://drive.google.com/file/d/1fP4fSSWSNvSocI8fK7hktdJ7dY6xnCM-/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                            <BookOpen className="w-5 h-5" />
                            Watch Video Tutorial
                        </a>
                        <a href="https://linktr.ee/peteralaks" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all">
                            <ExternalLink className="w-5 h-5" />
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />

            {/* Back to Top */}
            <BackToTopButton />
        </div>
    );
}