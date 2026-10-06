import type { LoginResponse } from '~/generatedApi/models/LoginResponse'

export interface TokenState {
  access_token: Nullable<string>
  expired_token: Nullable<string>
  refresh_token: string | undefined
}

export type SetTokenPayload = Pick<LoginResponse, 'access_token' | 'refresh_token'>

export function createTokenState(): TokenState {
  return {
    access_token: null,
    expired_token: null,
    refresh_token: undefined,
  }
}

export const TOKEN_PERSIST_PATHS = ['access_token', 'refresh_token'] as const

export function createTokenPersistConfig() {
  return {
    storage: piniaPluginPersistedstate.cookies({ sameSite: 'lax' as const }),
    pick: [...TOKEN_PERSIST_PATHS],
  }
}
