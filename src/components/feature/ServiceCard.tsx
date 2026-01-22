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
 * ServiceCard
 * Unique-but-professional hover interaction:
 * - Cursor-origin "portal" reveal using clip-path: a circle expands from the cursor to unveil content.
 * - Subtle 3D response (tilt + lift) so it feels physical.
 * - CTA gets a bespoke underline/arrow glide.
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
  const imageRef = useRef<HTMLImageElement>(null);

  const portalRef = useRef<HTMLDivElement>(null);
  const portalBgRef = useRef<HTMLDivElement>(null);

  const cursorX = useRef(50);
  const cursorY = useRef(50);

  const tl = useRef<gsap.core.Timeline>();
  const hover = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !cardRef.current) return;

      // Base 3D setup
      gsap.set(containerRef.current, { perspective: 1400 });
      gsap.set(cardRef.current, {
        transformStyle: "preserve-3d",
        willChange: "transform",
      });

      gsap.set(imageWrapRef.current, { willChange: "transform" });
      gsap.set(imageRef.current, { scale: 1.03, willChange: "transform" });

      // Portal overlay starts hidden
      gsap.set(portalRef.current, {
        opacity: 0,
        // initial clip-path hidden (tiny circle)
        clipPath: "circle(0% at 50% 50%)",
        willChange: "clip-path, opacity",
      });
      gsap.set(portalBgRef.current, { opacity: 0, willChange: "opacity" });

      // Hide the reveal text and CTA until portal opens (scoped to this card)
      const revealEls = portalRef.current?.querySelectorAll<HTMLElement>(
        ".reveal-text"
      );
      const ctaEl = portalRef.current?.querySelector<HTMLElement>(
        ".cta-button"
      );

      if (revealEls) gsap.set(revealEls, { opacity: 0, y: 14 });
      if (ctaEl) gsap.set(ctaEl, { opacity: 0, y: 14 });

      // Timeline: portal reveal + premium depth response
      tl.current = gsap
        .timeline({ paused: true })
        .to(
          cardRef.current,
          {
            y: -10,
            rotationZ: 0.25,
            duration: 0.45,
            ease: "power3.out",
          },
          0
        )
        .to(
          imageRef.current,
          {
            scale: 1.08,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        )
        .to(
          portalRef.current,
          {
            opacity: 1,
            duration: 0.15,
            ease: "power2.out",
          },
          0.02
        )
        .to(
          portalBgRef.current,
          {
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
          },
          0.06
        )
        // Expand portal to reveal the content area.
        // We animate to a large circle; the center is updated live via mousemove.
        .to(
          portalRef.current,
          {
            clipPath: () =>
              `circle(140% at ${cursorX.current}% ${cursorY.current}%)`,
            duration: 0.65,
            ease: "power3.out",
          },
          0.08
        )
        .to(
          revealEls ?? [],
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.07,
            ease: "power3.out",
          },
          0.2
        )
        .to(
          ctaEl ?? [],
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          0.32
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const setCursorPercent = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cursorX.current = Math.max(0, Math.min(100, x));
    cursorY.current = Math.max(0, Math.min(100, y));
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imageWrapRef.current) return;

    setCursorPercent(e);

    // While hovering, keep portal origin attached to cursor.
    // We only update the center (cheap), not the radius.
    if (hover.current && portalRef.current) {
      gsap.set(portalRef.current, {
        clipPath: `circle(140% at ${cursorX.current}% ${cursorY.current}%)`,
      });
    }

    // Subtle physical response (tilt + micro parallax)
    if (!hover.current) return;

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

  const onEnter = (e: MouseEvent<HTMLDivElement>) => {
    hover.current = true;
    setCursorPercent(e);

    // Start portal from cursor.
    gsap.set(portalRef.current, {
      clipPath: `circle(0% at ${cursorX.current}% ${cursorY.current}%)`,
    });

    tl.current?.restart();
  };

  const onLeave = () => {
    hover.current = false;

    // Collapse portal quickly towards the last cursor position, then fade.
    if (portalRef.current) {
      gsap.to(portalRef.current, {
        clipPath: `circle(0% at ${cursorX.current}% ${cursorY.current}%)`,
        duration: 0.32,
        ease: "power3.inOut",
      });
      gsap.to([portalRef.current, portalBgRef.current], {
        opacity: 0,
        duration: 0.25,
        delay: 0.12,
        ease: "power2.out",
      });
    }

    // Reverse the rest of the timeline (text/cta etc.)
    tl.current?.reverse();

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      rotationZ: 0,
      y: 0,
      duration: 0.55,
      ease: "power3.out",
    });

    gsap.to(imageWrapRef.current, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: "power3.out",
    });
  };

  return (
    <div ref={containerRef} className="w-[420px] h-[540px]">
      <div
        ref={cardRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={handleMouseMove}
        className={
          "relative w-full h-full rounded-2xl overflow-hidden cursor-pointer " +
          "bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.70)]"
        }
      >
        {/* Image base */}
        <div ref={imageWrapRef} className="absolute inset-0 z-0">
          <img
            ref={imageRef}
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Portal overlay (reveals content) */}
        <div ref={portalRef} className="absolute inset-0 z-10">
          {/* Rich, controlled background for readability (inside portal) */}
          <div
            ref={portalBgRef}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/35"
          />

          {/* Optional: thin highlight line for premium feel */}
          <div className="absolute inset-0">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-500/25 via-white/5 to-sky-400/15" />
            <div className="absolute inset-0 rounded-2xl border border-white/10" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <span className="reveal-text text-orange-400 text-[11px] font-bold tracking-widest uppercase mb-3">
              {category}
            </span>

            <h3 className="text-white text-2xl font-semibold mb-3 leading-snug">
              {title}
            </h3>

            <p className="reveal-text text-white/75 text-sm mb-6 leading-relaxed">
              {description}
            </p>

            <Link
              to="/services"
              className="cta-button group inline-flex items-center gap-2 text-white text-sm font-bold"
            >
              <span className="relative">
                LEARN MORE
                <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-orange-500 transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Base title (visible even without hover) */}
        <div className="absolute inset-x-0 bottom-0 z-[5] p-6">
          <div className="max-w-[26ch]">
            <div className="text-white/80 text-[11px] font-bold tracking-widest uppercase">
              {category}
            </div>
            <div className="mt-2 text-white text-2xl font-semibold leading-snug">
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
