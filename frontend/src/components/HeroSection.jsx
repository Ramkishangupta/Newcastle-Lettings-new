import React, { useEffect, useState } from "react";
import PropertyFilter from "./PropertyFilter";
function HeroSection({ images, label, heading, subheading }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[90vh] overflow-hidden">
      {/* Background Image Slideshow */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#061741]/80 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 flex h-full mt-40 text-center px-4">
        <div className="max-w-2xl mx-auto">
          {/* Top label */}
          <p className="text-sm text-white/80 font-bold tracking-[0.2em] uppercase mb-6 inline-block border-b-3 border-white/50 pb-1">
            {label}
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 font-playfair">
            {heading}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-[18px] text-white/80 leading-relaxed">
            {subheading}
          </p>
          <br />
          <br />
          <PropertyFilter/>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
