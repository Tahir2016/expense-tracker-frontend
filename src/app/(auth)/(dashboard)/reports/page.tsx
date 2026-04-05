"use client"
import API from "@/lib/api"
import React, { useEffect, useState } from "react"

const TABS = ["Monthly", "Quarterly", "Yearly"]
const QUARTERS = ["Q1", "Q2", "Q3", "Q4"]
const QUARTER_LABELS: any = { Q1: "Jan–Mar", Q2: "Apr–Jun", Q3: "Jul–Sep", Q4: "Oct–Dec" }

const SummaryCard = ({ label, value, color }: any) => (
  <div className={`rounded-2xl p-4 border bg-slate-900 ${color} flex flex-col gap-1 transition hover:scale-[1.02] hover:brightness-110 cursor-default active:scale-[1.02] active:brightness-110`}>
    <p className="text-xs text-slate-500 font-medium">{label}</p>
    <p className="text-xl font-bold text-white">₹ {value?.toLocaleString() ?? 0}</p>
  </div>
)

const TransactionTable = ({ transactions }: any) => {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const filtered = [...(transactions || [])]
    .reverse()
    .filter((tx: any) => typeFilter === "all" || tx.type === typeFilter)
    .filter((tx: any) => categoryFilter === "all" || tx.category === categoryFilter)
    .filter((tx: any) => tx.title?.toLowerCase().includes(search.toLowerCase()))
    .filter((tx: any) => {
      if (!dateFrom && !dateTo) return true
      const txDate = new Date(tx.created_at)
      if (dateFrom && txDate < new Date(dateFrom)) return false
      if (dateTo) {
        const toDate = new Date(dateTo)
        toDate.setHours(23, 59, 59, 999)
        if (txDate > toDate) return false
      }
      return true
    })

  if (!transactions?.length) return (
    <div className="flex flex-col items-center justify-center py-10 text-slate-600">
      <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p className="text-sm">No transactions found</p>
    </div>
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4 flex-wrap md:flex-nowrap shrink-0">
          <div className="relative shrink-0">
            <svg className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search title..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition" />
          </div>
          <div className="flex rounded-xl overflow-hidden border border-white/10 text-sm shrink-0">
            {["all", "income", "expense"].map((f) => (
              <button key={f} onClick={() => setTypeFilter(f)}
                className={`px-3 py-2 font-medium capitalize transition ${typeFilter === f ? "bg-purple-600/20 text-purple-400" : "text-slate-500 hover:text-white"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex rounded-xl overflow-hidden border border-white/10 text-sm shrink-0">
            {["all", "cash", "online"].map((f) => (
              <button key={f} onClick={() => setCategoryFilter(f)}
                className={`px-3 md:px-2.5 py-2 font-medium capitalize transition ${categoryFilter === f ? "bg-purple-600/20 text-purple-400" : "text-slate-500 hover:text-white"}`}>
                {f === "cash" ? "💵 Cash" : f === "online" ? "💳 Online" : "All"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-1 w-full md:w-auto mt-2 sm:mt-0">
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
            className="w-full sm:flex-1 md:flex-none md:w-auto min-w-[100px] md:min-w-[170px] bg-white/5 border border-white/10 text-slate-400 rounded-xl px-3 py-2 text-[12px] md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition" />
          <span className="text-slate-500 text-sm md:text-lg leading-normal px-6 md:px-1">to</span>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
            className="w-full sm:flex-1 md:flex-none md:w-auto min-w-[100px] md:min-w-[170px] bg-white/5 border border-white/10 text-slate-400 rounded-xl px-3 py-2 text-[12px] md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition" />
          {(dateFrom || dateTo) ? (
            <button onClick={() => { setDateFrom(""); setDateTo("") }}
              className="text-xs text-slate-500 hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/5 transition shrink-0">
              Clear
            </button>
          ) : (
            <span className="px-2 py-1.5 text-xs invisible shrink-0">Clear</span>
          )}
        </div>
      </div>

      {/* Mobile cards / Desktop table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-slate-600">
          <p className="text-sm">No transactions match the filters</p>
        </div>
      ) : (
        <>
          {/* Mobile — cards */}
          <div className="flex flex-col gap-2 md:hidden">
            {filtered.map((tx: any, i: number) => (
              <div key={tx.id || i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tx.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                    <svg className={`w-4 h-4 ${tx.type === "income" ? "text-emerald-400" : "text-red-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {tx.type === "income"
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                      }
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{tx.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded-md ${tx.category === "cash" ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-400"}`}>
                        {tx.category === "cash" ? "💵" : "💳"}
                      </span>
                      <span className="text-xs text-slate-600">
                        {tx.created_at ? new Date(tx.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "—"}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`text-sm font-semibold shrink-0 ${tx.type === "income" ? "text-emerald-400" : "text-red-400"}`}>
                  {tx.type === "income" ? "+" : "-"}₹{tx.amount?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop — table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-slate-500 font-medium py-3 px-4">Title</th>
                  <th className="text-left text-xs text-slate-500 font-medium py-3 px-4">Type</th>
                  <th className="text-left text-xs text-slate-500 font-medium py-3 px-4">Category</th>
                  <th className="text-right text-xs text-slate-500 font-medium py-3 px-4">Amount</th>
                  <th className="text-right text-xs text-slate-500 font-medium py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx: any, i: number) => (
                  <tr key={tx.id || i} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="py-3 px-4 text-white font-medium">{tx.title}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-lg font-medium ${tx.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-lg ${tx.category === "cash" ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-400"}`}>
                        {tx.category === "cash" ? "💵 Cash" : "💳 Online"}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-right font-semibold ${tx.type === "income" ? "text-emerald-400" : "text-red-400"}`}>
                      {tx.type === "income" ? "+" : "-"}₹ {tx.amount?.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500 text-xs">
                      {tx.created_at ? new Date(tx.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Monthly")
  const [data, setData] = useState<any>({})
  const [selectedPeriod, setSelectedPeriod] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "Monthly") {
          const res = await API.get("/tracker/monthly")
          setData(res.data)
          const keys = Object.keys(res.data)
          setSelectedPeriod(keys[keys.length - 1] || "")
        } else if (activeTab === "Yearly") {
          const res = await API.get("/tracker/yearly")
          setData(res.data)
          const keys = Object.keys(res.data)
          setSelectedPeriod(keys[keys.length - 1] || "")
        } else {
          const res = await API.get("/tracker/quaterly")
          setData(res.data)
          setSelectedPeriod("Q1")
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [activeTab])

  const periodData = data[selectedPeriod] || { income: 0, expense: 0, transactions: [] }
  const net = (periodData.income || 0) - (periodData.expense || 0)
  const periods = activeTab === "Quarterly" ? QUARTERS : Object.keys(data)

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white">Reports</h1>
        <p className="text-slate-500 text-sm mt-0.5">View your financial summary by period.</p>
      </div>

      {/* Tab switcher — full width on mobile */}
      <div className="flex rounded-xl overflow-hidden border border-white/10 w-full sm:w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 text-sm font-medium transition ${activeTab === tab ? "bg-purple-600/20 text-purple-400" : "text-slate-500 hover:text-white"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Period selector — scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPeriod(p)}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition shrink-0 ${selectedPeriod === p ? "bg-purple-600/20 text-purple-400 border-purple-500/30" : "border-white/10 text-slate-500 hover:text-white hover:bg-white/5"}`}
          >
            {activeTab === "Quarterly" ? `${p} (${QUARTER_LABELS[p]})` : p}
          </button>
        ))}
      </div>

      {selectedPeriod && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SummaryCard label={`Income — ${selectedPeriod}`} value={periodData.income} color="border-emerald-500/20" />
            <SummaryCard label={`Expense — ${selectedPeriod}`} value={periodData.expense} color="border-red-500/20" />
            <SummaryCard label={`Net Balance — ${selectedPeriod}`} value={net} color={net >= 0 ? "border-blue-500/20" : "border-orange-500/20"} />
          </div>

          {/* Transaction Table */}
          <div className="bg-slate-900 border border-white/5 rounded-2xl p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">
              Transactions — {selectedPeriod}
              <span className="ml-2 text-xs text-slate-600">({periodData.transactions?.length || 0} total)</span>
            </h2>
            <TransactionTable transactions={periodData.transactions} />
          </div>
        </>
      )}

      {!selectedPeriod && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-600">
          <p className="text-sm">No data available</p>
        </div>
      )}
    </div>
  )
}

export default ReportsPage
