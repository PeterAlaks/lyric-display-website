import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';
import SEO from '../components/SEO';
import { useNavbarHeight } from '../hooks/useNavbarHeight';

const sectionStyle = {
    borderTop: '1px solid var(--border)',
    paddingTop: '1.5rem',
    marginTop: '1.75rem',
};

const paragraphStyle = {
    color: 'var(--text-secondary)',
    fontSize: '0.96rem',
    lineHeight: 1.8,
    marginBottom: '1rem',
};

const listStyle = {
    color: 'var(--text-secondary)',
    fontSize: '0.94rem',
    lineHeight: 1.8,
    paddingLeft: '1.25rem',
    margin: 0,
};

function Section({ title, children }) {
    return (
        <section style={sectionStyle}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
                {title}
            </h2>
            {children}
        </section>
    );
}

export default function CodeOfConductPage() {
    const navbarHeight = useNavbarHeight();

    return (
        <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
            <SEO
                title="Code of Conduct"
                description="LyricDisplay project Code of Conduct for contributors, users, maintainers, and community discussions."
                keywords="LyricDisplay code of conduct, open source community guidelines, contributor guidelines"
            />
            <Navbar />

            <main>
                <section style={{ paddingTop: navbarHeight + 48, paddingBottom: 56, background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(168,85,247,0.08), transparent 58%)', pointerEvents: 'none' }} />
                    <div className="max-w-5xl mx-auto px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
                        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '2rem', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                            <ArrowLeft size={14} /> Back to Home
                        </a>
                        <span className="section-label">Community standards</span>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 760, marginBottom: '1.1rem' }}>
                            Code of Conduct
                        </h1>
                        <p style={{ ...paragraphStyle, maxWidth: 680, marginBottom: 0 }}>
                            LyricDisplay is built for worship, event, and production teams. We want project spaces to be practical, respectful, and safe for contributors and users.
                        </p>
                    </div>
                </section>

                <section style={{ padding: '56px 0 88px' }}>
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <Section title="Expected Behavior">
                            <ul style={listStyle}>
                                <li>Be respectful and considerate in discussions, issues, pull requests, and support channels.</li>
                                <li>Assume good intent, but take responsibility for the impact of your words and actions.</li>
                                <li>Keep feedback focused on the work, the user experience, and the technical details.</li>
                                <li>Welcome people with different levels of experience, backgrounds, and perspectives.</li>
                                <li>Respect privacy and avoid sharing personal information without permission.</li>
                            </ul>
                        </Section>

                        <Section title="Unacceptable Behavior">
                            <p style={paragraphStyle}>The following behavior is not acceptable in project spaces:</p>
                            <ul style={listStyle}>
                                <li>Harassment, intimidation, threats, or personal attacks.</li>
                                <li>Discriminatory language or behavior related to identity, background, beliefs, ability, or status.</li>
                                <li>Sexualized language, unwanted attention, or inappropriate imagery.</li>
                                <li>Trolling, repeated disruption, or deliberately derailing project discussions.</li>
                                <li>Publishing private information without clear permission.</li>
                            </ul>
                        </Section>

                        <Section title="Scope">
                            <p style={paragraphStyle}>
                                This Code of Conduct applies to public and private project spaces, including the repository, issue tracker, pull requests, documentation, community discussions, and direct project support interactions.
                            </p>
                        </Section>

                        <Section title="Reporting">
                            <p style={paragraphStyle}>
                                If you experience or witness unacceptable behavior, report it to the maintainers through the project&apos;s GitHub issue tracker or contact channel. Include relevant context, links, screenshots, or timestamps when possible.
                            </p>
                            <p style={paragraphStyle}>
                                Maintainers will review reports in good faith and may remove content, close conversations, issue warnings, restrict participation, or take other action needed to protect the project community.
                            </p>
                        </Section>

                        <Section title="Enforcement">
                            <p style={paragraphStyle}>
                                Maintainers are responsible for clarifying standards and applying this Code of Conduct consistently. Participants who are asked to stop unacceptable behavior are expected to comply promptly.
                            </p>
                        </Section>
                    </div>
                </section>
            </main>

            <Footer />
            <BackToTopButton />
        </div>
    );
}
