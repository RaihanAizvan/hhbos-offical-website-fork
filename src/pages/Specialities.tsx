import { motion } from "motion/react";
import {
  BriefcaseMedical,
  ClipboardList,
  FileText,
  Hospital,
  Layers,
  ShieldCheck,
  Stethoscope,
  TabletSmartphone,
} from "lucide-react";

const pmsPlatforms = [
  "e-Clinical Works",
  "Athena",
  "Centricity",
  "Collaborate MD",
  "Kareo",
  "Nextgen",
  "Advanced MD",
  "Epic",
  "AllScripts",
  "Bright Tree",
  "Go Rev",
  "Allofactor",
  "Office Ally",
  "Onstaff",
  "Rapid Practice Management",
  "Thera Bills",
  "Intergen",
  "Matrix",
  "Smart Advisor",
  "THR",
  "Dr’s View",
  "Sevocity",
  "Mod Med",
];

const credentialing = ["Modio (Credentialing)"];

const specialties = [
  "General Medicine",
  "Pain Management",
  "Emergency Room",
  "Urgent Care",
  "Podiatry",
  "Orthopedics",
  "Paediatrics",
  "Senior Care",
  "ASC Billing",
  "DME",
  "Dental",
];

const tileBase =
  "rounded-2xl border border-white/10 bg-black/60 px-4 py-5 text-sm text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300";

const tileIconBase =
  "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/70 text-white/70";

const tileHover =
  "hover:-translate-y-1 hover:border-primary/50 hover:text-white hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)]";

const gridClasses =
  "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6";

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof BriefcaseMedical;
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-center gap-4 mb-8">
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/60 text-primary">
      <Icon className="h-6 w-6" />
    </span>
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white">
        {title}
      </h2>
      <p className="text-white/60 text-sm md:text-base mt-1">{subtitle}</p>
    </div>
  </div>
);

const Specialities = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          >
            <source src="/video/web%20bg.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
        </div>
        <div className="container-custom px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
            <Layers className="h-4 w-4 text-primary" />
            Specialities
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white">
            A structured directory of our platform and specialty expertise
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            Clean, consistent, and ready for scale—organized exactly like a service
            directory.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-12 rounded-xl border border-white/10 bg-black/50 flex items-center justify-center text-white/30 text-xs uppercase tracking-widest"
              >
                Logo
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PMS / EHR Platforms */}
      <section className="py-16">
        <div className="container-custom px-6">
          <SectionHeader
            icon={TabletSmartphone}
            title="PMS / EHR Platforms"
            subtitle="Operational familiarity across leading systems"
          />
          <div className={gridClasses}>
            {pmsPlatforms.map((item) => (
              <motion.div
                key={item}
                className={`${tileBase} ${tileHover}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className={tileIconBase}>
                  <FileText className="h-4 w-4" />
                </div>
                <div className="mt-3 font-medium">{item}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16 bg-zinc-950">
        <div className="container-custom px-6">
          <SectionHeader
            icon={Stethoscope}
            title="Specialties"
            subtitle="Domain expertise across clinical and billing services"
          />
          <div className={gridClasses}>
            {specialties.map((item) => (
              <motion.div
                key={item}
                className={`${tileBase} ${tileHover}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className={tileIconBase}>
                  <BriefcaseMedical className="h-4 w-4" />
                </div>
                <div className="mt-3 font-medium">{item}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentialing */}
      <section className="py-16">
        <div className="container-custom px-6">
          <SectionHeader
            icon={ShieldCheck}
            title="Credentialing Application"
            subtitle="Specialized compliance tools"
          />
          <div className={gridClasses}>
            {credentialing.map((item) => (
              <motion.div
                key={item}
                className={`${tileBase} ${tileHover}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className={tileIconBase}>
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="mt-3 font-medium">{item}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Specialities;
