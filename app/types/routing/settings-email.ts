export const EMAIL_PAGE_VARIANTS = {
  change: 'change',
  add: 'add',
  verify: 'verify',
} as const

export type EmailPageVariant = KeyOf<typeof EMAIL_PAGE_VARIANTS>

export const isEmailPageVariant = (val: string): val is EmailPageVariant => {
  return val in EMAIL_PAGE_VARIANTS
}
