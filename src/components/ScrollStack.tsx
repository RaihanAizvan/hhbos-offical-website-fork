import React, { useLayoutEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 120,
  itemScale = 0.04,
  itemStackDistance = 32,
  stackPosition = "25%",
  scaleEndPosition = "12%",
  baseScale = 0.88,
  rotationAmount = 0,
  blurAmount = 2,
  useWindowScroll = false,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const rafRef = useRef<number | null>(null);

  const parsePercent = (value: string, height: number) =>
    value.includes("%") ? (parseFloat(value) / 100) * height : Number(value);

  const update = useCallback(() => {
    if (!cardsRef.current.length) return;

    const scrollTop = useWindowScroll
      ? window.scrollY
      : scrollerRef.current?.scrollTop || 0;

    const containerHeight = useWindowScroll
      ? window.innerHeight
      : scrollerRef.current?.clientHeight || 0;

    const stackPx = parsePercent(stackPosition, containerHeight);
    const scaleEndPx = parsePercent(scaleEndPosition, containerHeight);

    const endEl = document.querySelector(".scroll-stack-end") as HTMLElement;
    const endTop = endEl?.offsetTop || 0;

    cardsRef.current.forEach((card, i) => {
      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPx;
      const pinEnd = endTop - containerHeight / 2;

      const progress = Math.min(
        1,
        Math.max(0, (scrollTop - triggerStart) / (triggerEnd - triggerStart))
      );

      const scaleTarget = baseScale + i * itemScale;
      const scale = 1 - progress * (1 - scaleTarget);
      const translateY =
        scrollTop >= triggerStart
          ? Math.min(
              scrollTop - cardTop + stackPx + itemStackDistance * i,
              pinEnd - cardTop + stackPx + itemStackDistance * i
            )
          : 0;

      const blur =
        blurAmount && progress > 0 ? Math.max(0, (cardsRef.current.length - i - 1) * blurAmount * progress) : 0;

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotationAmount * i * progress}deg)`;
      card.style.filter = blur ? `blur(${blur}px)` : "";
    });
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
  ]);

  useLayoutEffect(() => {
    const cards = Array.from(
      (useWindowScroll
        ? document
        : scrollerRef.current
      )?.querySelectorAll(".scroll-stack-card") || []
    ) as HTMLElement[];

    cardsRef.current = cards;

    const onScroll = () => update();

    if (useWindowScroll) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    update();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (useWindowScroll) {
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, [update, useWindowScroll]);

  return (
    <div
      ref={scrollerRef}
      className={`relative w-full ${useWindowScroll ? "overflow-visible" : "h-full overflow-y-auto overscroll-contain"} ${className}`}
    >
      <div className="scroll-stack-inner pt-[20vh] px-6 sm:px-10 lg:px-16 pb-[50rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
