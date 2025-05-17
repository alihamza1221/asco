"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", transportation: 95, energy: 70, water: 25, waste: 45 },
  { month: "Feb", transportation: 90, energy: 75, water: 22, waste: 48 },
  { month: "Mar", transportation: 102, energy: 68, water: 24, waste: 52 },
  { month: "Apr", transportation: 98, energy: 74, water: 25, waste: 49 },
  { month: "May", transportation: 87, energy: 80, water: 23, waste: 47 },
  { month: "Jun", transportation: 92, energy: 85, water: 28, waste: 51 },
]

export function EmissionsChart() {
  return (
    <ChartContainer
      config={{
        transportation: {
          label: "Transportation",
          color: "hsl(var(--chart-1))",
        },
        energy: {
          label: "Energy",
          color: "hsl(var(--chart-2))",
        },
        water: {
          label: "Water",
          color: "hsl(var(--chart-3))",
        },
        waste: {
          label: "Waste",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} className="text-xs" />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            className="text-xs"
            tickFormatter={(value) => `${value}kg`}
          />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <Line
            type="monotone"
            dataKey="transportation"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="energy"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="water"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="waste"
            stroke="hsl(var(--chart-4))"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
