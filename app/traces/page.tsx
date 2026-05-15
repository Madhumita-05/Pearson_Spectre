import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { GlassCard, Badge, Button } from "@/components/ui-components"
import { ExternalLink } from "lucide-react"

const traces = [
  {
    id: "tr-a7f3c2d1",
    workflow: "spec-20240614-a7f3",
    contract: "Razorpay_Vendor_Agreement.pdf",
    spans: 12,
    duration: "1736ms",
    status: "complete" as const,
    timestamp: "14 Jun, 2:41 PM",
  },
  {
    id: "tr-b2c1d3e4",
    workflow: "spec-20240613-b2c1",
    contract: "PhonePe_NDA_Draft.pdf",
    spans: 8,
    duration: "—",
    status: "running" as const,
    timestamp: "13 Jun, 11:20 AM",
  },
  {
    id: "tr-d4e5f6g7",
    workflow: "spec-20240612-d4e5",
    contract: "Paytm_DPA.pdf",
    spans: 10,
    duration: "1452ms",
    status: "complete" as const,
    timestamp: "12 Jun, 4:15 PM",
  },
  {
    id: "tr-f6g7h8i9",
    workflow: "spec-20240611-f6g7",
    contract: "HDFC_Cloud_SLA.pdf",
    spans: 7,
    duration: "892ms",
    status: "complete" as const,
    timestamp: "11 Jun, 9:00 AM",
  },
  {
    id: "tr-h8i9j0k1",
    workflow: "spec-20240610-h8i9",
    contract: "Flipkart_Logistics.pdf",
    spans: 14,
    duration: "2103ms",
    status: "complete" as const,
    timestamp: "10 Jun, 2:30 PM",
  },
  {
    id: "tr-j0k1l2m3",
    workflow: "spec-20240609-j0k1",
    contract: "Ola_Partnership.pdf",
    spans: 9,
    duration: "1234ms",
    status: "complete" as const,
    timestamp: "9 Jun, 3:45 PM",
  },
]

export default function TracesPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[248px] p-8">
        <TopBar
          title="Omium Traces"
          subtitle="Distributed tracing for all workflow executions"
          action={
            <Button variant="secondary" className="flex items-center gap-2">
              Open Omium Dashboard <ExternalLink className="w-3 h-3" />
            </Button>
          }
        />

        <div className="grid grid-cols-4 gap-4 mb-6">
          <GlassCard className="p-4">
            <span className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] block">Total Traces</span>
            <p className="text-[28px] font-semibold text-[#F9FAFB] mt-1">127</p>
          </GlassCard>
          <GlassCard className="p-4">
            <span className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] block">Avg Duration</span>
            <p className="text-[28px] font-semibold text-[#F9FAFB] mt-1">1.4s</p>
          </GlassCard>
          <GlassCard className="p-4">
            <span className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] block">Total Spans</span>
            <p className="text-[28px] font-semibold text-[#F9FAFB] mt-1">1,847</p>
          </GlassCard>
          <GlassCard className="p-4">
            <span className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] block">Error Rate</span>
            <p className="text-[28px] font-semibold text-[#10B981] mt-1">0.2%</p>
          </GlassCard>
        </div>

        <GlassCard className="p-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
            <h3 className="text-[14px] font-medium text-[#F9FAFB]">Recent Traces</h3>
            <span className="text-[12px] text-[#4B5563]">Last 24 hours</span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Trace ID</th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Workflow</th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Contract</th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Spans</th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Duration</th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Status</th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {traces.map((trace) => (
                <tr
                  key={trace.id}
                  className="border-b border-[rgba(255,255,255,0.06)] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-mono text-[#8B5CF6]">{trace.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-mono text-[#9CA3AF]">{trace.workflow}</span>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-[#F9FAFB]">{trace.contract}</td>
                  <td className="px-4 py-4 text-[13px] text-[#F9FAFB]">{trace.spans}</td>
                  <td className="px-4 py-4 text-[12px] font-mono text-[#9CA3AF]">{trace.duration}</td>
                  <td className="px-4 py-4">
                    <Badge variant={trace.status}>{trace.status}</Badge>
                  </td>
                  <td className="px-4 py-4 text-[12px] text-[#4B5563]">{trace.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </main>
    </div>
  )
}
