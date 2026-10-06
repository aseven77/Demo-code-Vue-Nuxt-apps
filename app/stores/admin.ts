import type {
  Admin,
  AdminState,
  AdminUserData,
  AdminUserList,
  BulkUserIdsPayload,
  FetchUserAnalyticsParams,
  GetFilteredUsersAdminParams,
} from '~/stores/types/admin/state.types'
import type { AdminBackground } from '~/generatedApi/models/AdminBackground'
import type { AdminBackgroundsService } from '~/generatedApi/services/AdminBackgroundsService'
import type { AnalyticsVisitsResponse, LoginResponse } from '~/generatedApi'
import { createTokenState, createTokenPersistConfig, type SetTokenPayload } from '~/stores/shared/token'

export const useAdminStore = defineStore('admin', {
  state: (): AdminState => ({
    ...createTokenState(),
    admin: null,
    userList: null,
    users: null,
    currentUser: null,
    analyticsTargetUser: null,
    interfaceState: {
      fetchingUsersData: null,
      inputSearch: '',
      currentTabAnalytics: 'graph',
      sortField: 'last_login_at',
      sortOrder: 'desc',
    },
  }),

  actions: {
    setCurrentUser(user: AdminUserData): void {
      this.currentUser = user
    },

    resetCurrentUser(): void {
      this.currentUser = null
    },

    setAnalyticsTargetUser(visits: AnalyticsVisitsResponse): void {
      this.analyticsTargetUser = visits
    },

    resetAnalyticsTargetUser(): void {
      this.analyticsTargetUser = null
    },

    setToken({ access_token, refresh_token }: SetTokenPayload): void {
      this.access_token = access_token
      this.refresh_token = refresh_token
    },

    async getMe(): Promise<Admin> {
      return useServices().admin.auth.getAuthenticatedAdmin() as unknown as Admin
    },

    async loginAdmin(requestBody: { email: string, password: string }): Promise<LoginResponse> {
      return useServices().admin.auth.adminLogin(requestBody)
    },

    async refreshAdminToken(requestBody: { refresh_token: string }): Promise<LoginResponse> {
      return useServices().admin.auth.refreshAdminToken(requestBody)
    },

    async logoutAdmin(requestBody: { refresh_token: string }) {
      return useServices().admin.auth.logoutAdmin(requestBody)
    },

    async assignAsModel(payload: BulkUserIdsPayload) {
      return useServices().admin.users.assignModelStatusAdmin(payload)
    },

    async revokeFromModels(payload: BulkUserIdsPayload) {
      return useServices().admin.users.revokeModelStatusAdmin(payload)
    },

    async attachBackgroundsToUserListAdmin(id: number, requestBody: { background_ids: Array<number> }) {
      return useServices().admin.userLists.attachBackgroundsToUserListAdmin(id, requestBody)
    },

    async detachBackgroundsFromUserListAdmin(id: number, requestBody: { background_ids: Array<number> }) {
      return useServices().admin.userLists.detachBackgroundsFromUserListAdmin(id, requestBody)
    },

    async addToBlock(payload: BulkUserIdsPayload) {
      return useServices().admin.users.blockUsersAdmin(payload)
    },

    async unlockUsers(payload: BulkUserIdsPayload) {
      return useServices().admin.users.unblockUsersAdmin(payload)
    },

    async getUsers(params?: GetFilteredUsersAdminParams) {
      return useServices().admin.users.getFilteredUsersAdmin(
        params?.search,
        params?.isoCountryCodeId,
        params?.backgroundId,
        params?.linkThemeId,
        params?.name,
        params?.slug,
        params?.bio,
        params?.email,
        params?.userType,
        params?.createdAtFrom,
        params?.createdAtTo,
        params?.sortField,
        params?.sortOrder,
        params?.perPage,
        params?.page,
      )
    },

    async getUserList(payload?: { page: number, perPage: number }): Promise<AdminUserList> {
      if (payload) {
        return useServices().admin.userLists.getUserListsAdmin(payload.page, payload.perPage)
      }
      else {
        return useServices().admin.userLists.getUserListsAdmin()
      }
    },

    async updateBackground(id: number, formData: Parameters<typeof AdminBackgroundsService.updateBackgroundAdmin>[1]) {
      return useServices().admin.backgrounds.updateBackgroundAdmin(id, formData)
    },

    async getBackgroundById(id: number): Promise<AdminBackground> {
      return useServices().admin.backgrounds.getBackgroundByIdAdmin(id)
    },

    async getUserAnalytics(id: number) {
      return useServices().admin.userLists.getUserListByIdAdmin(id)
    },

    async getUserListByIdAnalytics({ id}: { id: number }) {
      return useServices().admin.userLists.getUsersFromUserListAdmin(id)
    },

    async fetchUserAnalytics({ userId, dateStart, dateEnd, period }: FetchUserAnalyticsParams) {
      return useServices().admin.analytics.adminGetUserAnalytics(userId, dateStart, dateEnd, period)
    },

  },

  persist: [
    createTokenPersistConfig(),
    {
      storage: piniaPluginPersistedstate.sessionStorage(),
      pick: ['currentUser'],
    },
  ],
})
