"use client";
import BalanceCard from "@/components/dashboard/BalanceCard";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import SummaryCards from "@/components/dashboard/SummaryCards";
import YearlyChart from "@/components/dashboard/YearlyChart";
import { AuthContext } from "@/context/AuthContext";
import { getTransactions } from "@/lib/transaction";
import React, { useContext, useEffect, useState } from "react";

type Transaction = {
  _id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  created_at?: string;
};

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  if (!auth) return null;

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;


  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Welcome back, {auth.user?.name ? auth.user.name.charAt(0).toUpperCase() + auth.user.name.slice(1) : ""}! Here&apos;s your financial overview.
        </p>
      </div>

      <BalanceCard balance={balance} />
      <SummaryCards income={income} expense={expense} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyChart data={transactions} />
        <YearlyChart data={[{ year: "2025", amount: balance }]} />
      </div>
    </div>
  );
};

export default Dashboard;
