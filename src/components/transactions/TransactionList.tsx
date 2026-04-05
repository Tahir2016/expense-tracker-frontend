"use client"
import API from "@/lib/api"
import React, { useState } from "react"

const TransactionList = ({ transactions, refresh, onEdit }: any) => {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 5

  const handleDelete = async (id: string) => {
    await API.delete(`/tracker/delete/${id}`)
    refresh()
  }

  const filtered = transactions
    .slice()
    .reverse()
    .filter((tx: any) => filter === "all" || tx.type === filter)
    .filter((tx: any) =>
      tx.title?.toLowerCase().includes(search.toLowerCase()) ||
      tx.description?.toLowerCase().includes(search.toLowerCase())
    )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className="bg-slate-900 border border-white/5 rounded-2xl p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-sm font-semibold text-slate-300">All Transactions</h2>

        <div className="flex flex-wrap gap-2">
          {/* Search */}
          <div className="relative">
            <svg className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition w-40"
            />
          </div>

          {/* Filter */}
          <div className="flex rounded-xl overflow-hidden border border-white/10 text-sm">
            {["all", "income", "expense"].map((f: string) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setCurrentPage(1); }}
                className={`px-3 py-2 font-medium capitalize transition ${filter === f ? "bg-purple-600/20 text-purple-400" : "text-slate-500 hover:text-white"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-slate-600">
          <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm">No transactions found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {paginated.map((tx: any, index: number) => (
            <div key={tx._id || tx.id || index} className="flex flex-col sm:flex-row sm:items-start sm:justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition">
              <div className="flex items-start w-full min-w-0">
                <div className="flex flex-col items-start min-w-0 w-full">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tx.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                      <svg className={`w-4 h-4 ${tx.type === "income" ? "text-emerald-400" : "text-red-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {tx.type === "income"
                          ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                          : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                        }
                      </svg>
                    </div>
                    <p className="text-sm text-white font-medium break-words">{tx.title || tx.description}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 sm:hidden pr-2 min-w-0">
                    <span className="text-xs text-slate-500 capitalize">{tx.type}</span>
                    {tx.category && (
                      <span className={`flex items-center gap-1 text-xs ${tx.category === "cash" ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-400"}`}>
                        {tx.category === "cash" ? "💵 Cash" : "💳 Online"}
                      </span>
                    )}
                    {tx.created_at && (
                      <span className="text-xs text-slate-600 shrink-0">
                        {new Date(tx.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                  <div className="hidden sm:flex items-center gap-3 mt-0.5 pl-10">
                    <span className="text-xs text-slate-500 capitalize px-1.5 py-0.5 shrink-0">{tx.type}</span>
                    {tx.category && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-md shrink-0 ${tx.category === "cash" ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-400"}`}>
                        {tx.category === "cash" ? "💵 Cash" : "💳 Online"}
                      </span>
                    )}
                    {tx.created_at && (
                      <span className="text-xs text-slate-600 shrink-0">
                        {new Date(tx.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full mt-2 sm:mt-0 sm:w-auto sm:justify-start sm:shrink-0 gap-3">
                <span className={`text-sm font-semibold ${tx.type === "income" ? "text-emerald-400" : "text-red-400"}`}>
                  {tx.type === "income" ? "+" : "-"}₹ {tx.amount?.toLocaleString()}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => onEdit(tx)} className="text-slate-500 hover:text-purple-400 transition p-1.5 rounded-lg hover:bg-purple-500/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(tx.id)} className="text-slate-500 hover:text-red-400 transition p-1.5 rounded-lg hover:bg-red-500/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <p className="text-xs text-slate-500">
            {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition ${
                  currentPage === page
                    ? "bg-purple-600/30 text-purple-400 border border-purple-500/30"
                    : "text-slate-500 hover:text-white hover:bg-white/10"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionList
