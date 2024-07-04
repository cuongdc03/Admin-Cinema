import * as httpConstants from '../constants/httpConstants'
import { toast } from 'react-toastify'
import { getTokenFromLocalStorage } from './localStorage'

const ABORT_REQUEST_CONTROLLERS: Map<string, AbortController> = new Map()

interface RequestOptions {
  query?: Record<string, string | number | boolean>
  body?: Record<string, any>
  headers?: HeadersInit
  signalKey?: string
  _csrf?: string
  [key: string]: any
}

interface ErrorData {
  status: number
  message: string
}

export const request =
  (method: string) =>
  async (
    url: string,
    { query, body = {}, headers, signalKey, _csrf = '', ...rest }: RequestOptions = {}
  ): Promise<any> => {
    const addCSRFToken = httpConstants.METHODS_WITH_CSRF_TOKEN.includes(method)
    const addBody = httpConstants.METHODS_WITH_BODY.includes(method)

    try {
      const response = await fetch(getUrlPathWithQuery({ url, query }), {
        method,
        mode: httpConstants.CORS_MODE,
        headers: {
          'Content-Type': httpConstants.CONTENT_TYPE_JSON,
          ...(addCSRFToken && { [httpConstants.CSRF_HEADER]: _csrf }),
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          ...headers
        },
        credentials: httpConstants.SAME_ORIGIN,
        ...(signalKey && { signal: abortAndGetSignalSafe(signalKey) }),
        ...(addBody && { body: JSON.stringify(body) }),
        ...rest
      })

      return handleResponse(response)
    } catch (error) {
      return handleError(error)
    }
  }

export const customFetch = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
}

interface UrlQueryOptions {
  url: string
  query?: Record<string, string | number | boolean>
}

export const getUrlPathWithQuery = ({ url: partialUrl, query = {} }: UrlQueryOptions): string => {
  const url = new URL(partialUrl, httpConstants.BASE_URL)
  const searchParams = new URLSearchParams(
    Object.entries({
      ...Object.fromEntries(url.searchParams),
      ...query
    }).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value)
        return acc
      },
      {} as Record<string, string>
    )
  )

  return `${url.href}?${searchParams}`
}

const handleResponse = async (response: Response): Promise<any> => {
  if (response.ok) {
    return response.json()
  } else {
    const errorText = await response.text()
    const errorData: ErrorData = errorText ? JSON.parse(errorText) : {}
    return Promise.reject(errorData)
  }
}

const abortRequestSafe = (key: string, reason: string = httpConstants.ABORT_ERROR_NAME): void => {
  ABORT_REQUEST_CONTROLLERS.get(key)?.abort?.(reason)
}

const abortAndGetSignalSafe = (key: string): AbortSignal => {
  abortRequestSafe(key)
  const newController = new AbortController()
  ABORT_REQUEST_CONTROLLERS.set(key, newController)
  return newController.signal
}

const handleError = (error: any): Promise<never> => {
  const isAbortError = error === httpConstants.ABORT_ERROR_NAME

  return Promise.reject(
    isAbortError
      ? {
          status: httpConstants.ABORT_ERROR_STATUS,
          message: httpConstants.ABORT_ERROR_MESSAGE
        }
      : error
  )
}

export const showError = (error: ErrorData): void => {
  if (!isAbortError(error)) {
    toast.error(error.message)
  }
}

export const isAbortError = (error: any): boolean => {
  return error.status === httpConstants.ABORT_ERROR_STATUS
}