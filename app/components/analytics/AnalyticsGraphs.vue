<template>
  <div :class="['lg:grid lg:grid-cols-[auto_375px] relative', heightClass]">
    <div class="pb-4 lg:pt-1 lg:px-8 lg:pb-14 lg:overflow-auto scrollbarList">
      <AnalyticsMetrics class="pb-6 md:pb-3 lg:mb-5" />
      <div :class="['py-5 bg-white border border-light-600 rounded-3xl px-5 lg:border-0 lg:p-0', wrapperClass]">
        <AnalyticsView class="pb-6" />
        <AnalyticsTopLinks class="pt-6" />
      </div>
    </div>
    <AnalyticsDevices class="pt-6 border-t border-light-600 lg:border-t-0 lg:border-0 lg:pt-0 lg:overflow-auto scrollbarList" />
  </div>
</template>

<script setup lang="ts">
import AnalyticsDevices from '~/components/analytics/AnalyticsDevices.vue'
import AnalyticsMetrics from '~/components/analytics/AnalyticsMetrics.vue'
import AnalyticsView from '~/components/analytics/AnalyticsView.vue'
import AnalyticsTopLinks from '~/components/analytics/AnalyticsTopLinks.vue'

withDefaults(defineProps<{
  heightClass?: string
  wrapperClass?: string
}>(), {
  heightClass: 'lg:h-full',
  wrapperClass: '',
})
</script>
