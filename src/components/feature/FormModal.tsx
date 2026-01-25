// components/FormModal.tsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { IJob } from "@/types/careers";

gsap.registerPlugin(ScrollTrigger);

type FormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  endpoint: string;
  type: "JOB" | "CONTACT";
  payload: IJob;
};

export default function FormModal({
  isOpen,
  onClose,
  title,
  endpoint,
  type,
  payload,
}: FormModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Backdrop fade
      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
      )

        // Modal wrapper pop
        .fromTo(
          modalRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.92,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.7,
          },
          "-=0.1",
        )

        // Fields subtle reveal
        .fromTo(
          formRef.current?.querySelectorAll(".form-field"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.4,
          },
          "-=0.35",
        );
    });

    return () => ctx.revert();
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Mail failed");
      }

      toast({
        title: "Message sent",
        description:
          "Thank you for contacting us. Our team will get back to you shortly.",
        className: "bg-green-600 text-white",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
      onClose();
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "Unable to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      ref={backdropRef}
    >
      <div
        className="relative w-full  max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl p-8"
        ref={modalRef}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold text-white mb-8">
          {`Apply for ${payload.title}`}
        </h2>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          {/** Fields */}
          <div className="form-field">
            <label className="text-sm text-white">Your Name *</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-black border-white/10 text-white"
            />
          </div>

          <div className="form-field">
            <label className="text-sm text-white">Email Address *</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-black border-white/10 text-white"
            />
          </div>

          <div className="form-field">
            <label className="text-sm text-white">
              Phone Number (with country code) *
            </label>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="^\+?[0-9]{7,15}$"
              className="bg-black border-white/10 text-white"
            />
          </div>

          <div className="form-field">
            <label className="text-sm text-white">Message *</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="bg-black border-white/10 text-white resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary py-6 font-bold"
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                {" "}
                <Send /> Send Application{" "}
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
