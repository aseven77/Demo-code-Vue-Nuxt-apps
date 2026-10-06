import type {
  CountryBreakdownItem,
  DeviceTypeBreakdown,
  Summary,
  SummaryClickRate,
  TopLinkItem,
  VisitPoint,
} from '~/generatedApi'

export interface AnalyticsPeriod {
  label: string
  value: string
  period: Periods
  days: number
}

export interface AnalyticsMetricIndicator {
  icon: string
  name: string
  value: string | number | null
}

export interface Metric {
  icon: string
  name: string
  value: string
  percent: number
  status: string
  tooltip?: string
}

export interface Devices {
  name: string
  value: string | number
  color: string
}

export interface ListTopItem {
  id: number
  icon?: string
  photo?: string
  name: string
  value: number
}

export interface AnalyticVisit {
  period: string
  visit: string
}

export interface AnalyticsState {
  period: Periods
  dateStart: Date
  dateEnd: Date
  loading: boolean
  analytics: AnalyticsResponse | Record<string, never>
  days: number
  isRangeSet: boolean
}

export enum Periods {
  Minute = 'minute',
  Day = 'day',
  Hour = 'hour',
  Month = 'month',
}

export interface countryBreakdown {
  countryCode: string
  percent: number
}

export interface AnalyticsResponse {
  visits: Array<VisitPoint>
  summary: Summary
  summaryClicks: Summary
  summaryClickRate: SummaryClickRate
  deviceOsBreakdown: Array<DeviceTypeBreakdown>
  countryBreakdown: Array<CountryBreakdownItem>
  topLinks: Array<TopLinkItem>
}

export interface AnalyticsUserInfo {
  clientRegion: string
  clientDeviceType: string
  clientOs: string
}

export interface AnalyticsUserLinkClickArgs extends AnalyticsUserInfo {
  id: number
}

export interface FetchAnalyticsParams {
  start: string
  end: string
  period: 'minute' | 'hour' | 'day' | 'month'
}
