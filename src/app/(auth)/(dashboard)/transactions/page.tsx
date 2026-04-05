"use client"
import AddTransactionForm from '@/components/transactions/AddTransactionForm';
import TransactionList from '@/components/transactions/TransactionList';
import API from '@/lib/api';
import React, { useEffect, useState } from 'react'

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await API.get("/tracker/all");
      setTransactions(res.data);
    }
    fetchTransactions();
  }, [refreshCount])

  const refresh = () => setRefreshCount((prev) => prev + 1);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white">Transactions</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your income and expenses.</p>
      </div>

      <AddTransactionForm
        refresh={refresh}
        editData={editData}
        onCancelEdit={() => setEditData(null)}
        formId="add-transaction-form"
      />
      <TransactionList
        transactions={transactions}
        refresh={refresh}
        onEdit={(tx: any) => {
          setEditData(tx);
          if (window.innerWidth < 640) {
            setTimeout(() => {
              document.getElementById("add-transaction-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
          }
        }}
      />
    </div>
  )
}

export default TransactionsPage
