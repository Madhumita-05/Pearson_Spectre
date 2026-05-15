"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { GlassCard, Badge, Button } from "@/components/ui-components"
import { Check, X, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import Link from "next/link"

interface TimelineStep {
  id: number
  name: string
  status: "complete" | "running" | "pending" | "failed" | "skipped"
  duration?: string
  tool?: string
  confidence?: number
  logs?: string[]
  badge?: string
}

const initialSteps: TimelineStep[] = [
  { id: 1, name: "Webhook Triggered", status: "complete", duration: "0ms", tool: "Google Drive webhook" },
  { id: 2, name: "Extraction Agent", status: "complete", duration: "312ms", tool: "pdfplumber · claude-sonnet-4-5", confidence: 0.94, logs: ["Extracted 14 clauses from PDF", "Identified 3 data processing sections", "Found 2 liability clauses"] },
  { id: 3, name: "Research Agent", status: "complete", duration: "445ms", tool: "tavily-search · 3 regulation docs", logs: ["Searched DPDP Act 2023 database", "Cross-referenced GDPR Art. 28", "Found RBI data localisation guidelines"] },
  { id: 4, name: "Risk Classifier", status: "complete", duration: "389ms", tool: "claude-sonnet-4-5", confidence: 0.94, logs: ["Classified 14 clauses", "Identified 2 high-risk violations", "Generated risk score: 7.2/10"] },
  { id: 5, name: "Reflection Retry", status: "complete", duration: "102ms", tool: "1 retry · §8(5) re-fetched", badge: "1 retry" },
  { id: 6, name: "Redline Agent", status: "complete", duration: "287ms", tool: "claude-sonnet-4-5 · 2 rewrites", logs: ["Generated redline for Clause 14.3", "Generated redline for Clause 19.1"] },
  { id: 7, name: "Reporter Agent", status: "complete", duration: "201ms", tool: "PyGithub + Slack webhook" },
  { id: 8, name: "GitHub PR Opened", status: "complete", tool: "PR #47 · label: HIGH RISK" },
  { id: 9, name: "Slack Notification", status: "complete", tool: "#legal-alerts channel" },
  { id: 10, name: "Workflow Complete", status: "complete", duration: "1m 47s" },
]

const agents = [
  { name: "Extraction Agent", status: "COMPLETE" },
  { name: "Research Agent", status: "COMPLETE" },
  { name: "Risk Classifier", status: "COMPLETE" },
  { name: "Reflection Retry", status: "1 retry" },
  { name: "Redline Agent", status: "COMPLETE" },
  { name: "Reporter Agent", status: "COMPLETE" },
]

const traceTree = [
  { name: "spectre.workflow", duration: "1736ms", level: 0, status: "complete" as const },
  { name: "extraction.agent", duration: "312ms", level: 1, status: "complete" as const },
  { name: "pdfplumber.run", duration: "298ms", level: 2, status: "complete" as const },
  { name: "research.agent", duration: "445ms", level: 1, status: "complete" as const },
  { name: "web.search", duration: "210ms", level: 2, status: "complete" as const },
  { name: "claude.invoke", duration: "231ms", level: 2, status: "complete" as const },
  { name: "classifier.agent", duration: "389ms", level: 1, status: "complete" as const },
  { name: "claude.invoke", duration: "287ms", level: 2, status: "complete" as const },
  { name: "reflection.retry", duration: "102ms", level: 2, status: "complete" as const },
  { name: "redline.agent", duration: "287ms", level: 1, status: "complete" as const },
  { name: "reporter.agent", duration: "201ms", level: 1, status: "complete" as const },
]

export default function WorkflowDetailPage() {
  const [expandedLogs, setExpandedLogs] = useState<number[]>([])
  const [runtime, setRuntime] = useState("1m 47s")

  useEffect(() => {
    // Workflow is complete, no need to update runtime
  }, [])

  const toggleLogs = (id: number) => {
    setExpandedLogs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const getStepIcon = (status: TimelineStep["status"]) => {
    switch (status) {
      case "complete":
        return (
          <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        )
      case "running":
        return (
          <div className="w-6 h-6 rounded-full border-2 border-[#8B5CF6] flex items-center justify-center animate-spin-slow">
            <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
          </div>
        )
      case "pending":
        return <div className="w-6 h-6 rounded-full border border-[rgba(255,255,255,0.1)]" />
      case "failed":
        return (
          <div className="w-6 h-6 rounded-full bg-[#EF4444] flex items-center justify-center">
            <X className="w-3 h-3 text-white" />
          </div>
        )
      case "skipped":
        return <div className="w-6 h-6 rounded-full border border-dashed border-[rgba(255,255,255,0.15)]" />
    }
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[248px] p-8">
        {/* Top Bar */}
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[16px] font-mono text-[#F9FAFB]">spec-20240614-a7f3</h1>
              <p className="text-[13px] text-[#4B5563] mt-0.5">
                <Link href="/workflows" className="hover:text-[#8B5CF6]">Workflows</Link>
                {" → "}Razorpay_Vendor_Agreement_Q2_2024.pdf
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="complete">COMPLETE</Badge>
              <span className="text-[13px] font-mono text-[#9CA3AF]">{runtime}</span>
            </div>
          </div>
          <div className="h-px bg-[rgba(255,255,255,0.06)] mt-4" />
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-[220px_1fr_300px] gap-6">
          {/* Left Column - Metadata */}
          <div className="space-y-4">
            <GlassCard className="p-4">
              <span className="text-[10px] uppercase tracking-[0.08em] text-[#6B7280] block mb-3">WORKFLOW</span>
              <div className="space-y-2.5">
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#6B7280]">Contract</span>
                  <span className="text-[#F9FAFB] truncate ml-2 max-w-[100px]" title="vendor_nda_v2.pdf">vendor_nda_v2.pdf</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#6B7280]">Trigger</span>
                  <span className="text-[#F9FAFB]">Webhook · Drive</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#6B7280]">Started</span>
                  <span className="text-[#F9FAFB]">14 Jun, 2:41 PM</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#6B7280]">Runtime</span>
                  <span className="text-[#F9FAFB]">{runtime}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#6B7280]">Risk Score</span>
                  <span className="text-[#F59E0B]">7.2 / 10</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#6B7280]">Violations</span>
                  <span className="text-[#EF4444]">2 found</span>
                </div>
              </div>

              <div className="h-px bg-[rgba(255,255,255,0.06)] my-4" />

              <span className="text-[10px] uppercase tracking-[0.08em] text-[#6B7280] block mb-3">AGENTS USED</span>
              <div className="space-y-1.5">
                {agents.map((agent) => (
                  <div key={agent.name} className="flex justify-between items-center text-[12px] font-mono py-1 px-2 bg-[rgba(255,255,255,0.02)] rounded">
                    <span className="text-[#9CA3AF]">{agent.name}</span>
                    <Badge variant={agent.status === "COMPLETE" ? "complete" : "high"} className="text-[8px]">
                      {agent.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="h-px bg-[rgba(255,255,255,0.06)] my-4" />

              <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                View in Omium <ExternalLink className="w-3 h-3" />
              </Button>
            </GlassCard>
          </div>

          {/* Center Column - Timeline */}
          <GlassCard className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-[14px] font-medium text-[#F9FAFB]">Execution Timeline</h3>
              <span className="text-[10px] px-1.5 py-0.5 bg-[rgba(16,185,129,0.12)] text-[#10B981] rounded">Complete</span>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-3 bottom-3 w-px bg-[rgba(255,255,255,0.1)]" />

              <div className="space-y-0">
                {initialSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`relative flex gap-4 py-3 ${
                      step.status === "running"
                        ? "bg-[rgba(139,92,246,0.04)] border-l-2 border-[#8B5CF6] -ml-0.5 pl-0.5"
                        : ""
                    }`}
                  >
                    <div className="relative z-10">{getStepIcon(step.status)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-medium text-[#F9FAFB]">{step.name}</span>
                          {step.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-[rgba(245,158,11,0.12)] text-[#F59E0B] rounded">
                              {step.badge}
                            </span>
                          )}
                        </div>
                        {step.duration && (
                          <span className="text-[11px] font-mono text-[#4B5563]">{step.duration}</span>
                        )}
                      </div>
                      {step.tool && (
                        <p className="text-[11px] font-mono text-[#4B5563] mt-0.5">{step.tool}</p>
                      )}
                      {step.confidence && (
                        <span className="inline-block mt-1.5 text-[10px] px-1.5 py-0.5 bg-[rgba(16,185,129,0.12)] text-[#10B981] rounded">
                          Confidence {step.confidence}
                        </span>
                      )}
                      {step.logs && step.logs.length > 0 && (
                        <div className="mt-2">
                          <button
                            onClick={() => toggleLogs(step.id)}
                            className="text-[11px] text-[#4B5563] hover:text-[#9CA3AF] flex items-center gap-1"
                          >
                            Logs {expandedLogs.includes(step.id) ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                          {expandedLogs.includes(step.id) && (
                            <div className="mt-2 p-2 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.06)] rounded text-[11px] font-mono text-[#9CA3AF] space-y-1">
                              {step.logs.map((log, i) => (
                                <p key={i}>{log}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Right Column - Omium Trace */}
          <GlassCard className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-medium text-[#F9FAFB]">Omium Trace</h3>
              <span className="text-[11px] font-mono text-[#4B5563]">tr-a7f3c2d1</span>
            </div>

            <div className="font-mono text-[11px] space-y-1">
              {traceTree.map((node, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-1 px-2 hover:bg-[rgba(255,255,255,0.03)] rounded cursor-pointer"
                  style={{ paddingLeft: `${8 + node.level * 16}px` }}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${node.status === "complete" ? "bg-[#10B981]" : node.status === "running" ? "bg-[#8B5CF6]" : "bg-[#4B5563]"}`} />
                    <span className="text-[#9CA3AF]">{node.name}</span>
                  </div>
                  <span className="text-[#4B5563]">{node.duration}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-[rgba(255,255,255,0.06)] my-4" />

            <div className="grid grid-cols-2 gap-3 text-[12px]">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Total spans</span>
                <span className="text-[#F9FAFB]">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Retries</span>
                <span className="text-[#F9FAFB]">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Deepest level</span>
                <span className="text-[#F9FAFB]">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Longest span</span>
                <span className="text-[#F9FAFB]">445ms</span>
              </div>
            </div>

            <Button variant="secondary" className="w-full mt-4 flex items-center justify-center gap-2">
              Open in Omium <ExternalLink className="w-3 h-3" />
            </Button>
          </GlassCard>
        </div>
      </main>
    </div>
  )
}
