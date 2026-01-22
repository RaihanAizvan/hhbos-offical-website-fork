import React, { MouseEvent, useLayoutEffect, useRef } from "react";
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
 * Inspired by React Bits "ChromaGrid":
 * - Cursor-driven masked overlays (via CSS mask-image) create a premium spotlight
 *   that selectively reveals clarity/color while the outside area is subtly muted.
 * - Smooth radius expansion on hover.
 * - Subtle 3D tilt for depth (kept professional).
 */
const ServiceCard: React.FC<ServiceCardProps> = ({
  category,
  title,
  description,
  imageUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const maskDimRef = useRef<HTMLDivElement>(null);
  const maskChromaRef = useRef<HTMLDivElement>(null);

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
      if (!containerRef.current || !cardRef.current) return;

      gsap.set(containerRef.current, { perspective: 1400 });
      gsap.set(cardRef.current, {
        transformStyle: "preserve-3d",
        willChange: "transform",
      });

      gsap.set(imageWrapRef.current, { willChange: "transform" });

      // Base state
      radius.current = 160;
      applyVars();

      gsap.set([maskDimRef.current, maskChromaRef.current], { opacity: 0 });
    }, containerRef);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
  }, []);

  const setMousePercent = (e: Pick<MouseEvent<HTMLDivElement>, "clientX" | "clientY">) => { 
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouse.current.x = Math.max(0, Math.min(100, x));
    mouse.current.y = Math.max(0, Math.min(100, y));
  };

  const onEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    hoverRef.current = true;
    setMousePercent(e);

    // Apply immediately so the spotlight works even without mouse movement
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
      current: 120,
      duration: 0.35,
      ease: "power3.out",
      onUpdate: scheduleVars,
    });

    // Ensure vars are in a sane state after leaving
    applyVars();
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setMousePercent(e);
    scheduleVars();

    // No transform/parallax/tilt on hover; Chroma + spotlight only.
    // (mousemove is used only to update spotlight vars above)
    return;
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-[520px] md:h-[560px]"
      style={{
        // defaults; updated live on hover
        // @ts-expect-error CSS vars
        "--x": "50%",
        "--y": "50%",
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
          "bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.70)]"
        }
      >
        {/* Border / surface */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />

        {/* Image */}
        <div ref={imageWrapRef} className="pointer-events-none absolute inset-0">
          {/* Base image: monochrome by default */}
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(0.45) saturate(0.75) contrast(1.05)" }}
            loading="lazy"
          />

          {/* Color reveal image: visible only inside spotlight */}
          <img
            src={imageUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              maskImage:
                "radial-gradient(circle var(--r) at var(--x) var(--y), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 75%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "radial-gradient(circle var(--r) at var(--x) var(--y), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 75%, rgba(0,0,0,0) 100%)",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
            }}
          />
          {/* base readability */}
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* DIM MASK: darken outside spotlight */}
        <div
          ref={maskDimRef}
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            background: "rgba(0,0,0,0.55)",
            maskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 35%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.9) 100%)",
            WebkitMaskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 35%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.9) 100%)",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%", 
          }}
        />

        {/* CHROMA MASK: subtly mute everything EXCEPT spotlight by using backdrop-filter */}
        <div
          ref={maskChromaRef}
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            backdropFilter: "grayscale(1) brightness(0.78)",
            WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
            background: "rgba(0,0,0,0.001)",
            maskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 35%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.75) 100%)",
            WebkitMaskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 35%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.75) 100%)",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%", 
          }}
        />

        {/* Accent: black-themed vignette/sheen for depth (no orange) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at var(--x) var(--y), rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        {/* Content */}
        <div className="pointer-events-auto absolute inset-0 p-6 flex flex-col justify-end z-10">
          <span className="text-white/70 text-[11px] font-bold tracking-widest uppercase mb-3">
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
      </div>
    </div>
  );
};

export default ServiceCard;
