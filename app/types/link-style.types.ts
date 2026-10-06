export enum LinkLayout {
  CLASSIC = 'classic',
  BANNER_MEDIUM = 'banner_medium',
  BANNER_MAX = 'banner_max',
}

export interface TextColorConfig {
  type: 'solid' | 'gradient'
  /** Hex color for solid type, e.g. '#000000' */
  value?: string
  /** Hex color for gradient start */
  gradient_start?: string
  /** Hex color for gradient end */
  gradient_end?: string
}

/**
 * Background configuration for a link button.
 * Note: `type: 'image'` is response-only — derived from `link.background_image != null`.
 * Client sends only 'solid' | 'gradient' in request body.
 */
export interface BackgroundConfig {
  type: 'solid' | 'gradient' | 'image'
  /** Hex color for solid type */
  value?: string
  /** Hex color for gradient start */
  gradient_start?: string
  /** Hex color for gradient end */
  gradient_end?: string
}

export interface StyleConfig {
  text_color: TextColorConfig | null
  background: BackgroundConfig | null
}

/** Minimal link shape needed by style-related components (avoids casting partial objects to full Link) */
export interface StyleLinkPartial {
  id?: number
  title?: string
  url?: string
  layout?: LinkLayout
  style_config?: StyleConfig | null
  background_image?: string | null
  thumbnail?: string | null
}
