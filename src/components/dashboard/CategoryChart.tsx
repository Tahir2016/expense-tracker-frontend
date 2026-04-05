"use client"
import React from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts'

const COLORS = ["#a855f7", "#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"]

const CategoryChart = ({ data }: any) => {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-slate-300 mb-4">Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={80} strokeWidth={0}>
            {data.map((_: any, index: number) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", color: "#fff" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CategoryChart
