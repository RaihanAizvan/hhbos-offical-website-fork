import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

const GlassCard = ({
  title,
  items,
  tone = "neutral",
}: {
  title: string;
  items: string[];
  tone?: "neutral" | "primary" | "success";
}) => {
  const toneStyles = {
    neutral: "border-white/10 bg-white/5 text-white/85",
    primary: "border-orange-500/30 bg-orange-500/10 text-white",
    success: "border-emerald-500/30 bg-emerald-500/10 text-white",
  } as const;

  return (
    <div
      className={cn(
        "rounded-2xl p-6 backdrop-blur-xl",
        "shadow-[0_20px_80px_rgba(0,0,0,0.45)]",
        "border",
        toneStyles[tone]
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs uppercase tracking-[0.25em] text-white/70">
          {title}
        </h3>
        <Sparkles className="h-4 w-4 text-white/60" />
      </div>

      <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 text-white/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Services = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("rcm");
  const [dockHoverIndex, setDockHoverIndex] = useState<number | null>(null);
  const dockItemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const panels = Array.from(
      root.querySelectorAll<HTMLElement>("[data-service-panel]")
    );

    const snapSections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-snap-section]")
    );

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let wheelLocked = false;

    const getNearestIndex = () => {
      const y = window.scrollY;
      let bestIndex = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < snapSections.length; i++) {
        const top = snapSections[i].getBoundingClientRect().top + window.scrollY;
        const dist = Math.abs(top - y);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      }

      return bestIndex;
    };

    const scrollToIndex = (idx: number) => {
      const clamped = Math.max(0, Math.min(snapSections.length - 1, idx));
      const el = snapSections[clamped];
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
    };

    const onWheel = (e: WheelEvent) => {
      if (prefersReduced) return;
      if (wheelLocked) return;
      if (Math.abs(e.deltaY) < 18) return;

      e.preventDefault();

      const current = getNearestIndex();
      const next = e.deltaY > 0 ? current + 1 : current - 1;
      scrollToIndex(next);

      wheelLocked = true;
      window.setTimeout(() => {
        wheelLocked = false;
      }, 650);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        const id = visible?.target.getAttribute("data-service-id");
        if (id) setActiveId(id);
      },
      { threshold: [0.35, 0.55, 0.75] }
    );

    panels.forEach((p) => io.observe(p));

    const ctx = gsap.context(() => {
      panels.forEach((panel) => {
        const img = panel.querySelector<HTMLElement>("[data-panel-image]");
        const content = panel.querySelectorAll<HTMLElement>(
          "[data-panel-reveal]"
        );

        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -10, scale: 1.12 },
            {
              yPercent: 10,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        gsap.fromTo(
          content,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 65%",
            },
          }
        );
      });
    }, root);

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      io.disconnect();
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(`service-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={rootRef} className="min-h-screen bg-black">
      {/* HERO: Services Atlas */}
      <header
        data-snap-section
        className="relative overflow-hidden bg-black min-h-[100svh] flex flex-col"
      >
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          >
            <source src="/video/web%20bg.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/70" />

          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,107,31,1.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,31,1.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-30"
          animate={{ y: [0, 18, 0], x: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,107,31,1.15), rgba(0,0,0,0) 65%)",
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 right-[-120px] h-[620px] w-[620px] rounded-full blur-3xl opacity-25"
          animate={{ y: [0, -22, 0], x: [0, -18, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(255,107,31,1.21), rgba(0,0,0,0) 62%)",
          }}
        />

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="container-custom px-6 lg:px-10 pt-36 pb-20 lg:pt-40 lg:pb-24 flex-1 flex items-center justify-center text-center">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.25em] uppercase text-white/70 mx-auto">
                <Building2 className="h-4 w-4 text-primary" />
                Services Atlas
              </div>

              <h1 className="mt-6 text-balance text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] text-white">
                Core services,
                <span className="block">
                  designed for
                  <span className="relative ml-3 inline-block">
                    <span className="bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                      operational excellence
                    </span>
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-primary to-orange-700 opacity-60" />
                  </span>
                </span>
              </h1>

              <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-white/70">
                Explore HH Back Office Services offerings across RCM, Finance, and
                Database operations — built to reduce complexity and increase
                performance.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToId(services[0].id)}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 transition-transform hover:scale-[1.02]"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white/90 backdrop-blur-xl transition-colors hover:bg-white/10"
                >
                  Talk to our team
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 flex items-center justify-center gap-3 text-white/60">
                <ChevronDown className="h-5 w-5" />
                <span className="text-sm">
                  Scroll to see immersive full-screen panels
                </span>
              </div>
            </div>
          </div>

          <div className="mt-auto border-t border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="container-custom px-6 lg:px-10 py-6">
              <div className="flex flex-wrap gap-2">
                {services.map((service) => {
                  const Icon = service.icon;
                  const active = service.id === activeId;
                  return (
                    <button
                      key={service.id}
                      onClick={() => scrollToId(service.id)}
                      className={cn(
                        "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
                        "transition-colors",
                        active
                          ? "border-white/25 bg-white/10 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          active ? "text-primary" : "text-white/60"
                        )}
                      />
                      {service.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dock-style rail */}
      <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div
          className="pointer-events-auto"
          onMouseLeave={() => setDockHoverIndex(null)}
          onMouseMove={(e) => {
            let bestIdx = 0;
            let bestDist = Number.POSITIVE_INFINITY;
            dockItemRefs.current.forEach((el, i) => {
              if (!el) return;
              const rect = el.getBoundingClientRect();
              const centerY = rect.top + rect.height / 2;
              const dist = Math.abs(e.clientY - centerY);
              if (dist < bestDist) {
                bestDist = dist;
                bestIdx = i;
              }
            });
            setDockHoverIndex(bestIdx);
          }}
        >
          <div className="flex flex-col gap-1">
            {services.map((service, idx) => {
              const active = service.id === activeId;
              const Icon = service.icon;

              const d = dockHoverIndex === null ? 99 : Math.abs(idx - dockHoverIndex);
              const iconScale =
                dockHoverIndex === null
                  ? 1
                  : d === 0
                    ? 1.5
                    : d === 1
                      ? 1.25
                      : d === 2
                        ? 1.12
                        : d === 3
                          ? 1.06
                          : 1;

              const labelScale =
                dockHoverIndex === null
                  ? 0
                  : d === 0
                    ? 1
                    : d === 1
                      ? 0.82
                      : d === 2
                        ? 0.68
                        : d === 3
                          ? 0.6
                          : 0.5;

              const labelOpacity =
                dockHoverIndex === null
                  ? 0
                  : d === 0
                    ? 1
                    : d === 1
                      ? 0.85
                      : d === 2
                        ? 0.7
                        : d === 3
                          ? 0.6
                          : 0.45;

              return (
                <button
                  key={service.id}
                  ref={(el) => {
                    dockItemRefs.current[idx] = el;
                  }}
                  type="button"
                  onFocus={() => setDockHoverIndex(idx)}
                  onClick={() => scrollToId(service.id)}
                  className={cn(
                    "group relative flex items-center justify-end",
                    "h-12 w-12",
                    "select-none"
                  )}
                  aria-label={service.title}
                >
                  <motion.div
                    className={cn(
                      "pointer-events-none absolute right-[56px]",
                      "origin-right whitespace-nowrap",
                      "text-white/90"
                    )}
                    animate={{
                      opacity: labelOpacity,
                      scale: labelScale,
                      x: dockHoverIndex === null ? 6 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  >
                    <div
                      className={cn(
                        "rounded-full px-3 py-1",
                        "bg-black/45 backdrop-blur-xl",
                        active ? "text-white" : "text-white/85"
                      )}
                    >
                      <span className="text-sm font-semibold">{service.title}</span>
                      <span className="ml-2 text-[11px] text-white/60">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className={cn(
                      "relative grid h-12 w-12 place-items-center rounded-2xl",
                      active
                        ? "bg-orange-500/15"
                        : "bg-white/5 group-hover:bg-white/10",
                      "backdrop-blur-xl"
                    )}
                    animate={{ scale: iconScale }}
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        active ? "text-primary" : "text-white/75"
                      )}
                    />

                    <span
                      className={cn(
                        "absolute -left-1 top-1/2 h-2.5 w-1 -translate-y-1/2 rounded-full",
                        active ? "bg-primary" : "bg-transparent"
                      )}
                    />
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="bg-black">
        {services.map((service, idx) => {
          const Icon = service.icon;
          const number = String(idx + 1).padStart(2, "0");

          return (
            <section
              key={service.id}
              id={`service-${service.id}`}
              data-service-panel
              data-service-id={service.id}
              data-snap-section
              className="relative isolate min-h-[110svh] overflow-hidden border-b border-white/10"
            >
              <div className="absolute inset-0">
                <div
                  data-panel-image
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div className="absolute inset-0 bg-black/60" />

                <div
                  className={cn(
                    "absolute inset-0 opacity-35",
                    "bg-gradient-to-br",
                    service.accent
                  )}
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.75)_70%,rgba(0,0,0,0.95)_100%)]" />
              </div>

              <div className="relative z-10 container-custom px-6 lg:px-10 py-16 lg:py-24">
                <div className="grid gap-10 lg:gap-14 lg:grid-cols-12 items-start">
                  <div className="lg:col-span-5">
                    <div data-panel-reveal className="flex items-center gap-3">
                      <span className="text-white/40 text-sm tracking-[0.25em]">
                        {number}
                      </span>
                      <span
                        className={cn(
                          "h-px flex-1 max-w-24",
                          "bg-gradient-to-r",
                          service.accent
                        )}
                      />
                    </div>

                    <div
                      data-panel-reveal
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.25em] uppercase text-white/70"
                    >
                      <Icon className="h-4 w-4 text-white/80" />
                      {service.title}
                    </div>

                    <h2
                      data-panel-reveal
                      className="mt-6 text-4xl md:text-5xl font-bold leading-[1.05] text-white"
                    >
                      <span
                        className={cn(
                          "bg-gradient-to-r bg-clip-text text-transparent",
                          service.accent
                        )}
                      >
                        {service.tagline}
                      </span>
                    </h2>

                    <p
                      data-panel-reveal
                      className="mt-5 text-lg leading-relaxed text-white/75"
                    >
                      {service.description}
                    </p>

                    <div data-panel-reveal className="mt-8 flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/services/${service.slug}`}
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-transform hover:scale-[1.02]"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>

                    <div data-panel-reveal className="mt-10">
                      <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
                        <span className="text-xs uppercase tracking-[0.25em] text-white/60">
                          Designed for outcomes
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="grid gap-5 lg:gap-6 lg:grid-cols-2">
                      <div data-panel-reveal className="lg:col-span-2">
                        <GlassCard title="Key Features" items={service.features} />
                      </div>

                      <div data-panel-reveal>
                        <GlassCard
                          title="Business Benefits"
                          items={service.benefits}
                          tone="primary"
                        />
                      </div>

                      <div data-panel-reveal>
                        <GlassCard
                          title="Performance Outcomes"
                          items={service.benefits}
                          tone="success"
                        />
                      </div>
                    </div>

                    <div
                      data-panel-reveal
                      className="mt-8 rounded-2xl border border-white/10 bg-black/35 px-6 py-5 backdrop-blur-xl"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="text-sm font-semibold text-white">
                          Built for accuracy, compliance, and scale.
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {["Compliance", "Accuracy", "Automation", "Reporting"].map(
                            (t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                              >
                                {t}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default Services;
