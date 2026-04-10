import React from 'react';
import { ArrowLeft, Database, FolderOpen, CheckCircle, AlertCircle, FileText, BookOpen, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import BackToTopButton from '../components/BackToTopButton';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useNavbarHeight } from '../hooks/useNavbarHeight';

export default function EasyWorshipGuide() {
    const navbarHeight = useNavbarHeight();
    return (
        <div style={{ background: "var(--ink)", minHeight: "100vh" }}>
            <SEO
                title="EasyWorship Import Guide - Import Songs to LyricDisplay"
                description="Step-by-step guide to import your song library from EasyWorship into LyricDisplay. Compatible with EasyWorship 2009 and later versions."
                keywords="EasyWorship import, song import, LyricDisplay import, worship software migration"
            />
            <Navbar />

            {/* Header */}
            <section style={{ paddingTop: navbarHeight + 48, paddingBottom: 56, background: "var(--surface)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "70%", height: 280, background: "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.06), transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)" }} />
                <div className="max-w-5xl mx-auto px-6 lg:px-8" style={{ position: "relative", zIndex: 1 }}>
                    <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
                        onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>
                        <ArrowLeft size={14} /> Back to Home
                    </a>
                    <span className="section-label">EasyWorship</span>
                    <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "0.75rem" }}>
                        EasyWorship Import Guide.
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
                        Import your song library from EasyWorship into LyricDisplay.
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 py-12" style={{ color: "var(--text-secondary)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
                    {/* Overview */}
                    <Section title="Overview">
                        <p style={{ color: "var(--text-secondary)" }}>
                            This guide will help you import your song library from EasyWorship into LyricDisplay. The import process converts your EasyWorship songs into plain text files that work seamlessly with LyricDisplay.
                        </p>
                    </Section>

                    {/* Before You Begin */}
                    <Section title="Before You Begin">
                        <p style={{ color: "var(--text-secondary)" }}>
                            Make sure you know which version of EasyWorship you're using:
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-gray-700">
                                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                EasyWorship 7
                            </li>
                            <li className="flex items-center gap-2 text-gray-700">
                                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                EasyWorship 6
                            </li>
                            <li className="flex items-center gap-2 text-gray-700">
                                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                EasyWorship 2009
                            </li>
                        </ul>
                    </Section>

                    {/* Step 1 */}
                    <Section title="Step 1: Locate Your EasyWorship Database" badge="Database Path">
                        <AlertBox type="info" className="mb-6">
                            <strong>Note:</strong> EasyWorship is a Windows-only application, so the database paths below are Windows paths. If you're on macOS or Linux, you'll need to copy the EasyWorship database folder from a Windows machine to your computer, then browse to it manually in Step 4.
                        </AlertBox>
                        <Steps>
                            <Step number={1}>
                                Open the EasyWorship Import wizard from the <strong>File</strong> menu
                            </Step>
                            <Step number={2}>
                                Select your EasyWorship version from the dropdown menu
                            </Step>
                            <Step number={3}>
                                The default database path will be populated automatically based on your version:
                                <div className="mt-4 space-y-3">
                                    <PathBox
                                        label="EasyWorship 7 & 6"
                                        path="C:\Users\Public\Documents\Softouch\Easyworship\Default\v6.1\Databases\Data"
                                    />
                                    <PathBox
                                        label="EasyWorship 2009"
                                        path="C:\Users\Public\Documents\Softouch\EasyWorship\Default\Databases\Data"
                                    />
                                </div>
                            </Step>
                            <Step number={4}>
                                If your database is in a different location, click the <strong>folder icon</strong> to browse for it
                            </Step>
                            <Step number={5}>
                                Click <strong>"Verify"</strong> to validate the database path
                            </Step>
                            <Step number={6}>
                                If successful, you'll see a message showing how many songs were found
                            </Step>
                            <Step number={7}>
                                Click <strong>"Next"</strong> to continue
                            </Step>
                        </Steps>
                    </Section>

                    {/* Step 2 */}
                    <Section title="Step 2: Select Songs to Import" badge="Song Selection">
                        <Steps>
                            <Step number={1}>
                                Review the list of songs discovered in your EasyWorship database
                            </Step>
                            <Step number={2}>
                                Use the <strong>search box</strong> to find specific songs by title or author
                            </Step>
                            <Step number={3}>
                                Use the <strong>sort dropdown</strong> to organize songs by title or author
                            </Step>
                            <Step number={4}>
                                Check the box next to each song you want to import
                            </Step>
                            <Step number={5}>
                                To select all songs at once, check the <strong>"Select All"</strong> box at the top of the list
                            </Step>
                            <Step number={6}>
                                The counter shows how many songs you've selected
                            </Step>
                            <Step number={7}>
                                Click <strong>"Next"</strong> when you're ready to proceed
                            </Step>
                        </Steps>
                    </Section>

                    {/* Step 3 */}
                    <Section title="Step 3: Choose Destination and Options" badge="Configuration">
                        <Steps>
                            <Step number={1}>
                                Select where you want to save the converted song files
                                <div className="mt-3 bg-gray-100 p-4 rounded-lg">
                                    <p className="text-sm text-gray-700">
                                        <strong>Default location:</strong> Documents\Imported Songs from EW
                                    </p>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Click <strong>"Browse"</strong> to choose a different folder
                                    </p>
                                </div>
                            </Step>
                            <Step number={2}>
                                Choose how to handle duplicate files:
                                <div className="mt-3 space-y-2">
                                    <OptionBox
                                        title="Skip existing files"
                                        description="Leaves existing files unchanged"
                                    />
                                    <OptionBox
                                        title="Overwrite existing files"
                                        description="Replaces existing files with new imports"
                                    />
                                    <OptionBox
                                        title="Create new with (1), (2) suffix"
                                        description="Creates new versions with numbered suffixes"
                                    />
                                </div>
                            </Step>
                            <Step number={3}>
                                Review the import summary showing how many songs will be imported
                            </Step>
                            <Step number={4}>
                                Click <strong>"Start Import"</strong> to begin the conversion process
                            </Step>
                        </Steps>
                    </Section>

                    {/* Step 4 */}
                    <Section title="Step 4: Import Progress" badge="Processing">
                        <Steps>
                            <Step number={1}>
                                Wait while your songs are converted
                            </Step>
                            <Step number={2}>
                                The progress bar shows the current status
                            </Step>
                            <Step number={3}>
                                You'll see the name of the song currently being converted
                            </Step>
                            <Step number={4}>
                                <AlertBox type="warning">
                                    <strong>Important:</strong> Do not close the window during import
                                </AlertBox>
                            </Step>
                        </Steps>
                    </Section>

                    {/* Step 5 */}
                    <Section title="Step 5: Review Results" badge="Completion">
                        <Steps>
                            <Step number={1}>
                                Once complete, you'll see a summary of the import:
                                <div className="mt-3 space-y-2">
                                    <ResultBox
                                        type="success"
                                        label="Successful"
                                        description="Songs that were imported successfully"
                                    />
                                    <ResultBox
                                        type="info"
                                        label="Skipped"
                                        description="Songs that were skipped due to duplicates"
                                    />
                                    <ResultBox
                                        type="error"
                                        label="Failed"
                                        description="Songs that encountered errors"
                                    />
                                </div>
                            </Step>
                            <Step number={2}>
                                If any imports failed, you'll see a list with error details
                            </Step>
                            <Step number={3}>
                                Click <strong>"Open Folder"</strong> to view your imported song files
                            </Step>
                            <Step number={4}>
                                Click <strong>"Done"</strong> to close the wizard
                            </Step>
                        </Steps>
                    </Section>

                    {/* Using Imported Songs */}
                    <Section title="Using Your Imported Songs">
                        <p style={{ color: "var(--text-secondary)" }}>
                            After importing, your songs are saved as .txt files in the destination folder you selected. To use them in LyricDisplay:
                        </p>
                        <Steps>
                            <Step number={1}>
                                Go to <strong>File → Load Lyrics File</strong>
                            </Step>
                            <Step number={2}>
                                Browse to your imported songs folder
                            </Step>
                            <Step number={3}>
                                Select a song file to load and display
                            </Step>
                        </Steps>
                        <AlertBox type="success" className="mt-6">
                            All imported songs are fully compatible with LyricDisplay and can be edited like any other text file.
                        </AlertBox>
                    </Section>

                    {/* Troubleshooting */}
                    <Section title="Troubleshooting">
                        <SubSection title="If the database path verification fails:">
                            <TipsList>
                                <Tip>Make sure EasyWorship is closed</Tip>
                                <Tip>Verify you selected the correct version</Tip>
                                <Tip>Check that the path exists on your computer</Tip>
                                <Tip>Try browsing manually to the correct folder</Tip>
                            </TipsList>
                        </SubSection>

                        <SubSection title="If songs fail to import:">
                            <TipsList>
                                <Tip>Check the error messages in the results screen</Tip>
                                <Tip>Ensure you have write permissions to the destination folder</Tip>
                                <Tip>Try importing failed songs individually</Tip>
                            </TipsList>
                        </SubSection>
                    </Section>

                    {/* Tips */}
                    <Section title="Tips">
                        <TipsList>
                            <Tip>
                                <strong>Multiple Imports:</strong> You can run the import wizard multiple times to import additional songs
                            </Tip>
                            <Tip>
                                <strong>Editable Files:</strong> Imported songs are standard text files that can be edited in any text editor
                            </Tip>
                            <Tip>
                                <strong>Organization:</strong> Consider organizing imported songs into subfolders by category or event
                            </Tip>
                            <Tip>
                                <strong>Backup:</strong> Back up your imported songs folder regularly
                            </Tip>
                        </TipsList>
                    </Section>
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
            <BackToTopButton />
        </div>
    );
}

function Section({ title, badge, children }) {
    return (
        <section>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{title}</h2>
                {badge && <span className="pill pill-primary">{badge}</span>}
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
        <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flexShrink: 0, width: 30, height: 30, background: "var(--primary-dim)", border: "1px solid rgba(168,85,247,0.3)", color: "var(--primary-bright)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 600 }}>
                {number}
            </div>
            <div style={{ flex: 1, paddingTop: 4, color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>{children}</div>
        </div>
    );
}

function PathBox({ label, path }) {
    return (
        <div style={{ background: "var(--surface-up)", border: "1px solid var(--border)", borderRadius: 10, padding: "1rem 1.25rem", marginTop: "0.5rem" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary-bright)", marginBottom: 8 }}>{label}</div>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-secondary)", wordBreak: "break-all" }}>{path}</code>
        </div>
    );
}

function OptionBox({ title, description }) {
    return (
        <div style={{ background: "var(--primary-dim)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 10, padding: "0.9rem 1.1rem" }}>
            <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9rem", marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{description}</div>
        </div>
    );
}

function ResultBox({ type, label, description }) {
    const clsMap = { success: "alert-success", info: "alert-info", error: "alert-error" };
    const colorMap = { success: "var(--teal)", info: "var(--primary-bright)", error: "#fca5a5" };
    return (
        <div className={`alert-box ${clsMap[type] || "alert-info"}`}>
            <AlertCircle size={15} style={{ color: colorMap[type], flexShrink: 0, marginTop: 2 }} />
            <div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.88rem", marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{description}</div>
            </div>
        </div>
    );
}

function AlertBox({ type = 'info', children, className = '' }) {
    const clsMap = { info: "alert-info", success: "alert-success", warning: "alert-warning" };
    const colorMap = { info: "var(--primary-bright)", success: "var(--teal)", warning: "#f59e0b" };
    return (
        <div className={`alert-box ${clsMap[type] || "alert-info"} ${className}`}>
            <AlertCircle size={15} style={{ color: colorMap[type], flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{children}</div>
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