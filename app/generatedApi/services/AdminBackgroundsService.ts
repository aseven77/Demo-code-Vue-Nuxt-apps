/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminBackground } from '../models/AdminBackground';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminBackgroundsService {
    /**
     * Get all backgrounds (admin)
     * Returns a paginated list of all backgrounds available in the system
     * @param perPage Items per page (default 15)
     * @param isSelectable Filter by is_selectable flag
     * @param isDefault Filter by is_default flag
     * @param isBasic Filter by is_basic flag
     * @param userId Filter by user_id. Pass the string 'null' to select records with NULL user_id.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getAllBackgroundsAdmin(
        perPage?: number,
        isSelectable?: boolean,
        isDefault?: boolean,
        isBasic?: boolean,
        userId?: (number | 'null'),
    ): CancelablePromise<{
        data?: Array<AdminBackground>;
        links?: {
            first?: Array<string>;
            last?: Array<string>;
            prev?: Array<string | null>;
            next?: Array<string | null>;
        };
        meta?: {
            current_page?: Array<number>;
            from?: Array<number>;
            last_page?: Array<number>;
            links?: Array<{
                url?: string | null;
                label?: string;
                active?: boolean;
            }>;
            path?: string;
            per_page?: Array<number>;
            to?: Array<number>;
            total?: Array<number>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/backgrounds',
            query: {
                'per_page': perPage,
                'is_selectable': isSelectable,
                'is_default': isDefault,
                'is_basic': isBasic,
                'user_id': userId,
            },
            errors: {
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create a new background (admin)
     * Creates a new background with the specified data
     * @param formData
     * @returns AdminBackground Background created successfully
     * @throws ApiError
     */
    public static createBackgroundAdmin(
        formData: {
            name: string;
            description?: string | null;
            /**
             * User ID to assign this background to (null for system-wide)
             */
            user_id?: number | null;
            /**
             * Whether this background can be selected by users
             */
            is_selectable: boolean;
            /**
             * Whether this background is default
             */
            is_default: boolean;
            /**
             * Whether this background is a basic background
             */
            is_basic: boolean;
            /**
             * Custom fill image (jpeg,png,jpg,webp,avif,heic,heif, 10KB-20MB)
             */
            fill_custom_image?: Blob;
            /**
             * Custom background image (jpeg,png,jpg,webp,avif,heic,heif, 10KB-20MB)
             */
            background_custom_image?: Blob;
            /**
             * Pattern view image (jpeg,png,jpg,webp,avif,heic,heif, 10KB-20MB)
             */
            pattern_view_image?: Blob;
            /**
             * Pattern preview image (jpeg,png,jpg,webp,avif,heic,heif, 10KB-20MB)
             */
            pattern_preview_image?: Blob;
            fill?: {
                gradient?: string | null;
                color?: string | null;
                custom?: string | null;
            } | null;
            background?: {
                gradient?: string | null;
                color?: string | null;
                custom?: string | null;
            } | null;
            user_image?: {
                border?: string | null;
                fill?: string | null;
                icon?: string | null;
            } | null;
            typography?: {
                text?: string | null;
            } | null;
            border?: {
                width?: string | null;
                style?: string | null;
                color?: string | null;
            } | null;
            link?: {
                border?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
                background?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
                text?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
                leading?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
                trailing?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
            } | null;
            action_button?: {
                background?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
                text?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
            } | null;
            pattern?: {
                /**
                 * Pattern view identifier
                 */
                view?: string | null;
                /**
                 * Pattern preview identifier
                 */
                preview?: string | null;
                position?: {
                    /**
                     * Horizontal position
                     */
                    'x'?: string | null;
                    /**
                     * Vertical position
                     */
                    'y'?: string | null;
                } | null;
            } | null;
            preview?: {
                social_links_type?: 'default' | 'inversion' | null;
            } | null;
        },
    ): CancelablePromise<AdminBackground> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/backgrounds',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Unauthorized`,
                422: `Validation error`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a specific background by ID (admin)
     * Returns detailed information about a specific background
     * @param id ID of the background
     * @returns AdminBackground Successful response
     * @throws ApiError
     */
    public static getBackgroundByIdAdmin(
        id: number,
    ): CancelablePromise<AdminBackground> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/backgrounds/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Background not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update a background by ID (admin)
     * Updates the specified background with new data
     * @param id ID of the background to update
     * @param formData
     * @returns AdminBackground Background updated successfully
     * @throws ApiError
     */
    public static updateBackgroundAdmin(
        id: number,
        formData: {
            name: string;
            description?: string | null;
            /**
             * User ID to assign this background to (null for system-wide)
             */
            user_id?: number | null;
            /**
             * Whether this background can be selected by users
             */
            is_selectable: boolean;
            /**
             * Whether this background is default
             */
            is_default: boolean;
            /**
             * Whether this background is a basic background
             */
            is_basic: boolean;
            /**
             * Custom fill image (jpeg,png,jpg,webp,avif,heic,heif, 10KB-20MB)
             */
            fill_custom_image?: Blob;
            /**
             * Custom background image (jpeg,png,jpg,webp,avif,heic,heif, 10KB-20MB)
             */
            background_custom_image?: Blob;
            /**
             * Pattern view image (jpeg,png,jpg,webp,avif,heic,heif, 10KB-20MB)
             */
            pattern_view_image?: Blob;
            /**
             * Pattern preview image (jpeg,png,jpg,webp,avif,heic,heif, 10KB-20MB)
             */
            pattern_preview_image?: Blob;
            /**
             * Remove current fill custom image (ignored if a new fill_custom_image is provided)
             */
            remove_fill_custom_image?: boolean;
            /**
             * Remove current background custom image (ignored if a new background_custom_image is provided)
             */
            remove_background_custom_image?: boolean;
            /**
             * Remove current pattern view image (ignored if a new pattern_view_image is provided)
             */
            remove_pattern_view_image?: boolean;
            /**
             * Remove current pattern preview image (ignored if a new pattern_preview_image is provided)
             */
            remove_pattern_preview_image?: boolean;
            fill?: {
                gradient?: string | null;
                color?: string | null;
                custom?: string | null;
            } | null;
            background?: {
                gradient?: string | null;
                color?: string | null;
                custom?: string | null;
            } | null;
            user_image?: {
                border?: string | null;
                fill?: string | null;
                icon?: string | null;
            } | null;
            typography?: {
                text?: string | null;
            } | null;
            border?: {
                width?: string | null;
                style?: string | null;
                color?: string | null;
            } | null;
            link?: {
                border?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
                background?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
                text?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
                leading?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
                trailing?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
            } | null;
            action_button?: {
                background?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
                text?: {
                    default?: string | null;
                    hover?: string | null;
                    active?: string | null;
                } | null;
            } | null;
            pattern?: {
                /**
                 * Pattern view identifier
                 */
                view?: string | null;
                /**
                 * Pattern preview identifier
                 */
                preview?: string | null;
                position?: {
                    /**
                     * Horizontal position
                     */
                    'x'?: string | null;
                    /**
                     * Vertical position
                     */
                    'y'?: string | null;
                } | null;
            } | null;
            preview?: {
                social_links_type?: 'default' | 'inversion' | null;
            } | null;
        },
    ): CancelablePromise<AdminBackground> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/backgrounds/{id}',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Unauthorized`,
                404: `Background not found`,
                422: `Validation error`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Delete a background by ID (admin)
     * Deletes the specified background
     * @param id ID of the background to delete
     * @returns any Background deleted successfully
     * @throws ApiError
     */
    public static deleteBackgroundAdmin(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/backgrounds/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Background not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Upload image for a background (admin)
     * Uploads and crops an image for the specified background
     * @param formData
     * @returns any Background image uploaded and updated
     * @throws ApiError
     */
    public static uploadBackgroundImageAdmin(
        formData: {
            /**
             * Background ID
             */
            id: number;
            /**
             * Image file
             */
            image: Blob;
        },
    ): CancelablePromise<{
        id?: number;
        name?: string;
        image?: string;
        description?: string;
        is_selectable?: number;
        created_at?: string;
        updated_at?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/background-image',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Validation error`,
                500: `Internal server error`,
            },
        });
    }
}
