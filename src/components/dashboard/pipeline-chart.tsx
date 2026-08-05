"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "جدید", value: 400 },
  { name: "واجد شرایط", value: 300 },
  { name: "پیشنهاد", value: 300 },
  { name: "مذاکره", value: 200 },
  { name: "برنده", value: 100 },
]

const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899']

export function PipelineChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={65}
          outerRadius={85}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: any) => [value, "تعداد معاملات"]}
          contentStyle={{ 
            backgroundColor: "#ffffff", 
            borderRadius: "12px", 
            border: "1px solid #e2e8f0", 
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.08)",
            fontSize: "12px",
            fontFamily: "inherit"
          }}
        />
        <Legend 
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ paddingTop: "20px", fontSize: "12px", fontFamily: "inherit" }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
