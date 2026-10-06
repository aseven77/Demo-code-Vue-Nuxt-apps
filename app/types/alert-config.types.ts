export interface AlertConfig {
  isShowing: boolean
  color: 'info' | 'error'
  description: string
  orientation: 'horizontal'
  icon: string
  closeAfterTime: (time?: number) => void
}

export interface AlertTopicParams {
  topic: 'lock' | 'unlock' | 'model' | 'revokeThemes' | 'addThemes' | 'removeFromModels'
  amount: number
}
