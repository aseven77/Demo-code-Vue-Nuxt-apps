function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export function getChartTooltipOptions() {
  return {
    backgroundColor: cssVar('--ds-color-bg-elevated'),
    titleColor: cssVar('--ds-color-fg-primary'),
    bodyColor: cssVar('--ds-color-fg-primary'),
    borderWidth: 1,
    borderColor: cssVar('--ds-color-border-secondary'),
    cornerRadius: 6,
    padding: 10,
  }
}
