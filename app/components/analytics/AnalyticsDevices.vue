<template>
  <div
    class="flex flex-col gap-10 border p-4 rounded-3xl border-(--ds-color-primitive-light-600) bg-white
           lg:border-0 lg:border-l lg:rounded-none lg:pt-7 lg:px-6 lg:pb-14"
  >
    <section class="flex flex-col gap-2">
      <h5 class="text-black font-bold text-base">
        {{ $t('analytics.devices') }}
      </h5>

      <PieChart
        :chart-data="pieChartData"
        :chart-options="chartOptions"
      />

      <ul>
        <li
          v-for="device in devicesList"
          :key="device.name"
          class="flex justify-between items-center border-b border-(--ds-color-primitive-light-500) py-1.5"
        >
          <div class="flex items-center gap-4">
            <span
              class="h-2 w-2 rounded-full"
              :style="{ backgroundColor: device.color }"
            />
            <span class="font-sans text-base text-(--ds-color-fg-primary) leading-normal tracking-normal font-bold">
              {{ device.name }}
            </span>
          </div>
          <span class="font-sans text-base text-(--ds-color-fg-primary) font-bold">{{ device.value }}</span>
        </li>
      </ul>
    </section>

    <AnalyticsCountry :countries="countries" />
  </div>
</template>

<script setup lang="ts">
import type { ChartArea, ChartOptions, ScriptableContext, TooltipItem } from 'chart.js'
import { useI18n } from '#imports'
import AnalyticsCountry from '~/components/analytics/AnalyticsCountry.vue'

import PieChart from '~/components/charts/PieChart.vue'

const { t } = useI18n()
const analyticsStore = useAnalyticsStore()

type DeviceType = 'Mobile' | 'Desktop' | 'Tablet' | 'Other'

interface DeviceConfig {
  solid: string
  gradient: [string, string]
}

const DEVICE_CONFIG: Record<DeviceType, DeviceConfig> = {
  Mobile: { solid: '#8A3FFC', gradient: ['#8A3FFC', '#D4BBFF'] },
  Desktop: { solid: '#0765F9', gradient: ['#0765F9', '#9CECFB'] },
  Tablet: { solid: '#FF9E2F', gradient: ['#FF9E2F', '#FFEDBB'] },
  Other: { solid: '#FF70A1', gradient: ['#FF70A1', '#FF9472'] },
}

const DEVICE_TYPES = Object.keys(DEVICE_CONFIG) as DeviceType[]
const MOCK_DATA = [30, 20, 10, 40]

const chartOptions: ChartOptions<'pie'> = {
  plugins: {
    tooltip: {
      callbacks: {
        label: ({ label, raw }: TooltipItem<'pie'>) => {
          return `${label}: ${raw}%`
        },
      },
    },
  },
}

const normalizeDeviceType = (type: string): DeviceType => {
  return DEVICE_TYPES.includes(type as DeviceType) ? type as DeviceType : 'Other'
}

const getDeviceName = (type: DeviceType): string => {
  return t(`analytics.${type.toLowerCase()}`) || type
}

const getDeviceColor = (type: DeviceType): string => {
  return DEVICE_CONFIG[type].solid
}

const createGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea, index: number): CanvasGradient => {
  const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom)
  const deviceType = DEVICE_TYPES[index] ?? 'Other'
  const [start, end] = DEVICE_CONFIG[deviceType].gradient

  gradient.addColorStop(0, start)
  gradient.addColorStop(1, end)

  return gradient
}

const countries = computed(() => analyticsStore.countryBreakdown)

const deviceBreakdown = computed(() => analyticsStore.deviceOsBreakdown)

const hasData = computed(() => deviceBreakdown.value && deviceBreakdown.value.length > 0)

const chartDataValues = computed(() => {
  return hasData.value ? deviceBreakdown.value!.map(d => d.percent) : MOCK_DATA
})

const chartLabels = computed(() => {
  if (!hasData.value) {
    return DEVICE_TYPES.map(getDeviceName)
  }

  return deviceBreakdown.value!.map(({ type }) =>
    getDeviceName(normalizeDeviceType(type)),
  )
})

const pieChartData = computed(() => ({
  labels: chartLabels.value,
  datasets: [{
    data: chartDataValues.value,
    backgroundColor: (ctx: ScriptableContext<'pie'>) => {
      const { chartArea } = ctx.chart
      const deviceType = DEVICE_TYPES[ctx.dataIndex] ?? 'Other'

      if (!chartArea) {
        return getDeviceColor(deviceType)
      }

      return createGradient(ctx.chart.ctx, chartArea, ctx.dataIndex)
    },
    borderWidth: 0,
  }],
}))

const devicesList = computed(() => {
  if (!hasData.value) {
    return DEVICE_TYPES.map(type => ({
      name: getDeviceName(type),
      value: '0%',
      color: getDeviceColor(type),
    }))
  }

  return deviceBreakdown.value!.map(({ type, percent }) => {
    const deviceType = normalizeDeviceType(type)
    return {
      name: getDeviceName(deviceType),
      value: `${percent}%`,
      color: getDeviceColor(deviceType),
    }
  })
})
</script>
