import type { Component } from 'vue'
import ModalPreviewPhoneBlock from '~/components/modals/ModalPreviewPhoneBlock.vue'
import RootModalConfirmAction from '~/components/modals/RootModalConfirmAction.vue'
import RootModalAddThemes from '~/components/modals/RootModalAddThemes.vue'

function lazyModal(component: Component) {
  let instance: ReturnType<ReturnType<typeof useOverlay>['create']> | null = null

  function getInstance() {
    if (!instance) {
      instance = useOverlay().create(component)
    }
    return instance
  }

  return {
    open: (...args: Parameters<ReturnType<ReturnType<typeof useOverlay>['create']>['open']>) => getInstance().open(...args),
    close: (...args: Parameters<ReturnType<ReturnType<typeof useOverlay>['create']>['close']>) => getInstance().close(...args),
    patch: (...args: Parameters<ReturnType<ReturnType<typeof useOverlay>['create']>['patch']>) => getInstance().patch(...args),
  }
}

export const modalControlCustomThemePreview = lazyModal(ModalPreviewPhoneBlock)
export const rootModalConfirmAction = lazyModal(RootModalConfirmAction)
export const rootModalAddThemes = lazyModal(RootModalAddThemes)
