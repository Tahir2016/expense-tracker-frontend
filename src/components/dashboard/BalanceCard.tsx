import React from 'react'

const BalanceCard = ({ balance }: { balance: number }) => {
  return (
    <div
      className="rounded-2xl p-6 text-white relative overflow-hidden cursor-default group transition-all duration-300 hover:scale-[1.01]"
      style={{
        background: "linear-gradient(135deg, #4f46e5, #7c3aed, #a855f7)",
        boxShadow: "0 8px 40px rgba(124,58,237,0.4)"
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ background: "#fff" }} />
      <div className="absolute -bottom-10 -left-6 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ background: "#fff" }} />
      <div className="absolute top-1/2 right-16 w-16 h-16 rounded-full opacity-5" style={{ background: "#fff" }} />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <p className="text-sm text-indigo-200 font-medium">Total Balance</p>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">₹ {balance.toLocaleString()}</h1>
      </div>
    </div>
  )
}

export default BalanceCard
