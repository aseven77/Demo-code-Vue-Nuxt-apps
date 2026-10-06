<template>
  <div class="dotted-background mb-4">
    <div
      ref="mapContainer"
      class="world-map-container"
    >
      <ClientOnly>
        <AnalyticsWorldMap />
      </ClientOnly>
    </div>

    <!-- Кастомный тултип, который следует за курсором -->
    <Teleport to="body">
      <div
        v-if="tooltip.show"
        class="tooltip-custom bg-(--ds-color-bg-primary) rounded-[10px] px-3 py-2 border border-(--ds-color-bg-dark)"
        :style="{
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
        }"
      >
        <p class="text-sm font-bold mb-1">
          {{ getCountryPercent(tooltip.countryCode!) }}%
        </p>
        <div class="flex items-center gap-2 text-sm">
          <UIcon
            :name="countryFlagIcon"
            size="20"
          />
          {{ tooltip.countryName }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import AnalyticsWorldMap from '~/components/analytics/AnalyticsWorldMap.vue'

import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import type { CountryBreakdownItem } from '~/generatedApi'
import { getDeviceType } from '~/utils/getDeviceType'
import { useTooltip } from '~/composables/useTooltip'
import { useMapEventListeners } from '~/composables/useMapEventListeners'
import type { CountryCodes } from '~/utils/getCountryName'

const mapContainer = ref<HTMLElement | null>(null)
const deviceType = ref<string>('desktop')

const props = defineProps<{
  countries: CountryBreakdownItem[]
}>()

const { tooltip, showTooltip, updatePosition, hideTooltip } = useTooltip({
  offsetX: 15,
  offsetY: -30,
})

const isTouchDevice = computed(() =>
  deviceType.value === 'mobile' || deviceType.value === 'tablet',
)

const { attachEventListeners, removeEventListeners } = useMapEventListeners(
  mapContainer,
  isTouchDevice,
  {
    onCountryEnter: (countryCode: CountryCodes, x: number, y: number) => {
      showTooltip(countryCode, x, y)
    },
    onCountryMove: (x: number, y: number) => {
      updatePosition(x, y)
    },
    onCountryLeave: () => {
      hideTooltip()
    },
  },
)

const getCountryPercent = (countryCode: CountryCodes) => {
  const country = props.countries.find(country => country.countryCode === countryCode)
  return country?.percent?.toFixed(1) ?? 0.0
}

const countryFlagIcon = computed(() => {
  return tooltip.value.countryCode ? `circle-flags:${tooltip.value.countryCode.toLowerCase()}` : ''
})

onMounted(async () => {
  deviceType.value = getDeviceType()

  await nextTick() // Дожидаемся обновления DOM ввиду особенности работы <ClientOnly />

  attachEventListeners()
})

onBeforeUnmount(() => {
  removeEventListeners()
})
</script>

<style scoped>
.dotted-background {
    position: relative;
}

.dotted-background::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, transparent 40%, var(--ds-color-primitive-light-100) 40%);
    background-size: 3.5px 3.5px;
    pointer-events: none;
    z-index: 10;
    transform: scale(1.07);
}

.world-map-container :deep(svg) {
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: 200px;
    fill: var(--ds-color-primitive-grey-400);
}

.world-map-container :deep(path:hover),
.world-map-container :deep(path:active) {
    fill: var(--ds-color-primitive-brand-400);
}

.tooltip-custom {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    pointer-events: none;
    z-index: 10;
    white-space: normal;
    box-shadow: var(--ds-shadow-custom-md);
}
</style>
