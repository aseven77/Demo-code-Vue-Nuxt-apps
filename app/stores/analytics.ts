import { defineStore } from 'pinia'
import type {
  AnalyticsResponse,
  AnalyticsState,
  AnalyticsUserLinkClickArgs,
  FetchAnalyticsParams,
} from '~/types/analytics.types'
import { Periods } from '~/types/analytics.types'
import type { AnalyticsVisitsResponse } from '~/generatedApi'

export const useAnalyticsStore = defineStore('analytics', {
  state: (): AnalyticsState => {
    const now = new Date()
    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(now.getDate() - 30)

    return {
      period: Periods.Day,
      dateStart: thirtyDaysAgo,
      dateEnd: now,
      loading: false,
      analytics: {} as AnalyticsResponse,
      days: 30,
      isRangeSet: false,
    }
  },

  actions: {
    async fetchAll({ start, end, period }: FetchAnalyticsParams): Promise<AnalyticsVisitsResponse> {
      return useServices().analytics.cd4Dbf642Bc5A3F2Ac31309045A6A4F2(start, end, period)
    },

    async loadAnalytics(fetcher: () => Promise<AnalyticsResponse>) {
      this.loading = true
      try {
        this.analytics = await fetcher()
      }
      finally {
        this.loading = false
      }
    },

    async userSocialLinkClick(params: AnalyticsUserLinkClickArgs): Promise<{ status?: string } | undefined> {
      const { clientOs, clientDeviceType, clientRegion, id } = params
      return useServices().links.clickLink(id, clientRegion, clientDeviceType, clientOs)
    },
  },

  getters: {
    visits: state => (state.analytics as AnalyticsResponse).visits || [],

    summary: state => (state.analytics as AnalyticsResponse).summary || null,

    summaryClicks: state => (state.analytics as AnalyticsResponse).summaryClicks || null,

    summaryClickRate: state => (state.analytics as AnalyticsResponse).summaryClickRate || null,

    deviceOsBreakdown: state => (state.analytics as AnalyticsResponse).deviceOsBreakdown || [],

    countryBreakdown: state => (state.analytics as AnalyticsResponse).countryBreakdown || [],

    topLinks: state => (state.analytics as AnalyticsResponse).topLinks || [],

    currentDaysPeriod: state => state.days,
  },
})
