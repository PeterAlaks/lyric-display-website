import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    CheckCircle2,
    ChevronDown,
    CreditCard,
    Heart,
    Info,
    RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';
import SEO from '../components/SEO';
import { useNavbarHeight } from '../hooks/useNavbarHeight';

const MotionDiv = motion.div;

const PAYSTACK_DONATION_API_URL = import.meta.env.VITE_PAYSTACK_DONATION_API_URL || '/.netlify/functions/paystack-donation';
const PAYSTACK_VERIFY_API_URL = import.meta.env.VITE_PAYSTACK_VERIFY_API_URL || '/.netlify/functions/paystack-verify';

const subscriptionPlans = [
    {
        id: 'supporter',
        name: 'Supporter',
        amount: 5,
        frequency: 'monthly',
        label: 'Monthly',
        summary: 'For individuals who want to keep LyricDisplay moving.',
        impact: ['Release testing', 'Small hosting bills', 'Documentation updates'],
        featured: false,
    },
    {
        id: 'builder',
        name: 'Builder',
        amount: 15,
        frequency: 'monthly',
        label: 'Monthly',
        summary: 'For churches and teams actively using LyricDisplay.',
        impact: ['Code signing fund', 'Integration work', 'Priority bug investigation'],
        featured: true,
    },
    {
        id: 'patron',
        name: 'Patron',
        amount: 30,
        frequency: 'monthly',
        label: 'Monthly',
        summary: 'For teams that want to underwrite long-term development.',
        impact: ['Major features', 'Production reliability', 'Compatibility testing'],
        featured: false,
    },
];

const oneTimeAmounts = [5, 10, 25, 50];
const customFrequencies = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annually', label: 'Annually' },
];

const formatCurrency = amount => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
}).format(Number(amount) || 0);

const createReference = () => `LD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.55, ease: 'easeOut' },
};

function Field({ label, optional, children }) {
    return (
        <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span className="label-dark">
                {label} {optional && <span style={{ color: 'var(--text-muted)', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>}
            </span>
            {children}
        </label>
    );
}

export default function DonatePage() {
    const navbarHeight = useNavbarHeight();
    const [mode, setMode] = useState('subscription');
    const [selectedPlanId, setSelectedPlanId] = useState('builder');
    const [oneTimeAmount, setOneTimeAmount] = useState(25);
    const [customAmount, setCustomAmount] = useState(10);
    const [customFrequency, setCustomFrequency] = useState('monthly');
    const [donor, setDonor] = useState({ name: '', email: '', note: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const planCarouselRef = useRef(null);
    const planScrollTimeoutRef = useRef(null);

    const selectedPlanIndex = useMemo(
        () => Math.max(0, subscriptionPlans.findIndex(plan => plan.id === selectedPlanId)),
        [selectedPlanId]
    );

    const selectedPlan = useMemo(
        () => subscriptionPlans.find(plan => plan.id === selectedPlanId) || subscriptionPlans[1],
        [selectedPlanId]
    );

    const donationSummary = useMemo(() => {
        if (mode === 'one-time') {
            return {
                title: 'One-time donation',
                amount: Number(oneTimeAmount) || 0,
                frequency: 'once',
                paymentType: 'one_time',
                planId: '',
            };
        }

        if (mode === 'custom') {
            return {
                title: 'Custom subscription',
                amount: Number(customAmount) || 0,
                frequency: customFrequency,
                paymentType: 'custom_subscription',
                planId: '',
            };
        }

        return {
            title: `${selectedPlan.name} plan`,
            amount: selectedPlan.amount,
            frequency: selectedPlan.frequency,
            paymentType: 'subscription',
            planId: selectedPlan.id,
        };
    }, [customAmount, customFrequency, mode, oneTimeAmount, selectedPlan]);

    const canPay = donor.email.trim() && donationSummary.amount >= 1;

    const showPlan = index => {
        const boundedIndex = Math.min(Math.max(index, 0), subscriptionPlans.length - 1);
        setSelectedPlanId(subscriptionPlans[boundedIndex].id);
    };

    const handlePlanCarouselScroll = () => {
        if (typeof window === 'undefined' || window.matchMedia('(min-width: 1024px)').matches) return;

        window.clearTimeout(planScrollTimeoutRef.current);
        planScrollTimeoutRef.current = window.setTimeout(() => {
            const carousel = planCarouselRef.current;
            if (!carousel) return;

            const index = Math.round(carousel.scrollLeft / Math.max(carousel.clientWidth, 1));
            const plan = subscriptionPlans[index];
            if (plan && plan.id !== selectedPlanId) {
                setSelectedPlanId(plan.id);
            }
        }, 80);
    };

    const updateDonor = event => {
        const { name, value } = event.target;
        setDonor(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const params = new URLSearchParams(window.location.search);
        const reference = params.get('reference') || params.get('trxref');
        if (!reference) return undefined;

        const controller = new AbortController();

        const verifyPayment = async () => {
            setVerifying(true);
            setStatus({ type: 'info', message: 'Confirming your payment with Paystack...' });

            try {
                const response = await fetch(`${PAYSTACK_VERIFY_API_URL}?reference=${encodeURIComponent(reference)}`, {
                    signal: controller.signal,
                });
                const data = await response.json().catch(() => ({}));

                if (!response.ok) throw new Error(data.message || 'Unable to verify payment.');

                if (data.status === 'success') {
                    const amount = data.amount ? formatCurrency(data.amount / 100) : 'your donation';
                    setStatus({
                        type: 'success',
                        message: `Thank you. Paystack confirmed ${amount}. Reference: ${data.reference || reference}`,
                    });
                } else {
                    setStatus({
                        type: 'error',
                        message: `Paystack returned "${data.status || 'unknown'}" for this payment. Reference: ${data.reference || reference}`,
                    });
                }

                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setStatus({ type: 'error', message: error.message || 'Unable to verify payment.' });
                }
            } finally {
                setVerifying(false);
            }
        };

        verifyPayment();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || mode !== 'subscription') return;
        if (window.matchMedia('(min-width: 1024px)').matches) return;

        const carousel = planCarouselRef.current;
        if (!carousel) return;

        carousel.scrollTo({
            left: carousel.clientWidth * selectedPlanIndex,
            behavior: 'smooth',
        });
    }, [mode, selectedPlanIndex]);

    useEffect(() => () => window.clearTimeout(planScrollTimeoutRef.current), []);

    const initializeDonation = async payload => {
        const response = await fetch(PAYSTACK_DONATION_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Donation initializer failed.');
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || 'Donation initializer failed.');
        }

        const authorizationUrl = data.authorization_url || data.data?.authorization_url;

        if (!authorizationUrl) throw new Error('No Paystack authorization URL was returned.');
        window.location.href = authorizationUrl;
    };

    const handlePayment = async event => {
        event.preventDefault();
        setStatus({ type: '', message: '' });

        if (!canPay) {
            setStatus({ type: 'error', message: 'Add a valid email and donation amount to continue.' });
            return;
        }

        setSubmitting(true);
        const reference = createReference();
        const payload = {
            reference,
            amount: donationSummary.amount,
            amountMinor: donationSummary.amount * 100,
            currency: 'USD',
            email: donor.email.trim(),
            name: donor.name.trim(),
            note: donor.note.trim(),
            type: donationSummary.paymentType,
            frequency: donationSummary.frequency,
            planId: donationSummary.planId,
            source: 'donate-page',
        };

        try {
            await initializeDonation(payload);
        } catch (error) {
            setStatus({ type: 'error', message: error.message || 'Unable to start Paystack checkout.' });
            setSubmitting(false);
        }
    };

    return (
        <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
            <SEO
                title="Donate - Support LyricDisplay Development"
                description="Support LyricDisplay with one-time donations or recurring subscription plans through a Paystack-ready donation page."
                keywords="LyricDisplay donate, support LyricDisplay, Paystack donation, open source worship software"
            />
            <Navbar />

            <section style={{ paddingTop: navbarHeight + 44, paddingBottom: 52, background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 75% 55% at 50% 0%, rgba(94,234,212,0.08), transparent 58%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(94,234,212,0.35), transparent)' }} />
                <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
                    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '2rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                        <ArrowLeft size={14} /> Back to Home
                    </a>

                    <div style={{ maxWidth: 700 }}>
                        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
                            <span className="section-label">Support development</span>
                            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 700, marginBottom: '1.25rem' }}>
                                Keep LyricDisplay free for production teams.
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.04rem', lineHeight: 1.75, maxWidth: 640 }}>
                                Donations help cover code signing, compatibility testing, documentation, and the development time needed to make live lyric display dependable.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section style={{ padding: '56px 0 92px', background: 'var(--ink)' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
                        <div style={{ display: 'grid', gap: 28 }}>
                            <MotionDiv {...fadeUp}>
                                <div style={{ display: 'inline-grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, padding: 6, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface)', width: 'min(100%, 620px)', marginBottom: 22 }}>
                                    {[
                                        { id: 'subscription', label: 'Plans' },
                                        { id: 'one-time', label: 'One-time' },
                                        { id: 'custom', label: 'Custom' },
                                    ].map(option => (
                                        <button key={option.id} type="button" onClick={() => setMode(option.id)}
                                            style={{
                                                border: 'none',
                                                borderRadius: 8,
                                                padding: '12px 10px',
                                                cursor: 'pointer',
                                                background: mode === option.id ? 'var(--primary-gradient)' : 'transparent',
                                                color: mode === option.id ? '#fff' : 'var(--text-secondary)',
                                                fontFamily: 'var(--font-body)',
                                                fontWeight: 700,
                                                fontSize: '0.88rem',
                                            }}>
                                            {option.label}
                                        </button>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {mode === 'subscription' && (
                                        <MotionDiv key="plans" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
                                            className="donation-plan-carousel" role="region" aria-label="Donation subscription plans">
                                            <div className="donation-plan-carousel__controls" aria-label="Plan carousel controls">
                                                <button type="button" className="donation-plan-carousel__nav" onClick={() => showPlan(selectedPlanIndex - 1)} disabled={selectedPlanIndex === 0} aria-label="Previous plan">
                                                    <ArrowLeft size={17} />
                                                </button>
                                                <span className="donation-plan-carousel__count">
                                                    {selectedPlanIndex + 1} / {subscriptionPlans.length}
                                                </span>
                                                <button type="button" className="donation-plan-carousel__nav" onClick={() => showPlan(selectedPlanIndex + 1)} disabled={selectedPlanIndex === subscriptionPlans.length - 1} aria-label="Next plan">
                                                    <ArrowRight size={17} />
                                                </button>
                                            </div>

                                            <div ref={planCarouselRef} className="donation-plan-carousel__track" onScroll={handlePlanCarouselScroll}>
                                                {subscriptionPlans.map(plan => (
                                                    <button key={plan.id} type="button" onClick={() => setSelectedPlanId(plan.id)}
                                                        className="card-dark donation-plan-card"
                                                        aria-current={selectedPlanId === plan.id ? 'true' : undefined}
                                                        style={{
                                                            padding: '1.5rem',
                                                            textAlign: 'left',
                                                            cursor: 'pointer',
                                                            borderColor: selectedPlanId === plan.id ? 'rgba(94,234,212,0.42)' : plan.featured ? 'rgba(124,58,237,0.32)' : 'var(--border)',
                                                            boxShadow: selectedPlanId === plan.id ? '0 0 0 1px rgba(94,234,212,0.16), 0 20px 58px rgba(0,0,0,0.38)' : undefined,
                                                            transform: selectedPlanId === plan.id ? 'translateY(-3px)' : undefined,
                                                        }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: '1rem' }}>
                                                            <span className={plan.featured ? 'pill pill-primary' : 'pill pill-dim'}>{plan.featured ? 'Recommended' : plan.label}</span>
                                                            {selectedPlanId === plan.id && <BadgeCheck size={18} style={{ color: 'var(--teal)' }} />}
                                                        </div>
                                                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>{plan.name}</h2>
                                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, minHeight: 70 }}>{plan.summary}</p>
                                                        <div style={{ margin: '1.2rem 0' }}>
                                                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--text-primary)', fontWeight: 600 }}>{formatCurrency(plan.amount)}</span>
                                                            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.76rem' }}> / month</span>
                                                        </div>
                                                        <div style={{ display: 'grid', gap: '0.65rem' }}>
                                                            {plan.impact.map(item => (
                                                                <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
                                                                    <CheckCircle2 size={14} style={{ color: 'var(--teal)', flexShrink: 0 }} /> {item}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </MotionDiv>
                                    )}

                                    {mode === 'one-time' && (
                                        <MotionDiv key="once" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
                                            className="card-dark" style={{ padding: '1.5rem' }}>
                                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.45rem' }}>Make a one-time donation</h2>
                                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.3rem' }}>A once-off gift helps with immediate project costs like packaging, testing, and infrastructure.</p>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginBottom: '1rem' }}>
                                                {oneTimeAmounts.map(amount => (
                                                    <button key={amount} type="button" onClick={() => setOneTimeAmount(amount)}
                                                        style={{
                                                            padding: '1rem',
                                                            borderRadius: 10,
                                                            border: oneTimeAmount === amount ? '1px solid rgba(94,234,212,0.45)' : '1px solid var(--border)',
                                                            background: oneTimeAmount === amount ? 'rgba(94,234,212,0.08)' : 'var(--ink)',
                                                            color: 'var(--text-primary)',
                                                            cursor: 'pointer',
                                                            fontWeight: 800,
                                                        }}>
                                                        {formatCurrency(amount)}
                                                    </button>
                                                ))}
                                            </div>
                                            <Field label="Or enter another amount">
                                                <input className="input-dark" type="number" min="1" step="1" value={oneTimeAmount} onChange={e => setOneTimeAmount(e.target.value)} />
                                            </Field>
                                        </MotionDiv>
                                    )}

                                    {mode === 'custom' && (
                                        <MotionDiv key="custom" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
                                            className="card-dark" style={{ padding: '1.5rem' }}>
                                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.45rem' }}>Create a custom subscription</h2>
                                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.3rem' }}>Set the recurring amount and cadence that matches your team. Live custom recurring setup should be initialized from a secure backend.</p>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <Field label="Amount">
                                                    <input className="input-dark" type="number" min="1" step="1" value={customAmount} onChange={e => setCustomAmount(e.target.value)} />
                                                </Field>
                                                <Field label="Frequency">
                                                    <div style={{ position: 'relative' }}>
                                                        <select className="input-dark" value={customFrequency} onChange={e => setCustomFrequency(e.target.value)} style={{ paddingRight: 42, cursor: 'pointer' }}>
                                                            {customFrequencies.map(frequency => (
                                                                <option key={frequency.value} value={frequency.value}>{frequency.label}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                                                    </div>
                                                </Field>
                                            </div>
                                            <div className="alert-box alert-info" style={{ marginTop: '1.15rem' }}>
                                                <Info size={16} style={{ color: 'var(--primary-bright)', flexShrink: 0, marginTop: 2 }} />
                                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                                                    Paystack custom recurring plans require a secret-key backend to create or select a plan before checkout.
                                                </span>
                                            </div>
                                        </MotionDiv>
                                    )}
                                </AnimatePresence>
                            </MotionDiv>
                        </div>

                        <MotionDiv {...fadeUp} className="card-dark" style={{ padding: '1.4rem', position: 'sticky', top: navbarHeight + 24 }}>
                            <form onSubmit={handlePayment} style={{ display: 'grid', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                                    <div>
                                        <span className="section-label" style={{ marginBottom: '0.4rem' }}>Donation summary</span>
                                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.05 }}>{donationSummary.title}</h2>
                                    </div>
                                    <div className="icon-wrap" style={{ color: 'var(--teal)', background: 'var(--teal-dim)', borderColor: 'rgba(94,234,212,0.22)' }}>
                                        <Heart size={20} />
                                    </div>
                                </div>

                                <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', background: 'rgba(255,255,255,0.025)' }}>
                                    <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Total</p>
                                    <p style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontSize: '2.4rem', fontWeight: 600, lineHeight: 1 }}>{formatCurrency(donationSummary.amount)}</p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.45rem', textTransform: 'capitalize' }}>{donationSummary.frequency === 'once' ? 'Charged once' : `Charged ${donationSummary.frequency}`}</p>
                                </div>

                                <Field label="Name" optional>
                                    <input className="input-dark" name="name" value={donor.name} onChange={updateDonor} placeholder="Your name or organization" />
                                </Field>
                                <Field label="Email">
                                    <input className="input-dark" name="email" type="email" value={donor.email} onChange={updateDonor} required placeholder="you@example.com" />
                                </Field>
                                <Field label="Note" optional>
                                    <textarea className="input-dark" name="note" value={donor.note} onChange={updateDonor} placeholder="Add a short note" rows={3} style={{ resize: 'vertical', lineHeight: 1.55 }} />
                                </Field>

                                <AnimatePresence>
                                    {status.message && (
                                        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                            className={`alert-box ${status.type === 'success' ? 'alert-success' : status.type === 'error' ? 'alert-error' : 'alert-info'}`}
                                            style={{ padding: '0.9rem 1rem' }}>
                                            <Info size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>{status.message}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button type="submit" className="btn-primary" disabled={submitting || verifying || !canPay} style={{ justifyContent: 'center', width: '100%' }}>
                                    {submitting || verifying ? <RefreshCw size={16} /> : <CreditCard size={16} />}
                                    {verifying ? 'Confirming payment...' : submitting ? 'Starting checkout...' : 'Continue to Paystack'}
                                    {!submitting && !verifying && <ArrowRight size={15} />}
                                </button>

                                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.55, textAlign: 'center' }}>
                                    Payments are processed by Paystack. Card details are never stored by LyricDisplay.
                                </p>
                            </form>
                        </MotionDiv>
                    </div>
                </div>
            </section>

            <Footer />
            <BackToTopButton />
        </div>
    );
}
