import type { LucideIcon } from "lucide-react";
import {
  CircuitBoard,
  DollarSign,
  HeartPulse,
  MonitorSmartphone,
} from "lucide-react";

import serviceHealthcare from "@/assets/service-healthcare.jpg";
import serviceFinance from "@/assets/service-finance.jpg";
import serviceDatabase from "@/assets/service-database.jpg";

export type FeatureDetail = {
  title: string;
  summary: string;
  bullets: string[];
  outcomes: string[];
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  icon: LucideIcon;
  features: string[];
  benefits: string[];
  detailHeadline: string;
  detailSummary: string;
  detailPillars: string[];
  featureDetails: FeatureDetail[];
};

const makeFeatureDetails = (
  features: string[],
  context: string
): FeatureDetail[] =>
  features.map((feature) => ({
    title: feature,
    summary: `A focused capability within ${context}, designed for reliability, speed, and measurable outcomes.`,
    bullets: [
      "Workflow mapping & automation",
      "Quality assurance and compliance",
      "SLA-driven delivery cadence",
      "Performance reporting & insights",
    ],
    outcomes: [
      "Higher accuracy",
      "Faster turnaround",
      "Lower operational risk",
    ],
  }));

export const services: Service[] = [
  {
    id: "rcm",
    slug: "rcm",
    title: "Revenue Cycle Management (RCM)",
    tagline: "Accelerate cash flow with end-to-end RCM excellence",
    description:
      "End-to-end RCM solutions that optimize healthcare financial performance.",
    image: serviceHealthcare,
    accent: "from-orange-500 via-orange-800 to-orange-600",
    icon: HeartPulse,
    features: [
      "Medical Coding & Charge Entry",
      "Claims Submission & Follow-up",
      "Denial Management & Appeals",
      "Payment Posting & Reconciliation",
    ],
    benefits: [
      "Reduced claim rejection rates",
      "Faster reimbursements",
      "Improved cash flow visibility",
      "Compliance-ready operations",
    ],
    detailHeadline: "RCM operations engineered for speed and accuracy",
    detailSummary:
      "We build a resilient RCM engine that reduces denials, streamlines collections, and improves financial predictability.",
    detailPillars: [
      "Automation-first workflows",
      "Compliance-ready reporting",
      "Dedicated denial recovery",
      "Actionable AR visibility",
    ],
    featureDetails: makeFeatureDetails(
      [
        "Medical Coding & Charge Entry",
        "Claims Submission & Follow-up",
        "Denial Management & Appeals",
        "Payment Posting & Reconciliation",
      ],
      "our RCM stack"
    ),
  },
  {
    id: "finance",
    slug: "finance-accounts",
    title: "Finance & Accounts Services",
    tagline: "Accurate, compliant, and insight-driven finance ops",
    description:
      "Streamlined finance operations with bookkeeping, reporting, and compliance support.",
    image: serviceFinance,
    accent: "from-orange-500 via-orange-800 to-orange-600",
    icon: DollarSign,
    features: [
      "Bookkeeping & General Ledger",
      "Accounts Payable & Receivable",
      "Payroll Processing",
      "Financial Reporting & Analysis",
    ],
    benefits: [
      "Audit-ready records",
      "Lower compliance risk",
      "Faster month-end close",
      "Better financial visibility",
    ],
    detailHeadline: "Finance operations with clarity at every close",
    detailSummary:
      "We deliver dependable accounting and reporting that keeps leadership informed and audit-ready at all times.",
    detailPillars: [
      "Accurate reconciliations",
      "Real-time reporting",
      "Tax & compliance readiness",
      "Payroll precision",
    ],
    featureDetails: makeFeatureDetails(
      [
        "Bookkeeping & General Ledger",
        "Accounts Payable & Receivable",
        "Payroll Processing",
        "Financial Reporting & Analysis",
      ],
      "finance operations"
    ),
  },
  {
    id: "database",
    slug: "database-management",
    title: "Database Administration & Management",
    tagline: "Reliable, secure, and scalable database operations",
    description:
      "Database setup, optimization, monitoring, and security for critical systems.",
    image: serviceDatabase,
    accent: "from-orange-500 via-orange-800 to-orange-600",
    icon: CircuitBoard,
    features: [
      "Database Setup & Configuration (SQL, Oracle, MySQL)",
      "Performance Tuning & Monitoring",
      "Backup & Disaster Recovery",
      "Security & Access Controls",
    ],
    benefits: [
      "Higher system uptime",
      "Faster query performance",
      "Stronger data protection",
      "Scalable infrastructure",
    ],
    detailHeadline: "Data platforms built for uptime and performance",
    detailSummary:
      "We keep mission-critical databases optimized, secure, and always available—backed by disciplined monitoring.",
    detailPillars: [
      "Performance tuning",
      "Proactive monitoring",
      "Secure access controls",
      "Resilient backup strategy",
    ],
    featureDetails: makeFeatureDetails(
      [
        "Database Setup & Configuration (SQL, Oracle, MySQL)",
        "Performance Tuning & Monitoring",
        "Backup & Disaster Recovery",
        "Security & Access Controls",
      ],
      "database management"
    ),
  },
  {
    id: "it-services",
    slug: "it-services",
    title: "IT Product & App Development",
    tagline: "Design, build, and scale digital products with confidence",
    description:
      "Full-cycle app development services for web, mobile, and automation solutions.",
    image: serviceDatabase,
    accent: "from-orange-500 via-orange-800 to-orange-600",
    icon: MonitorSmartphone,
    features: [
      "Product Discovery & UX",
      "Web & Mobile App Development",
      "API Integration & Automation",
      "QA, Release & Support",
    ],
    benefits: [
      "Faster time-to-market",
      "Scalable architecture",
      "Improved digital efficiency",
      "Dedicated delivery team",
    ],
    detailHeadline: "Digital products built for performance",
    detailSummary:
      "We build modern apps and internal tools that are secure, scalable, and aligned to business outcomes.",
    detailPillars: [
      "Product strategy & UX",
      "Modern tech stack delivery",
      "Automation & integration",
      "Ongoing optimization",
    ],
    featureDetails: makeFeatureDetails(
      [
        "Product Discovery & UX",
        "Web & Mobile App Development",
        "API Integration & Automation",
        "QA, Release & Support",
      ],
      "product engineering"
    ),
  },
];

// add more services if you want
