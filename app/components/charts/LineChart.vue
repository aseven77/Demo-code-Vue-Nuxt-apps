<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { getChartTooltipOptions } from '~/constants/charts'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const GRADIENT_START_COLOR = '#6D2AFF'
const GRADIENT_END_COLOR = '#FFFFFF'
const GRADIENT_START_POSITION = 0
const GRADIENT_END_POSITION = 1

interface Props {
  labels: string[]
  data: Array<{
    label: string
    data: number[]
    backgroundColor: string
    borderColor: string
    borderWidth: number
    fill: boolean
    tension: number
  }>
}

const props = defineProps<Props>()

const chartRef = ref<Nullable<InstanceType<typeof Line>>>(null)

const chartData = computed(() => {
  const chart = unref(chartRef)?.chart
  const chartArea = chart?.chartArea

  if (!chart || !chartArea) {
    return {
      labels: props.labels,
      datasets: props.data,
    }
  }

  const gradient = chart.ctx.createLinearGradient(
    GRADIENT_START_POSITION,
    chartArea.top,
    GRADIENT_START_POSITION,
    chartArea.bottom,
  )
  gradient.addColorStop(GRADIENT_START_POSITION, GRADIENT_START_COLOR)
  gradient.addColorStop(GRADIENT_END_POSITION, GRADIENT_END_COLOR)

  return {
    labels: props.labels,
    datasets: props.data.map(dataset => ({
      ...dataset,
      backgroundColor: gradient,
      borderColor: GRADIENT_START_COLOR,
    })),
  }
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        display: true,
        dash: [5, 5],
      },
      grid: {
        color: 'rgba(111, 115, 134, 0.2)',
        borderDash: [5, 5],
        tickBorderDash: [5, 5],
      },
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
})

onMounted(() => {
  chartOptions.value.plugins.tooltip = {
    ...chartOptions.value.plugins.tooltip,
    ...getChartTooltipOptions(),
  }
})
</script>

<template>
  <Line
    ref="chartRef"
    :data="chartData"
    :options="chartOptions"
  />
</template>
