"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", emissions: 210 },
  { month: "Feb", emissions: 232 },
  { month: "Mar", emissions: 219 },
  { month: "Apr", emissions: 246 },
  { month: "May", emissions: 237 },
  { month: "Jun", emissions: 256 },
]

export function EmissionsTrend() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} className="text-xs" />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            className="text-xs"
            tickFormatter={(value) => `${value}kg`}
          />
          <Area
            type="monotone"
            dataKey="emissions"
            stroke="hsl(142, 76%, 36%)"
            fillOpacity={1}
            fill="url(#colorEmissions)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
