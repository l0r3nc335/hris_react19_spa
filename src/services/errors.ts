import axios from 'axios'
import type { ApiErrorBody } from '@/types/api'

export function normalizeApiError(error: unknown): ApiErrorBody {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Partial<ApiErrorBody> | undefined
    return {
      code: data?.code ?? 'UNKNOWN_ERROR',
      message: data?.message ?? error.message,
      status: error.response?.status ?? 500,
      details: data?.details,
    }
  }
  return {
    code: 'UNKNOWN_ERROR',
    message: error instanceof Error ? error.message : 'An unexpected error occurred',
    status: 500,
  }
}
