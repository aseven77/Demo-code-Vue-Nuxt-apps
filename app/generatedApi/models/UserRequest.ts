/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Request to create or update user profile
 */
export type UserRequest = {
    name: string | null;
    bio: string | null;
    slug: string;
    /**
     * From GET /backgrounds
     */
    background_id: number;
    link_theme_id: number | null;
};

