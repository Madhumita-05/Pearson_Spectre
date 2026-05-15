interface TopBarProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function TopBar({ title, subtitle, action }: TopBarProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[18px] font-medium text-[#F9FAFB]">{title}</h1>
          {subtitle && <p className="text-[13px] text-[#4B5563] mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="h-px bg-[rgba(255,255,255,0.06)] mt-4" />
    </div>
  )
}
