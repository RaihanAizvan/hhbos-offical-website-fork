import { useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

const StickyVideoHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const videoSrc = isLight ? "/video/web%20bg%20light.mp4" : "/video/web%20bg.webm";

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      <div className="absolute inset-0">
        <video
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        >
          <source src={videoSrc} type={isLight ? "video/mp4" : "video/webm"} />
        </video>
      </div>
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-6xl space-y-6"
        >
          {/* Headline */}
          <h1 className="font-bold leading-tight tracking-tight text-foreground text-center">
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
              Empowering Businesses with Precision,
            </span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground/90">
              Efficiency, and Data Intelligence
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-center px-4">
            We provide end-to-end Finance & Accounts, Revenue Cycle Management,
            and Data Analytics solutions that streamline your
            operations and drive measurable growth.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link
              to="/services"
              className="w-full sm:w-auto text-center px-6 py-3 border border-border text-primary bg-background font-semibold text-sm sm:text-base rounded-lg shadow-lg hover:scale-105 transition-all"
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
