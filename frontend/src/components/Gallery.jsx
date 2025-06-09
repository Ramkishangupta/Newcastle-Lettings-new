import React, { useState, useCallback } from 'react';
import { FaMapMarkedAlt, FaThLarge, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';

// Utility function to get tab button styles
const getTabButtonClasses = (isActive) => {
  const base = 'flex items-center gap-2 px-5 py-3 text-base md:text-lg font-medium border-b-2 transition-colors duration-300';
  return isActive
    ? `${base} text-white border-white`
    : `${base} text-gray-400 border-transparent hover:text-white`;
};

const Gallery = ({ images = [], locationEmbedUrl }) => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const totalImages = images.length;
  const currentImageUrl = images[currentIndex]?.url || '';

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    setHasError(false);
  }, [totalImages]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    setHasError(false);
  }, [totalImages]);

  const openFocusMode = () => setIsFocusMode(true);
  const closeFocusMode = () => setIsFocusMode(false);
  const handleImageError = () => setHasError(true);

  return (
    <section className="bg-[#0C1C4D] text-white py-6">
      {/* Tabs */}
      <div className="flex justify-center gap-8 mb-6">
        {['gallery', 'location'].map((tab) => (
          <button
            key={tab}
            className={getTabButtonClasses(activeTab === tab)}
            onClick={() => {
              setActiveTab(tab);
              setHasError(false);
            }}
            aria-label={`Switch to ${tab}`}
            type="button"
          >
            {tab === 'gallery' ? <FaThLarge /> : <FaMapMarkedAlt />} {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative w-full max-w-5xl mx-auto px-4">
        {activeTab === 'gallery' && (
          <div className="relative overflow-hidden rounded-lg mb-6 sm:h-[250px] md:h-[200px] lg:h-[500px] cursor-pointer">
            <AnimatePresence mode="wait">
              {!hasError && currentImageUrl ? (
                <motion.img
                  key={currentImageUrl}
                  src={currentImageUrl}
                  alt={`Gallery image ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  onError={handleImageError}
                  loading="lazy"
                  onClick={openFocusMode}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300 text-lg">
                  Failed to load image.
                </div>
              )}
            </AnimatePresence>

            {/* Navigation Arrows */}
            {totalImages > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full focus:outline-none"
                  aria-label="Previous image"
                  type="button"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full focus:outline-none"
                  aria-label="Next image"
                  type="button"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === 'location' && locationEmbedUrl && (
          <div className="w-full h-[300px] sm:h-[250px] md:h-[200px] lg:h-[500px] rounded-lg overflow-hidden">
            <iframe
              src={locationEmbedUrl}
              title="Location Map"
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>

      {/* Focus Modal */}
      <AnimatePresence>
        {isFocusMode && (
          <motion.div
            key="focus-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={closeFocusMode}
          >
            <button
              aria-label="Close modal"
              onClick={closeFocusMode}
              className="absolute top-6 right-6 text-white text-3xl p-2 rounded-full bg-black/70 hover:bg-opacity-90 focus:outline-none z-60"
              type="button"
            >
              <IoMdClose />
            </button>

            <motion.img
              src={currentImageUrl}
              alt={`Focused image ${currentIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
