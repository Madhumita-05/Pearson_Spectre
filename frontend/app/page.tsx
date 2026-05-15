import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { StatCard, Button } from "@/components/ui-components"
import { RecentWorkflows } from "@/components/recent-workflows"
import { LiveActivity } from "@/components/live-activity"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[248px] p-8">
        <TopBar
          title="Dashboard"
          subtitle="Autonomous contract intelligence · 3 workflows active"
          action={<Button>New Analysis</Button>}
        />

        {/* Stat Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <StatCard
            label="Contracts Analyzed"
            value={47}
            subtext="↑ 4 this week"
            subtextColor="green"
          />
          <StatCard
            label="Violations Detected"
            value={12}
            subtext="across 7 contracts"
          />
          <StatCard
            label="Active Workflows"
            value={3}
            subtext="running now"
            subtextColor="purple"
            showDot
          />
          <StatCard
            label="Autonomous Re-runs"
            value={8}
            subtext="triggered by reg. changes"
          />
          <StatCard
            label="Avg Risk Score"
            value="6.4"
            subtext="/10"
            subtextColor="amber"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-[65fr_35fr] gap-6">
          <RecentWorkflows />
          <LiveActivity />
        </div>
      </main>
    </div>
  )
}
