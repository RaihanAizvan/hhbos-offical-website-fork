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
 * ServiceCard — Stacked Cards (Premium Depth)
 * Unique but professional:
 * - 2 offset "shadow slabs" behind the card (stack effect)
 * - On hover, layers separate slightly (depth)
 * - Subtle masked sheen passes across the card
 * - Content micro-reveal + CTA underline
 */
const ServiceCard: React.FC<ServiceCardProps> = ({
  category,
  title,
  description,
  imageUrl,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([layer1Ref.current, layer2Ref.current], {
        transformOrigin: "50% 50%",
      });

      gsap.set(sheenRef.current, { opacity: 0, xPercent: -70, scale: 1.15 });

      gsap.set(["[data-line]", "[data-cta]"], {
        opacity: 0,
        y: 10,
      });

      tl.current = gsap
        .timeline({ paused: true })
        // Separate layers (depth)
        .to(
          layer2Ref.current,
          {
            x: 18,
            y: 18,
            duration: 0.35,
            ease: "power3.out",
          },
          0
        )
        .to(
          layer1Ref.current,
          {
            x: 10,
            y: 10,
            duration: 0.35,
            ease: "power3.out",
          },
          0
        )
        // Main card subtle lift
        .to(
          cardRef.current,
          {
            y: -4,
            duration: 0.35,
            ease: "power3.out",
          },
          0
        )
        // Image treatment (refined)
        .to(
          imageRef.current,
          {
            scale: 1.04,
            filter: "grayscale(0.2) saturate(1.05) contrast(1.08)",
            duration: 0.65,
            ease: "power3.out",
          },
          0
        )
        // Sheen sweep (feathered)
        .to(
          sheenRef.current,
          {
            opacity: 1,
            duration: 0.10,
            ease: "power2.out",
          },
          0.06
        )
        .to(
          sheenRef.current,
          {
            xPercent: 70,
            duration: 0.4,
            ease: "power1.inOut",
          },
          0.08
        )
        .to(
          sheenRef.current,
          {
            opacity: 0,
            duration: 0.1,
            ease: "power2.out",
          },
          0.32
        )
        // Content reveal
        .to(
          "[data-line]",
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            stagger: 0.02,
            ease: "power3.out",
          },
          0.04
        )
        .to(
          "[data-cta]",
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power3.out",
          },
          0.22
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full h-[560px] md:h-[640px]">
      {/* Back layers */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.95) 100%)",
          boxShadow: "0 40px 110px rgba(0,0,0,0.55)",
        }}
      />
      <div
        ref={layer1Ref}
        className="absolute inset-0 rounded-3xl border border-white/10"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,17,0.65) 0%, rgba(17,17,17,0.88) 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      {/* Main card */}
      <div
        ref={cardRef}
        onPointerEnter={() => tl.current?.restart()}
        onPointerLeave={() => tl.current?.reverse()}
        className={
          "relative h-full rounded-3xl overflow-hidden border border-white/10 " +
          "bg-[#111111] shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
        }
      >
        {/* Media */}
        <div className="absolute inset-0">
          <img
            ref={imageRef}
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(0.35) saturate(0.9) contrast(1.02)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        </div>

        {/* Sheen (masked, subtle) */}
        <div
          ref={sheenRef}
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            // Feathered, soft specular sweep (no hard edge)
            background:
              "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.04) 75%, rgba(255,255,255,0) 100%)",
            filter: "blur(18px)",
            mixBlendMode: "screen",
            // Extra feather on band edges so it never looks like a paper strip
            maskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 22%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 22%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-7 md:p-8 flex flex-col justify-end">
          <div className="flex items-center justify-between">
            <span
              data-line
              className="text-white/70 text-[11px] font-bold tracking-widest uppercase"
            >
              {category}
            </span>
            <span
              data-line
              className="text-white/35 text-[11px] tracking-[0.25em] uppercase"
            >
              HHBOS
            </span>
          </div>

          <h3
            data-line
            className="mt-4 text-white text-3xl md:text-4xl font-semibold leading-tight"
          >
            {title}
          </h3>

          <p
            data-line
            className="mt-3 text-white/70 text-sm leading-relaxed max-w-[62ch]"
          >
            {description}
          </p>

          <div className="mt-7 flex items-center justify-between">
            <Link
              to="/services"
              data-cta
              className="group/link inline-flex items-center gap-2 text-white text-sm font-bold"
            >
              <span className="relative">
                Learn more
                <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-white/70 transition-transform duration-300 group-hover/link:scale-x-100" />
              </span>
              <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>

            <span data-line className="hidden md:block text-white/40 text-xs">
              Calm execution. Clear outcomes.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
