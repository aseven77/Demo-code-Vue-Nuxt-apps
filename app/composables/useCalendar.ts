import type { CalendarDate, DateValue } from '@internationalized/date'
import { getLocalTimeZone, today, toZoned } from '@internationalized/date'
import { computed, shallowRef } from 'vue'
import type { SelectedDate } from '~/types/canendar.types'

export function useCalendar() {
  const globalStore = useGlobalStore()

  const { isSmallMobile } = storeToRefs(globalStore)

  const calendarMonthUI = {
    ui: {
      base: 'p-2',
      leadingIcon: 'size-4',
    },
  }

  const getTodayCalendarDate = () => today(getLocalTimeZone())

  const selectedDate = shallowRef<SelectedDate>({
    start: getTodayCalendarDate(),
    end: getTodayCalendarDate(),
  })

  const setTodayDate = () => {
    const currentDate = getTodayCalendarDate()
    selectedDate.value = { start: currentDate, end: currentDate }
  }

  const calendarDateToISO = (date: CalendarDate, endOfDay = false) => {
    const zone = getLocalTimeZone()
    const time = endOfDay ? { hour: 23, minute: 59, second: 59 } : { hour: 0, minute: 0, second: 0 }
    const zdt = toZoned(date, zone).set(time)

    return zdt.toAbsoluteString()
  }

  const hasSelectedDate = computed(() => !!(selectedDate.value.start && selectedDate.value.end))
  const buttonSizes = computed(() => (isSmallMobile.value ? 'xl' : 'lg' as const))

  const classesFooterAction = computed(() => {
    if (isSmallMobile.value) {
      return `flex flex-col-reverse gap-3`
    }
    return `grid grid-cols-2 gap-2 p-4`
  })

  const isShowingChip = (date: DateValue): boolean => getTodayCalendarDate().toString() === date.toString()

  return { calendarMonthUI, getTodayCalendarDate, selectedDate, setTodayDate, calendarDateToISO, classesFooterAction, buttonSizes, hasSelectedDate, isShowingChip }
}
