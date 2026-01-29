import { useLayoutEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { getHeroVideoSrc } from "@/lib/theme";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";
const ServiceFeatureDetail = () => {
  const { slug, feature } = useParams();

  const service = useMemo(
    () => services.find((item) => item.slug === slug) ?? services[0],
    [slug]
  );

  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const heroVideo = getHeroVideoSrc(resolvedTheme);

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
    <div className={cn("min-h-screen", isLight ? "bg-background" : "bg-black")}>
      {/* Hero */}
      <section
        className={cn(
          "relative min-h-[50svh] overflow-hidden pt-24 flex items-center",
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
            className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-20"
            animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,107,31,0.2), rgba(0,0,0,0) 70%)",
            }}
          />
        )}

        <div className="relative z-10 container-custom px-6 w-full">
          <div className="mt-8 max-w-4xl">
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs tracking-[0.25em] uppercase",
                isLight
                  ? "border-slate-200 bg-white text-slate-500"
                  : "border-white/10 bg-white/5 text-white/70"
              )}
            >
              <Layers className={cn("h-4 w-4", isLight ? "text-orange-500" : "text-primary")} />
              {service.title}
            </div>

            <h1
              className={cn(
                "mt-6 text-4xl md:text-6xl font-bold leading-tight",
                isLight ? "text-slate-900" : "text-white"
              )}
            >
              {featureData.title}
            </h1>
            <p
              className={cn(
                "mt-4 text-lg max-w-2xl",
                isLight ? "text-slate-600" : "text-white/70"
              )}
            >
              {featureData.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Feature layout */}
      <section className={cn("py-20", isLight ? "bg-background" : "bg-black")}>
        <div className="container-custom px-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className={cn(
              "rounded-3xl border p-10",
              isLight
                ? "border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
                : "border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2 text-xs uppercase tracking-[0.25em]",
                isLight ? "text-slate-500" : "text-white/70"
              )}
            >
              <Sparkles className={cn("h-4 w-4", isLight ? "text-orange-500" : "text-primary")} />
              Capability Focus
            </div>
            <h2
              className={cn(
                "mt-4 text-3xl font-semibold",
                isLight ? "text-slate-900" : "text-white"
              )}
            >
              Built for operational precision
            </h2>
            <p className={cn("mt-4 leading-relaxed", isLight ? "text-slate-600" : "text-white/60")}>
              We architect this capability to plug into your workflows with minimal disruption
              while delivering high reliability and transparency. Our teams align tooling,
              reporting, and compliance from day one.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {featureData.bullets.map((item) => (
                <div
                  key={item}
                  className={cn(
                    "rounded-2xl border px-4 py-4 text-sm",
                    isLight
                      ? "border-slate-200 bg-slate-50 text-slate-600"
                      : "border-white/10 bg-black/70 text-white/70"
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div
              className={cn(
                "rounded-3xl border p-8",
                isLight
                  ? "border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.1)]"
                  : "border-white/10 bg-black/60 backdrop-blur-xl"
              )}
            >
              <h3
                className={cn(
                  "text-xl font-semibold",
                  isLight ? "text-slate-900" : "text-white"
                )}
              >
                Delivery stack
              </h3>
              <ul className={cn("mt-4 space-y-3 text-sm", isLight ? "text-slate-600" : "text-white/70")}>
                {featureData.outcomes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                "rounded-3xl border p-8",
                isLight
                  ? "border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.1)]"
                  : "border-white/10 bg-black/60 backdrop-blur-xl"
              )}
            >
              <h3
                className={cn(
                  "text-xl font-semibold",
                  isLight ? "text-slate-900" : "text-white"
                )}
              >
                Explore related
              </h3>
              <div className="mt-4 space-y-2">
                {related.map((item) => (
                  <Link
                    key={item.title}
                    to={`/services/${service.slug}/${item.slug}`}
                    className={cn(
                      "block rounded-xl px-3 py-2 text-sm transition",
                      isLight
                        ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
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
