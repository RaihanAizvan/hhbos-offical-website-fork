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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, {
        perspective: 1200,
      });

      gsap.set(imageRef.current, {
        scale: 1,
        transformOrigin: "top right",
      });

      tl.current = gsap
        .timeline({ paused: true })
        // 1. Micro lift (physical response)
        .to(wrapperRef.current, {
          y: -6,
          rotationZ: 0.6,
          duration: 0.35,
          ease: "power2.out",
        })
        // 2. Image compress & drift
        .to(
          imageRef.current,
          {
            scale: 0.45,
            x: "14%",
            y: "90%",
            borderRadius: "18px",
            duration: 0.6,
            ease: "expo.out",
          },
          "-=0.25",
        )
        // 3. Overlay fade (readability)
        .to(
          ".card-overlay",
          {
            opacity: 1,
            duration: 0.4,
            ease: "power1.out",
          },
          "<",
        )
        // 4. Text reveal (controlled)
        .fromTo(
          ".reveal-text",
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3",
        )
        // 5. CTA last (always last)
        .fromTo(
          ".cta-button",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35 },
          "-=0.2",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current || !spotlightRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(spotlightRef.current, {
      x: x - 150,
      y: y - 150,
      opacity: 0.9,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <div ref={containerRef} className="w-[420px] h-[540px]">
      <div
        ref={wrapperRef}
        onMouseEnter={() => tl.current?.play()}
        onMouseLeave={() => {
          tl.current?.reverse();
          gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        }}
        onMouseMove={handleMouseMove}
        className="relative w-full h-full bg-[#050505] rounded-lg overflow-hidden border border-white/10 shadow-2xl cursor-pointer"
      >
        {/* Spotlight */}
        <div
          ref={spotlightRef}
          className="absolute w-[300px] h-[300px] bg-orange-500/15 blur-[90px] rounded-full opacity-0 pointer-events-none z-0"
        />

        {/* Image */}
        <div
          ref={imageRef}
          className="absolute inset-0 z-10"
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />

          <div className="card-overlay absolute inset-0 opacity-0">
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
          <span className="reveal-text text-orange-400 text-[11px] font-bold tracking-widest uppercase mb-3">
            {category}
          </span>

          <h3 className="text-white text-2xl font-semibold mb-3 leading-snug">
            {title}
          </h3>

          <p className="reveal-text text-gray-300 text-sm mb-6 opacity-0 leading-relaxed">
            {description}
          </p>

          <Link
            to="/services"
            className="cta-button flex items-center gap-2 text-white text-sm font-bold opacity-0"
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
