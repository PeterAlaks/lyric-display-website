import React, { useState } from 'react';
import { ArrowLeft, Monitor, Video, Cast, Check, Copy, AlertCircle, BookOpen, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import BackToTopButton from '../components/BackToTopButton';
import Footer from '../components/Footer';
import { useNavbarHeight } from '../hooks/useNavbarHeight';

export default function IntegrationGuide() {
    const [activeTab, setActiveTab] = useState('obs');
    const [copied, setCopied] = useState('');
    const navbarHeight = useNavbarHeight();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        window.scrollTo(0, 0);
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(''), 2000);
    };

    return (
        <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
            <Navbar />

            {/* Header */}
            <section style={{ paddingTop: navbarHeight + 48, paddingBottom: 56, background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 280, background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.06), transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)' }} />
                <div className="max-w-5xl mx-auto px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '2rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                        <ArrowLeft size={14} /> Back to Home
                    </a>
                    <span className="section-label">Integration Guide</span>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '0.75rem' }}>
                        Integration Instructions.
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                        Step-by-step guide to connect LyricDisplay with your production software.
                    </p>
                </div>
            </section>

            {/* Navigation Tabs */}
            <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: navbarHeight, zIndex: 40 }}>
                <div className="max-w-5xl mx-auto px-6">
                    <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto' }}>
                        <TabButton
                            active={activeTab === 'obs'}
                            onClick={() => handleTabChange('obs')}
                            icon={<Monitor className="w-5 h-5" />}
                            label="OBS Studio"
                        />
                        <TabButton
                            active={activeTab === 'vmix'}
                            onClick={() => handleTabChange('vmix')}
                            icon={<Video className="w-5 h-5" />}
                            label="vMix"
                        />
                        <TabButton
                            active={activeTab === 'wirecast'}
                            onClick={() => handleTabChange('wirecast')}
                            icon={<Cast className="w-5 h-5" />}
                            label="Wirecast"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 py-12" style={{ color: 'var(--text-secondary)' }}>
                {activeTab === 'obs' && <OBSGuide copyToClipboard={copyToClipboard} copied={copied} />}
                {activeTab === 'vmix' && <VmixGuide copyToClipboard={copyToClipboard} copied={copied} />}
                {activeTab === 'wirecast' && <WirecastGuide copyToClipboard={copyToClipboard} copied={copied} />}
            </div>

            {/* Footer CTA */}
            <section style={{ background: 'var(--ink)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 280, background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.05), transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.25), transparent)' }} />
                <div className="max-w-5xl mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                        Need more help?
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Check out our video tutorial or reach out for technical support.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://drive.google.com/file/d/1fP4fSSWSNvSocI8fK7hktdJ7dY6xnCM-/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-primary">
                            <BookOpen size={15} /> Watch Video Tutorial
                        </a>
                        <a href="https://linktr.ee/peteralaks" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            <ExternalLink size={15} /> Contact Support
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
            <BackToTopButton />
        </div>
    );
}

function TabButton({ active, onClick, icon, label }) {
    return (
        <button onClick={onClick} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '1rem 0', borderBottom: `2px solid ${active ? 'var(--primary)' : 'transparent'}`,
            fontFamily: 'var(--font-mono)', fontSize: '0.76rem', letterSpacing: '0.07em',
            textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap',
            color: active ? 'var(--primary-bright)' : 'var(--text-muted)',
            background: 'none', border: 'none',
            cursor: 'pointer', transition: 'color 0.2s',
        }}>
            {icon} {label}
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
                    <strong>Testing:</strong> Load lyrics in LyricDisplay (<kbd>Ctrl+O</kbd> on Windows/Linux, <kbd>⌘+O</kbd> on macOS), click any line, and it appears in OBS!
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
                            <div className="mt-3 space-y-4">
                                <PlatformBlock platform="Windows">
                                    <ul className="space-y-2 text-sm">
                                        <li>• Press <kbd>Win + R</kbd>, type <code className="bg-gray-100 px-2 py-1 rounded">cmd</code>, press Enter</li>
                                        <li>• Type <code className="bg-gray-100 px-2 py-1 rounded">ipconfig</code> and press Enter</li>
                                        <li>• Look for "IPv4 Address" (usually looks like 192.168.1.100)</li>
                                    </ul>
                                </PlatformBlock>
                                <PlatformBlock platform="macOS">
                                    <ul className="space-y-2 text-sm">
                                        <li>• Open System Settings → Network</li>
                                        <li>• Click your active connection (Wi-Fi or Ethernet) and look for the IP address</li>
                                        <li>• Or open Terminal and type: <code className="bg-gray-100 px-2 py-1 rounded">ipconfig getifaddr en0</code> (Wi-Fi) or <code className="bg-gray-100 px-2 py-1 rounded">ipconfig getifaddr en1</code> (Ethernet)</li>
                                    </ul>
                                </PlatformBlock>
                                <PlatformBlock platform="Linux">
                                    <ul className="space-y-2 text-sm">
                                        <li>• Open a terminal and type: <code className="bg-gray-100 px-2 py-1 rounded">hostname -I</code> or <code className="bg-gray-100 px-2 py-1 rounded">ip addr show</code></li>
                                        <li>• Look for the address on your active interface (usually starts with 192.168.x.x)</li>
                                    </ul>
                                </PlatformBlock>
                            </div>
                        </Step>
                        <Step number={2}>
                            Make this address permanent (Set Static IP):
                            <div className="mt-3 space-y-4">
                                <PlatformBlock platform="Windows">
                                    <ul className="space-y-2 text-sm">
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
                                </PlatformBlock>
                                <PlatformBlock platform="macOS">
                                    <ul className="space-y-2 text-sm">
                                        <li>• Open System Settings → Network</li>
                                        <li>• Select your connection (Wi-Fi or Ethernet) and click "Details..."</li>
                                        <li>• Go to the TCP/IP tab</li>
                                        <li>• Change "Configure IPv4" to "Manually"</li>
                                        <li>• IP Address: Your address from Step 1 (e.g., 192.168.1.100)</li>
                                        <li>• Subnet Mask: <code className="bg-gray-100 px-2 py-1 rounded">255.255.255.0</code></li>
                                        <li>• Router: Usually <code className="bg-gray-100 px-2 py-1 rounded">192.168.1.1</code> or <code className="bg-gray-100 px-2 py-1 rounded">192.168.0.1</code></li>
                                        <li>• Go to the DNS tab and add <code className="bg-gray-100 px-2 py-1 rounded">8.8.8.8</code></li>
                                        <li>• Click OK</li>
                                    </ul>
                                </PlatformBlock>
                                <PlatformBlock platform="Linux">
                                    <ul className="space-y-2 text-sm">
                                        <li>• <strong>GUI (NetworkManager):</strong> Open Settings → Network → click the gear icon on your connection → IPv4 tab → set Method to "Manual" and enter your IP, Netmask (<code className="bg-gray-100 px-2 py-1 rounded">255.255.255.0</code>), Gateway, and DNS (<code className="bg-gray-100 px-2 py-1 rounded">8.8.8.8</code>)</li>
                                        <li>• <strong>Terminal (nmcli):</strong> <code className="bg-gray-100 px-2 py-1 rounded text-xs">sudo nmcli con mod "Your Connection" ipv4.addresses 192.168.1.100/24 ipv4.gateway 192.168.1.1 ipv4.dns 8.8.8.8 ipv4.method manual</code></li>
                                        <li>• Then restart the connection: <code className="bg-gray-100 px-2 py-1 rounded text-xs">sudo nmcli con up "Your Connection"</code></li>
                                    </ul>
                                </PlatformBlock>
                            </div>
                        </Step>
                        <Step number={3}>
                            Allow LyricDisplay through your firewall:
                            <div className="mt-3 space-y-4">
                                <PlatformBlock platform="Windows">
                                    <ul className="space-y-2 text-sm">
                                        <li>• Search "Windows Defender Firewall" in Start menu</li>
                                        <li>• Click "Allow an app through firewall"</li>
                                        <li>• Click "Change settings" then "Allow another app"</li>
                                        <li>• Browse to: <code className="bg-gray-100 px-2 py-1 rounded text-xs">C:\Program Files\LyricDisplay\LyricDisplay.exe</code></li>
                                        <li>• Check both "Private" and "Public" boxes</li>
                                        <li>• Click Add</li>
                                    </ul>
                                </PlatformBlock>
                                <PlatformBlock platform="macOS">
                                    <ul className="space-y-2 text-sm">
                                        <li>• Open System Settings → Network → Firewall</li>
                                        <li>• If the firewall is on, click "Options..."</li>
                                        <li>• Click the <strong>+</strong> button and add LyricDisplay from your Applications folder</li>
                                        <li>• Set it to "Allow incoming connections"</li>
                                        <li>• macOS may also prompt you automatically when LyricDisplay first tries to accept connections — click "Allow"</li>
                                    </ul>
                                </PlatformBlock>
                                <PlatformBlock platform="Linux">
                                    <ul className="space-y-2 text-sm">
                                        <li>• <strong>UFW (Ubuntu/Debian):</strong> <code className="bg-gray-100 px-2 py-1 rounded">sudo ufw allow 4000/tcp</code></li>
                                        <li>• <strong>firewalld (Fedora/RHEL):</strong> <code className="bg-gray-100 px-2 py-1 rounded">sudo firewall-cmd --add-port=4000/tcp --permanent && sudo firewall-cmd --reload</code></li>
                                        <li>• Verify with: <code className="bg-gray-100 px-2 py-1 rounded">sudo ufw status</code> or <code className="bg-gray-100 px-2 py-1 rounded">sudo firewall-cmd --list-ports</code></li>
                                    </ul>
                                </PlatformBlock>
                            </div>
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
                        <strong>Additional Outputs:</strong> Add more browser sources using <code className="bg-gray-100 px-2 py-1 rounded">#/output2</code>, <code className="bg-gray-100 px-2 py-1 rounded">#/output3</code>, up to <code className="bg-gray-100 px-2 py-1 rounded">#/output6</code> for independent styling
                    </Tip>
                    <Tip>
                        <strong>Performance:</strong> Enable "Shutdown source when not visible" to save resources when lyrics aren't showing
                    </Tip>
                </TipsList>
            </Section>

            <Section title="Troubleshooting">
                <div className="space-y-8">
                    <TroubleshootingItem title="Browser Source is Black/Empty">
                        <TroubleshootingSolution>Confirm LyricDisplay is running</TroubleshootingSolution>
                        <TroubleshootingSolution>
                            Verify URL of browser source is set to a valid output route: <code className="bg-gray-100 px-2 py-1 rounded text-sm">http://localhost:4000/#/output1</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">/output2</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">/output3</code> ... <code className="bg-gray-100 px-2 py-1 rounded text-sm">/output6</code>
                        </TroubleshootingSolution>
                        <TroubleshootingSolution>Click on the browser source from your sources tab on OBS then click on Refresh on the properties pane</TroubleshootingSolution>
                        <TroubleshootingSolution>Restart both LyricDisplay and OBS</TroubleshootingSolution>
                        <TroubleshootingSolution>Check that your firewall isn't blocking port 4000 (Windows Firewall, macOS Firewall, or Linux ufw/firewalld)</TroubleshootingSolution>
                    </TroubleshootingItem>

                    <TroubleshootingItem title="Network Connection Not Working">
                        <TroubleshootingSolution>Verify both PCs on same network</TroubleshootingSolution>
                        <TroubleshootingSolution>
                            Confirm that URL of browser source is <code className="bg-gray-100 px-2 py-1 rounded text-sm">http://static-ip-configured:4000/#/output1</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">/output2</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">/output3</code> ... <code className="bg-gray-100 px-2 py-1 rounded text-sm">/output6</code>
                        </TroubleshootingSolution>
                        <TroubleshootingSolution>Temporarily disable firewall to test</TroubleshootingSolution>
                        <TroubleshootingSolution>Confirm that you used http:// not https:// in URL</TroubleshootingSolution>
                        <TroubleshootingSolution>Check router isn't blocking local traffic</TroubleshootingSolution>
                    </TroubleshootingItem>

                    <TroubleshootingItem title="Lyrics Not Updating in Real-Time">
                        <TroubleshootingSolution>Click "Sync Outputs" in LyricDisplay settings</TroubleshootingSolution>
                        <TroubleshootingSolution>Refresh browser source in OBS</TroubleshootingSolution>
                        <TroubleshootingSolution>Check socket connection (Shield icon in desktop control panel must be green)</TroubleshootingSolution>
                        <TroubleshootingSolution>Restart LyricDisplay</TroubleshootingSolution>
                    </TroubleshootingItem>

                    <TroubleshootingItem title="OBS Performance Issues">
                        <TroubleshootingSolution>Enable "Shutdown source when not visible"</TroubleshootingSolution>
                        <TroubleshootingSolution>Close unused preview windows in LyricDisplay</TroubleshootingSolution>
                        <TroubleshootingSolution>Check CPU usage</TroubleshootingSolution>
                        <TroubleshootingSolution>Move LyricDisplay to dedicated PC</TroubleshootingSolution>
                    </TroubleshootingItem>

                    <TroubleshootingItem title="Styling Changes Not Applying">
                        <TroubleshootingSolution>Use "Sync Outputs" button in settings</TroubleshootingSolution>
                        <TroubleshootingSolution>Refresh browser source in OBS</TroubleshootingSolution>
                        <TroubleshootingSolution>Check browser console (F12) for errors</TroubleshootingSolution>
                    </TroubleshootingItem>

                    <TroubleshootingItem title="Text Appears Cut Off or Misaligned">
                        <TroubleshootingSolution>Verify browser source dimensions match your output resolution</TroubleshootingSolution>
                        <TroubleshootingSolution>Check text positioning settings in LyricDisplay</TroubleshootingSolution>
                        <TroubleshootingSolution>Ensure font size is appropriate for your resolution</TroubleshootingSolution>
                    </TroubleshootingItem>

                    <TroubleshootingItem title="macOS says app is 'damaged' or 'can't be opened'">
                        <TroubleshootingSolution>
                            This happens because the app is not code-signed with an Apple Developer certificate. macOS blocks unsigned apps downloaded from the internet by default.
                        </TroubleshootingSolution>
                        <TroubleshootingSolution>
                            Open Terminal (Applications → Utilities → Terminal) and run: <code className="bg-gray-100 px-2 py-1 rounded text-sm">xattr -cr /Applications/LyricDisplay.app</code>
                        </TroubleshootingSolution>
                        <TroubleshootingSolution>Then try opening the app again from your Applications folder</TroubleshootingSolution>
                        <TroubleshootingSolution>If still blocked, go to System Preferences → Security & Privacy → General → Click "Open Anyway"</TroubleshootingSolution>
                        <TroubleshootingSolution>Alternatively, right-click the app and select "Open" instead of double-clicking</TroubleshootingSolution>
                    </TroubleshootingItem>

                    <TroubleshootingItem title="macOS shows 'unidentified developer' warning">
                        <TroubleshootingSolution>Right-click (or Control-click) on LyricDisplay.app</TroubleshootingSolution>
                        <TroubleshootingSolution>Select "Open" from the context menu</TroubleshootingSolution>
                        <TroubleshootingSolution>Click "Open" in the dialog that appears</TroubleshootingSolution>
                        <TroubleshootingSolution>This only needs to be done once — macOS will remember your choice</TroubleshootingSolution>
                    </TroubleshootingItem>

                    <TroubleshootingItem title="Linux AppImage won't launch">
                        <TroubleshootingSolution>
                            Make the file executable: open a terminal and run <code className="bg-gray-100 px-2 py-1 rounded text-sm">chmod +x LyricDisplay-*.AppImage</code>
                        </TroubleshootingSolution>
                        <TroubleshootingSolution>
                            If you get a FUSE error, install FUSE: <code className="bg-gray-100 px-2 py-1 rounded text-sm">sudo apt install libfuse2</code> (Ubuntu/Debian) or <code className="bg-gray-100 px-2 py-1 rounded text-sm">sudo dnf install fuse</code> (Fedora)
                        </TroubleshootingSolution>
                        <TroubleshootingSolution>
                            Alternatively, extract and run directly: <code className="bg-gray-100 px-2 py-1 rounded text-sm">./LyricDisplay-*.AppImage --appimage-extract && ./squashfs-root/AppRun</code>
                        </TroubleshootingSolution>
                        <TroubleshootingSolution>Ensure you have the required dependencies installed (libgtk-3, libnotify, libnss3, libxss1)</TroubleshootingSolution>
                    </TroubleshootingItem>
                </div>
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
                            Allow LyricDisplay through your firewall (see OBS guide above for detailed steps per platform)
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
                        <strong>Multiple Outputs:</strong> Use output1 for broadcast, output2 for in-house display, and output3-output6 for overflow rooms or alternate layouts
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
                            Allow LyricDisplay through your firewall (see OBS guide for detailed steps per platform)
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
        <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    {title}
                </h2>
                {badge && <span className="pill pill-primary">{badge}</span>}
            </div>
            {children}
        </section>
    );
}

function SubSection({ title, children }) {
    return (
        <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>{title}</h3>
            {children}
        </div>
    );
}

function Steps({ children }) {
    return <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>{children}</div>;
}

function Step({ number, children }) {
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flexShrink: 0, width: 30, height: 30, background: 'var(--primary-dim)', border: '1px solid rgba(168,85,247,0.3)', color: 'var(--primary-bright)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600 }}>
                {number}
            </div>
            <div style={{ flex: 1, paddingTop: 4, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>{children}</div>
        </div>
    );
}

function CodeBlock({ code, note, onCopy, copied }) {
    return (
        <div style={{ marginTop: '0.75rem' }}>
            <div style={{ background: 'var(--surface-up)', border: '1px solid var(--border)', borderRadius: 10, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                <code style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>{code}</code>
                <button onClick={onCopy} title={copied ? 'Copied!' : 'Copy to clipboard'}
                    style={{ flexShrink: 0, padding: 8, borderRadius: 6, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                        background: copied ? 'rgba(94,234,212,0.15)' : 'var(--surface)',
                        color: copied ? 'var(--teal)' : 'var(--text-muted)' }}>
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
            </div>
            {note && <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 6, fontStyle: 'italic' }}>{note}</p>}
        </div>
    );
}

function SettingBox({ label, value }) {
    return (
        <div style={{ background: 'var(--surface-up)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary-bright)', fontSize: '0.95rem' }}>{value}</div>
        </div>
    );
}

function AlertBox({ type = 'info', children, className = '' }) {
    const clsMap = { info: 'alert-info', success: 'alert-success', warning: 'alert-warning' };
    const colorMap = { info: 'var(--primary-bright)', success: 'var(--teal)', warning: '#f59e0b' };
    return (
        <div className={`alert-box ${clsMap[type] || 'alert-info'} ${className}`} style={{ marginTop: className.includes('mt') ? undefined : '1rem' }}>
            <AlertCircle size={15} style={{ color: colorMap[type] || colorMap.info, flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{children}</div>
        </div>
    );
}

function TipsList({ children }) {
    return <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>{children}</ul>;
}

function Tip({ children }) {
    return (
        <li style={{ display: "flex", gap: 12, background: "var(--primary-dim)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 10, padding: "1rem 1.25rem" }}>
            <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>💡</span>
            <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{children}</span>
        </li>
    );
}

function TroubleshootingItem({ title, children }) {
    return (
        <div className="alert-box alert-error" style={{ display: "block", marginBottom: "1rem" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fca5a5", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 8 }}>
                <AlertCircle size={16} /> PROBLEM: {title}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.5rem", fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Solutions:</p>
                {children}
            </div>
        </div>
    );
}

function PlatformBlock({ platform, children }) {
    const icons = { Windows: '🪟', macOS: '🍎', Linux: '🐧' };
    return (
        <div style={{ background: "var(--surface-up)", border: "1px solid var(--border)", borderRadius: 10, padding: "1rem 1.25rem", marginTop: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
                <span className="pill pill-dim">{icons[platform] || '💻'} {platform}</span>
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{children}</div>
        </div>
    );
}

function TroubleshootingSolution({ children }) {
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.88rem", color: "var(--text-secondary)", background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "0.6rem 0.8rem" }}>
            <span style={{ color: "#fca5a5", fontWeight: 700, flexShrink: 0 }}>→</span>
            <span>{children}</span>
        </div>
    );
}