import { Periods } from '~/types/analytics.types'

export const dateTimeParserOptions: Partial<Record<Periods, Intl.DateTimeFormatOptions>> = {
  [Periods.Day]: {
    day: '2-digit',
    month: '2-digit',
  },
  [Periods.Hour]: {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  },
}
