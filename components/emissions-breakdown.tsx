"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const data = [
  { name: "Transportation", value: 40, color: "hsl(142, 76%, 36%)" },
  { name: "Energy", value: 30, color: "hsl(196, 100%, 47%)" },
  { name: "Water", value: 10, color: "hsl(39, 100%, 50%)" },
  { name: "Waste", value: 20, color: "hsl(0, 84.2%, 60.2%)" },
]

export function EmissionsBreakdown() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
