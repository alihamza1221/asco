"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Emissions over time data
const emissionsTimeData = [
  { month: "Jan", emissions: 210 },
  { month: "Feb", emissions: 232 },
  { month: "Mar", emissions: 219 },
  { month: "Apr", emissions: 246 },
  { month: "May", emissions: 237 },
  { month: "Jun", emissions: 256 },
]

// Emissions breakdown data
const emissionsBreakdownData = [
  { name: "Transportation", value: 40, color: "hsl(var(--chart-1))" },
  { name: "Energy", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Water", value: 10, color: "hsl(var(--chart-3))" },
  { name: "Waste", value: 20, color: "hsl(var(--chart-4))" },
]

// Category comparison data
const categoryComparisonData = [
  { month: "Jan", transportation: 95, energy: 70, water: 25, waste: 45 },
  { month: "Feb", transportation: 90, energy: 75, water: 22, waste: 48 },
  { month: "Mar", transportation: 102, energy: 68, water: 24, waste: 52 },
  { month: "Apr", transportation: 98, energy: 74, water: 25, waste: 49 },
  { month: "May", transportation: 87, energy: 80, water: 23, waste: 47 },
  { month: "Jun", transportation: 92, energy: 85, water: 28, waste: 51 },
]

// Monthly emissions by category data
const monthlyEmissionsData = [
  { name: "Transportation", emissions: 98.2 },
  { name: "Energy", emissions: 73.7 },
  { name: "Water", emissions: 24.6 },
  { name: "Waste", emissions: 49.2 },
]

export function EmissionsOverTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emissions Over Time</CardTitle>
        <CardDescription>Your carbon footprint trend over the past 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={emissionsTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value}kg`} width={45} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                            <span className="font-bold text-foreground">{payload[0].payload.month}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Emissions</span>
                            <span className="font-bold text-foreground">{payload[0].value}kg</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="emissions"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorEmissions)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function EmissionsBreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emissions Breakdown</CardTitle>
        <CardDescription>Your carbon footprint by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={emissionsBreakdownData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {emissionsBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Category</span>
                            <span className="font-bold text-foreground">{payload[0].name}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Percentage</span>
                            <span className="font-bold text-foreground">{payload[0].value}%</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry, index) => {
                  return <span className="text-sm">{value}</span>
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function CategoryComparisonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Comparison</CardTitle>
        <CardDescription>Compare emissions across different categories over time</CardDescription>
      </CardHeader>
      <CardContent>
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
              data={categoryComparisonData}
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
      </CardContent>
    </Card>
  )
}

export function MonthlyEmissionsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Emissions by Category</CardTitle>
        <CardDescription>Breakdown of your carbon footprint sources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyEmissionsData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value}kg`} width={45} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Category</span>
                            <span className="font-bold text-foreground">{label}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Emissions</span>
                            <span className="font-bold text-foreground">{payload[0].value}kg</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="emissions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
