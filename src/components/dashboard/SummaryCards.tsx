import React from 'react'

const cards = (income: number, expense: number) => [
  {
    label: "Total Income",
    value: income,
    color: "text-emerald-400",
    glow: "rgba(16,185,129,0.15)",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/10",
    iconBg: "bg-emerald-500/20",
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
      </svg>
    ),
    trend: "+",
  },
  {
    label: "Total Expenses",
    value: expense,
    color: "text-red-400",
    glow: "rgba(239,68,68,0.15)",
    border: "border-red-500/20",
    bg: "bg-red-500/10",
    iconBg: "bg-red-500/20",
    icon: (
      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
      </svg>
    ),
    trend: "-",
  },
  {
    label: "Total Savings",
    value: income - expense,
    color: income - expense >= 0 ? "text-blue-400" : "text-orange-400",
    glow: income - expense >= 0 ? "rgba(59,130,246,0.15)" : "rgba(249,115,22,0.15)",
    border: income - expense >= 0 ? "border-blue-500/20" : "border-orange-500/20",
    bg: income - expense >= 0 ? "bg-blue-500/10" : "bg-orange-500/10",
    iconBg: income - expense >= 0 ? "bg-blue-500/20" : "bg-orange-500/20",
    icon: (
      <svg className={`w-5 h-5 ${income - expense >= 0 ? "text-blue-400" : "text-orange-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    trend: "",
  },
]

const SummaryCards = ({ income, expense }: { income: number; expense: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards(income, expense).map((card) => (
        <div
          key={card.label}
          className={`rounded-2xl p-5 border bg-slate-900 ${card.border} flex items-center gap-4 cursor-default transition-all duration-300 hover:scale-[1.02]`}
          style={{ boxShadow: `0 4px 24px ${card.glow}` }}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
            {card.icon}
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">{card.label}</p>
            <p className={`text-2xl font-bold mt-0.5 ${card.color}`}>
              ₹ {card.value.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards
