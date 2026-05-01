import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const MotionDiv = motion.div;

function ReviewCard({ review, measureRef }) {
    const splitSentences = t => t.match(/[^.!?]+[.!?]+/g) || [t];
    const sents = splitSentences(review.description);
    const hasMulti = sents.length > 1;

    return (
        <div ref={measureRef} style={{
            background: 'var(--surface-up)',
            border: '0.5px solid var(--border)',
            borderRadius: 20,
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Gold accent line */}
            <div style={{ position: 'absolute', top: 0, left: '5%', right: '5%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.3), transparent)' }} />

            <Quote size={32} style={{ color: 'rgba(245,200,66,0.2)', marginBottom: '1.25rem' }} />

            {hasMulti ? (
                <>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 600, lineHeight: 1.2, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.015em' }}>
                        "{sents[0].trim()}"
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
                        {sents.slice(1).join(' ').trim()}
                    </p>
                </>
            ) : (
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 500, lineHeight: 1.4, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                    "{review.description}"
                </p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <div>
                    <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: 2 }}>{review.name}</p>
                    {review.organization && (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{review.organization}</p>
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 3 }}>
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14}
                                style={{ color: i < review.rating ? 'var(--primary)' : 'var(--border)', fill: i < review.rating ? 'var(--primary)' : 'none' }}
                            />
                        ))}
                    </div>
                    <span className="pill pill-dim" style={{ fontSize: '0.65rem' }}>{review.platform}</span>
                </div>
            </div>
        </div>
    );
}

export default function ReviewSlider({ reviews }) {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [direction, setDirection]       = React.useState(0);
    const [measuredHeights, setMeasuredHeights] = React.useState([]);
    const sliderRef                       = React.useRef(null);
    const measureRefs                     = React.useRef([]);

    const measureCards = React.useCallback(() => {
        const nextHeights = reviews.map((_, i) => Math.ceil(measureRefs.current[i]?.offsetHeight || 0));
        if (nextHeights.some(Boolean)) {
            setMeasuredHeights(prev => {
                const changed = nextHeights.length !== prev.length || nextHeights.some((height, i) => height !== prev[i]);
                return changed ? nextHeights : prev;
            });
        }
    }, [reviews]);

    React.useLayoutEffect(() => {
        measureCards();
    }, [measureCards]);

    React.useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return undefined;

        const measureSoon = () => requestAnimationFrame(measureCards);
        const frame = measureSoon();

        let resizeObserver;
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(measureSoon);
            resizeObserver.observe(slider);
        } else {
            window.addEventListener('resize', measureCards);
        }

        document.fonts?.ready?.then(measureCards);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver?.disconnect();
            window.removeEventListener('resize', measureCards);
        };
    }, [measureCards]);

    React.useEffect(() => {
        if (currentIndex >= reviews.length) {
            setCurrentIndex(0);
        }
    }, [currentIndex, reviews.length]);

    const cardHeight = Math.max(measuredHeights[currentIndex] || 320, 320);

    if (!reviews.length) {
        return null;
    }

    const setMeasureRef = index => node => {
        measureRefs.current[index] = node;
        if (node) {
            const nextHeight = Math.ceil(node.offsetHeight || 0);
            if (nextHeight) {
                setMeasuredHeights(prev => {
                    if (prev[index] === nextHeight) return prev;
                    const next = [...prev];
                    next[index] = nextHeight;
                    return next;
                });
            }
        }
    };

    const variants = {
        enter: d => ({ x: d > 0 ? 600 : -600, opacity: 0 }),
        center: { x: 0, opacity: 1, zIndex: 1 },
        exit:  d => ({ x: d < 0 ? 600 : -600, opacity: 0, zIndex: 0 }),
    };

    const paginate = (d) => {
        setDirection(d);
        setCurrentIndex(p => (p + d + reviews.length) % reviews.length);
    };

    const rev = reviews[currentIndex];

    return (
        <div ref={sliderRef} style={{ position: 'relative' }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: '100%', visibility: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
                {reviews.map((review, i) => (
                    <ReviewCard key={review.id || i} review={review} measureRef={setMeasureRef(i)} />
                ))}
            </div>

            {/* Card area */}
            <div style={{ position: 'relative', height: cardHeight, transition: 'height 0.28s ease' }}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <MotionDiv
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ x: { type: 'tween', duration: 0.45, ease: 'easeInOut' }, opacity: { duration: 0.25 } }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.8}
                        onDragEnd={(_, { offset, velocity }) => {
                            if (Math.abs(offset.x) * Math.abs(velocity.x) > 8000) {
                                paginate(offset.x < 0 ? 1 : -1);
                            }
                        }}
                        style={{ width: '100%', cursor: 'grab', position: 'absolute', top: 0, left: 0 }}
                    >
                        <ReviewCard review={rev} />
                    </MotionDiv>
                </AnimatePresence>
            </div>

            {/* Nav arrows */}
            {reviews.length > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '5rem' }}>
                    <button
                        onClick={() => paginate(-1)}
                        style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7"/></svg>
                    </button>

                    {/* Dots */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                                style={{
                                    width: i === currentIndex ? 28 : 8,
                                    height: 8,
                                    borderRadius: 4,
                                    background: i === currentIndex ? 'var(--primary-gradient)' : 'var(--border)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'width 0.3s, background 0.3s',
                                }}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => paginate(1)}
                        style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
                    </button>
                </div>
            )}
        </div>
    );
}
