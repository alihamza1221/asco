"use client"

import { useEffect, useRef } from "react"

interface SimpleChartProps {
  data: { label: string; value: number }[]
  type: "bar" | "line" | "pie"
  height?: number
  colors?: string[]
}

export function SimpleChart({
  data,
  type,
  height = 200,
  colors = ["#4CAF50", "#2196F3", "#FF9800", "#F44336", "#9C27B0"],
}: SimpleChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.scale(dpr, dpr)

    // Draw based on chart type
    if (type === "bar") {
      drawBarChart(ctx, data, canvas.offsetWidth, canvas.offsetHeight, colors)
    } else if (type === "line") {
      drawLineChart(ctx, data, canvas.offsetWidth, canvas.offsetHeight, colors)
    } else if (type === "pie") {
      drawPieChart(ctx, data, canvas.offsetWidth, canvas.offsetHeight, colors)
    }
  }, [data, type, colors])

  return (
    <div style={{ height: `${height}px`, width: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

function drawBarChart(
  ctx: CanvasRenderingContext2D,
  data: { label: string; value: number }[],
  width: number,
  height: number,
  colors: string[],
) {
  const padding = { top: 20, right: 20, bottom: 30, left: 40 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Find max value for scaling
  const maxValue = Math.max(...data.map((item) => item.value))

  // Bar width based on data length
  const barWidth = (chartWidth / data.length) * 0.8
  const barSpacing = (chartWidth / data.length) * 0.2

  // Draw axes
  ctx.beginPath()
  ctx.moveTo(padding.left, height - padding.bottom)
  ctx.lineTo(width - padding.right, height - padding.bottom)
  ctx.strokeStyle = "#ccc"
  ctx.stroke()

  // Draw bars
  data.forEach((item, index) => {
    const x = padding.left + index * (barWidth + barSpacing) + barSpacing / 2
    const barHeight = (item.value / maxValue) * chartHeight
    const y = height - padding.bottom - barHeight

    ctx.fillStyle = colors[index % colors.length]
    ctx.fillRect(x, y, barWidth, barHeight)

    // Draw label
    ctx.fillStyle = "#666"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(item.label, x + barWidth / 2, height - padding.bottom + 15)

    // Draw value
    ctx.fillStyle = "#333"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5)
  })
}

function drawLineChart(
  ctx: CanvasRenderingContext2D,
  data: { label: string; value: number }[],
  width: number,
  height: number,
  colors: string[],
) {
  const padding = { top: 20, right: 20, bottom: 30, left: 40 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Find max value for scaling
  const maxValue = Math.max(...data.map((item) => item.value))

  // Draw axes
  ctx.beginPath()
  ctx.moveTo(padding.left, height - padding.bottom)
  ctx.lineTo(width - padding.right, height - padding.bottom)
  ctx.strokeStyle = "#ccc"
  ctx.stroke()

  // Draw line
  ctx.beginPath()
  data.forEach((item, index) => {
    const x = padding.left + index * (chartWidth / (data.length - 1))
    const y = height - padding.bottom - (item.value / maxValue) * chartHeight

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }

    // Draw point
    ctx.fillStyle = colors[0]
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fill()

    // Draw label
    ctx.fillStyle = "#666"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(item.label, x, height - padding.bottom + 15)
  })

  ctx.strokeStyle = colors[0]
  ctx.lineWidth = 2
  ctx.stroke()

  // Fill area under the line
  ctx.lineTo(padding.left + chartWidth, height - padding.bottom)
  ctx.lineTo(padding.left, height - padding.bottom)
  ctx.fillStyle = `${colors[0]}33` // Add transparency
  ctx.fill()
}

function drawPieChart(
  ctx: CanvasRenderingContext2D,
  data: { label: string; value: number }[],
  width: number,
  height: number,
  colors: string[],
) {
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(centerX, centerY) * 0.8

  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Draw pie segments
  let startAngle = 0
  data.forEach((item, index) => {
    const sliceAngle = (item.value / total) * 2 * Math.PI
    const endAngle = startAngle + sliceAngle

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
    ctx.closePath()

    ctx.fillStyle = colors[index % colors.length]
    ctx.fill()

    // Draw label line and text
    const midAngle = startAngle + sliceAngle / 2
    const labelRadius = radius * 1.2
    const labelX = centerX + Math.cos(midAngle) * labelRadius
    const labelY = centerY + Math.sin(midAngle) * labelRadius

    ctx.beginPath()
    ctx.moveTo(centerX + Math.cos(midAngle) * radius, centerY + Math.sin(midAngle) * radius)
    ctx.lineTo(labelX, labelY)
    ctx.strokeStyle = "#666"
    ctx.stroke()

    // Draw label
    const percent = Math.round((item.value / total) * 100)
    ctx.fillStyle = "#333"
    ctx.font = "10px sans-serif"
    ctx.textAlign = midAngle < Math.PI ? "left" : "right"
    ctx.textBaseline = "middle"
    ctx.fillText(`${item.label} (${percent}%)`, labelX, labelY)

    startAngle = endAngle
  })
}
