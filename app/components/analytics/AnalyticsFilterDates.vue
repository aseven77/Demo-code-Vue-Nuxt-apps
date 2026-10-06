<template>
  <div class="flex flex-nowrap gap-2 overflow-x-auto">
    <!--  todo: код ниже – плохо реализован, его лучше переписать в будущем  -->
    <a
      v-for="item in list"
      :key="item.value"
      class="date inline-flex items-center justify-center h-10 px-4 rounded-full
        border border-[#53575F29] text-grey-800 font-sans font-semibold text-sm
        whitespace-nowrap cursor-pointer"
      :class="{ 'text-brand-500 bg-(--ds-color-primitive-brand-100)': item.value === activeItem }"
      @click="onSelectPeriod(item)"
    >
      {{ item.label }}
    </a>

    <SharedCalendar
      :modal-title="toRef(t('analytics.period'))"
      @choose-date="onChooseDate"
      @clear-range="onClearRange"
    >
      <template #open-button="{ isOpen }">
        <UButton
          :active="isActiveCalendarButton(isOpen).value"
          class="py-2.5 px-6 shrink-0"
          variant="primary"
          color="secondary"
          icon="custom:calendar"
          size="md"
          :ui="calendarButtonUI"
          square
        >
          {{ calendarLabel }}
        </UButton>
      </template>
    </SharedCalendar>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import SharedCalendar from '~/components/calendar/SharedCalendar.vue'
import type { OutputDate } from '~/types/canendar.types'
import type { AnalyticsPeriod } from '~/types/analytics.types'

interface Props {
  activeItem: string | undefined
  list: AnalyticsPeriod[]
  calendarLabel: Nullable<string>
}

interface Emits {
  chooseDate: [OutputDate]
  selectPeriod: [AnalyticsPeriod]
  clearRange: []
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const { calendarLabel } = toRefs(props)

const { t } = useI18n()

const calendarButtonUI = {
  leadingIcon: 'size-4',
}

const onSelectPeriod = (item: AnalyticsPeriod) => emits('selectPeriod', item)
const onChooseDate = (date: OutputDate) => emits('chooseDate', date)
const onClearRange = () => emits('clearRange')

const isActiveCalendarButton = (isActive: boolean): ComputedRef<boolean> => computed((): boolean => isActive || !!calendarLabel.value)
</script>
