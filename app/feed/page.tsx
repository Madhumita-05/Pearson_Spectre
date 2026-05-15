import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { GlassCard, Button } from "@/components/ui-components"
import Link from "next/link"

const feedItems = [
  {
    id: 1,
    source: "DPDP" as const,
    headline: "DPDP Act 2023 Amendment - Enhanced Data Breach Notification Requirements",
    summary: "The Digital Personal Data Protection Act now requires mandatory breach notification within 72 hours, aligning with GDPR standards.",
    date: "14 Jun 2024",
    triggered: "12 contracts rescanned",
  },
  {
    id: 2,
    source: "RBI" as const,
    headline: "RBI Updates Data Localisation Guidelines for Payment Aggregators",
    summary: "New circular mandates all payment data to be stored within Indian servers with enhanced audit requirements.",
    date: "13 Jun 2024",
    triggered: "8 contracts rescanned",
  },
  {
    id: 3,
    source: "GDPR" as const,
    headline: "EDPB Guidelines on AI and Automated Decision-Making",
    summary: "New guidelines clarify obligations for companies using AI for profiling and automated decisions affecting data subjects.",
    date: "12 Jun 2024",
    triggered: null,
  },
  {
    id: 4,
    source: "DPDP" as const,
    headline: "Data Protection Board Establishes First Enforcement Framework",
    summary: "India's Data Protection Board releases procedural guidelines for handling complaints and imposing penalties.",
    date: "10 Jun 2024",
    triggered: "15 contracts rescanned",
  },
  {
    id: 5,
    source: "RBI" as const,
    headline: "KYC Compliance Updates for Digital Lending Platforms",
    summary: "Revised KYC norms for fintech companies with stricter customer verification requirements.",
    date: "8 Jun 2024",
    triggered: null,
  },
  {
    id: 6,
    source: "GDPR" as const,
    headline: "Max Schrems III - New Ruling on US Data Transfers",
    summary: "European Court clarifies adequacy decisions post-DPF framework implementation.",
    date: "5 Jun 2024",
    triggered: "6 contracts rescanned",
  },
  {
    id: 7,
    source: "DPDP" as const,
    headline: "Consent Manager Registration Requirements Released",
    summary: "MeitY publishes technical specifications for registered consent manager platforms.",
    date: "3 Jun 2024",
    triggered: null,
  },
  {
    id: 8,
    source: "RBI" as const,
    headline: "Third-Party API Access Standards for Account Aggregators",
    summary: "New security standards for financial data sharing via account aggregator framework.",
    date: "1 Jun 2024",
    triggered: "4 contracts rescanned",
  },
]

const sourceColors = {
  DPDP: { bg: "bg-[rgba(20,184,166,0.1)]", text: "text-[#14B8A6]", border: "border-[rgba(20,184,166,0.25)]" },
  GDPR: { bg: "bg-[rgba(59,130,246,0.1)]", text: "text-[#3B82F6]", border: "border-[rgba(59,130,246,0.25)]" },
  RBI: { bg: "bg-[rgba(245,158,11,0.1)]", text: "text-[#F59E0B]", border: "border-[rgba(245,158,11,0.25)]" },
}

const affectedContracts = [
  { name: "Razorpay_Vendor_Agreement.pdf", delta: "↑ HIGH" },
  { name: "PhonePe_NDA_Draft.pdf", delta: "↑ MEDIUM" },
  { name: "Paytm_DPA.pdf", delta: "↑ HIGH" },
  { name: "HDFC_Cloud_SLA.pdf", delta: "→ LOW" },
]

export default function FeedPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[248px] p-8">
        <TopBar
          title="Regulation Feed"
          subtitle="Live regulatory intelligence — DPDP, GDPR, RBI"
        />

        <div className="grid grid-cols-[60fr_40fr] gap-6">
          {/* Left - Feed */}
          <GlassCard className="p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <h3 className="text-[14px] font-medium text-[#F9FAFB]">Latest Updates</h3>
              <span className="text-[12px] text-[#4B5563]">Auto-refresh every 6h</span>
            </div>
            <div>
              {feedItems.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-4 border-b border-[rgba(255,255,255,0.06)] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${sourceColors[item.source].bg} ${sourceColors[item.source].text} ${sourceColors[item.source].border}`}>
                      {item.source}
                    </span>
                    <span className="text-[11px] text-[#4B5563]">{item.date}</span>
                  </div>
                  <h4 className="text-[14px] font-medium text-[#F9FAFB] mb-1">{item.headline}</h4>
                  <div className="flex items-end justify-between">
                    <p className="text-[12px] text-[#4B5563] line-clamp-2 flex-1">{item.summary}</p>
                    {item.triggered && (
                      <span className="text-[10px] px-2 py-0.5 bg-[rgba(16,185,129,0.12)] text-[#10B981] rounded ml-2 whitespace-nowrap shrink-0">
                        ↻ {item.triggered}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Right - Impact Panel */}
          <div className="space-y-4">
            <GlassCard className="p-4">
              <h3 className="text-[14px] font-medium text-[#F9FAFB] mb-4">Impact Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-[rgba(255,255,255,0.06)]">
                  <span className="text-[12px] text-[#6B7280]">Regulations Tracked</span>
                  <span className="text-[13px] text-[#F9FAFB]">3</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[rgba(255,255,255,0.06)]">
                  <span className="text-[12px] text-[#6B7280]">Last Update</span>
                  <span className="text-[13px] text-[#F9FAFB]">2h ago</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[rgba(255,255,255,0.06)]">
                  <span className="text-[12px] text-[#6B7280]">Total Rescans</span>
                  <span className="text-[13px] text-[#F9FAFB]">47</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[12px] text-[#6B7280]">New Violations Found</span>
                  <span className="text-[13px] text-[#EF4444]">2</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <div className="mb-4">
                <h3 className="text-[14px] font-medium text-[#F9FAFB]">Affected Contracts</h3>
                <p className="text-[11px] text-[#4B5563]">Latest DPDP update</p>
              </div>
              <div className="space-y-0">
                {affectedContracts.map((contract) => (
                  <div
                    key={contract.name}
                    className="flex justify-between items-center py-2.5 border-b border-[rgba(255,255,255,0.06)] last:border-b-0"
                  >
                    <span className="text-[13px] text-[#F9FAFB] truncate">{contract.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      contract.delta.includes("HIGH")
                        ? "bg-[rgba(245,158,11,0.12)] text-[#F59E0B]"
                        : contract.delta.includes("MEDIUM")
                        ? "bg-[rgba(234,179,8,0.12)] text-[#EAB308]"
                        : "bg-[rgba(16,185,129,0.12)] text-[#10B981]"
                    }`}>
                      {contract.delta}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/vault" className="text-[12px] text-[#8B5CF6] hover:text-[#A78BFA] block mt-4">
                View all affected →
              </Link>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  )
}
