<template>
  <NuxtLayout name="analytics-layout">
    <!-- Плашка с заголовком и фильтрами -->
    <div
      class="fixed top-0 left-0 right-0
    pt-[max(16px,env(safe-area-inset-top))] pb-3 px-4 bg-white z-50 border-b border-light-600
    md:fixed md:left-0 md:right-0 md:px-8 md:pt-8 md:pb-6
    lg:static lg:pt-5 lg:px-8 lg:pb-8 lg:border-0 lg:border-b "
    >
      <h3 class="text-(--ds-color-fg-primary) font-bold mb-3 md:mb-5 lg:mb-8 text-xl lg:text-2xl">
        {{ title }}
      </h3>
      <AnalyticsFilterDates
        :calendar-label="calendarLabel"
        :list="list"
        :active-item="activeItem"
        @select-period="onSelectPeriod"
        @choose-date="onChooseDate"
        @clear-range="onClearRange"
      />
    </div>

    <!-- Спейсер для фиксированной плашки на мобилке -->
    <div class="h-32.5 md:hidden" />

    <!-- Контент -->
    <div class="pb-2 lg:pb-0 lg:relative lg:overflow-hidden h-full">
      <div
        class="h-24 hidden lg:block w-full lg:absolute left-0 right-0 bottom-0 z-2
            bg-linear-to-b via-alpha-white-80 to-light-100 via-[56.33%] from-transparent pointer-events-none"
      />
      <AnalyticsGraphs wrapper-class="lg:py-3" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AnalyticsGraphs from '~/components/analytics/AnalyticsGraphs.vue'
import AnalyticsFilterDates from '~/components/analytics/AnalyticsFilterDates.vue'
import { Periods } from '~/types/analytics.types'

const { notifyError } = useNotify()
const analyticsStore = useAnalyticsStore()

const fetchAnalytics = async () => {
  try {
    const start = analyticsStore.dateStart.toISOString()
    const end = analyticsStore.dateEnd.toISOString()
    await analyticsStore.loadAnalytics(() =>
      analyticsStore.fetchAll({ start, end, period: analyticsStore.period }),
    )
  }
  catch (error) {
    console.error('Failed to fetch visits:', error)
  }
}

const { list, activeItem, calendarLabel, periodTitle: title, onSelectPeriod, onChooseDate, onClearRange } = useAnalyticsDateFilter({
  onAfterPeriodSelect: fetchAnalytics,
  onAfterChooseDate: async (date) => {
    try {
      const { start, end } = date
      const analytics = await analyticsStore.fetchAll({ start, end, period: Periods.Day })
      if (analytics) {
        analyticsStore.$patch({ analytics, isRangeSet: true })
      }
    }
    catch (error: unknown) {
      notifyError(error)
    }
  },
})

onMounted(() => {
  fetchAnalytics()
})
</script>
