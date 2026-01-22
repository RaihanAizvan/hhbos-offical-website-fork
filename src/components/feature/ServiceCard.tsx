import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

/**
 * ServiceCard (Chroma / spotlight variant)
 * Layout: image panel on top + separate bottom content panel (text is NOT on the image).
 * Effect: cursor-driven chroma spotlight on the image panel (inspired by React Bits ChromaGrid).
 */
const ServiceCard: React.FC<ServiceCardProps> = ({
  category,
  title,
  description,
  imageUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number | null>(null);
  const hoverRef = useRef(false);

  const mouse = useRef({ x: 50, y: 50 });
  const radius = useRef(160);

  const applyVars = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--x", `${mouse.current.x}%`);
    el.style.setProperty("--y", `${mouse.current.y}%`);
    el.style.setProperty("--r", `${radius.current}px`);
  };

  const scheduleVars = () => {
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      applyVars();
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Base state
      radius.current = 160;
      applyVars();
    }, containerRef);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
  }, []);

  const setMousePercent = (e: { clientX: number; clientY: number }) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouse.current.x = Math.max(0, Math.min(100, x));
    mouse.current.y = Math.max(0, Math.min(100, y));
  };

  const onEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    hoverRef.current = true;
    setMousePercent(e);
    applyVars();

    gsap.killTweensOf(radius);
    gsap.to(radius, {
      current: 320,
      duration: 0.45,
      ease: "power3.out",
      onUpdate: scheduleVars,
    });
  };

  const onLeave = (_e: React.PointerEvent<HTMLDivElement>) => {
    hoverRef.current = false;

    gsap.killTweensOf(radius);
    gsap.to(radius, {
      current: 160,
      duration: 0.35,
      ease: "power3.out",
      onUpdate: scheduleVars,
    });
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setMousePercent(e);
    scheduleVars();
    void hoverRef;
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-[580px] md:h-[640px]"
      style={{
        // @ts-expect-error CSS vars
        "--x": "50%",
        // @ts-expect-error CSS vars
        "--y": "50%",
        // @ts-expect-error CSS vars
        "--r": "160px",
      }}
    >
      <div
        ref={cardRef}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onPointerMove={onMove}
        className={
          "group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer " +
          "bg-[#111111] shadow-[0_30px_90px_rgba(0,0,0,0.70)] flex flex-col"
        }
      >
        {/* Border */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />

        {/* IMAGE PANEL */}
        <div className="relative w-full flex-1 overflow-hidden">
          {/* Base monochrome */}
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "grayscale(0.45) saturate(0.75) contrast(1.05)" }}
            loading="lazy"
          />

          {/* Color reveal inside spotlight (image-only) */}
          <img
            src={imageUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              maskImage:
                "radial-gradient(circle var(--r) at var(--x) var(--y), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 78%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "radial-gradient(circle var(--r) at var(--x) var(--y), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 78%, rgba(0,0,0,0) 100%)",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
            }}
          />
        </div>

        {/* CONTENT PANEL (separate from image) */}
        <div className="relative z-10 p-6 backdrop-blur-xl border-t border-white/10" style={{ backgroundColor: "rgba(17,17,17,0.78)" }}>
          <span className="text-white/70 text-[11px] font-bold tracking-widest uppercase mb-3 block">
            {category}
          </span>

          <h3 className="text-white text-2xl font-semibold mb-3 leading-snug">
            {title}
          </h3>

          <p className="text-white/75 text-sm mb-6 leading-relaxed">
            {description}
          </p>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-white text-sm font-bold"
          >
            LEARN MORE
            <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>

        {/* CARD-LEVEL CHROMA/SPOTLIGHT OVERLAYS (affect image + text) */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {/* Darken outside spotlight */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              background: "rgba(0,0,0,0.38)",
              maskImage:
                "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 30%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.65) 100%)",
              WebkitMaskImage:
                "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 30%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.65) 100%)",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
            }}
          />

          {/* Chroma mute outside spotlight (subtle) */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              backdropFilter: "grayscale(1) brightness(0.82)",
              WebkitBackdropFilter: "grayscale(1) brightness(0.82)",
              background: "rgba(0,0,0,0.001)",
              maskImage:
                "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 30%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.7) 100%)",
              WebkitMaskImage:
                "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 30%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.7) 100%)",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
            }}
          />

          {/* Black-themed vignette for depth */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at var(--x) var(--y), rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.28) 58%, rgba(0,0,0,0.65) 100%)",
            }}
          />
        </div>

        {/* Ensure border stays above overlays */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 z-30" />
      </div>
    </div>
  );
};

export default ServiceCard;
