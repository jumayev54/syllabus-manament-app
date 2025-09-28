"use client"

import * as React from "react"
import { ResponsiveContainer, Tooltip, Legend } from "recharts"

import { cn } from "@/lib/utils"

// Define proper types
interface ChartConfig {
  [key: string]: {
    label?: string
    icon?: React.ComponentType<any>
    color?: string
    theme?: {
      light?: string
      dark?: string
    }
  }
}

interface TooltipPayload {
  color?: string
  dataKey?: string | number
  name?: string | number
  payload?: any
  value?: any
  unit?: string
}

// Chart container component
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<typeof ResponsiveContainer>["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <div
      data-chart={chartId}
      ref={ref}
      className={cn(
        "flex aspect-video justify-center text-xs",
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
        "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border",
        "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
        "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
        "[&_.recharts-layer]:outline-none",
        "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border",
        "[&_.recharts-radial-bar-background-sector]:fill-muted",
        "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
        "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border",
        "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
        "[&_.recharts-sector]:outline-none",
        "[&_.recharts-surface]:outline-none",
        className
      )}
      {...props}
    >
      <ChartStyle id={chartId} config={config} />
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartStyle = React.memo(({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = React.useMemo(() => 
    Object.entries(config || {}).filter(
      ([_, itemConfig]) => itemConfig?.theme || itemConfig?.color
    ), [config]
  )

  if (!colorConfig.length) {
    return null
  }

  const cssContent = React.useMemo(() => {
    const rootColors = colorConfig
      .map(([key, itemConfig]) => {
        const color = itemConfig?.theme?.light || itemConfig?.color
        return color ? `  --color-${key}: ${color};` : null
      })
      .filter(Boolean)
      .join("\n")

    const darkColors = colorConfig
      .map(([key, itemConfig]) => {
        const color = itemConfig?.theme?.dark || itemConfig?.color
        return color ? `  --color-${key}: ${color};` : null
      })
      .filter(Boolean)
      .join("\n")

    const chartColors = colorConfig
      .map(([key]) => `  --color-${key}: hsl(var(--color-${key}));`)
      .join("\n")

    return `
:root {
${rootColors}
}

.dark {
${darkColors}
}

[data-chart="${id}"] {
${chartColors}
}
    `
  }, [colorConfig, id])

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: cssContent,
      }}
    />
  )
})
ChartStyle.displayName = "ChartStyle"

// Chart tooltip component
const ChartTooltip = Tooltip

// Chart tooltip content component
interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<TooltipPayload>
  label?: string
  className?: string
  indicator?: "line" | "dot" | "dashed"
  hideLabel?: boolean
  hideIndicator?: boolean
  formatter?: (
    value: any,
    name: any,
    item: any,
    index: number,
    payload: any
  ) => React.ReactNode
  labelFormatter?: (label: any, payload: any) => React.ReactNode
  nameKey?: string
  labelKey?: string
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    {
      active,
      payload = [],
      label,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      formatter,
      labelFormatter,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      if (!item) return null

      const key = String(labelKey || item.dataKey || item.name || "value")
      const value = !labelKey && typeof label === "string" ? label : key

      if (labelFormatter) {
        return labelFormatter(value, payload)
      }

      return value
    }, [label, labelFormatter, payload, hideLabel, labelKey])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? (
          <div className="grid gap-1.5">
            {tooltipLabel ? (
              <div className="font-medium text-foreground">{tooltipLabel}</div>
            ) : null}
            <div className="grid gap-1.5">
              {payload.map((item, index) => {
                if (!item) return null

                const indicatorColor = item.color || "currentColor"
                const itemName = String(item.name || item.dataKey || "Value")
                const itemValue = item.value !== undefined ? String(item.value) : "N/A"

                return (
                  <div
                    key={`tooltip-item-${index}`}
                    className={cn(
                      "flex w-full flex-wrap items-stretch gap-2",
                      "items-center"
                    )}
                  >
                    {formatter && item?.value !== undefined && item.name ? (
                      formatter(item.value, item.name, item, index, item.payload)
                    ) : (
                      <>
                        {!hideIndicator && (
                          <div
                            className={cn(
                              "shrink-0 rounded-[2px]",
                              {
                                "h-2.5 w-2.5": indicator === "dot",
                                "w-1 h-4": indicator === "line",
                                "w-0 border-[1.5px] border-dashed bg-transparent h-4":
                                  indicator === "dashed",
                                "my-0.5": nestLabel && indicator === "dashed",
                              }
                            )}
                            style={{
                              backgroundColor: indicator !== "dashed" ? indicatorColor : "transparent",
                              borderColor: indicator === "dashed" ? indicatorColor : "transparent",
                            }}
                          />
                        )}
                        <div
                          className={cn(
                            "flex flex-1 justify-between leading-none",
                            nestLabel ? "items-end" : "items-center"
                          )}
                        >
                          <div className="grid gap-1.5">
                            <span className="text-muted-foreground">
                              {itemName}
                            </span>
                            {nestLabel ? (
                              <span className="font-mono font-medium tabular-nums text-foreground">
                                {itemValue}
                              </span>
                            ) : null}
                          </div>
                          {!nestLabel ? (
                            <span className="font-mono font-medium tabular-nums text-foreground">
                              {itemValue}
                            </span>
                          ) : null}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="grid gap-1.5">
            <div
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2",
                "items-center"
              )}
            >
              {payload[0] && formatter && payload[0]?.value !== undefined && payload[0].name ? (
                formatter(payload[0].value, payload[0].name, payload[0], 0, payload[0].payload)
              ) : (
                <>
                  {tooltipLabel ? (
                    <div className="font-medium text-foreground">{tooltipLabel}</div>
                  ) : null}
                  <div className="font-mono font-medium tabular-nums text-foreground">
                    {payload[0]?.value !== undefined ? String(payload[0].value) : "N/A"}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

// Chart legend component
const ChartLegend = Legend

// Chart legend content component
interface ChartLegendContentProps {
  className?: string
  hideIcon?: boolean
  payload?: Array<{
    value?: string
    type?: string
    id?: string
    color?: string
  } | null | undefined>
  verticalAlign?: "top" | "bottom"
  nameKey?: string
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(({ className, hideIcon = false, payload = [], verticalAlign = "bottom" }, ref) => {
  if (!payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item, index) => {
        if (!item) return null
        
        const itemValue = item.value || "Legend Item"
        const itemColor = item.color || "currentColor"
        
        return (
          <div
            key={`legend-item-${index}`}
            className={cn(
              "flex items-center gap-1.5"
            )}
          >
            {!hideIcon && (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: itemColor,
                }}
              />
            )}
            <span className="text-muted-foreground">
              {itemValue}
            </span>
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
}
export type { ChartConfig }
