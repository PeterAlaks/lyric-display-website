import React, { useState } from 'react';
import { Download, Github, ExternalLink, Monitor, Zap, Palette, Globe2, Smartphone, RefreshCw, Church, Video, Mic2, Music, Check, Tv, Play, Gauge, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import BackToTopButton from '../components/BackToTopButton';
import heroLeft from '../assets/images/hero-img-left.png';
import heroRight from '../assets/images/hero-img-right.png';
import logoWhite from '../assets/images/LyricDisplay logo-white.png';
import streamDisplay from '../assets/images/stream-display.jpg';
import auditoriumDisplay from '../assets/images/auditorium-display.jpg';
import stageDisplay from '../assets/images/stage-display.jpg';
import laptopCutout from '../assets/images/laptop-app-display-cutout.jpg';
import phoneHandMockup from '../assets/images/phone-hand-display-mockup.png';

export default function LyricDisplayLanding() {

    // Smooth scroll handler
    React.useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

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

    return (
        <div className="min-h-screen bg-white scroll-smooth">
            {/* Navigation */}
            <Navbar isHomePage={true} />

            {/* Hero Section */}
            <section className="pt-40 pb-0 relative overflow-hidden">
                <div className="max-w-7xl mx-auto pb-64 md:pb-120 lg:pb-20 lg:pt-8 px-6 lg:px-8">
                    {/* Right Image - Desktop only */}
                    <motion.div
                        initial={{ opacity: 0, x: 150 }}
                        animate={{
                            opacity: 1,
                            x: typeof window !== 'undefined' && window.innerWidth >= 1440
                                ? '40%'
                                : typeof window !== 'undefined' && window.innerWidth >= 1280
                                    ? '55%'
                                    : typeof window !== 'undefined' && window.innerWidth >= 1024
                                        ? '75%'
                                        : 0
                        }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden lg:block absolute right-0 bottom-0 h-[320px] w-auto"
                    >
                        <img
                            src={heroRight}
                            alt="Live performance"
                            className="w-full h-full object-cover rounded-t-3xl shadow-2xl"
                            style={{ objectPosition: 'center' }}
                        />
                    </motion.div>

                    {/* Center Content */}
                    <div className="text-center max-w-5xl mx-auto relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="tracking-tighter leading-tight text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            Professional lyric display
                            <br />
                            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                for live productions
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-base md:text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
                        >
                            Transform your worship services, concerts, and live streams with crystal-clear, synchronized lyrics across multiple displays. Seamlessly integrates with OBS, vMix, Wirecast, and any browser-source compatible software.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-row gap-3 sm:gap-4 justify-center items-center mb-8"
                        >
                            <a href="/download" className="flex-1 sm:flex-initial bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-8 py-4 rounded-xl font-semibold text-sm sm:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap">
                                <Download className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                <span className="truncate">Download</span>
                            </a>
                            <a href="https://github.com/PeterAlaks/lyric-display-app" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial bg-white text-gray-900 px-4 sm:px-8 py-4 rounded-xl font-semibold text-sm sm:text-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap">
                                <Github className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                <span className="truncate">View on GitHub</span>
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-6 text-sm text-gray-500"
                        >
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                Windows 10/11
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                Auto-Updates
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                No Subscription
                            </div>
                        </motion.div>
                    </div>

                    {/* Left Image - Now after content, and responsive */}
                    <motion.div
                        initial={{ opacity: 0, x: -150 }}
                        animate={{
                            opacity: 1,
                            x: typeof window !== 'undefined' && window.innerWidth >= 1440
                                ? '-40%'
                                : typeof window !== 'undefined' && window.innerWidth >= 1280
                                    ? '-55%'
                                    : typeof window !== 'undefined' && window.innerWidth >= 1024
                                        ? '-75%'
                                        : 0
                        }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="absolute bottom-0 left-0 w-full lg:left-0 lg:bottom-0 lg:h-[320px] lg:w-auto"
                    >
                        <img
                            src={heroLeft}
                            alt="Live worship service"
                            className="w-full h-full object-cover rounded-t-3xl lg:rounded-t-3xl shadow-2xl"
                            style={{ objectPosition: 'center' }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Integration Section */}
            <section id="integration" className="py-24 px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl tracking-tight md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Works with Your Favorite Tools
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            LyricDisplay seamlessly integrates with industry-leading streaming and production software through browser source compatibility. Set up in minutes and start displaying professional lyrics instantly.
                        </p>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid md:grid-cols-3 gap-8 mb-8">
                        {[
                            { name: 'OBS Studio', description: 'The world\'s most popular free streaming software. Add LyricDisplay as a browser source with transparent backgrounds for perfect overlay integration.' },
                            { name: 'vMix', description: 'Professional live production software trusted by broadcasters worldwide. Use LyricDisplay web browser inputs for multi-camera worship productions.' },
                            { name: 'Wirecast', description: 'Industry-standard live video streaming platform. Integrate LyricDisplay through web display sources for broadcast-quality lyric overlays.' }
                        ].map((app, i) => (
                            <motion.div key={i} variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{app.name}</h3>
                                <p className="text-gray-600 leading-relaxed">{app.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div {...fadeInUp} className="text-center mb-8">
                        <p className="text-gray-500 text-sm italic">
                            Plus any browser-source compatible software—LyricDisplay works with any streaming or production software that supports browser sources, giving you ultimate flexibility in your workflow.
                        </p>
                    </motion.div>

                    <motion.div {...fadeInUp} className="text-center">
                        <a
                            href="/integration-guide"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200"
                        >
                            <BookOpen className="w-5 h-5" />
                            View Integration Guide
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Three Outputs Section */}
            <section id="outputs" className="py-24 px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl tracking-tight md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Three Independent Outputs, One Control Panel
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Run up to three completely independent display outputs simultaneously—all synchronized in perfect real-time from a single control interface. Configure unique styling, positioning, and content for streaming overlays, in-house displays, and stage monitors.
                        </p>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Output 1: Stream Display', img: streamDisplay, desc: 'Transparent browser source overlay for OBS, vMix, or Wirecast with custom branding and styling' },
                            { name: 'Output 2: Auditorium Display', img: auditoriumDisplay, desc: 'Full-screen in-house projection with independent font sizing and positioning for congregation viewing' },
                            { name: 'Stage Monitor', img: stageDisplay, desc: 'Performer-focused display with high contrast and optimized readability for stage confidence monitoring' }
                        ].map((output, i) => (
                            <motion.div key={i} variants={fadeInUp} className="group">
                                <div className="relative overflow-hidden rounded-2xl shadow-lg mb-4 aspect-video">
                                    <img src={output.img} alt={output.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{output.name}</h3>
                                <p className="text-gray-600 text-sm">{output.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose LyricDisplay Section */}
            <section id="advantages" className="pt-10 pb-24 px-0 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-stretch">
                        <motion.div {...fadeInUp} className="py-0">
                            <h2 className="text-4xl tracking-tight leading-tight md:text-5xl font-bold text-gray-900 mb-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                Outperforming Traditional Solutions
                            </h2>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Lightning-Fast Performance</h3>
                                        <p className="text-gray-600">Built with Electron and React for native-like speed. Instant response times and real-time updates with zero lag—critical for live production environments.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <Gauge className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Incredibly Lightweight</h3>
                                        <p className="text-gray-600">Minimal CPU and memory footprint means your production PC stays responsive. Run multiple outputs without impacting stream quality or recording performance.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <Tv className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Crystal-Clear Browser Source</h3>
                                        <p className="text-gray-600">No chroma keying, alpha channels, or video capture needed. Browser source integration delivers pixel-perfect clarity without the performance drain of traditional video sources.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <Play className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>True Real-Time Control</h3>
                                        <p className="text-gray-600">Socket.io-powered synchronization ensures every display updates the instant you click. No refresh delays, no manual syncing—just seamless, professional control.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Laptop Image - Absolute positioned to fill right half */}
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="hidden lg:block absolute right-0 top-0 bottom-0 w-2/5"
                        >
                            <img src={laptopCutout} alt="LyricDisplay Control Panel" className="w-full h-full object-cover object-left" />
                        </motion.div>
                    </div>
                </div>
            </section>





            {/* Features Section */}
            <section id="features" className="py-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-20">
                        <h2 className="tracking-tight text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Everything You Need for Professional Presentations
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Packed with powerful features designed specifically for live production environments, churches, and professional events.
                        </p>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: <Monitor className="w-8 h-8" />, title: 'Dual Independent Outputs', description: 'Run two separate displays with individual styling and positioning—perfect for in-house screens and broadcast overlays.' },
                            { icon: <Zap className="w-8 h-8" />, title: 'Real-Time Synchronization', description: 'Instant updates across all displays powered by Socket.io. Zero lag, zero delays—built for live production.' },
                            { icon: <Palette className="w-8 h-8" />, title: 'Advanced Styling Engine', description: '13 professional fonts, full typography controls, colors, shadows, borders, and precise positioning.' },
                            { icon: <Globe2 className="w-8 h-8" />, title: 'Multi-Language Support', description: 'Display translations alongside primary lyrics with intelligent grouping for multilingual services.' },
                            { icon: <Smartphone className="w-8 h-8" />, title: 'Mobile Controllers', description: 'Authorize devices with 6-digit codes. Remote operators can trigger lines and submit drafts for approval.' },
                            { icon: <RefreshCw className="w-8 h-8" />, title: 'Seamless Auto-Updates', description: 'Automatic background updates via GitHub. New features and fixes install without disrupting workflow.' }
                        ].map((feature, i) => (
                            <motion.div key={i} variants={fadeInUp} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 group">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Use Cases */}
            <section id="use-cases" className="py-24 px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-20">
                        <h2 className="tracking-tight text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Trusted by Communities Worldwide
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            From intimate worship gatherings to large-scale productions, LyricDisplay adapts to your unique needs.
                        </p>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid md:grid-cols-2 gap-8">
                        {[
                            { icon: <Church className="w-12 h-12" />, title: 'Church Worship Services', description: 'Synchronized lyrics for in-house and online viewing with multi-language support and mobile team control.', benefits: ['Multi-language support', 'Quick song switching', 'In-house & online sync', 'Mobile team control'] },
                            { icon: <Video className="w-12 h-12" />, title: 'Live Streaming & Broadcasting', description: 'Professional-grade overlays for OBS, vMix, and Wirecast with custom branding and broadcast quality.', benefits: ['Transparent overlays', 'Brand customization', 'Multi-camera support', 'Broadcast quality'] },
                            { icon: <Mic2 className="w-12 h-12" />, title: 'Concerts & Live Events', description: 'Multi-screen coordination with custom styling, zero-lag performance, and venue-wide scalability.', benefits: ['Multi-screen coordination', 'Custom branding', 'Zero-lag performance', 'Scalable solution'] },
                            { icon: <Music className="w-12 h-12" />, title: 'Karaoke & Entertainment', description: 'Full LRC support for timed lyrics with easy queue management and crystal-clear display.', benefits: ['LRC file support', 'Timed synchronization', 'Song queue management', 'Crystal-clear display'] }
                        ].map((useCase, i) => (
                            <motion.div key={i} variants={fadeInUp} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6">
                                    {useCase.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{useCase.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">{useCase.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {useCase.benefits.map((benefit, j) => (
                                        <span key={j} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{benefit}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Mobile Controllers Section */}
            <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden min-h-[600px]">
                {/* Phone Image - Absolute positioned at bottom left - Hidden on tablets and below */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    // MODIFIED: 'hidden lg:block' changed to 'hidden xl:block' (for large desktops 1280px+)
                    className="hidden xl:block absolute bottom-0 left-0 w-full h-full max-h-[600px]"
                >
                    <img src={phoneHandMockup} alt="Mobile Controller" className="absolute bottom-0 left-0 h-full w-auto object-contain object-bottom-left" />
                </motion.div>

                {/* Smaller phone image for medium desktops (1024-1280px) */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    // MODIFIED: 'hidden md:block lg:hidden' changed to 'hidden lg:block xl:hidden'
                    // This hides it on tablet (md) and shows it only on medium desktops (lg)
                    className="hidden lg:block xl:hidden absolute bottom-0 left-0 w-full h-full max-h-[500px]"
                >
                    <img src={phoneHandMockup} alt="Mobile Controller" className="absolute bottom-0 left-0 h-[80%] w-auto object-contain object-bottom-left" />
                </motion.div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Empty space for image on desktop */}
                        <div className="hidden md:block"></div>

                        <motion.div {...fadeInUp}>
                            <h2 className="text-4xl tracking-tight md:text-5xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                Control from Anywhere with Mobile Devices
                            </h2>
                            <p className="text-xl text-gray-300 mb-8">
                                Empower your team with secure mobile and tablet controllers. Authorize any device with a simple 6-digit code and enable distributed control across your production team.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <p className="text-gray-300">Trigger lyric lines remotely from anywhere in your venue</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <p className="text-gray-300">Toggle outputs on and off for seamless transitions</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <p className="text-gray-300">Submit lyric drafts for desktop approval workflow</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <p className="text-gray-300">Secure authentication with rotating join codes</p>
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm">
                                Perfect for worship teams, stage managers, and production crews who need flexible, reliable remote control without complex network configuration.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="download" className="py-24 px-6 lg:px-8 bg-gradient-to-br from-blue-500 to-purple-600">
                <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="tracking-tight text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Ready to Transform Your Presentations?
                    </h2>
                    <p className="text-lg md:text-2xl mb-10 text-blue-100 leading-relaxed">
                        Join thousands of worship leaders, event producers, and content creators who trust LyricDisplay for their live productions. Download now and experience professional lyric display at its finest—completely free.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="/download"
                            className="w-full sm:w-auto bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Download className="w-5 h-5" />
                            Download
                        </a>
                        <a
                            href="https://github.com/PeterAlaks/lyric-display-app#readme"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <ExternalLink className="w-5 h-5" />
                            View Documentation
                        </a>
                    </div>
                    <p className="text-sm text-blue-100 mt-8">
                        Windows 10/11 (64-bit) • Free & Open Source • MIT License
                    </p>
                </motion.div>
            </section>

            {/* Footer */}
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
                            <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Product</h4>
                            <ul className="space-y-2">
                                <li><a href="#integration" className="hover:text-white transition-colors">Integration</a></li>
                                <li><a href="#outputs" className="hover:text-white transition-colors">Outputs</a></li>
                                <li><a href="#advantages" className="hover:text-white transition-colors">Advantages</a></li>
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a></li>
                                <li><a href="/download" className="hover:text-white transition-colors">Download</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Resources</h4>
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
            <BackToTopButton />
        </div>
    );
}