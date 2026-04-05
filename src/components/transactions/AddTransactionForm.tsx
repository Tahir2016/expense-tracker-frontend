"use client"
import API from '@/lib/api';
import React, { useEffect, useState } from 'react'

const AddTransactionForm = ({ refresh, editData, onCancelEdit, formId }: any) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("cash");

  const isEditing = !!editData;

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setAmount(String(editData.amount || ""));
      setType(editData.type || "expense");
      setCategory(editData.category || "cash");
    } else {
      setTitle("");
      setAmount("");
      setType("expense");
      setCategory("cash");
    }
  }, [editData]);

  const handleSubmit = async () => {
    if (!title || !amount) return;

    if (isEditing) {
      await API.put(`/tracker/update/${editData.id}`, {
        title,
        amount: Number(amount),
        type,
        category,
      });
      onCancelEdit();
    } else {
      await API.post("/tracker/add", {
        title,
        amount: Number(amount),
        type,
        category,
      });
      setTitle("");
      setAmount("");
      setType("expense");
      setCategory("cash");
    }
    refresh();
  }

  return (
    <div id={formId} className="bg-slate-900 border border-white/5 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-300">
          {isEditing ? "Update Transaction" : "Add Transaction"}
        </h2>
        {isEditing && (
          <button onClick={onCancelEdit} className="text-xs text-slate-500 hover:text-white transition px-2 py-1 rounded-lg hover:bg-white/5">
            Cancel
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Type toggle */}
        <div className="flex rounded-xl overflow-hidden border border-white/10">
          <button
            onClick={() => setType("expense")}
            className={`flex-1 py-2.5 text-sm font-medium transition ${type === "expense" ? "bg-red-500/20 text-red-400" : "text-slate-500 hover:text-white"}`}
          >
            Expense
          </button>
          <button
            onClick={() => setType("income")}
            className={`flex-1 py-2.5 text-sm font-medium transition ${type === "income" ? "bg-emerald-500/20 text-emerald-400" : "text-slate-500 hover:text-white"}`}
          >
            Income
          </button>
        </div>

        {/* Category */}
        <div className="flex rounded-xl overflow-hidden border border-white/10">
          <button
            onClick={() => setCategory("cash")}
            className={`flex-1 py-2.5 text-sm font-medium transition flex items-center justify-center gap-1.5 ${category === "cash" ? "bg-amber-500/20 text-amber-400" : "text-slate-500 hover:text-white"}`}
          >
            💵 Cash
          </button>
          <button
            onClick={() => setCategory("online")}
            className={`flex-1 py-2.5 text-sm font-medium transition flex items-center justify-center gap-1.5 ${category === "online" ? "bg-blue-500/20 text-blue-400" : "text-slate-500 hover:text-white"}`}
          >
            💳 Online
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-3 w-full py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:opacity-80 hover:scale-[1.01]"
        style={{ background: isEditing ? "linear-gradient(to right, #0ea5e9, #6366f1)" : "linear-gradient(to right, #9333ea, #4f46e5)" }}
      >
        {isEditing ? "Update Transaction" : "+ Add Transaction"}
      </button>
    </div>
  )
}

export default AddTransactionForm
