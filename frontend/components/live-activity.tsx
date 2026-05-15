"use client"

import { useEffect, useState } from "react"
import { GlassCard } from "./ui-components"

interface ActivityEvent {
  id: string
  type: "webhook.fired" | "agent.started" | "agent.complete" | "classifier.retry" | "pr.opened" | "slack.sent" | "error"
  description: string
  source: string
  time: string
}

const initialEvents: ActivityEvent[] = [
  { id: "1", type: "agent.complete", description: "Reporter Agent completed", source: "spec-20240614-a7f3", time: "1m ago" },
  { id: "2", type: "pr.opened", description: "PR #47 opened on GitHub", source: "razorpay-vendor-contract", time: "2m ago" },
  { id: "3", type: "slack.sent", description: "Alert sent to #legal-alerts", source: "Slack webhook", time: "2m ago" },
  { id: "4", type: "classifier.retry", description: "Reflection retry triggered", source: "Risk Classifier · spec-20240614-a7f3", time: "4m ago" },
  { id: "5", type: "agent.started", description: "Extraction Agent started", source: "spec-20240613-b2c1", time: "5m ago" },
  { id: "6", type: "webhook.fired", description: "Drive webhook received", source: "PhonePe_NDA_Draft_v3.pdf", time: "5m ago" },
  { id: "7", type: "agent.complete", description: "Redline Agent completed", source: "spec-20240614-a7f3", time: "8m ago" },
  { id: "8", type: "agent.complete", description: "Research Agent completed", source: "spec-20240614-a7f3", time: "12m ago" },
]

const dotColors = {
  "webhook.fired": "bg-[#3B82F6]",
  "agent.started": "bg-[#8B5CF6]",
  "agent.complete": "bg-[#10B981]",
  "classifier.retry": "bg-[#F59E0B]",
  "pr.opened": "bg-[#10B981]",
  "slack.sent": "bg-[#10B981]",
  "error": "bg-[#EF4444]",
}

export function LiveActivity() {
  const [events, setEvents] = useState<ActivityEvent[]>(initialEvents)

  useEffect(() => {
    // Simulate new events coming in
    const interval = setInterval(() => {
      const newEventTypes: ActivityEvent["type"][] = ["agent.started", "agent.complete", "webhook.fired"]
      const randomType = newEventTypes[Math.floor(Math.random() * newEventTypes.length)]
      const newEvent: ActivityEvent = {
        id: Date.now().toString(),
        type: randomType,
        description: randomType === "agent.complete" 
          ? "Agent task completed" 
          : randomType === "agent.started" 
          ? "Agent processing started"
          : "Webhook received",
        source: `spec-${Date.now().toString().slice(-8)}`,
        time: "just now",
      }
      setEvents((prev) => [newEvent, ...prev.slice(0, 9)])
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <GlassCard className="p-0">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <h3 className="text-[14px] font-medium text-[#F9FAFB]">Live Activity</h3>
        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-dot" />
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="flex items-start gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors border-b border-[rgba(255,255,255,0.06)] last:border-b-0"
            style={{ opacity: index === 0 ? 1 : undefined, transition: "opacity 200ms" }}
          >
            <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColors[event.type]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-[#F9FAFB]">{event.description}</p>
              <p className="text-[11px] text-[#4B5563] truncate">{event.source}</p>
            </div>
            <span className="text-[11px] text-[#4B5563] whitespace-nowrap shrink-0">{event.time}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
