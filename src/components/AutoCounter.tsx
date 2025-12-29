import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface AutoCounterProps {
  maxValue: number;
  duration?: number;
}

export default function AutoCounter({
  maxValue,
  duration = 1,
}: AutoCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, maxValue, {
      duration,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, count, maxValue, duration]);

  return (
    <motion.span ref={ref} className="text-primary-foreground">
      {rounded}
    </motion.span>
  );
}

/**
 * ==============   Styles   ================
 */

const text = {
  fontSize: 48,
  fontWeight: "bold",
};
