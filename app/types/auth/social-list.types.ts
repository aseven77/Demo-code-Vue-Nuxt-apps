export type SocialName = 'Google' | 'Apple' | 'Telegram' | 'VK'

export interface SocialItem {
  name: SocialName
  icon: string
  to: string
}

export type SocialListResponse = SocialItem[]
