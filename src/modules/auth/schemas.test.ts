import { describe, expect, it } from 'vitest'
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from '@/modules/auth/schemas'

describe('auth schemas', () => {
  describe('loginSchema', () => {
    it('accepts valid credentials', () => {
      const result = loginSchema.safeParse({
        email: 'user@example.com',
        password: 'secret1',
      })
      expect(result.success).toBe(true)
    })

    it('rejects short passwords', () => {
      const result = loginSchema.safeParse({
        email: 'user@example.com',
        password: '123',
      })
      expect(result.success).toBe(false)
    })

    it('rejects invalid email', () => {
      const result = loginSchema.safeParse({
        email: 'not-an-email',
        password: 'secret1',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('registerSchema', () => {
    it('accepts valid registration data', () => {
      const result = registerSchema.safeParse({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'secret1',
      })
      expect(result.success).toBe(true)
    })

    it('requires first and last name', () => {
      const result = registerSchema.safeParse({
        firstName: '',
        lastName: '',
        email: 'jane@example.com',
        password: 'secret1',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('forgotPasswordSchema', () => {
    it('accepts a valid email', () => {
      const result = forgotPasswordSchema.safeParse({ email: 'user@example.com' })
      expect(result.success).toBe(true)
    })
  })

  describe('resetPasswordSchema', () => {
    it('accepts matching passwords', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'secret1',
        confirmPassword: 'secret1',
      })
      expect(result.success).toBe(true)
    })

    it('rejects mismatched passwords', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'secret1',
        confirmPassword: 'secret2',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Passwords do not match')
      }
    })
  })
})
