import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  CircuitBoard,
  DollarSign,
  Factory,
  HeartPulse,
  Home,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

import industryHealthcare from "@/assets/service-healthcare.jpg";
import industryFinance from "@/assets/service-finance.jpg";
import industryDatabase from "@/assets/service-database.jpg";
import industryRetail from "@/assets/industry-retail.jpg"
import industryManufacturing from "@/assets/industry-manufacturing.jpg"
import industrySoftware from "@/assets/industry-software.jpg"
import industryRealEstate1 from "@/assets/industry-real-estate-1.jpg"
import industryRealEstate2 from "@/assets/industry-real-estate-2.jpg"

gsap.registerPlugin(ScrollTrigger);

type Industry = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  accent: string; // tailwind gradient tokens (used as bg-gradient-to-r ...)
  icon: LucideIcon;
  problems: string[];
  solutions: string[];
  outcomes: string[];
};

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

const Industries = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("healthcare");
  const [dockHoverIndex, setDockHoverIndex] = useState<number | null>(null);
  const dockItemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const industries = useMemo<Industry[]>(
    () => [
      {
        id: "healthcare",
        title: "Healthcare",
        tagline: "Smarter Revenue, Better Patient Outcomes",
        description:
          "We help hospitals, clinics, and healthcare providers maximize revenue while reducing administrative burden and compliance risk.",
        image: industryHealthcare,
        accent: "from-orange-500 via-amber-400 to-rose-500",
        icon: HeartPulse,
        problems: [
          "High claim denial rates",
          "Delayed reimbursements",
          "Complex coding & billing rules",
          "Data security & HIPAA compliance",
        ],
        solutions: [
          "End-to-end Revenue Cycle Management",
          "Medical coding & billing automation",
          "Denial management and AR recovery",
          "HIPAA compliant data handling",
        ],
        outcomes: [
          "30–40% faster reimbursements",
          "Lower claim rejection rate",
          "Higher cash flow stability",
        ],
      },
      {
        id: "finance",
        title: "Finance & Banking",
        tagline: "Accuracy, Compliance, and Financial Intelligence",
        description:
          "We support banks, NBFCs, and finance teams with accounting, compliance, reporting, and financial intelligence.",
        image: industryFinance,
        accent: "from-orange-500 via-yellow-300 to-emerald-400",
        icon: DollarSign,
        problems: [
          "Manual accounting errors",
          "Regulatory compliance pressure",
          "Delayed financial reports",
          "Data silos",
        ],
        solutions: [
          "Automated bookkeeping & reconciliations",
          "Compliance-ready financial reporting",
          "Payroll & tax support",
          "Financial analytics dashboards",
        ],
        outcomes: [
          "Audit-ready financials",
          "Lower compliance risk",
          "Real-time financial visibility",
        ],
      },
      {
        id: "retail",
        title: "Retail & E-commerce",
        tagline: "Real-Time Insights for High-Volume Businesses",
        description:
          "We help retailers and e-commerce brands manage finance, inventory, payments, and customer data at scale.",
        image: industryRetail,
        accent: "from-orange-500 via-fuchsia-400 to-cyan-400",
        icon: ShoppingBag,
        problems: [
          "High transaction volumes",
          "Payment reconciliation issues",
          "Inventory data mismatches",
          "Revenue leakage",
        ],
        solutions: [
          "Sales & payment reconciliation",
          "Inventory finance tracking",
          "Revenue & margin reporting",
          "Customer and order database management",
        ],
        outcomes: [
          "Accurate daily revenue",
          "Better margin control",
          "Reduced financial leakage",
        ],
      },
      {
        id: "it",
        title: "IT & Software",
        tagline: "Scalable Data and Financial Operations",
        description:
          "We support SaaS, IT services, and software companies with financial ops and data infrastructure.",
        image: industrySoftware,
        accent: "from-orange-500 via-indigo-400 to-sky-400",
        icon: CircuitBoard,
        problems: [
          "Subscription revenue tracking",
          "Complex billing cycles",
          "Rapid data growth",
          "Security risks",
        ],
        solutions: [
          "Subscription revenue accounting",
          "Usage-based billing support",
          "Database optimization",
          "Data security & backups",
        ],
        outcomes: [
          "Accurate MRR & ARR",
          "Scalable backend operations",
          "Lower system downtime",
        ],
      },
      {
        id: "manufacturing",
        title: "Manufacturing",
        tagline: "Cost Control & Operational Visibility",
        description:
          "We help manufacturers control costs, manage finance, and gain visibility into production economics.",
        image: industryManufacturing,
        accent: "from-orange-500 via-red-400 to-violet-500",
        icon: Factory,
        problems: [
          "High operational costs",
          "Inventory valuation issues",
          "Manual accounting",
          "Delayed financial insights",
        ],
        solutions: [
          "Cost accounting",
          "Inventory & asset tracking",
          "Payroll and vendor payments",
          "Financial reporting",
        ],
        outcomes: [
          "Better cost control",
          "Improved profit margins",
          "Faster management reporting",
        ],
      },
      {
        id: "real-estate",
        title: "Real Estate",
        tagline: "Financial Clarity Across Properties",
        description:
          "We help real estate companies manage leasing, payments, expenses, and property-level profitability.",
        image: industryRealEstate2,
        accent: "from-orange-500 via-lime-300 to-emerald-400",
        icon: Home,
        problems: [
          "Rent tracking",
          "Expense management",
          "Property-wise profitability",
          "Tax & compliance complexity",
        ],
        solutions: [
          "Rent & payment reconciliation",
          "Property accounting",
          "Tax & compliance support",
          "Financial dashboards",
        ],
        outcomes: [
          "Clear cash flow",
          "Higher asset ROI",
          "Simpler financial operations",
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const panels = Array.from(
      root.querySelectorAll<HTMLElement>("[data-industry-panel]")
    );

    const snapSections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-snap-section]")
    );

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reels-style snap (but gentler): each wheel gesture advances to the next
    // section. We avoid doing this on touch; mobile should remain natural.
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
      // Only apply on devices that actually generate wheel events.
      // Let touch devices scroll naturally.
      if (prefersReduced) return;
      if (wheelLocked) return;

      // Ignore tiny deltas (trackpad micro scroll).
      if (Math.abs(e.deltaY) < 18) return;

      // We want the scroll to feel section-based.
      e.preventDefault();

      const current = getNearestIndex();
      const next = e.deltaY > 0 ? current + 1 : current - 1;
      scrollToIndex(next);

      // Cooldown so it doesn't feel as intense as Reels.
      wheelLocked = true;
      window.setTimeout(() => {
        wheelLocked = false;
      }, 650);
    };

    // Scroll-spy: update active section
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        const id = visible?.target.getAttribute("data-industry-id");
        if (id) setActiveId(id);
      },
      { threshold: [0.35, 0.55, 0.75] }
    );

    panels.forEach((p) => io.observe(p));

    // Reels-like snap on wheel (desktop). We need non-passive to preventDefault.
    window.addEventListener("wheel", onWheel, { passive: false });

    // GSAP: parallax images + reveal content blocks
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

    return () => {
      window.removeEventListener("wheel", onWheel);

      io.disconnect();
      ctx.revert();
      // Ensure we don't leak triggers on route changes
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(`industry-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={rootRef} className="min-h-screen bg-black">
      {/* HERO: Industry Atlas */}
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
            <source src="/video/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70" />

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,107,31,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,31,0.22) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="container-custom px-6 lg:px-10 pt-28 pb-14 lg:pt-36 lg:pb-20 flex-1 flex items-center">
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.25em] uppercase text-white/70">
                <Building2 className="h-4 w-4 text-primary" />
                Industry Atlas
              </div>

              <h1 className="mt-6 text-balance text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] text-white">
                Powering Businesses  
                <span className="block">
                  Across
                  <span className="relative ml-3 inline-block">
                    <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                      Multiple Industries
                    </span>
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-primary to-orange-500 opacity-70" />
                  </span>
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/70">
                Explore how HH Back Office Services improves revenue, accuracy,
                and operational efficiency across diverse sectors.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToId(industries[0].id)}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 transition-transform hover:scale-[1.02]"
                >
                  Explore the Atlas
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

            </div>
          </div>
        </div>
      </header>

      {/* Sticky scroll-spy rail (Dock style) */}
      <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div
          className="pointer-events-auto"
          onMouseLeave={() => setDockHoverIndex(null)}
          onMouseMove={(e) => {
            // True dock feel: hovering the dock area (not only an item) drives the focus.
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
          {/*
            Dock behavior:
            - icons only by default
            - when dock is hovered: ALL labels are visible
            - hovered item largest; neighbors gradually smaller (macOS Dock feel)
          */}
          <div className="flex flex-col gap-1">
            {industries.map((ind, idx) => {
              const active = ind.id === activeId;
              const Icon = ind.icon;

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
                  key={ind.id}
                  ref={(el) => {
                    dockItemRefs.current[idx] = el;
                  }}
                  type="button"
                  onFocus={() => setDockHoverIndex(idx)}
                  onClick={() => scrollToId(ind.id)}
                  className={cn(
                    "group relative flex items-center justify-end",
                    "h-12 w-12",
                    "select-none"
                  )}
                  aria-label={ind.title}
                >
                  {/* Label: floats to the left, doesn't push layout */}
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
                      <span className="text-sm font-semibold">{ind.title}</span>
                    </div>
                  </motion.div>

                  {/* Icon (no outer outline box) */}
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

                    {/* Active dot */}
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

      {/* PANELS */}
      <main className="bg-black">
        {industries.map((ind, idx) => {
          const Icon = ind.icon;
          const number = String(idx + 1).padStart(2, "0");

          return (
            <section
              key={ind.id}
              id={`industry-${ind.id}`}
              data-industry-panel
              data-industry-id={ind.id}
              data-snap-section
              className="relative isolate min-h-[110svh] overflow-hidden border-b border-white/10"
            >
              {/* Background image layer */}
              <div className="absolute inset-0">
                <div
                  data-panel-image
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${ind.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Contrast overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Accent wash */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-35",
                    "bg-gradient-to-br",
                    ind.accent
                  )}
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.75)_70%,rgba(0,0,0,0.95)_100%)]" />
              </div>

              <div className="relative z-10 container-custom px-6 lg:px-10 py-16 lg:py-24">
                <div className="grid gap-10 lg:gap-14 lg:grid-cols-12 items-start">
                  {/* Left: headline */}
                  <div className="lg:col-span-5">
                    <div data-panel-reveal className="flex items-center gap-3">
                      <span className="text-white/40 text-sm tracking-[0.25em]">
                        {number}
                      </span>
                      <span
                        className={cn(
                          "h-px flex-1 max-w-24",
                          "bg-gradient-to-r",
                          ind.accent
                        )}
                      />
                    </div>

                    <div
                      data-panel-reveal
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.25em] uppercase text-white/70"
                    >
                      <Icon className="h-4 w-4 text-white/80" />
                      {ind.title}
                    </div>

                    <h2
                      data-panel-reveal
                      className="mt-6 text-4xl md:text-5xl font-bold leading-[1.05] text-white"
                    >
                      <span
                        className={cn(
                          "bg-gradient-to-r bg-clip-text text-transparent",
                          ind.accent
                        )}
                      >
                        {ind.tagline}
                      </span>
                    </h2>

                    <p
                      data-panel-reveal
                      className="mt-5 text-lg leading-relaxed text-white/75"
                    >
                      {ind.description}
                    </p>

                    <div data-panel-reveal className="mt-8 flex flex-col sm:flex-row gap-3">
                      <Link
                        to="/services"
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/15"
                      >
                        View Services
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>

                      <Link
                        to="/contact"
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-transform hover:scale-[1.02]"
                      >
                        Get a Consultation
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>

                    {/* Decorative label */}
                    <div data-panel-reveal className="mt-10">
                      <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
                        <span className="text-xs uppercase tracking-[0.25em] text-white/60">
                          Designed for outcomes
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: content blocks */}
                  <div className="lg:col-span-7">
                    <div className="grid gap-5 lg:gap-6 lg:grid-cols-2">
                      <div data-panel-reveal className="lg:col-span-2">
                        <GlassCard title="Industry Challenges" items={ind.problems} />
                      </div>

                      <div data-panel-reveal>
                        <GlassCard
                          title="How We Help"
                          items={ind.solutions}
                          tone="primary"
                        />
                      </div>

                      <div data-panel-reveal>
                        <GlassCard
                          title="Business Outcomes"
                          items={ind.outcomes}
                          tone="success"
                        />
                      </div>
                    </div>

                    {/* Bottom: subtle marquee-style metrics */}
                    <div
                      data-panel-reveal
                      className="mt-8 rounded-2xl border border-white/10 bg-black/35 px-6 py-5 backdrop-blur-xl"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="text-sm font-semibold text-white">
                          Your operations, engineered for speed.
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

export default Industries;
