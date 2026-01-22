import { Globe, Settings, TrendingUp, Users } from "lucide-react";

const whyChooseUs = [
  {
    icon: Users,
    text: "Expert Professionals",
    subtext: "Skilled accountants, RCM specialists, and DBAs",
  },
  {
    icon: Settings,
    text: "Technology Driven",
    subtext: "Latest software tools and automation",
  },
  {
    icon: Lock,
    text: "Data Security",
    subtext: "ISO 27001-aligned data protection policies",
  },
  {
    icon: TrendingUp,
    text: "Proven Results",
    subtext: "Demonstrated ROI and efficiency gains",
  },
  {
    icon: Globe,
    text: "Global Delivery Model",
    subtext: "Seamless support for clients worldwide",
  },
];

export function WhyChooseUs() {
  const items = whyChooseUs.map((item) => (
    <div className="flex flex-col items-center text-center space-y-3 p-4">
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Settings className="h-8 w-8 text-primary" />
      </div>
      <p className="font-semibold text-foreground">Technology Driven</p>
      <p className="text-sm text-muted-foreground">
        Latest software tools and automation
      </p>
    </div>
  ));

  return items;
}
