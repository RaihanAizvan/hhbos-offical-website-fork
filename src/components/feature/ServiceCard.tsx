import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

interface ServiceCardProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
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
  slug
}) => {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
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

      // Content should be visible by default (no hover-required reveal)
      gsap.set(["[data-line]", "[data-cta]"], {
        opacity: 1,
        y: 0,
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
        // Content micro-emphasis (content is already visible)
        .to(
          "[data-line]",
          {
            y: -2,
            duration: 0.22,
            stagger: 0.02,
            ease: "power2.out",
          },
          0.12
        )
        .to(
          "[data-cta]",
          {
            y: -2,
            duration: 0.22,
            ease: "power2.out",
          },
          0.16
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full h-[520px] md:h-[600px]">
      {/* Back layers */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 rounded-3xl"
        style={
          isLight
            ? {
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(245,245,245,0.95) 100%)",
                boxShadow: "0 30px 80px rgba(15,23,42,0.12)",
              }
            : {
                background:
                  "linear-gradient(180deg, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.95) 100%)",
                boxShadow: "0 40px 110px rgba(0,0,0,0.55)",
              }
        }
      />
      <div
        ref={layer1Ref}
        className="absolute inset-0 rounded-3xl border"
        style={
          isLight
            ? {
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(240,240,240,0.9) 100%)",
                borderColor: "rgba(148, 163, 184, 0.35)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }
            : {
                background:
                  "linear-gradient(180deg, rgba(17,17,17,0.65) 0%, rgba(17,17,17,0.88) 100%)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }
        }
      />

      {/* Main card */}
      <div
        ref={cardRef}
        onPointerEnter={() => tl.current?.restart()}
        onPointerLeave={() => tl.current?.reverse()}
        className={`relative h-full rounded-3xl overflow-hidden border shadow-[0_30px_90px_rgba(0,0,0,0.55)] ${
          isLight ? "border-slate-200/70 bg-white" : "border-white/10 bg-[#111111]"
        }`}
      >
        {isLight ? (
          <div className="flex h-full flex-col">
            <div className="relative h-[45%] w-full">
              <img
                ref={imageRef}
                src={imageUrl}
                alt={title}
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ filter: "grayscale(0.15) saturate(1) contrast(1.05)" }}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-7 md:p-8">
              <div className="flex items-center justify-between">
                <span
                  data-line
                  className="text-[11px] font-bold tracking-widest uppercase text-slate-600"
                >
                  {category}
                </span>
                <span
                  data-line
                  className="text-[11px] tracking-[0.25em] uppercase text-slate-500"
                >
                  HHBOS
                </span>
              </div>

              <div>
                <h3
                  data-line
                  className="mt-4 text-3xl md:text-4xl font-semibold leading-tight text-slate-900"
                >
                  {title}
                </h3>

                <p
                  data-line
                  className="mt-3 text-sm leading-relaxed max-w-[62ch] text-slate-600"
                >
                  {description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Link
                  to="/services"
                  data-cta
                  className="group/link inline-flex items-center gap-2 text-sm font-bold text-slate-900"
                >
                  <span className="relative">
                    Learn more
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-slate-300 transition-transform duration-300 group-hover/link:scale-x-100" />
                  </span>
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>

                <span data-line className="hidden md:block text-xs text-slate-500">
                  Calm execution. Clear outcomes.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
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
              <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
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
                  className="text-[11px] font-bold tracking-widest uppercase text-white/70"
                >
                  {category}
                </span>
                <span
                  data-line
                  className="text-[11px] tracking-[0.25em] uppercase text-white/35"
                >
                  HHBOS
                </span>
              </div>

              <h3
                data-line
                className="mt-4 text-3xl md:text-2xl font-semibold leading-tight text-white"
              >
                {title}
              </h3>

              <p
                data-line
                className="mt-3 text-sm leading-relaxed max-w-[62ch] text-white/70"
              >
                {description}
              </p>

              <div className="mt-7 flex items-center justify-between">
                <Link
                  to={`/services/${slug}`}
                  data-cta
                  className="group/link inline-flex items-center gap-2 text-sm font-bold text-white"
                >
                  <span className="relative">
                    Learn more
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-white/70 transition-transform duration-300 group-hover/link:scale-x-100" />
                  </span>
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
