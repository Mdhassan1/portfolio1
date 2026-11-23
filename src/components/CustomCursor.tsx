import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateAvailability = () => {
      setEnabled(finePointer.matches && !reducedMotion.matches);
    };

    updateAvailability();
    finePointer.addEventListener('change', updateAvailability);
    reducedMotion.addEventListener('change', updateAvailability);

    return () => {
      finePointer.removeEventListener('change', updateAvailability);
      reducedMotion.removeEventListener('change', updateAvailability);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let rafId = 0;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest('a, button, [role="button"], input, textarea, select')
      );
      setIsInteractive(interactive);
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, [enabled, isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-150 ease-out ${
          isInteractive
            ? 'h-9 w-9 border-[#090B0A] bg-[#C5FF4A]/35 dark:border-[#C5FF4A] dark:bg-[#C5FF4A]/10'
            : 'h-6 w-6 border-[#090B0A]/40 bg-transparent dark:border-[#F4F6F5]/30'
        }`}
      />
    </div>
  );
}
