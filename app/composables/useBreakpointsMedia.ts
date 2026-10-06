import { useBreakpoints } from '@vueuse/core'
import { MatchMediaQuery } from '~/stores/types/global/state.types'

export function useBreakpointsMedia() {
  const globalStore = useGlobalStore()

  if (import.meta.client) {
    const breakpoints = useBreakpoints({
      sm: MatchMediaQuery.SM,
      md: MatchMediaQuery.MD,
      lg: MatchMediaQuery.LG,
      xl: MatchMediaQuery.XL,
      xxl: MatchMediaQuery.XXL,
    })

    const isSM = breakpoints.smaller('md')
    const isMD = breakpoints.between('sm', 'lg')
    const isLG = breakpoints.between('md', 'xl')
    const isXL = breakpoints.between('lg', 'xxl')
    const isXXL = breakpoints.greater('xl')

    watchEffect(() => {
      globalStore.matchMedia.isSM = isSM.value
      globalStore.matchMedia.isMD = isMD.value
      globalStore.matchMedia.isLG = isLG.value
      globalStore.matchMedia.isXL = isXL.value
      globalStore.matchMedia.isXXL = isXXL.value
    })
  }

  return {
  }
}
