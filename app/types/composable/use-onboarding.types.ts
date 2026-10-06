import type { UserTheme } from '~/types/user-theme.types'
import type { UserLinks } from '~/types/user-links.types'

export interface OnboardingUserState {
  name: string
  nickname: string
  aboutSelf: string
  image: string
  theme: UserTheme
  links: Omit<UserLinks, 'id' | 'clickCount' | 'isArchive' | 'sortOrder'>
}

export interface OnboardingStepOneState {
  minInputLength: number
  maxInputLength: number
}

export interface OnboardingStepTwoState {
  minInputLength: number
  maxInputLength: number
  regexpHasNumbersAndLatin: RegExp
  isUniqueNickname: boolean
}

export interface OnboardingStepThreeState {
  minInputLength: number
  maxInputLength: number
}
