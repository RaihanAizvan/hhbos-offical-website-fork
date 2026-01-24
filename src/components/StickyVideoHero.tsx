import { useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const StickyVideoHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black/50"
    >
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-6xl space-y-6"
        >
          {/* Headline */}
          <h1 className="font-bold leading-tight tracking-tight text-white text-center">
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
              Empowering Businesses with Precision,
            </span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/90">
              Efficiency, and Data Intelligence
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed text-center px-4">
            We provide end-to-end Finance & Accounts, Revenue Cycle Management,
            and Database Administration solutions that streamline your
            operations and drive measurable growth.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link
              to="/services"
              className="w-full sm:w-auto text-center px-6 py-3 border border-white/20 text-primary bg-white font-semibold text-sm sm:text-base rounded-lg shadow-lg hover:scale-105 transition-all"
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
