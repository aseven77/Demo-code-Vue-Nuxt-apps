/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginResponse } from '../models/LoginResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminAuthService {
    /**
     * Admin login
     * Authenticate an admin user and return a JWT token
     * @param requestBody
     * @returns LoginResponse Successful authentication
     * @throws ApiError
     */
    public static adminLogin(
        requestBody: {
            email: string;
            password: string;
        },
    ): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unauthorized`,
                404: `Validation error`,
                422: `Validation error`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Refresh admin JWT token
     * Refresh the authentication token for an admin user using a refresh token
     * @param requestBody
     * @returns LoginResponse Token refreshed successfully
     * @throws ApiError
     */
    public static refreshAdminToken(
        requestBody: {
            /**
             * This token will be revoked
             */
            refresh_token: string;
        },
    ): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/token/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid or expired refresh token`,
                422: `Validation error`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Logout admin user
     * Logout the currently authenticated admin user
     * @param requestBody
     * @returns any Logout successful
     * @throws ApiError
     */
    public static logoutAdmin(
        requestBody: {
            /**
             * This token will be revoked
             */
            refresh_token: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/logout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get the authenticated admin user
     * Returns the currently authenticated admin user's basic information
     * @returns any Successful response
     * @throws ApiError
     */
    public static getAuthenticatedAdmin(): CancelablePromise<{
        id?: number;
        email?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/me',
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
}
