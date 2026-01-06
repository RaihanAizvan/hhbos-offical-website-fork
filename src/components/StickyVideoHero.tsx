import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";

const StickyVideoHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // Video scrolls slower (0.6x speed) creating parallax depth effect
  const videoY = useTransform(scrollY, [0, 1000], [0, 600]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Hero Content - Front Layer (near) - scrolls normally */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-20">
          {/* Left: Bold Typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight break-words">
              EMPOWERING
              <br />
              <span className="inline-flex flex-wrap items-center gap-2">
                YOUR
                <svg viewBox="0 0 40 40" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 inline-block flex-shrink-0" fill="none">
                  <path d="M8 8L20 20M20 20L32 8M20 20V32" stroke="#FF6D1F" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                BUSINESS
              </span>
            </h1>

            {/* Pause button */}
            <button className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            </button>
          </motion.div>

          {/* Right: Tagline Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-6 lg:pl-12"
          >
            {/* Orange accent bar */}
            <div className="w-16 h-1 bg-primary" />
            
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Precision, Efficiency, and Data Intelligence
            </h2>
            
            <p className="text-lg text-white/80 leading-relaxed">
              We provide end-to-end Finance & Accounts, Revenue Cycle Management, and Database Administration solutions that streamline your operations and drive measurable growth.
            </p>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-white font-medium hover:gap-4 transition-all group"
            >
              Explore Our Services
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 4L16 12L8 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StickyVideoHero;
