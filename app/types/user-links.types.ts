export interface UserLinks {
  id: number
  name: string
  url: string
  image: string
  isArchive: boolean
  sortOrder: number
  clickCount: number
}

export interface ProfileFirstLink {
  key: string
  icon: string
  label: string
  link: string
  inputIcon?: string
  type: string
}

export interface ListTopItem {
  id: number
  name: string
  value: number
}

export interface UserLink {
  id: number
  name: string
  url: string
  image: string | null
  type: string
  is_archive: boolean
  sort_order: number
  click_count: number
}
