/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Background } from './Background';
import type { PublicLink } from './PublicLink';
/**
 * User object with background and links
 */
export type User = {
    id?: number;
    background?: Background | null;
    theme_image?: string | null;
    link_theme_id?: number | null;
    iso_country_code_id?: number;
    name?: string | null;
    slug?: string;
    email?: string;
    email_verified_at?: string;
    /**
     * Indicates whether the onboarding process is completed
     */
    is_onboarding_passed?: boolean;
    /**
     * Indicates whether the user must reset their password
     */
    force_password_reset?: boolean;
    /**
     * Timestamp when account deletion was requested
     */
    pending_delete_at?: string | null;
    /**
     * Indicates whether the account is pending deletion
     */
    is_pending_deletion?: boolean;
    /**
     * Timestamp when the 30-day grace period ends and account will be deleted
     */
    deletion_grace_period_ends_at?: string | null;
    /**
     * The new email address awaiting confirmation
     */
    new_email?: string | null;
    bio?: string | null;
    image?: string | null;
    qr_code?: string | null;
    links?: Array<PublicLink>;
};

