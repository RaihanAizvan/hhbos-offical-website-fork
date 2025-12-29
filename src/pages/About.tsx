import AutoCounter from "@/components/AutoCounter";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, CheckCircle } from "lucide-react";
import { useLayoutEffect } from "react";

const About = () => {
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const values = [
    {
      icon: Heart,
      title: "Integrity & Transparency",
      description:
        "We build trust through honest communication and ethical practices.",
    },
    {
      icon: CheckCircle,
      title: "Accuracy & Timeliness",
      description: "Precision in every task, delivered on schedule every time.",
    },
    {
      icon: Target,
      title: "Innovation & Growth",
      description: "Continuously evolving to meet changing business needs.",
    },
    {
      icon: Heart,
      title: "Customer-Centric Approach",
      description: "Your succes is our priority in everything we do.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="gradient-subtle section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
            Your Trusted Partner in Financial and Data Solutions
          </h1>
          <p
            className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            HH Back Office Services Pvt Ltd is a professional outsourcing firm
            specializing in Revenue Cycle Management, Finance & Accounts, and
            Database Administration.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <Card className="border-2">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                With a team of experienced professionals and industry-standard
                technology, we ensure accuracy, compliance, and efficiency in
                every service we deliver. Since our establishment in 2020, we
                have been committed to empowering businesses with reliable,
                data-driven solutions.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Our expertise spans across multiple industries, and we pride
                ourselves on delivering measurable results that enhance
                productivity and profitability for our clients.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding gradient-subtle">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 hover:border-primary transition-all duration-300 hover-scale">
              <CardContent className="p-8">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground text-lg">
                  To empower businesses with reliable, data-driven solutions
                  that enhance productivity and profitability through precision,
                  efficiency, and innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300 hover-scale">
              <CardContent className="p-8">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Our Vision
                </h2>
                <p className="text-muted-foreground text-lg">
                  To become a globally recognized outsourcing partner for
                  financial and data management excellence, trusted by
                  businesses worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-all duration-300 hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding gradient-hero">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                2020
              </div>
              <div className="text-primary-foreground/90">Established</div>
            </div>

            <div>
              <div className="text-4xl md:text-5xl flex justify-center items-center gap-2 font-bold text-primary-foreground mb-2">
                <AutoCounter maxValue={100} duration={2.5} />
                <span className="mb-3">+</span>
              </div>
              <div className="text-primary-foreground/90">Clients Served</div>
            </div>

            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                <AutoCounter maxValue={3} duration={1.5} />
              </div>
              <div className="text-primary-foreground/90">Core Services</div>
            </div>

            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                24/7
              </div>
              <div className="text-primary-foreground/90">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
