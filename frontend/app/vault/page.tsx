import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { GlassCard, Badge, Button } from "@/components/ui-components"

const contracts = [
  { name: "Razorpay_Vendor_Agreement_Q2_2024.pdf", uploaded: "14 Jun 2024", status: "analyzed" as const, risk: "7.2", violations: 2 },
  { name: "PhonePe_NDA_Draft_v3.pdf", uploaded: "13 Jun 2024", status: "analyzing" as const, risk: "—", violations: 0 },
  { name: "Paytm_Data_Processing_Agreement.pdf", uploaded: "12 Jun 2024", status: "analyzed" as const, risk: "5.8", violations: 1 },
  { name: "HDFC_Cloud_Services_SLA.pdf", uploaded: "11 Jun 2024", status: "analyzed" as const, risk: "3.2", violations: 0 },
  { name: "Flipkart_Logistics_Contract.pdf", uploaded: "10 Jun 2024", status: "analyzed" as const, risk: "6.9", violations: 2 },
  { name: "Ola_Driver_Partnership_Agreement.pdf", uploaded: "9 Jun 2024", status: "analyzed" as const, risk: "4.5", violations: 1 },
  { name: "Swiggy_Delivery_Partner_Contract.pdf", uploaded: "8 Jun 2024", status: "analyzed" as const, risk: "2.8", violations: 0 },
  { name: "Zomato_Restaurant_Agreement.pdf", uploaded: "7 Jun 2024", status: "analyzed" as const, risk: "5.1", violations: 1 },
  { name: "Amazon_Seller_Agreement_India.pdf", uploaded: "6 Jun 2024", status: "analyzed" as const, risk: "4.2", violations: 1 },
  { name: "Myntra_Brand_Partnership.pdf", uploaded: "5 Jun 2024", status: "analyzed" as const, risk: "3.8", violations: 0 },
]

export default function VaultPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[248px] p-8">
        <TopBar
          title="Contract Vault"
          subtitle="All uploaded contracts and their compliance status"
          action={<Button>Upload Contract</Button>}
        />

        <GlassCard className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Contract Name</th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Uploaded</th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Status</th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Risk Score</th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Violations</th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr
                  key={contract.name}
                  className="border-b border-[rgba(255,255,255,0.06)] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-4">
                    <span className="text-[13px] text-[#F9FAFB]">{contract.name}</span>
                  </td>
                  <td className="px-4 py-4 text-[12px] text-[#4B5563]">{contract.uploaded}</td>
                  <td className="px-4 py-4">
                    <Badge variant={contract.status === "analyzed" ? "complete" : "running"}>
                      {contract.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-[13px] ${contract.risk !== "—" ? "text-[#F59E0B]" : "text-[#4B5563]"}`}>
                      {contract.risk}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-[13px] ${contract.violations > 0 ? "text-[#EF4444]" : "text-[#10B981]"}`}>
                      {contract.violations}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-[12px] text-[#8B5CF6] hover:text-[#A78BFA]">View Analysis →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </main>
    </div>
  )
}
