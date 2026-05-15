import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string | number
  subtext: string
  subtextColor?: "green" | "purple" | "amber" | "default"
  showDot?: boolean
}

export function StatCard({ label, value, subtext, subtextColor = "default", showDot }: StatCardProps) {
  const subtextColors = {
    green: "text-[#10B981]",
    purple: "text-[#A78BFA]",
    amber: "text-[#F59E0B]",
    default: "text-[#6B7280]",
  }

  return (
    <GlassCard className="p-4">
      <span className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280]">{label}</span>
      <p className={cn("text-[36px] font-semibold mt-1", subtextColor === "amber" ? "text-[#F59E0B]" : "text-[#F9FAFB]")}>
        {value}
      </p>
      <div className="flex items-center gap-1.5 mt-1">
        {showDot && <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-pulse-dot" />}
        <span className={cn("text-[12px]", subtextColors[subtextColor])}>{subtext}</span>
      </div>
    </GlassCard>
  )
}

interface BadgeProps {
  variant: "violation" | "high" | "medium" | "low" | "running" | "complete" | "pending"
  children: React.ReactNode
  className?: string
}

export function Badge({ variant, children, className }: BadgeProps) {
  const variants = {
    violation: "bg-[rgba(239,68,68,0.12)] text-[#EF4444] border-[rgba(239,68,68,0.25)]",
    high: "bg-[rgba(245,158,11,0.12)] text-[#F59E0B] border-[rgba(245,158,11,0.25)]",
    medium: "bg-[rgba(234,179,8,0.12)] text-[#EAB308] border-[rgba(234,179,8,0.25)]",
    low: "bg-[rgba(16,185,129,0.12)] text-[#10B981] border-[rgba(16,185,129,0.25)]",
    running: "bg-[rgba(139,92,246,0.15)] text-[#A78BFA] border-[rgba(139,92,246,0.25)]",
    complete: "bg-[rgba(16,185,129,0.12)] text-[#10B981] border-[rgba(16,185,129,0.25)]",
    pending: "bg-[rgba(255,255,255,0.05)] text-[#6B7280] border-[rgba(255,255,255,0.1)]",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-medium tracking-[0.06em] border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  children: React.ReactNode
}

export function Button({ variant = "primary", children, className, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-[#8B5CF6] text-white hover:bg-[#7C3AED]",
    secondary: "bg-transparent border border-[rgba(255,255,255,0.12)] text-[#D1D5DB] hover:border-[rgba(139,92,246,0.5)] hover:text-[#F9FAFB]",
  }

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg text-[13px] font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
