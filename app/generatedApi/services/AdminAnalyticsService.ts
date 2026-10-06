/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyticsVisitsResponse } from '../models/AnalyticsVisitsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminAnalyticsService {
    /**
     * Get analytics for a specific user (admin)
     * Returns aggregated analytics (visits, clicks, CTR, device/OS and country breakdowns, top links) for the selected user within a period.
     * @param id User ID to fetch analytics for
     * @param start Start datetime
     * @param end End datetime
     * @param period Aggregation period
     * @returns AnalyticsVisitsResponse Successful response
     * @throws ApiError
     */
    public static adminGetUserAnalytics(
        id: number,
        start: string,
        end: string,
        period: 'minute' | 'hour' | 'day' | 'month' = 'hour',
    ): CancelablePromise<AnalyticsVisitsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/users/{id}/analytics',
            path: {
                'id': id,
            },
            query: {
                'start': start,
                'end': end,
                'period': period,
            },
            errors: {
                401: `Unauthorized`,
                404: `User not found`,
                422: `Validation error`,
            },
        });
    }
}
