import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { getHeroVideoSrc } from "@/lib/theme";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

const ServiceDetail = () => {
  const { slug } = useParams();
  const rootRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const heroVideo = getHeroVideoSrc(resolvedTheme);

  const service = useMemo(
    () => services.find((item) => item.slug === slug) ?? services[0],
    [slug]
  );

  const Icon = service.icon;

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".detail-hero",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15 }
      );

      gsap.fromTo(
        ".detail-glass",
        { y: 24 },
        {
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".detail-glass-grid",
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".detail-step",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".detail-steps",
            start: "top 75%",
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [service]);

  const metrics = [
    { label: "Delivery SLA", value: "99.2%" },
    { label: "Avg. Turnaround", value: "< 24 hrs" },
    { label: "Automation Coverage", value: "70%" },
    { label: "Client Retention", value: "96%" },
  ];

  const steps = [
    "Discovery & alignment",
    "Process mapping",
    "Implementation & QA",
    "Launch + optimization",
  ];

  return (
    <div
      ref={rootRef}
      className={cn("min-h-screen", isLight ? "bg-background" : "bg-black")}
    >
      {/* HERO */}
      <section
        className={cn(
          "relative min-h-[75svh] overflow-hidden pt-24 flex items-center",
          isLight ? "bg-background" : "bg-black"
        )}
      >
        <div className="absolute inset-0">
          <video
            key={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              isLight ? "opacity-35" : "opacity-30"
            )}
          >
            <source src={heroVideo} type={isLight ? "video/mp4" : "video/webm"} />
          </video>
          <div
            className={cn(
              "absolute inset-0",
              isLight ? "bg-white/30" : "bg-black/50"
            )}
          />
          <div
            className={cn(
              "absolute inset-0",
              isLight
                ? "bg-gradient-to-b from-white/20 via-white/50 to-white"
                : "bg-gradient-to-b from-black/20 via-black/50 to-black"
            )}
          />
        </div>

        {!isLight && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-25"
            animate={{ y: [0, 16, 0], x: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,107,31,0.22), rgba(0,0,0,0) 65%)",
            }}
          />
        )}

        <div className="relative z-10 container-custom px-6 w-full">
          <div className="detail-hero mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center text-center lg:text-left">
            <div>
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs tracking-[0.25em] uppercase mx-auto lg:mx-0",
                  isLight
                    ? "border-slate-200 bg-white text-slate-500"
                    : "border-white/10 bg-white/5 text-white/70"
                )}
              >
                <Icon className={cn("h-4 w-4", isLight ? "text-orange-500" : "text-primary")} />
                {service.title}
              </div>

              <h1
                className={cn(
                  "mt-6 text-4xl md:text-6xl font-bold leading-tight",
                  isLight ? "text-slate-900" : "text-white"
                )}
              >
                {service.detailHeadline}
              </h1>

              <p
                className={cn(
                  "mt-4 text-lg max-w-2xl",
                  isLight ? "text-slate-600" : "text-white/70"
                )}
              >
                {service.detailSummary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {service.detailPillars.map((pillar) => (
                  <span
                    key={pillar}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.25em]",
                      isLight
                        ? "border-slate-200 bg-white text-slate-500"
                        : "border-white/10 bg-black/40 text-white/70"
                    )}
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={cn(
                "detail-hero rounded-3xl border p-6 text-center lg:text-left",
                isLight
                  ? "border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
                  : "border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <span
                  className={cn(
                    "text-xs uppercase tracking-[0.25em]",
                    isLight ? "text-slate-500" : "text-white/60"
                  )}
                >
                  Key Metrics
                </span>
                <Zap className={cn("h-4 w-4", isLight ? "text-orange-500" : "text-primary")} />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className={cn(
                      "rounded-2xl border px-4 py-4",
                      isLight
                        ? "border-slate-200 bg-slate-50"
                        : "border-white/10 bg-black/60"
                    )}
                  >
                    <div
                      className={cn(
                        "text-lg font-semibold",
                        isLight ? "text-slate-900" : "text-white"
                      )}
                    >
                      {metric.value}
                    </div>
                    <div
                      className={cn(
                        "text-xs uppercase tracking-[0.2em] mt-1",
                        isLight ? "text-slate-400" : "text-white/50"
                      )}
                    >
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className={cn(
                  "mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold",
                  isLight
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200/70"
                    : "bg-primary text-white shadow-lg shadow-orange-500/20"
                )}
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STACK */}
      <section className={cn("pb-20", isLight ? "bg-background" : "bg-black")}>
        <div className="container-custom px-6">
          <div className="detail-glass-grid grid gap-6 lg:grid-cols-3">
            {service.featureDetails.map((feature) => (
              <Link
                key={feature.slug}
                to={`/services/${service.slug}/${feature.slug}`}
                className={cn(
                  "detail-glass rounded-2xl border p-6 transition hover:-translate-y-1",
                  isLight
                    ? "border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] hover:border-orange-200"
                    : "border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.45)] hover:border-primary/40"
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-2 text-xs uppercase tracking-[0.25em]",
                    isLight ? "text-slate-500" : "text-white/70"
                  )}
                >
                  <Sparkles className={cn("h-4 w-4", isLight ? "text-orange-500" : "text-primary")} />
                  Capability
                </div>
                <h3
                  className={cn(
                    "mt-4 text-xl font-semibold",
                    isLight ? "text-slate-900" : "text-white"
                  )}
                >
                  {feature.title}
                </h3>
                <p className={cn("mt-2 text-sm", isLight ? "text-slate-600" : "text-white/60")}>
                  {feature.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={cn("py-20", isLight ? "bg-slate-50" : "bg-zinc-950")}>
        <div className="container-custom px-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold",
                isLight ? "text-slate-900" : "text-white"
              )}
            >
              How we deliver
            </h2>
            <p className={cn("mt-4 max-w-xl", isLight ? "text-slate-600" : "text-white/60")}>
              We combine operational rigor with automation to deliver consistent outcomes.
            </p>
            <div className="detail-steps mt-8 space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="detail-step flex items-center gap-4">
                  <span
                    className={cn(
                      "h-10 w-10 rounded-full border flex items-center justify-center",
                      isLight
                        ? "border-slate-200 bg-white text-slate-500"
                        : "border-white/10 bg-black/60 text-white/70"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div
                    className={cn(
                      "text-sm uppercase tracking-[0.2em]",
                      isLight ? "text-slate-600" : "text-white/80"
                    )}
                  >
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "rounded-3xl border p-8",
              isLight
                ? "border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
                : "border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
            )}
          >
            <h3
              className={cn(
                "text-2xl font-semibold",
                isLight ? "text-slate-900" : "text-white"
              )}
            >
              Outcomes you can measure
            </h3>
            <p className={cn("mt-3", isLight ? "text-slate-600" : "text-white/60")}>
              Every engagement is aligned to SLA, accuracy, and compliance.
            </p>
            <div className="mt-6 space-y-4">
              {service.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className={cn("flex gap-3", isLight ? "text-slate-600" : "text-white/80")}
                >
                  <CheckCircle2 className={cn("h-5 w-5", isLight ? "text-orange-500" : "text-primary")} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={cn("py-20", isLight ? "bg-background" : "bg-black")}>
        <div className="container-custom px-6">
          <div
            className={cn(
              "rounded-3xl border p-10 md:p-12",
              isLight
                ? "border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
                : "border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
            )}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <h3
                  className={cn(
                    "text-3xl font-semibold",
                    isLight ? "text-slate-900" : "text-white"
                  )}
                >
                  Ready for the next step?
                </h3>
                <p className={cn("mt-3 max-w-xl", isLight ? "text-slate-600" : "text-white/60")}>
                  Get a tailored delivery plan and see how we align with your operations.
                </p>
              </div>
              <Link
                to="/contact"
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold",
                  isLight
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200/70"
                    : "bg-primary text-white shadow-lg shadow-orange-500/20"
                )}
              >
                View engagement plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Return */}
      <section className={cn("py-12", isLight ? "bg-background" : "bg-black")}>
        <div className="container-custom px-6">
          <Link
            to="/services"
            className={cn(
              "inline-flex items-center gap-2",
              isLight ? "text-slate-500 hover:text-slate-900" : "text-white/70 hover:text-white"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Explore all services
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
