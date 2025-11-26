import React, { useState, useEffect, useRef } from 'react';
import { Download, Github, ArrowLeft, CheckCircle, ArrowRight, BookOpen, ExternalLink, GitBranch, Clock, ChevronDown, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import BackToTopButton from '../components/BackToTopButton';
import Footer from '../components/Footer';
import { useNavbarHeight } from '../hooks/useNavbarHeight';

export default function DownloadPage() {
    const [macOSDropdownOpen, setMacOSDropdownOpen] = useState(false);
    const [releaseData, setReleaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navbarHeight = useNavbarHeight();
    const dropdownRef = useRef(null);

    const fallbackData = {
        version: '5.8.0',
        downloads: {
            windows: 'https://github.com/PeterAlaks/lyric-display-app/releases/download/v5.8.0/LyricDisplay-5.8.0-Windows-Setup.exe',
            macosArm: 'https://github.com/PeterAlaks/lyric-display-app/releases/download/v5.8.0/LyricDisplay-5.8.0-macOS-arm64.dmg',
            macosIntel: 'https://github.com/PeterAlaks/lyric-display-app/releases/download/v5.8.0/LyricDisplay-5.8.0-macOS-x64.dmg',
            linux: 'https://github.com/PeterAlaks/lyric-display-app/releases/download/v5.8.0/LyricDisplay-5.8.0-Linux.AppImage'
        }
    };

    useEffect(() => {
        const CACHE_KEY = 'lyricDisplayReleaseData';
        const CACHE_DURATION = 10 * 60 * 1000;

        const fetchLatestRelease = async () => {
            try {
                const cachedData = localStorage.getItem(CACHE_KEY);
                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData);
                    const age = Date.now() - timestamp;

                    if (age < CACHE_DURATION) {
                        console.log('Using cached release data (age: ' + Math.round(age / 1000 / 60) + ' minutes)');
                        setReleaseData(data);
                        setLoading(false);
                        return;
                    }
                }

                console.log('Fetching fresh release data from GitHub API...');
                const response = await fetch('https://api.github.com/repos/PeterAlaks/lyric-display-app/releases/latest');
                if (!response.ok) throw new Error('Failed to fetch release data');

                const apiData = await response.json();
                const version = apiData.tag_name.replace('v', '');

                const assets = apiData.assets;
                const downloads = {
                    windows: assets.find(a => a.name.includes('Windows') && a.name.endsWith('.exe'))?.browser_download_url || fallbackData.downloads.windows,
                    macosArm: assets.find(a => a.name.includes('macOS') && a.name.includes('arm64'))?.browser_download_url || fallbackData.downloads.macosArm,
                    macosIntel: assets.find(a => a.name.includes('macOS') && a.name.includes('x64'))?.browser_download_url || fallbackData.downloads.macosIntel,
                    linux: assets.find(a => a.name.includes('Linux') && a.name.endsWith('.AppImage'))?.browser_download_url || fallbackData.downloads.linux
                };

                const releaseInfo = { version, downloads };

                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    data: releaseInfo,
                    timestamp: Date.now()
                }));

                setReleaseData(releaseInfo);
            } catch (error) {
                console.error('Error fetching release data:', error);
                setReleaseData(fallbackData);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestRelease();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMacOSDropdownOpen(false);
            }
        };

        if (macOSDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [macOSDropdownOpen]);

    const currentVersion = releaseData?.version || fallbackData.version;
    const downloadLinks = releaseData?.downloads || fallbackData.downloads;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <Navbar isHomePage={false} />

            {/* Header */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white" style={{ paddingTop: `${navbarHeight + 32}px` }}>
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
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col">
                        <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Windows</h2>
                        <p className="text-gray-600 mb-6">Version {currentVersion} (64-bit)</p>
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
                            href={downloadLinks.windows}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Download className="w-5 h-5" />
                            Download v{currentVersion}
                        </a>
                    </div>

                    {/* macOS (Active) */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col">
                        <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>macOS</h2>
                        <p className="text-gray-600 mb-6">Version {currentVersion}</p>
                        <div className="flex-grow space-y-3 mb-8">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Apple Silicon & Intel</span>
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
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setMacOSDropdownOpen(!macOSDropdownOpen)}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                Download v{currentVersion}
                                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${macOSDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 origin-top ${macOSDropdownOpen
                                ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                                }`}>
                                <a
                                    href={downloadLinks.macosArm}
                                    className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Download className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Apple Silicon (M1/M2/M3)</div>
                                        <div className="text-sm text-gray-600">For newer Macs with Apple chips</div>
                                    </div>
                                </a>
                                <a
                                    href={downloadLinks.macosIntel}
                                    className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Download className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Intel Mac</div>
                                        <div className="text-sm text-gray-600">For older Macs with Intel processors</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Linux (Active) */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col">
                        <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Linux</h2>
                        <p className="text-gray-600 mb-6">Version {currentVersion} (AppImage)</p>
                        <div className="flex-grow space-y-3 mb-8">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Universal AppImage</span>
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
                            href={downloadLinks.linux}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Download className="w-5 h-5" />
                            Download v{currentVersion}
                        </a>
                    </div>
                </div>

                {/* Security Warning Disclaimer */}
                <div className="mt-8">
                    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Security Warning Notice</h3>
                                <p className="text-gray-700 mb-3">
                                    The installers are not yet code-signed with official certificates. You will see security warnings when downloading and installing on all platforms. This is expected and safe to proceed.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-700 mb-3">
                                    <li><strong>Windows:</strong> Click "More info" then "Run anyway" when Windows Defender SmartScreen appears.</li>
                                    <li><strong>macOS:</strong> Right-click the app and select "Open", then click "Open" again in the dialog. You may need to allow it in System Settings → Privacy & Security.</li>
                                    <li><strong>Linux:</strong> Make the AppImage executable with <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">chmod +x</code> before running.</li>
                                    <li><strong>Browsers:</strong> Chrome, Edge, or Firefox may warn about uncommon downloads. Click "Keep" or "Keep anyway" to proceed.</li>
                                </ul>
                                <p className="text-sm text-gray-600">
                                    LyricDisplay is open source and safe. You can help by <a href="https://paystack.shop/pay/lyricdisplay-support" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">supporting development</a> to hasten the purchase of code signing certificates and eliminate these warnings.
                                </p>
                            </div>
                        </div>
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