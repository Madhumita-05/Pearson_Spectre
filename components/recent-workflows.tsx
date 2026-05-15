"use client"

import { GlassCard, Badge } from "./ui-components"
import Link from "next/link"

const workflows = [
  {
    id: "spec-20240614-a7f3",
    contract: "Razorpay_Vendor_Agreement_Q2_2024.pdf",
    size: "2.4 MB · 28 pages",
    severity: "violation" as const,
    status: "complete" as const,
    agents: ["Extraction", "Research", "Classifier", "Redline", "Reporter"],
    updated: "2m ago",
  },
  {
    id: "spec-20240613-b2c1",
    contract: "PhonePe_NDA_Draft_v3.pdf",
    size: "1.2 MB · 14 pages",
    severity: "high" as const,
    status: "running" as const,
    agents: ["Extraction", "Research", "Classifier"],
    updated: "5m ago",
  },
  {
    id: "spec-20240612-d4e5",
    contract: "Paytm_Data_Processing_Agreement.pdf",
    size: "3.1 MB · 42 pages",
    severity: "medium" as const,
    status: "complete" as const,
    agents: ["Extraction", "Research", "Classifier", "Redline"],
    updated: "1h ago",
  },
  {
    id: "spec-20240611-f6g7",
    contract: "HDFC_Cloud_Services_SLA.pdf",
    size: "1.8 MB · 22 pages",
    severity: "low" as const,
    status: "complete" as const,
    agents: ["Extraction", "Research"],
    updated: "3h ago",
  },
  {
    id: "spec-20240610-h8i9",
    contract: "Flipkart_Logistics_Contract.pdf",
    size: "4.2 MB · 56 pages",
    severity: "high" as const,
    status: "complete" as const,
    agents: ["Extraction", "Research", "Classifier", "Redline", "Reporter"],
    updated: "6h ago",
  },
  {
    id: "spec-20240609-j0k1",
    contract: "Ola_Driver_Partnership_Agreement.pdf",
    size: "2.1 MB · 31 pages",
    severity: "medium" as const,
    status: "complete" as const,
    agents: ["Extraction", "Research", "Classifier"],
    updated: "1d ago",
  },
]

export function RecentWorkflows() {
  return (
    <GlassCard className="p-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <h3 className="text-[14px] font-medium text-[#F9FAFB]">Recent Workflows</h3>
        <Link href="/workflows" className="text-[12px] text-[#8B5CF6] hover:text-[#A78BFA]">
          View all →
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Contract</th>
              <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Severity</th>
              <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Status</th>
              <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Agents</th>
              <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Updated</th>
            </tr>
          </thead>
          <tbody>
            {workflows.map((workflow) => (
              <tr
                key={workflow.id}
                className="border-b border-[rgba(255,255,255,0.06)] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] cursor-pointer transition-colors"
              >
                <td className="px-4 py-3">
                  <p className="text-[13px] text-[#F9FAFB] truncate max-w-[200px]">{workflow.contract}</p>
                  <p className="text-[11px] text-[#4B5563]">{workflow.size}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={workflow.severity}>
                    {workflow.severity}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={workflow.status}>
                    {workflow.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 flex-wrap">
                    {workflow.agents.slice(0, 3).map((agent) => (
                      <span key={agent} className="text-[10px] font-mono bg-[rgba(255,255,255,0.05)] px-1.5 py-0.5 rounded text-[#9CA3AF]">
                        {agent}
                      </span>
                    ))}
                    {workflow.agents.length > 3 && (
                      <span className="text-[10px] text-[#6B7280]">+{workflow.agents.length - 3} more</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-[11px] text-[#4B5563] whitespace-nowrap">{workflow.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  )
}
