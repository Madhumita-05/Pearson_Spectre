"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { GlassCard, Badge, Button } from "@/components/ui-components"

const findings = [
  {
    id: 1,
    clause: "Data Sub-Processing Rights",
    clauseRef: "Clause 14.3",
    severity: "violation" as const,
    confidence: 0.94,
    regulation: "DPDP Act 2023 · §8(5)",
    original: "Vendor may engage sub-processors at its sole discretion without prior consent of the Company.",
    proposed: "Vendor may engage sub-processors only with prior written consent of the Company, with 30 days notice and a right to object under DPDP Act §8(5).",
  },
  {
    id: 2,
    clause: "Breach Notification Timeline",
    clauseRef: "Clause 19.1",
    severity: "high" as const,
    confidence: 0.87,
    regulation: "DPDP Act 2023 · §8(6)",
    original: "Vendor shall notify Company of data breaches within a commercially reasonable timeframe.",
    proposed: "Vendor shall notify Company of personal data breaches within 72 hours of discovery, as required under DPDP Act §8(6) and aligned with GDPR Art. 33.",
  },
  {
    id: 3,
    clause: "Data Localisation",
    clauseRef: "Clause 7.2",
    severity: "high" as const,
    confidence: 0.82,
    regulation: "RBI Guidelines · §4.1",
    original: "Data may be stored in any jurisdiction deemed appropriate by the Vendor.",
    proposed: "Payment data must be stored exclusively within India. Mirror copies may be stored abroad only after 24-hour local storage, per RBI data localisation guidelines.",
  },
  {
    id: 4,
    clause: "Consent Mechanism",
    clauseRef: "Clause 5.1",
    severity: "medium" as const,
    confidence: 0.79,
    regulation: "DPDP Act 2023 · §6(1)",
    original: "User consent is implied through continued use of services.",
    proposed: "User consent must be obtained through clear, specific, and informed affirmative action as required under DPDP Act §6(1).",
  },
  {
    id: 5,
    clause: "Right to Erasure",
    clauseRef: "Clause 22.4",
    severity: "medium" as const,
    confidence: 0.76,
    regulation: "GDPR · Art. 17",
    original: "Data deletion requests will be processed within 90 days.",
    proposed: "Data deletion requests must be processed within 30 days of receipt, with provision for extension only in complex cases per GDPR Art. 17.",
  },
  {
    id: 6,
    clause: "Data Retention Period",
    clauseRef: "Clause 11.3",
    severity: "low" as const,
    confidence: 0.91,
    regulation: "DPDP Act 2023 · §8(7)",
    original: "Data will be retained indefinitely for business purposes.",
    proposed: "Data will be retained only for the period necessary to fulfill the purpose for which it was collected, with clear retention schedules per DPDP Act §8(7).",
  },
]

export default function RiskPage() {
  const [selectedFinding, setSelectedFinding] = useState(findings[0])

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[248px] p-8">
        <TopBar
          title="Risk Analysis"
          subtitle="Razorpay_Vendor_Agreement_Q2_2024.pdf"
        />

        {/* Risk Score Bar */}
        <GlassCard className="p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280]">OVERALL RISK</span>
            <span className="text-[18px] font-semibold text-[#F59E0B]">7.2 / 10</span>
          </div>
          <div className="relative h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: "72%",
                background: "linear-gradient(90deg, #10B981 0%, #F59E0B 60%, #EF4444 100%)",
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-[#4B5563]">
            <span>Low Risk</span>
            <span>Moderate</span>
            <span>High Risk</span>
          </div>
        </GlassCard>

        {/* Findings Table */}
        <GlassCard className="p-0 mb-6">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
            <h3 className="text-[14px] font-medium text-[#F9FAFB]">Compliance Findings</h3>
            <span className="text-[12px] text-[#4B5563]">{findings.length} issues found</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Clause Type</th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Severity</th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Confidence</th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Regulation</th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {findings.map((finding) => (
                  <tr
                    key={finding.id}
                    onClick={() => setSelectedFinding(finding)}
                    className={`border-b border-[rgba(255,255,255,0.06)] last:border-b-0 cursor-pointer transition-colors ${
                      selectedFinding.id === finding.id
                        ? "bg-[rgba(139,92,246,0.06)] border-l-2 border-l-[#8B5CF6]"
                        : "hover:bg-[rgba(255,255,255,0.02)]"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <p className="text-[13px] text-[#F9FAFB]">{finding.clause}</p>
                      <p className="text-[11px] text-[#4B5563]">{finding.clauseRef}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={finding.severity}>{finding.severity}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-[60px] h-1 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              finding.confidence > 0.8
                                ? "bg-[#10B981]"
                                : finding.confidence > 0.6
                                ? "bg-[#F59E0B]"
                                : "bg-[#EF4444]"
                            }`}
                            style={{ width: `${finding.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-[12px] text-[#9CA3AF]">{finding.confidence}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-[#9CA3AF]">{finding.regulation}</td>
                    <td className="px-4 py-3">
                      <button className="text-[12px] text-[#8B5CF6] hover:text-[#A78BFA]">Redline →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Diff Viewer */}
        <GlassCard className="p-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
            <div>
              <h3 className="text-[14px] font-medium text-[#F9FAFB]">Clause Redline</h3>
              <p className="text-[12px] text-[#4B5563]">{selectedFinding.clause} · {selectedFinding.clauseRef}</p>
            </div>
            <span className="text-[11px] px-2 py-1 bg-[rgba(20,184,166,0.1)] text-[#14B8A6] border border-[rgba(20,184,166,0.25)] rounded">
              {selectedFinding.regulation}
            </span>
          </div>

          <div className="grid grid-cols-2 divide-x divide-[rgba(255,255,255,0.06)]">
            <div className="p-4">
              <span className="text-[11px] uppercase text-[#EF4444] font-medium block mb-3">ORIGINAL</span>
              <p className="text-[13px] leading-7 text-[#D1D5DB]">
                <span className="bg-[rgba(239,68,68,0.15)] text-[#FCA5A5] border-b border-[rgba(239,68,68,0.3)] px-0.5">
                  {selectedFinding.original}
                </span>
              </p>
            </div>
            <div className="p-4">
              <span className="text-[11px] uppercase text-[#10B981] font-medium block mb-3">PROPOSED REWRITE</span>
              <p className="text-[13px] leading-7 text-[#D1D5DB]">
                <span className="bg-[rgba(16,185,129,0.12)] text-[#6EE7B7] border-b border-[rgba(16,185,129,0.25)] px-0.5">
                  {selectedFinding.proposed}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-[rgba(255,255,255,0.06)]">
            <p className="text-[12px] text-[#4B5563]">
              {selectedFinding.regulation.split(" · ")[0]} · Section {selectedFinding.regulation.split("§")[1] || selectedFinding.regulation.split(" · ")[1]}
            </p>
            <div className="flex items-center gap-2">
              <Button>Generate PR</Button>
              <Button variant="secondary">Export PDF</Button>
              <Button variant="secondary">Notify Legal</Button>
            </div>
          </div>
        </GlassCard>
      </main>
    </div>
  )
}
