"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { GlassCard, Button, Badge } from "@/components/ui-components"
import { FileUp, FileText, X, Upload as UploadIcon, Zap, Play } from "lucide-react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile)
    }
  }, [])

  const recentUploads = [
    { name: "Razorpay_Vendor_Agreement_Q2_2024.pdf", uploaded: "14 Jun, 2:41 PM", status: "complete" as const, risk: "7.2" },
    { name: "PhonePe_NDA_Draft_v3.pdf", uploaded: "13 Jun, 11:20 AM", status: "running" as const, risk: "—" },
    { name: "Paytm_Data_Processing_Agreement.pdf", uploaded: "12 Jun, 4:15 PM", status: "complete" as const, risk: "5.8" },
    { name: "HDFC_Cloud_Services_SLA.pdf", uploaded: "11 Jun, 9:00 AM", status: "complete" as const, risk: "3.2" },
    { name: "Flipkart_Logistics_Contract.pdf", uploaded: "10 Jun, 2:30 PM", status: "complete" as const, risk: "6.9" },
  ]

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[248px] p-8">
        <div className="max-w-[680px] mx-auto">
          <TopBar
            title="Upload Contract"
            subtitle="Spectre will analyze your PDF against DPDP Act 2023, GDPR, and RBI data localisation guidelines."
          />

          {/* Upload Zone */}
          <GlassCard className="p-0 mb-4">
            <div
              className={`min-h-[220px] flex flex-col items-center justify-center p-8 border border-dashed rounded-xl m-1 transition-colors ${
                isDragOver
                  ? "border-[#8B5CF6] bg-[rgba(139,92,246,0.06)]"
                  : file
                  ? "border-[rgba(16,185,129,0.4)]"
                  : "border-[rgba(139,92,246,0.4)]"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!file ? (
                <>
                  <FileUp className={`w-8 h-8 mb-3 ${isDragOver ? "text-[#A78BFA]" : "text-[#8B5CF6]"}`} />
                  <p className="text-[15px] text-[#F9FAFB] mb-1">Drop your contract PDF here</p>
                  <label className="text-[13px] text-[#4B5563] hover:underline cursor-pointer">
                    or click to browse files
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                  <p className="text-[11px] text-[#4B5563] mt-2">PDF only · max 10MB</p>
                </>
              ) : (
                <>
                  <FileText className="w-8 h-8 mb-3 text-[#10B981]" />
                  <p className="text-[14px] text-[#F9FAFB] truncate max-w-full">{file.name}</p>
                  <p className="text-[12px] text-[#4B5563] mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <Button className="w-full max-w-[280px]">Start Analysis</Button>
                  <button
                    onClick={() => setFile(null)}
                    className="text-[12px] text-[#EF4444] mt-3 hover:underline flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Remove
                  </button>
                </>
              )}
            </div>
          </GlassCard>

          {/* Alternative Import Row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <UploadIcon className="w-4 h-4" /> Google Drive
            </Button>
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> DocuSign Webhook
            </Button>
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> Load Demo Contract
            </Button>
          </div>

          {/* Regulations Card */}
          <GlassCard className="p-4 mb-4">
            <span className="text-[10px] uppercase tracking-[0.08em] text-[#6B7280] block mb-2">ANALYZED AGAINST</span>
            <div className="flex gap-2">
              <span className="text-[11px] px-2 py-1 bg-[rgba(20,184,166,0.1)] text-[#14B8A6] border border-[rgba(20,184,166,0.25)] rounded">
                DPDP Act 2023
              </span>
              <span className="text-[11px] px-2 py-1 bg-[rgba(59,130,246,0.1)] text-[#3B82F6] border border-[rgba(59,130,246,0.25)] rounded">
                GDPR
              </span>
              <span className="text-[11px] px-2 py-1 bg-[rgba(245,158,11,0.1)] text-[#F59E0B] border border-[rgba(245,158,11,0.25)] rounded">
                RBI Guidelines
              </span>
            </div>
          </GlassCard>

          {/* Recent Uploads */}
          <GlassCard className="p-0">
            <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <h3 className="text-[14px] font-medium text-[#F9FAFB]">Recent Uploads</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Filename</th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Uploaded</th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Status</th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium text-left px-4 py-2">Risk</th>
                </tr>
              </thead>
              <tbody>
                {recentUploads.map((upload) => (
                  <tr key={upload.name} className="border-b border-[rgba(255,255,255,0.06)] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] cursor-pointer">
                    <td className="px-4 py-3 text-[13px] text-[#F9FAFB] truncate max-w-[200px]">{upload.name}</td>
                    <td className="px-4 py-3 text-[12px] text-[#4B5563]">{upload.uploaded}</td>
                    <td className="px-4 py-3">
                      <Badge variant={upload.status}>{upload.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#F59E0B]">{upload.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      </main>
    </div>
  )
}
