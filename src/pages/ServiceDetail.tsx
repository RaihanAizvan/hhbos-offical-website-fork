import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
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
    <div ref={rootRef} className="min-h-screen bg-black">
      {/* HERO */}
      <section className="relative min-h-[75svh] overflow-hidden pt-24">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        </div>

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

        <div className="relative z-10 container-custom px-6">
          <Link
            to="/services"
            className="detail-hero inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Services
          </Link>

          <div className="detail-hero mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.25em] uppercase text-white/70">
                <Icon className="h-4 w-4 text-primary" />
                {service.title}
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white leading-tight">
                {service.detailHeadline}
              </h1>

              <p className="mt-4 text-lg text-white/70 max-w-2xl">
                {service.detailSummary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {service.detailPillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-hero rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-white/60">
                  Key Metrics
                </span>
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/60 px-4 py-4">
                    <div className="text-lg font-semibold text-white">
                      {metric.value}
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/50 mt-1">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20"
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STACK */}
      <section className="py-20">
        <div className="container-custom px-6">
          <div className="detail-glass-grid grid gap-6 lg:grid-cols-3">
            {service.features.map((feature) => (
              <div
                key={feature}
                className="detail-glass rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-[0.25em]">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Capability
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {feature}
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  Process-led delivery with measurable outcomes.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-zinc-950">
        <div className="container-custom px-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              How we deliver
            </h2>
            <p className="mt-4 text-white/60 max-w-xl">
              We combine operational rigor with automation to deliver consistent outcomes.
            </p>
            <div className="detail-steps mt-8 space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="detail-step flex items-center gap-4">
                  <span className="h-10 w-10 rounded-full border border-white/10 bg-black/60 flex items-center justify-center text-white/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="text-white/80 text-sm uppercase tracking-[0.2em]">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
            <h3 className="text-2xl font-semibold text-white">
              Outcomes you can measure
            </h3>
            <p className="mt-3 text-white/60">
              Every engagement is aligned to SLA, accuracy, and compliance.
            </p>
            <div className="mt-6 space-y-4">
              {service.benefits.map((benefit) => (
                <div key={benefit} className="flex gap-3 text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom px-6">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-10 md:p-12 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <h3 className="text-3xl font-semibold text-white">
                  Ready for the next step?
                </h3>
                <p className="mt-3 text-white/60 max-w-xl">
                  Get a tailored delivery plan and see how we align with your operations.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20"
              >
                View engagement plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Return */}
      <section className="py-12">
        <div className="container-custom px-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white"
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
