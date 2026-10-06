<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { getChartTooltipOptions } from '~/constants/charts'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

interface Props {
  chartData: {
    labels: string[]
    datasets: Array<{
      data: number[]
      backgroundColor: string[]
      borderWidth: number
    }>
  }
}
const { chartData } = defineProps<Props>()

const activeDevicesCount = computed(() => {
  if (!chartData?.datasets?.[0]?.data) return 0
  return chartData.datasets[0].data.filter(value => value > 0).length
})

const tooltipOptions = ref<Record<string, unknown>>({})

onMounted(() => {
  tooltipOptions.value = getChartTooltipOptions()
})

const chartOptions = computed(() => {
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    spacing: 0,
    radius: '80%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        ...tooltipOptions.value,
        boxShadow: 'var(--ds-shadow-custom-md)',
        callbacks: {
          label: (context: { label: string, parsed: string | number }) => {
            return `${context.label}: ${context.parsed}%`
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
        borderRadius: 0,
        borderSkipped: false,
      },
    },
  }

  if (activeDevicesCount.value > 1) {
    return {
      ...baseOptions,
      spacing: 6,
      elements: {
        ...baseOptions.elements,
        arc: {
          ...baseOptions.elements.arc,
          borderRadius: 12,
        },
      },
    }
  }

  return baseOptions
})
</script>

<template>
  <div class="chart-container">
    <Pie
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 150px;
  width: 100%;
}
</style>
