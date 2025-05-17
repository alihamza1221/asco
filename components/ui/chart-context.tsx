export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

export interface ChartContextValue {
  config: ChartConfig
}
