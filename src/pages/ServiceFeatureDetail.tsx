import { useLayoutEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, Layers, Sparkles } from "lucide-react";
import { services } from "@/data/services";
import { slugify } from "@/lib/slug";

const ServiceFeatureDetail = () => {
  const { slug, feature } = useParams();

  const service = useMemo(
    () => services.find((item) => item.slug === slug) ?? services[0],
    [slug]
  );

  const featureData =
    service.featureDetails.find((item) => item.slug === feature) ??
    service.featureDetails[0];

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const related = service.featureDetails
    .filter((item) => item.title !== featureData.title)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative min-h-[50svh] overflow-hidden pt-24 flex items-center">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black" />
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-20"
          animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,107,31,0.2), rgba(0,0,0,0) 70%)",
          }}
        />

        <div className="relative z-10 container-custom px-6 w-full">
          <Link
            to={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to {service.title}
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.25em] uppercase text-white/70">
              <Layers className="h-4 w-4 text-primary" />
              {service.title}
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white leading-tight">
              {featureData.title}
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">
              {featureData.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Feature layout */}
      <section className="py-20">
        <div className="container-custom px-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-10 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-[0.25em]">
              <Sparkles className="h-4 w-4 text-primary" />
              Capability Focus
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Built for operational precision
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              We architect this capability to plug into your workflows with minimal disruption
              while delivering high reliability and transparency. Our teams align tooling,
              reporting, and compliance from day one.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {featureData.bullets.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/70 px-4 py-4 text-sm text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white">Delivery stack</h3>
              <ul className="mt-4 space-y-3 text-white/70 text-sm">
                {featureData.outcomes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white">Explore related</h3>
              <div className="mt-4 space-y-2">
                {related.map((item) => (
                  <Link
                    key={item.title}
                    to={`/services/${service.slug}/${item.slug}`}
                    className="block rounded-xl px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20"
            >
              Request a walkthrough
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceFeatureDetail;
