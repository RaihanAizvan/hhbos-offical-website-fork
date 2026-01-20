import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * Global smooth scrolling (Lenis) + GSAP ScrollTrigger integration.
 *
 * This is intentionally isolated so it can be reverted cleanly in one commit
 * if the team decides to return to native browser scroll.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Respect reduced motion preferences.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      // Smooth but not "floaty"; tweak if you want more/less smoothing.
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Keep ScrollTrigger in sync with Lenis.
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // If layout changes, refresh ScrollTrigger measurements.
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
