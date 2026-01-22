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
  const radius = useRef(120);

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
      radius.current = 120;
      applyVars();

      gsap.set([maskDimRef.current, maskChromaRef.current], { opacity: 0 });
    }, containerRef);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
  }, []);

  const setMousePercent = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouse.current.x = Math.max(0, Math.min(100, x));
    mouse.current.y = Math.max(0, Math.min(100, y));
  };

  const onEnter = (e: MouseEvent<HTMLDivElement>) => {
    hoverRef.current = true;
    setMousePercent(e);

    gsap.killTweensOf(radius);
    gsap.to(radius, {
      current: 240,
      duration: 0.45,
      ease: "power3.out",
      onUpdate: scheduleVars,
    });

    gsap.to([maskDimRef.current, maskChromaRef.current], {
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(cardRef.current, {
      y: -10,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(imageWrapRef.current, {
      scale: 1.04,
      duration: 0.65,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    hoverRef.current = false;

    gsap.killTweensOf(radius);
    gsap.to(radius, {
      current: 120,
      duration: 0.35,
      ease: "power3.out",
      onUpdate: scheduleVars,
    });

    gsap.to([maskDimRef.current, maskChromaRef.current], {
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.55,
      ease: "power3.out",
    });

    gsap.to(imageWrapRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    setMousePercent(e);
    scheduleVars();

    if (!hoverRef.current || !cardRef.current || !imageWrapRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: px * 8,
      rotateX: -py * 8,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(imageWrapRef.current, {
      x: px * 10,
      y: py * 10,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-[420px] md:h-[440px]"
      style={{
        // defaults; updated live on hover
        // @ts-expect-error CSS vars
        "--x": "50%",
        // @ts-expect-error CSS vars
        "--y": "50%",
        // @ts-expect-error CSS vars
        "--r": "120px",
      }}
    >
      <div
        ref={cardRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={onMove}
        className={
          "group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer " +
          "bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.70)]"
        }
      >
        {/* Border / surface */}
        <div className="absolute inset-0 rounded-2xl border border-white/10" />

        {/* Image */}
        <div ref={imageWrapRef} className="absolute inset-0">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* base readability */}
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* DIM MASK: darken outside spotlight */}
        <div
          ref={maskDimRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-200"
          style={{
            background: "rgba(0,0,0,0.55)",
            maskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 35%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.9) 100%)",
            WebkitMaskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 35%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.9) 100%)",
          }}
        />

        {/* CHROMA MASK: subtly mute everything EXCEPT spotlight by using backdrop-filter */}
        <div
          ref={maskChromaRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-200"
          style={{
            backdropFilter: "grayscale(1) brightness(0.78)",
            WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
            background: "rgba(0,0,0,0.001)",
            maskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 35%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.75) 100%)",
            WebkitMaskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 35%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        {/* Accent: thin gradient rim that reacts subtly */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,107,31,0.45), rgba(0,0,0,0) 45%, rgba(56,189,248,0.22))",
            mixBlendMode: "screen",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
          <span className="text-orange-400 text-[11px] font-bold tracking-widest uppercase mb-3">
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
