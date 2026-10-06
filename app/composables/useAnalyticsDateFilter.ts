import { shallowRef } from 'vue'
import { useI18n } from '#imports'
import { type AnalyticsPeriod, Periods } from '~/types/analytics.types'
import type { OutputDate } from '~/types/canendar.types'

interface UseAnalyticsDateFilterOptions {
  onAfterPeriodSelect?: () => void
  onAfterChooseDate?: (date: OutputDate) => Promise<void> | void
}

export function useAnalyticsDateFilter(options?: UseAnalyticsDateFilterOptions) {
  const { t } = useI18n()
  const analyticsStore = useAnalyticsStore()

  const MONTH_INDEX_ARRAY = 1
  const DAY_INDEX_ARRAY = 3

  const tabsValuesMap: Record<typeof analyticsStore['days'], string> = {
    30: '30d',
    7: '7d',
    1: '24h',
  } as const

  const list: AnalyticsPeriod[] = [
    { label: t('analytics.month'), value: '30d', period: Periods.Day, days: 30 },
    { label: t('analytics.week'), value: '7d', period: Periods.Day, days: 7 },
    { label: t('analytics.day'), value: '24h', period: Periods.Hour, days: 1 },
  ]

  const activeItem = ref(tabsValuesMap[analyticsStore.days])
  const calendarLabel = shallowRef<Nullable<string>>(null)

  const normalizeLabel = (date: OutputDate): string => {
    const trimDate = (str: string): string => {
      return str.split(new RegExp('[T-]')).slice(MONTH_INDEX_ARRAY, DAY_INDEX_ARRAY).join('.')
    }
    return `${trimDate(date.start)}–${trimDate(date.end)}`
  }

  const onSelectPeriod = (item: AnalyticsPeriod) => {
    activeItem.value = item.value

    const now = new Date()
    const startDate = new Date(now)

    if (item.days === 1) {
      startDate.setHours(now.getHours() - 24)
    }
    else {
      startDate.setDate(now.getDate() - item.days)
    }

    analyticsStore.period = item.period
    analyticsStore.dateStart = new Date(startDate)
    analyticsStore.dateEnd = new Date(now)
    analyticsStore.days = item.days
    analyticsStore.isRangeSet = false

    options?.onAfterPeriodSelect?.()
  }

  const onChooseDate = async (date: OutputDate) => {
    calendarLabel.value = normalizeLabel(date)
    await options?.onAfterChooseDate?.(date)
  }

  const onClearRange = () => {
    calendarLabel.value = null
    analyticsStore.$patch({ isRangeSet: false })
  }

  const periodTitle = computed(() => {
    if (analyticsStore.isRangeSet) {
      return t('analytics.analyticsForPeriod', { period: calendarLabel.value })
    }

    if (analyticsStore.currentDaysPeriod === 1) {
      return t('analytics.analyticsOneDay')
    }

    return t('analytics.analyticsPeriod', { day: analyticsStore.currentDaysPeriod })
  })

  return {
    list,
    activeItem,
    calendarLabel,
    periodTitle,
    onSelectPeriod,
    onChooseDate,
    onClearRange,
  }
}
