type DateInput = string | Date | null | undefined

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export function toSafeDate(input: DateInput): Nullable<Date> {
  if (!input) return null
  const d = input instanceof Date ? input : new Date(input)
  return Number.isNaN(d.getTime()) ? null : d
}

export function formatDateByPattern(input: DateInput, format: 'DD-MM-YYYY' | 'DD.MM.YY HH:MM'): string {
  const date = toSafeDate(input)
  if (!date) return '—'

  const day = pad(date.getDate())
  const month = pad(date.getMonth() + 1)

  if (format === 'DD-MM-YYYY') {
    return `${day}-${month}-${date.getFullYear()}`
  }

  const year = date.getFullYear().toString().slice(-2)
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  return `${day}.${month}.${year} в ${hours}:${minutes}`
}
