"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  { name: "فروردین", total: 245 },
  { name: "اردیبهشت", total: 320 },
  { name: "خرداد", total: 280 },
  { name: "تیر", total: 410 },
  { name: "مرداد", total: 390 },
  { name: "شهریور", total: 520 },
  { name: "مهر", total: 480 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 15, right: 55, left: 15, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis
          dataKey="name"
          stroke="#94a3b8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#94a3b8"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          dx={12}
          tickFormatter={(value: any) => `${value.toLocaleString('fa-IR')} م`}
          orientation="right"
        />
        <Tooltip
          cursor={{ fill: "#f8fafc" }}
          formatter={(value: any) => [`${(value * 1000000).toLocaleString('fa-IR')} تومان`, "درآمد"]}
          contentStyle={{ 
            backgroundColor: "#ffffff", 
            borderRadius: "12px", 
            border: "1px solid #e2e8f0", 
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.08)",
            fontSize: "12px",
            fontFamily: "inherit"
          }}
        />
        <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  )
}
