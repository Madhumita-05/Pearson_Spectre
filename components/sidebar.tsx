"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Upload,
  GitBranch,
  Archive,
  ShieldAlert,
  Rss,
  Activity,
  Settings,
} from "lucide-react"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/upload", label: "Upload Contract", icon: Upload },
  { href: "/workflows", label: "Workflows", icon: GitBranch },
  { href: "/vault", label: "Contract Vault", icon: Archive },
  { href: "/risk", label: "Risk Analysis", icon: ShieldAlert },
  { href: "/feed", label: "Regulation Feed", icon: Rss },
  { href: "/traces", label: "Omium Traces", icon: Activity },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-[248px] bg-[rgba(255,255,255,0.02)] border-r border-[rgba(255,255,255,0.06)] flex flex-col">
      {/* Logo */}
      <div className="px-6 pt-6 pb-4">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#6B7280] block">PEARSON</span>
        <span className="text-[20px] font-semibold text-[#F9FAFB]">Spectre</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        <span className="text-[10px] uppercase tracking-[0.08em] text-[#6B7280] px-4 mb-1 block">NAVIGATION</span>
        <div className="mt-2 space-y-0.5 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-md text-[13px] transition-colors ${
                  isActive
                    ? "bg-[rgba(139,92,246,0.1)] text-[#A78BFA] border-l-2 border-[#8B5CF6] -ml-0.5 pl-[14px]"
                    : "text-[#6B7280] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#D1D5DB]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="h-px bg-[rgba(255,255,255,0.06)] mx-4 my-3" />

        <div className="px-2">
          <Link
            href="/settings"
            className={`flex items-center gap-2.5 px-4 py-2 rounded-md text-[13px] transition-colors ${
              pathname === "/settings"
                ? "bg-[rgba(139,92,246,0.1)] text-[#A78BFA] border-l-2 border-[#8B5CF6] -ml-0.5 pl-[14px]"
                : "text-[#6B7280] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#D1D5DB]"
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </div>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-dot" />
            <span className="text-[11px] text-[#10B981]">Omium Connected</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 bg-[rgba(16,185,129,0.12)] text-[#10B981] rounded">Live</span>
        </div>

        <div className="flex items-center gap-2.5 mt-3">
          <div className="w-7 h-7 rounded-full bg-[#1F2937] flex items-center justify-center text-[10px] text-[#9CA3AF]">
            RM
          </div>
          <div>
            <p className="text-[12px] text-[#F9FAFB]">Rahul M.</p>
            <p className="text-[10px] text-[#4B5563]">Legal Ops</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
