import React, { useRef, useLayoutEffect, MouseEvent } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  category,
  title,
  description,
  imageUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flyWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Gentle Idle (only on the wrapper)
      gsap.to(flyWrapperRef.current, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.set(containerRef.current, { transformPerspective: 1000 });

      // 2. High-End Interaction Timeline
      tl.current = gsap
        .timeline({ paused: true })
        // Step A: The "Physical" launch
        .to(flyWrapperRef.current, {
          x: 20, // Reduced from 140 to keep it within safe UI bounds
          y: 20,
          rotationZ: 1,
          skewX: 4,
          filter: "blur(8px)",
          duration: 0.4,
          ease: "power2.in",
        })
        // Step B: The "Settle"
        .to(flyWrapperRef.current, {
          x: 0,
          y: 0,
          rotationZ: 0,
          skewX: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "expo.out",
        })
        // Step C: Content & Image Transform (happens during settle)
        .to(
          imageRef.current,
          {
            scale: 0.4,
            x: "15%",
            y: "100%",
            borderRadius: "20px",
            duration: 0.6,
            ease: "expo.out",
          },
          "-=0.5",
        )
        .to(".card-overlay", { opacity: 0.9, duration: 0.4 }, "<")
        .fromTo(
          ".reveal-text",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.4 },
          "-=0.3",
        )
        .fromTo(
          ".cta-button",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.2",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!flyWrapperRef.current || !spotlightRef.current) return;
    const rect = flyWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(spotlightRef.current, {
      opacity: 1,
      x: x - 150,
      y: y - 150,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    // 1. Layout Anchor (Stays in the grid)
    <div
      ref={containerRef}
      className="w-[420px] h-[540px]"
    >
      {/* 2. Fly Wrapper (Does the heavy moving) */}
      <div
        ref={flyWrapperRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => tl.current?.play()}
        onMouseLeave={() => {
          tl.current?.reverse();
          gsap.to(spotlightRef.current, { opacity: 0 });
        }}
        className="relative w-full h-full bg-[#050505] rounded-md overflow-hidden border border-white/10 cursor-pointer shadow-2xl will-change-transform"
      >
        {/* Spotlight */}
        <div
          ref={spotlightRef}
          className="absolute w-[300px] h-[300px] bg-orange-600/15 rounded-full blur-[90px] pointer-events-none opacity-0 z-0"
        />

        {/* Image Layer */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full z-10 origin-top-right"
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Dual overlay for readability */}
          <div className="card-overlay absolute inset-0 transition-opacity">
            {/* Global darken */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Bottom gradient scrim (key part) */}
            <div className="absolute bottom-0 left-0 w-full h-[65%] bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
          <span className="reveal-text text-orange-400 text-[11px] font-bold tracking-widest uppercase mb-3">
            {category}
          </span>
          <h3 className="text-white text-2xl font-semibold mb-3 leading-snug drop-shadow-md">
            {title}
          </h3>

          <div className="overflow-hidden">
            <p className="reveal-text text-gray-300 text-sm mb-6 opacity-0 leading-relaxed">
              {description}
            </p>
          </div>

          <Link
            to={"/services"}
            className="cta-button flex items-center gap-2 text-white text-sm font-bold opacity-0 group"
          >
            LEARN MORE
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
