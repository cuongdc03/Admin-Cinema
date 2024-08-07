export const BASE_URL: string = import.meta.env.VITE_BASE_URL
export const NODE_ENV: string = import.meta.env.NODE_ENV
export const CONTENT_TYPE_JSON: string = 'application/json; charset=utf-8'
export const CSRF_HEADER: string = 'X-CSRF-Token'
export const SAME_ORIGIN: RequestCredentials = 'same-origin'
export const CORS_MODE: RequestMode = 'cors'
export const ABORT_ERROR_STATUS: number = 499
export const ABORT_ERROR_NAME: string = 'AbortError'
export const ABORT_ERROR_MESSAGE: string = 'Abort Error'

export const METHODS_WITH_CSRF_TOKEN: string[] = ['POST', 'PUT', 'PATCH']
export const METHODS_WITH_BODY: string[] = ['POST', 'PUT', 'PATCH']

export const STATUS_UNAUTHORIZED = 401
