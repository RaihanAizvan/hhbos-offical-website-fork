import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTheme } from "next-themes";
import { lenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 320;

const ScrollToTopButton = () => {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => lenis.scrollTo(0, { duration: 1.1 })}
      className={cn(
        "fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-lg transition-all duration-300 hover:-translate-y-1",
        visible
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-10 opacity-0 scale-95 pointer-events-none",
        isLight
          ? "border-slate-200 bg-white text-slate-700 hover:text-orange-500 hover:shadow-orange-100"
          : "border-white/10 bg-black/70 text-white hover:text-primary hover:shadow-black/50"
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default ScrollToTopButton;
