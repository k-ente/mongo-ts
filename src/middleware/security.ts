// src/middleware/security.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分
  max: 100
})

export const withSecurity = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // セキュリティヘッダー設定
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

    // レート制限
    await new Promise((resolve) => limiter(req, res, resolve))

    // CSRF対策
    if (req.method !== 'GET' && !req.headers['csrf-token']) {
      return res.status(403).json({ error: 'CSRF token missing' })
    }

    return handler(req, res)
  }
}

