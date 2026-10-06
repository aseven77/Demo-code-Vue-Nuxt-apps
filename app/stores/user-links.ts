import { defineStore } from 'pinia'

import type { Link, CreateLinkRequest, ReorderLinksRequest } from '~/generatedApi'
import { MAX_COUNT_ACTIVE_LINKS, MAX_COUNT_ARCHIVED_LINKS } from '~/constants/links'

interface Props {
  links: Link[]
}

export const useUserLinks = defineStore('userLinks', {
  state: (): Props => ({
    links: [],
  }),

  actions: {
    async edit(id: number, link: CreateLinkRequest): Promise<Link> {
      return useServices().links.updateUserLink(id, link)
    },

    async delete(id: number) {
      return useServices().links.deleteUserLink(id)
    },

    async create(link: CreateLinkRequest): Promise<Link> {
      return useServices().links.createUserLink(link)
    },

    async get() {
      this.links = await useServices().links.getUserLinks()
    },

    async syncLinksToUser() {
      await this.get()
      const userStore = useUserStore()
      if (userStore.user) {
        userStore.user.links = this.links
      }
    },

    async reorderLinks(params: ReorderLinksRequest) {
      return useServices().links.reorderUserLinks(params)
    },

    async uploadThumbnail(linkId: number, image: Blob) {
      const result = await useServices().links.uploadLinkThumbnail({ id: linkId, image })
      const link = this.links.find(l => l.id === linkId)
      if (link) {
        link.thumbnail = result.thumbnail
      }
      return result
    },

    async deleteThumbnail(linkId: number) {
      await useServices().links.deleteLinkThumbnail(linkId)
      const link = this.links.find(l => l.id === linkId)
      if (link) {
        link.thumbnail = null
      }
    },

    async uploadBackground(linkId: number, image: Blob) {
      const result = await useServices().links.uploadLinkBackground({ id: linkId, image })
      const link = this.links.find(l => l.id === linkId)
      if (link) {
        link.background_image = result.background_image
      }
      return result
    },

    async deleteBackground(linkId: number) {
      await useServices().links.deleteLinkBackground(linkId)
      const link = this.links.find(l => l.id === linkId)
      if (link) {
        link.background_image = null
      }
    },
  },

  getters: {
    listLinks: state => state.links,
    isAddingLinkAvailable: state => state.links.filter(link => !link.is_archive).length < MAX_COUNT_ACTIVE_LINKS,
    isArchiveLinkAvailable: state => state.links.filter(link => link.is_archive).length < MAX_COUNT_ARCHIVED_LINKS,
  },

  persist: true,
})

export default useUserLinks
