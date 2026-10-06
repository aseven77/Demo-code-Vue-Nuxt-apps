import type { CalendarDate } from '@internationalized/date'

export interface OutputDate {
  start: string
  end: string
}

export interface SelectedDate {
  start: CalendarDate
  end: CalendarDate
}

export interface OutputDate {
  start: string
  end: string
}

export interface PropsSharedCalendar {
  modalTitle: Ref<string>
}

export interface PropsSharedCalendarFooter {
  actionButtons: {
    id: string
    label: string
    variant: 'primary' | 'secondary'
    disabled: boolean
    action: () => void
    size: ComputedRef<'lg' | 'xl'>
  }[]
}
