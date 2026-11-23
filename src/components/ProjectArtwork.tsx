import type { ArtworkVariant } from '../data/portfolioData';

interface ProjectArtworkProps {
  variant: ArtworkVariant;
  large?: boolean;
}

export default function ProjectArtwork({ variant, large = false }: ProjectArtworkProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden bg-[var(--bg-artwork)] select-none ${
        large ? "h-64 sm:h-80" : "h-56 sm:h-64"
      }`}
    >
      {/* Subtle Blueprint Grid Layer */}
      <div
        className="absolute inset-0 opacity-75"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {variant === "scrap-finance" && (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          {/* Abstract Balance & Ledger Matrix */}
          <div className="relative flex w-full max-w-sm items-end justify-between gap-3 border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 p-5 transition-transform duration-300 group-hover:-translate-y-1">
            <div className="space-y-2.5 flex-1">
              <div className="h-1.5 w-16 border border-[#090B0A]/30 dark:border-transparent bg-[#C5FF4A]" />
              <div className="h-2 w-full bg-[#090B0A]/10 dark:bg-white/10" />
              <div className="h-2 w-4/5 bg-[#090B0A]/10 dark:bg-white/10" />
              <div className="h-2 w-3/5 bg-[#090B0A]/15 dark:bg-white/15" />
            </div>
            <div className="flex items-end gap-1.5 h-20">
              <div className="w-3 h-8 border border-[var(--border-strong)] bg-[#090B0A]/[0.05] dark:bg-white/[0.04]" />
              <div className="w-3 h-14 border border-[var(--border-strong)] bg-[#090B0A]/[0.08] dark:bg-white/[0.06]" />
              <div className="w-3 h-11 border border-[#090B0A]/60 dark:border-[#C5FF4A]/60 bg-[#C5FF4A]/45 dark:bg-[#C5FF4A]/20" />
              <div className="w-3 h-20 border border-[#090B0A] dark:border-transparent bg-[#C5FF4A]" />
            </div>
          </div>
        </div>
      )}

      {variant === "gold-ledger" && (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          {/* Precision Carat / Balance Concentric Rings & Ledger Columns */}
          <div className="relative flex items-center justify-center">
            <div className="h-40 w-40 rounded-full border border-[#090B0A]/25 dark:border-white/15 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
              <div className="h-28 w-28 rounded-full border border-[#090B0A]/60 dark:border-[#C5FF4A]/45 flex items-center justify-center">
                <div className="h-14 w-14 border border-[#090B0A] dark:border-[#C5FF4A] rotate-45 bg-[#C5FF4A]/45 dark:bg-[#C5FF4A]/10" />
              </div>
            </div>
            <div className="absolute -right-14 top-4 border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 px-3 py-2">
              <div className="h-1.5 w-10 bg-[#090B0A] dark:bg-[#C5FF4A]" />
              <div className="mt-1.5 h-1 w-14 bg-[#090B0A]/25 dark:bg-white/20" />
              <div className="mt-1 h-1 w-8 bg-[#090B0A]/15 dark:bg-white/15" />
            </div>
          </div>
        </div>
      )}

      {variant === "productivity" && (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          {/* Modular Task & Time Alignment Blocks */}
          <div className="w-full max-w-xs space-y-2.5 transition-transform duration-300 group-hover:scale-[1.02]">
            <div className="flex items-center gap-3 border border-[#090B0A]/55 dark:border-[#C5FF4A]/40 bg-[var(--bg-surface)] p-3">
              <span className="h-3 w-3 border border-[#090B0A] dark:border-transparent bg-[#C5FF4A]" />
              <div className="h-1.5 flex-1 bg-[#090B0A]/30 dark:bg-white/30" />
              <span className="font-mono text-[10px] font-semibold text-[var(--accent-ink)]">
                01
              </span>
            </div>
            <div className="flex items-center gap-3 border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3 translate-x-3">
              <span className="h-3 w-3 border border-[var(--border-strong)]" />
              <div className="h-1.5 flex-1 bg-[#090B0A]/15 dark:bg-white/15" />
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                02
              </span>
            </div>
            <div className="flex items-center gap-3 border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3">
              <span className="h-3 w-3 border border-[#090B0A]/60 dark:border-[#C5FF4A]/50" />
              <div className="h-1.5 w-2/3 bg-[#090B0A]/20 dark:bg-white/20" />
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                03
              </span>
            </div>
          </div>
        </div>
      )}

      {variant === "swap-debug" && (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          {/* Timed Debugging Evaluation Architecture */}
          <div className="w-full max-w-sm border border-[#090B0A]/65 dark:border-[#C5FF4A]/45 bg-[var(--bg-surface)] p-5 shadow-none transition-transform duration-300 group-hover:-translate-y-1">
            <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
              <span className="font-mono text-[11px] font-semibold text-[var(--accent-ink)]">
                SWAP 2K26 · TIMED ENGINE
              </span>
              <span className="font-mono text-[11px] text-[var(--text-primary)] tabular-nums">
                00:45:00
              </span>
            </div>
            <div className="mt-4 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>01 · Timed Assessment</span>
                <span className="font-semibold text-[var(--accent-ink)]">
                  ACTIVE
                </span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>02 · Time Calculation</span>
                <span className="text-[var(--text-primary)]">AUTO</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>03 · Marking System</span>
                <span className="text-[var(--text-primary)]">READY</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {variant === "erp" && (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          {/* Interconnected Enterprise Resource Grid */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
            <div className="col-span-2 h-14 border border-[var(--border-strong)] bg-[var(--bg-surface)] p-3">
              <div className="h-1.5 w-12 bg-[#090B0A] dark:bg-[#C5FF4A]" />
              <div className="mt-2 h-1.5 w-full bg-[#090B0A]/10 dark:bg-white/10" />
            </div>
            <div className="h-14 border border-[#090B0A] dark:border-[#C5FF4A]/50 bg-[#C5FF4A]/65 dark:bg-[#C5FF4A]/10 p-3" />
            <div className="h-16 border border-[var(--border-strong)] bg-[var(--bg-surface)] p-3" />
            <div className="col-span-2 h-16 border border-[var(--border-strong)] bg-[var(--bg-surface)] p-3 flex flex-col justify-between">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 border border-[#090B0A] dark:border-transparent bg-[#C5FF4A]" />
                <span className="h-2.5 w-2.5 bg-[#090B0A]/25 dark:bg-white/25" />
              </div>
              <div className="h-1.5 w-3/4 bg-[#090B0A]/20 dark:bg-white/20" />
            </div>
          </div>
        </div>
      )}

      {variant === "travel" && (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          {/* Vector Route Trajectory & Waypoint Nodes */}
          <svg
            viewBox="0 0 320 180"
            className="h-full w-full max-w-sm transition-transform duration-300 group-hover:scale-[1.03]"
            fill="none"
          >
            <path
              d="M32 135 C 95 45, 195 140, 286 42"
              className="stroke-[#090B0A] dark:stroke-[#C5FF4A]"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <path
              d="M32 135 C 120 115, 200 70, 286 42"
              className="stroke-[#090B0A]/25 dark:stroke-white/20"
              strokeWidth="1"
            />
            <rect
              x="26"
              y="129"
              width="12"
              height="12"
              className="fill-[var(--bg-surface)] stroke-[#090B0A] dark:stroke-[#F4F6F5]"
              strokeWidth="1.75"
            />
            <circle
              cx="158"
              cy="92"
              r="6"
              className="fill-[#C5FF4A] stroke-[#090B0A] dark:stroke-transparent"
              strokeWidth="1.5"
            />
            <rect
              x="280"
              y="36"
              width="12"
              height="12"
              className="fill-[#C5FF4A] stroke-[#090B0A] dark:stroke-transparent"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}

      {variant === "bom" && (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          {/* Hierarchical Bill of Materials Assembly Tree */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xs">
            <div className="w-36 border border-[#090B0A] dark:border-[#C5FF4A]/70 bg-[var(--bg-surface)] px-4 py-2 text-center">
              <div className="mx-auto h-1.5 w-16 bg-[#090B0A] dark:bg-[#C5FF4A]" />
            </div>
            <div className="relative flex w-full justify-between px-4">
              <span className="absolute left-1/2 -top-4 h-4 w-px bg-[#090B0A]/35 dark:bg-white/25" />
              <span className="absolute left-10 right-10 top-0 h-px bg-[#090B0A]/35 dark:bg-white/25" />
              <div className="mt-3 w-20 border border-[var(--border-strong)] bg-[var(--bg-surface)] p-2.5">
                <div className="h-1 w-10 bg-[#090B0A]/35 dark:bg-white/30" />
                <div className="mt-1.5 h-1 w-6 bg-[#090B0A]/15 dark:bg-white/15" />
              </div>
              <div className="mt-3 w-20 border border-[#090B0A] dark:border-white/15 bg-[#C5FF4A]/45 dark:bg-[#111413] p-2.5">
                <div className="h-1 w-12 bg-[#090B0A] dark:bg-[#C5FF4A]/70" />
                <div className="mt-1.5 h-1 w-8 bg-[#090B0A]/30 dark:bg-white/15" />
              </div>
              <div className="mt-3 w-20 border border-[var(--border-strong)] bg-[var(--bg-surface)] p-2.5">
                <div className="h-1 w-9 bg-[#090B0A]/35 dark:bg-white/30" />
                <div className="mt-1.5 h-1 w-7 bg-[#090B0A]/15 dark:bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      )}

      {variant === "B2C-ecommerce" && (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          {/* Asymmetric B2C Storefront & Catalog Frame */}
          <div className="grid grid-cols-12 gap-2.5 w-full max-w-xs transition-transform duration-300 group-hover:-translate-y-1">
            <div className="col-span-7 h-32 border border-[var(--border-strong)] bg-[var(--bg-surface)] p-3 flex flex-col justify-between">
              <div className="h-16 w-full border border-[var(--border-hairline)] bg-[#090B0A]/[0.04] dark:bg-white/[0.03]" />
              <div className="flex items-center justify-between">
                <div className="h-1.5 w-14 bg-[#090B0A]/30 dark:bg-white/30" />
                <div className="h-3 w-8 border border-[#090B0A] dark:border-transparent bg-[#C5FF4A]" />
              </div>
            </div>
            <div className="col-span-5 flex flex-col gap-2.5">
              <div className="flex-1 border border-[var(--border-strong)] bg-[var(--bg-surface)] p-2.5">
                <div className="h-1.5 w-8 bg-[#090B0A] dark:bg-[#C5FF4A]/75" />
                <div className="mt-2 h-1 w-full bg-[#090B0A]/15 dark:bg-white/15" />
              </div>
              <div className="flex-1 border border-[#090B0A]/55 dark:border-[#C5FF4A]/40 bg-[#C5FF4A]/45 dark:bg-[#C5FF4A]/[0.06] p-2.5">
                <div className="h-1.5 w-10 bg-[#090B0A]/50 dark:bg-white/40" />
                <div className="mt-2 h-1 w-2/3 bg-[#090B0A]/25 dark:bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Edge Visual Classification Stamp */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {variant === "swap-debug"
            ? "Live Web Application"
            : "Conceptual Architecture Visual"}
        </span>
      </div>
    </div>
  );
}
