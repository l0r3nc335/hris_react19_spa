import axios from 'axios'
import { describe, expect, it } from 'vitest'
import { normalizeApiError } from '@/services/errors'

describe('normalizeApiError', () => {
  it('maps axios errors with response body', () => {
    const error = new axios.AxiosError(
      'Request failed',
      'ERR_BAD_REQUEST',
      undefined,
      undefined,
      {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: {} as never,
        data: { code: 'VALIDATION_ERROR', message: 'Invalid email' },
      },
    )

    expect(normalizeApiError(error)).toEqual({
      code: 'VALIDATION_ERROR',
      message: 'Invalid email',
      status: 400,
      details: undefined,
    })
  })

  it('falls back for axios errors without response body', () => {
    const error = new axios.AxiosError('Network Error')
    expect(normalizeApiError(error)).toEqual({
      code: 'UNKNOWN_ERROR',
      message: 'Network Error',
      status: 500,
    })
  })

  it('maps generic Error instances', () => {
    expect(normalizeApiError(new Error('Boom'))).toEqual({
      code: 'UNKNOWN_ERROR',
      message: 'Boom',
      status: 500,
    })
  })

  it('maps unknown values', () => {
    expect(normalizeApiError('oops')).toEqual({
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
      status: 500,
    })
  })
})
