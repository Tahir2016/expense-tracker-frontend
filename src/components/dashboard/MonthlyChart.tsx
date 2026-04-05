"use client"
import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const MonthlyChart = ({ data }: any) => {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-slate-300 mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", color: "#fff" }} />
          <Line type="monotone" dataKey="amount" stroke="#a855f7" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyChart
