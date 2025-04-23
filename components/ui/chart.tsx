/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { AreaChart, BarChart, LineChart, DonutChart } from "@tremor/react"

export { AreaChart, BarChart, LineChart, DonutChart }

// Export a custom interface for chart props
export interface ChartProps {
  data: any[]
  index: string
  categories?: string[]
  category?: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showXGrid?: boolean
  showYGrid?: boolean
  showAnimation?: boolean
  layout?: "vertical" | "horizontal"
  showTooltip?: boolean
  yAxisWidth?: number
  className?: string
}

// Add a ChartContainer component for consistent styling
export function ChartContainer({
  children,
  className,
  config,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  config?: Record<string, { label: string; color: string }>
}) {
  return (
    <div
      className={className}
      style={
        config
          ? Object.entries(config).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [`--color-${key}`]: value.color,
              }),
              {},
            )
          : {}
      }
      {...props}
    >
      {children}
    </div>
  )
}
