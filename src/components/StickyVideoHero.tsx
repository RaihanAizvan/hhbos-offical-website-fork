import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";

const StickyVideoHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // Video scrolls slower (0.6x speed) creating parallax depth effect
  const videoY = useTransform(scrollY, [0, 1000], [0, 600]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-black/50">
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-6xl space-y-6"
        >
          {/* Headline */}
          <h1 className="font-bold leading-[1.1] tracking-tight text-white">
            <span className="block text-4xl sm:text-3xl md:text-4xl lg:text-6xl">
              Empowering Businesses with Precision,
            </span>
            <span className="block text-white text-5xl sm:text-2xl md:text-3xl lg:text-5xl">
              Efficiency, and Data Intelligence
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            We provide end-to-end Finance & Accounts, Revenue Cycle Management,
            and Database Administration solutions that streamline your
            operations and drive measurable growth.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="px-6 py-3  bg-primary text-white font-semibold text-sm sm:text-base shadow-lg hover:scale-105 transition-all"
            >
              Get a Free Consultation
            </Link>

            <Link
              to="/services"
              className="px-6 py-3 border text-primary bg-white font-semibold text-sm sm:text-base hover:bg-white hover:text-primary shadow-lg hover:scale-105 transition-all"
            >
              Explore Our Services
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StickyVideoHero;
