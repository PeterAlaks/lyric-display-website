import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function ReviewSlider({ reviews }) {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [direction, setDirection] = React.useState(0);
    const [containerHeight, setContainerHeight] = React.useState('auto');
    const cardRef = React.useRef(null);

    React.useEffect(() => {
        if (cardRef.current) {
            const height = cardRef.current.offsetHeight;
            setContainerHeight(height + 40);
        }
    }, [currentIndex]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            if (newDirection === 1) {
                return (prevIndex + 1) % reviews.length;
            } else {
                return (prevIndex - 1 + reviews.length) % reviews.length;
            }
        });
    };

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const splitIntoSentences = (text) => {
        return text.match(/[^.!?]+[.!?]+/g) || [text];
    };

    const getBodyFontSize = (restOfText) => {
        const length = restOfText.length;
        if (length > 400) return 'text-sm md:text-base lg:text-base';
        if (length > 300) return 'text-sm md:text-lg lg:text-lg';
        return 'text-base md:text-xl lg:text-xl';
    };

    const currentReview = reviews[currentIndex];
    const sentences = splitIntoSentences(currentReview.description);
    const hasMultipleSentences = sentences.length > 2;
    const restOfText = sentences.slice(1).join(' ').trim();

    return (
        <div className="relative">
            {/* Slider Container */}
            <div
                className="relative flex items-center py-4 transition-all duration-300"
                style={{
                    minHeight: typeof containerHeight === 'number' ? `${containerHeight}px` : '450px'
                }}
            >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "tween", duration: 0.5, ease: "easeInOut" },
                            opacity: { duration: 0.3 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full px-8 md:px-12 cursor-grab active:cursor-grabbing"
                    >
                        <div
                            ref={cardRef}
                            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 md:p-10 lg:p-12 border border-blue-100 shadow-2xl flex flex-col"
                        >
                            <div className="relative flex-1 flex flex-col">
                                <Quote className="absolute -top-4 -left-2 w-12 h-12 text-blue-200 opacity-50" />
                                <div className="relative z-10 flex-1 flex flex-col justify-center">
                                    {hasMultipleSentences ? (
                                        <>
                                            <p className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
                                                "{sentences[0].trim()}"
                                            </p>
                                            <p className={`${getBodyFontSize(restOfText)} font-normal text-gray-700 leading-relaxed`} style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>
                                                {restOfText}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-base md:text-xl lg:text-2xl font-normal text-gray-900 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>
                                            "{currentReview.description}"
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-6 border-t border-blue-200">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">{currentReview.name}</p>
                                        {currentReview.organization && (
                                            <p className="text-gray-600 text-sm">{currentReview.organization}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < currentReview.rating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full">
                                        {currentReview.platform}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {reviews.length > 1 && (
                <>
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 text-gray-800 z-10"
                        aria-label="Previous review"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 text-gray-800 z-10"
                        aria-label="Next review"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {reviews.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all ${index === currentIndex
                                ? 'w-8 h-3 bg-blue-600'
                                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                                } rounded-full`}
                            aria-label={`Go to review ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}