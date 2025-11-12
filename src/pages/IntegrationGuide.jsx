import React, { useState } from 'react';
import { ArrowLeft, Monitor, Github, Video, Cast, Check, Copy, AlertCircle, BookOpen, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import BackToTopButton from '../components/BackToTopButton';
import logoWhite from '../assets/images/LyricDisplay logo-white.png';

export default function IntegrationGuide() {
    const [activeTab, setActiveTab] = useState('obs');
    const [copied, setCopied] = useState('');

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(''), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <Navbar isHomePage={false} />

            {/* Header */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
                <div className="max-w-5xl mx-auto px-6 py-12">
                    <a href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </a>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Integration Instructions
                    </h1>
                    <p className="text-xl text-blue-100">
                        Step-by-step guide to connect LyricDisplay with your production software
                    </p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex gap-8 overflow-x-auto">
                        <TabButton
                            active={activeTab === 'obs'}
                            onClick={() => setActiveTab('obs')}
                            icon={<Monitor className="w-5 h-5" />}
                            label="OBS Studio"
                        />
                        <TabButton
                            active={activeTab === 'vmix'}
                            onClick={() => setActiveTab('vmix')}
                            icon={<Video className="w-5 h-5" />}
                            label="vMix"
                        />
                        <TabButton
                            active={activeTab === 'wirecast'}
                            onClick={() => setActiveTab('wirecast')}
                            icon={<Cast className="w-5 h-5" />}
                            label="Wirecast"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                {activeTab === 'obs' && <OBSGuide copyToClipboard={copyToClipboard} copied={copied} />}
                {activeTab === 'vmix' && <VmixGuide copyToClipboard={copyToClipboard} copied={copied} />}
                {activeTab === 'wirecast' && <WirecastGuide copyToClipboard={copyToClipboard} copied={copied} />}
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

function TabButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${active
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
        >
            {icon}
            {label}
        </button>
    );
}

function OBSGuide({ copyToClipboard, copied }) {
    return (
        <div className="space-y-12">
            <Section title="Overview">
                <p className="text-gray-700 leading-relaxed">
                    LyricDisplay integrates with OBS Studio through a browser source. This creates a transparent overlay layer that displays lyrics over your video feed. You can choose between same-computer setup (easiest) or network setup (for different computers).
                </p>
            </Section>

            <Section title="Option 1: Same Computer Setup" badge="Recommended">
                <p className="text-gray-600 mb-6">
                    Both LyricDisplay and OBS running on one computer. Perfect for most streaming setups.
                </p>

                <Steps>
                    <Step number={1}>
                        In OBS, click the <strong>+</strong> button under "Sources"
                    </Step>
                    <Step number={2}>
                        Choose <strong>Browser</strong> from the list
                    </Step>
                    <Step number={3}>
                        Name it <code className="bg-gray-100 px-2 py-1 rounded text-sm">Lyrics Output 1</code>
                    </Step>
                    <Step number={4}>
                        Copy and paste this URL:
                        <CodeBlock
                            code="http://localhost:4000/#/output1"
                            onCopy={() => copyToClipboard('http://localhost:4000/#/output1', 'obs-local')}
                            copied={copied === 'obs-local'}
                        />
                    </Step>
                    <Step number={5}>
                        Set these values:
                        <div className="grid grid-cols-3 gap-4 mt-3">
                            <SettingBox label="Width" value="1920" />
                            <SettingBox label="Height" value="1080" />
                            <SettingBox label="FPS" value="30" />
                        </div>
                    </Step>
                    <Step number={6}>
                        Check these two boxes:
                        <ul className="mt-3 space-y-2">
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Shutdown source when not visible</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Refresh browser when scene becomes active</span>
                            </li>
                        </ul>
                        <AlertBox type="warning" className="mt-4">
                            <strong>Note for Low-End PCs:</strong> "Refresh browser when scene becomes active" may cause brief white flashes when switching scenes on computers with limited resources. If you experience this, uncheck this option.
                        </AlertBox>
                    </Step>
                    <Step number={7}>
                        Click <strong>OK</strong>. The source is ready!
                    </Step>
                </Steps>

                <AlertBox type="success" className="mt-6">
                    <strong>Testing:</strong> Load lyrics in LyricDisplay (Ctrl+O), click any line, and it appears in OBS!
                </AlertBox>
            </Section>

            <Section title="Option 2: Network Setup" badge="Different Computers">
                <p className="text-gray-600 mb-6">
                    LyricDisplay on one computer, OBS on another. Both must be on the same network (connected to the same router/WiFi).
                </p>

                <SubSection title="On the LyricDisplay Computer:">
                    <Steps>
                        <Step number={1}>
                            Find your computer's network address:
                            <ul className="mt-3 space-y-2 text-sm">
                                <li>• Press <kbd>Win + R</kbd>, type <code className="bg-gray-100 px-2 py-1 rounded">cmd</code>, press Enter</li>
                                <li>• Type <code className="bg-gray-100 px-2 py-1 rounded">ipconfig</code> and press Enter</li>
                                <li>• Look for "IPv4 Address" (usually looks like 192.168.1.100)</li>
                            </ul>
                        </Step>
                        <Step number={2}>
                            Make this address permanent (Set Static IP):
                            <ul className="mt-3 space-y-2 text-sm">
                                <li>• Open Windows Settings → Network & Internet</li>
                                <li>• Click your connection (Ethernet or Wi-Fi)</li>
                                <li>• Click "Edit" next to IP assignment</li>
                                <li>• Choose "Manual" and enable IPv4</li>
                                <li>• IP address: Your address from Step 1 (e.g., 192.168.1.100)</li>
                                <li>• Subnet mask: <code className="bg-gray-100 px-2 py-1 rounded">255.255.255.0</code></li>
                                <li>• Gateway: Usually <code className="bg-gray-100 px-2 py-1 rounded">192.168.1.1</code> or <code className="bg-gray-100 px-2 py-1 rounded">192.168.0.1</code></li>
                                <li>• DNS: <code className="bg-gray-100 px-2 py-1 rounded">8.8.8.8</code></li>
                                <li>• Click Save</li>
                            </ul>
                        </Step>
                        <Step number={3}>
                            Allow LyricDisplay through Windows Firewall:
                            <ul className="mt-3 space-y-2 text-sm">
                                <li>• Search "Windows Defender Firewall" in Start menu</li>
                                <li>• Click "Allow an app through firewall"</li>
                                <li>• Click "Change settings" then "Allow another app"</li>
                                <li>• Browse to: <code className="bg-gray-100 px-2 py-1 rounded text-xs">C:\Program Files\LyricDisplay\LyricDisplay.exe</code></li>
                                <li>• Check both "Private" and "Public" boxes</li>
                                <li>• Click Add</li>
                            </ul>
                        </Step>
                    </Steps>
                </SubSection>

                <SubSection title="On the OBS Computer:">
                    <Steps>
                        <Step number={1}>
                            Test the connection first. Open any web browser and type:
                            <CodeBlock
                                code="http://192.168.1.100:4000"
                                note="Replace 192.168.1.100 with your static IP from above"
                                onCopy={() => copyToClipboard('http://192.168.1.100:4000', 'obs-network-test')}
                                copied={copied === 'obs-network-test'}
                            />
                            <p className="text-sm text-gray-600 mt-2">If you see a page asking for a join code, it's working! Close the browser and continue.</p>
                        </Step>
                        <Step number={2}>
                            In OBS, add a <strong>Browser</strong> source (same as Option 1)
                        </Step>
                        <Step number={3}>
                            Use this network URL:
                            <CodeBlock
                                code="http://192.168.1.100:4000/#/output1"
                                note="Replace 192.168.1.100 with your static IP"
                                onCopy={() => copyToClipboard('http://192.168.1.100:4000/#/output1', 'obs-network')}
                                copied={copied === 'obs-network'}
                            />
                        </Step>
                        <Step number={4}>
                            Set Width: <code className="bg-gray-100 px-2 py-1 rounded">1920</code>, Height: <code className="bg-gray-100 px-2 py-1 rounded">1080</code>, FPS: <code className="bg-gray-100 px-2 py-1 rounded">30</code>
                        </Step>
                        <Step number={5}>
                            Check the same two boxes as before, then click OK
                        </Step>
                    </Steps>
                </SubSection>
            </Section>

            <Section title="Tips & Tricks">
                <TipsList>
                    <Tip>
                        <strong>Browser Source Size:</strong> Always match your stream resolution (e.g., 1920x1080 for Full HD)
                    </Tip>
                    <Tip>
                        <strong>Layering:</strong> Drag the browser source above your camera/video layers in OBS for proper overlay
                    </Tip>
                    <Tip>
                        <strong>Second Output:</strong> Add another browser source with URL ending in <code className="bg-gray-100 px-2 py-1 rounded">#/output2</code> for different styling
                    </Tip>
                    <Tip>
                        <strong>Performance:</strong> Enable "Shutdown source when not visible" to save resources when lyrics aren't showing
                    </Tip>
                </TipsList>
            </Section>
        </div>
    );
}

function VmixGuide({ copyToClipboard, copied }) {
    return (
        <div className="space-y-12">
            <Section title="Overview">
                <p className="text-gray-700 leading-relaxed">
                    LyricDisplay connects to vMix using a Web Browser input. This creates a transparent overlay layer that sits on top of your video production. Always use overlay layers (1-4) in vMix, not the main preview.
                </p>
            </Section>

            <Section title="Option 1: Same Computer Setup" badge="Recommended">
                <p className="text-gray-600 mb-6">
                    Both LyricDisplay and vMix on the same computer. Great for single-computer production setups.
                </p>

                <Steps>
                    <Step number={1}>
                        In vMix, click <strong>Add Input</strong> at the bottom
                    </Step>
                    <Step number={2}>
                        Select <strong>Web Browser</strong> from the input types
                    </Step>
                    <Step number={3}>
                        Name it <code className="bg-gray-100 px-2 py-1 rounded text-sm">Lyrics Output 1</code>
                    </Step>
                    <Step number={4}>
                        Enter this URL:
                        <CodeBlock
                            code="http://localhost:4000/#/output1"
                            onCopy={() => copyToClipboard('http://localhost:4000/#/output1', 'vmix-local')}
                            copied={copied === 'vmix-local'}
                        />
                    </Step>
                    <Step number={5}>
                        Set these values:
                        <div className="grid grid-cols-3 gap-4 mt-3">
                            <SettingBox label="Width" value="1920" />
                            <SettingBox label="Height" value="1080" />
                            <SettingBox label="Frame Rate" value="30" />
                        </div>
                    </Step>
                    <Step number={6}>
                        Click <strong>OK</strong> to add the input
                    </Step>
                    <Step number={7}>
                        <strong>Important:</strong> Drag this input to an <strong>Overlay layer</strong> (numbered 1, 2, 3, or 4)
                        <AlertBox type="info" className="mt-3">
                            Don't put it in the main preview! Overlay layers make it transparent and sit on top of your video.
                        </AlertBox>
                    </Step>
                </Steps>

                <AlertBox type="success" className="mt-6">
                    <strong>Testing:</strong> Load lyrics in LyricDisplay, click a line, and watch it appear in your vMix overlay!
                </AlertBox>
            </Section>

            <Section title="Option 2: Network Setup" badge="Different Computers">
                <p className="text-gray-600 mb-6">
                    Control lyrics from one computer while vMix runs on another. Both computers must be connected to the same network.
                </p>

                <SubSection title="On the LyricDisplay Computer:">
                    <Steps>
                        <Step number={1}>
                            Find and set a static IP address (see OBS guide above for detailed steps)
                        </Step>
                        <Step number={2}>
                            Allow LyricDisplay through Windows Firewall (see OBS guide above for detailed steps)
                        </Step>
                    </Steps>
                </SubSection>

                <SubSection title="On the vMix Computer:">
                    <Steps>
                        <Step number={1}>
                            Test connection in a web browser first:
                            <CodeBlock
                                code="http://192.168.1.100:4000"
                                note="Replace with your LyricDisplay computer's IP"
                                onCopy={() => copyToClipboard('http://192.168.1.100:4000', 'vmix-network-test')}
                                copied={copied === 'vmix-network-test'}
                            />
                        </Step>
                        <Step number={2}>
                            Add <strong>Web Browser</strong> input in vMix
                        </Step>
                        <Step number={3}>
                            Use this network URL:
                            <CodeBlock
                                code="http://192.168.1.100:4000/#/output1"
                                note="Replace with your static IP"
                                onCopy={() => copyToClipboard('http://192.168.1.100:4000/#/output1', 'vmix-network')}
                                copied={copied === 'vmix-network'}
                            />
                        </Step>
                        <Step number={4}>
                            Set Width/Height/Frame Rate, then click OK
                        </Step>
                        <Step number={5}>
                            Drag to an <strong>Overlay layer</strong> (not main preview!)
                        </Step>
                    </Steps>
                </SubSection>
            </Section>

            <Section title="Tips & Tricks">
                <TipsList>
                    <Tip>
                        <strong>Overlay Layers Explained:</strong> Layers 1-4 in vMix are special positions that sit on top of your main video with transparency. Always use these for lyrics!
                    </Tip>
                    <Tip>
                        <strong>Quick Test:</strong> Open a browser on the vMix computer and visit your network URL. If you see a page, your connection is ready!
                    </Tip>
                    <Tip>
                        <strong>Multiple Outputs:</strong> Use output1 for broadcast and output2 for in-house display with different styling
                    </Tip>
                </TipsList>
            </Section>
        </div>
    );
}

function WirecastGuide({ copyToClipboard, copied }) {
    return (
        <div className="space-y-12">
            <Section title="Overview">
                <p className="text-gray-700 leading-relaxed">
                    LyricDisplay integrates with Wirecast using a Web Page source. This adds lyrics as a transparent layer that can appear across all shots or specific ones. Always enable the "Transparent Background" option.
                </p>
            </Section>

            <Section title="Option 1: Same Computer Setup" badge="Recommended">
                <p className="text-gray-600 mb-6">
                    Run both LyricDisplay and Wirecast on one computer. Ideal for smaller productions and streaming.
                </p>

                <Steps>
                    <Step number={1}>
                        In Wirecast, click the <strong>+</strong> button in shot layers
                    </Step>
                    <Step number={2}>
                        Select <strong>Web Page</strong> from source types
                    </Step>
                    <Step number={3}>
                        Name it <code className="bg-gray-100 px-2 py-1 rounded text-sm">Lyrics Output 1</code>
                    </Step>
                    <Step number={4}>
                        Enter this URL:
                        <CodeBlock
                            code="http://localhost:4000/#/output1"
                            onCopy={() => copyToClipboard('http://localhost:4000/#/output1', 'wirecast-local')}
                            copied={copied === 'wirecast-local'}
                        />
                    </Step>
                    <Step number={5}>
                        Configure these settings:
                        <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
                            <SettingBox label="Width" value="1920" />
                            <SettingBox label="Height" value="1080" />
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span><strong>Transparent Background</strong> (Very important!)</span>
                            </li>
                        </ul>
                    </Step>
                    <Step number={6}>
                        Click <strong>OK</strong> to add the source
                    </Step>
                    <Step number={7}>
                        Choose where lyrics appear:
                        <div className="mt-3 space-y-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div>
                                <strong className="text-blue-900">Master Layer:</strong>
                                <span className="text-gray-700"> Lyrics show on all shots (recommended for worship services)</span>
                            </div>
                            <div>
                                <strong className="text-blue-900">Shot Layer:</strong>
                                <span className="text-gray-700"> Lyrics only on specific shots you choose</span>
                            </div>
                        </div>
                    </Step>
                </Steps>

                <AlertBox type="success" className="mt-6">
                    <strong>Testing:</strong> Load lyrics in LyricDisplay, click any line, and see it in Wirecast preview and program!
                </AlertBox>
            </Section>

            <Section title="Option 2: Network Setup" badge="Different Computers">
                <p className="text-gray-600 mb-6">
                    Control lyrics from a separate computer. Perfect for larger productions with dedicated operators.
                </p>

                <SubSection title="On the LyricDisplay Computer:">
                    <Steps>
                        <Step number={1}>
                            Find and set a static IP address (see OBS guide for detailed steps)
                        </Step>
                        <Step number={2}>
                            Configure Windows Firewall to allow LyricDisplay (see OBS guide for detailed steps)
                        </Step>
                    </Steps>
                </SubSection>

                <SubSection title="On the Wirecast Computer:">
                    <Steps>
                        <Step number={1}>
                            Test in browser:
                            <CodeBlock
                                code="http://192.168.1.100:4000"
                                note="Replace with your LyricDisplay computer's IP"
                                onCopy={() => copyToClipboard('http://192.168.1.100:4000', 'wirecast-network-test')}
                                copied={copied === 'wirecast-network-test'}
                            />
                        </Step>
                        <Step number={2}>
                            Add <strong>Web Page</strong> source in Wirecast
                        </Step>
                        <Step number={3}>
                            Use network URL:
                            <CodeBlock
                                code="http://192.168.1.100:4000/#/output1"
                                note="Replace with your static IP"
                                onCopy={() => copyToClipboard('http://192.168.1.100:4000/#/output1', 'wirecast-network')}
                                copied={copied === 'wirecast-network'}
                            />
                        </Step>
                        <Step number={4}>
                            Enable <strong>Transparent Background</strong> checkbox
                        </Step>
                        <Step number={5}>
                            Assign to Master or Shot layer
                        </Step>
                    </Steps>
                </SubSection>
            </Section>

            <Section title="Tips & Tricks">
                <TipsList>
                    <Tip>
                        <strong>Production Tip:</strong> Use Ethernet cables for both computers, not Wi-Fi. Wired connections are much more reliable for live production!
                    </Tip>
                    <Tip>
                        <strong>Layer Strategy:</strong> Use Master Layer for continuous display throughout service, or Shot Layer if you only want lyrics during specific camera angles
                    </Tip>
                    <Tip>
                        <strong>Transparent Background:</strong> This is crucial! Without it, lyrics will have a white background instead of being transparent
                    </Tip>
                </TipsList>
            </Section>
        </div>
    );
}

// Helper Components
function Section({ title, badge, children }) {
    return (
        <section>
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {title}
                </h2>
                {badge && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {badge}
                    </span>
                )}
            </div>
            {children}
        </section>
    );
}

function SubSection({ title, children }) {
    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
            {children}
        </div>
    );
}

function Steps({ children }) {
    return <div className="space-y-6">{children}</div>;
}

function Step({ number, children }) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {number}
            </div>
            <div className="flex-1 pt-1 text-gray-700">{children}</div>
        </div>
    );
}

function CodeBlock({ code, note, onCopy, copied }) {
    return (
        <div className="mt-3">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm flex items-center justify-between gap-4">
                {/* MODIFIED: Added 'break-all' to prevent overflow on mobile */}
                <code className="flex-1 break-all">{code}</code>
                <button
                    onClick={onCopy}
                    className={`flex-shrink-0 p-2 rounded transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        }`}
                    title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
            {note && <p className="text-sm text-gray-500 mt-2 italic">{note}</p>}
        </div>
    );
}

function SettingBox({ label, value }) {
    return (
        <div className="bg-gray-100 p-3 rounded-lg text-center">
            <div className="text-xs font-semibold text-gray-600 mb-1">{label}</div>
            <div className="text-sm font-mono font-bold text-gray-900">{value}</div>
        </div>
    );
}

function AlertBox({ type = 'info', children, className = '' }) {
    const styles = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        warning: 'bg-amber-50 border-amber-200 text-amber-800'
    };

    const icons = {
        info: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
        success: <Check className="w-5 h-5 flex-shrink-0" />,
        warning: <AlertCircle className="w-5 h-5 flex-shrink-0" />
    };

    return (
        <div className={`border rounded-lg p-4 flex gap-3 ${styles[type]} ${className}`}>
            {icons[type]}
            <div className="text-sm leading-relaxed">{children}</div>
        </div>
    );
}

function TipsList({ children }) {
    return <ul className="space-y-3">{children}</ul>;
}

function Tip({ children }) {
    return (
        <li className="flex gap-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <span className="text-lg">💡</span>
            <span className="text-sm text-gray-700 leading-relaxed">{children}</span>
        </li>
    );
}