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
  { name: "General Medicine", icon: "fi-rr-stethoscope" },
  { name: "Pain Management", icon: "fi-rr-heart-rate" },
  { name: "Emergency Room", icon: "fi-rr-ambulance" },
  { name: "Urgent Care", icon: "fi-rr-doctor" },
  { name: "Podiatry", icon: "fi-rr-shoe-prints" },
  { name: "Orthopedics", icon: "fi-rr-bone-break" },
  { name: "Paediatrics", icon: "fi-rr-baby" },
  { name: "Senior Care", icon: "fi-rr-user-time" },
  { name: "ASC Billing", icon: "fi-rr-hospital-user" },
  { name: "DME", icon: "fi-rr-medicine" },
  { name: "Dental", icon: "fi-rr-tooth" },
];

const platformIcons = [
  "fi-rr-laptop-medical",
  "fi-rr-hospital",
  "fi-rr-stethoscope",
  "fi-rr-clipboard-list",
  "fi-rr-chart-line-up",
  "fi-rr-database",
  "fi-rr-shield-check",
  "fi-rr-network",
];

const logoIcons = [
  "fi-rr-stethoscope",
  "fi-rr-laptop-medical",
  "fi-rr-hospital",
  "fi-rr-bone-break",
  "fi-rr-database",
  "fi-rr-clipboard-list",
  "fi-rr-user-time",
  "fi-rr-ambulance",
  "fi-rr-tooth",
  "fi-rr-heart-rate",
  "fi-rr-shield-check",
  "fi-rr-briefcase",
];

const tileBase =
  "aspect-square rounded-2xl border border-white/10 bg-black/60 px-4 py-5 text-sm text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 flex flex-col items-center justify-center text-center";

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
  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 text-center sm:text-left">
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/60 text-primary mx-auto sm:mx-0">
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
      <section className="relative min-h-[70svh] pt-28 pb-20 overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          >
            <source src="/video/web%20bg.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="container-custom px-6 relative z-10 overflow-hidden text-center">
          <div className="mx-auto w-full max-w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/60 mx-auto">
              <Layers className="h-4 w-4 text-primary" />
              Specialities
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
              Specialities
            </h1>
            <p className="mt-4 text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
              Clean, consistent, and ready for scale—organized exactly like a service
              directory.
            </p>

            <div className="mt-10 overflow-hidden">
              <div className="flex w-max gap-4 animate-marquee">
                {[...logoIcons, ...logoIcons].map((icon, idx) => (
                  <div
                    key={`${icon}-${idx}`}
                    className="h-16 w-16 rounded-2xl border border-white/10 bg-black/60 flex items-center justify-center shrink-0 text-primary"
                  >
                    <i className={`fi ${icon} text-2xl`} />
                  </div>
                ))}
              </div>
            </div>
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
            {pmsPlatforms.map((item, index) => (
              <motion.div
                key={item}
                className={`${tileBase} ${tileHover}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <i
                  className={`fi ${platformIcons[index % platformIcons.length]} text-3xl text-primary`}
                />
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
                key={item.name}
                className={`${tileBase} ${tileHover}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <i className={`fi ${item.icon} text-3xl text-primary`} />
                <div className="mt-3 font-medium">{item.name}</div>
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
                <i className="fi fi-rr-badge-check text-3xl text-primary" />
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
