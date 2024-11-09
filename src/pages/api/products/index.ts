// src/pages/api/products/index.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { withSecurity } from '../../../middleware/security'
import clientPromise from '../../../lib/mongodb'

export default withSecurity(async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const client = await clientPromise
  const db = client.db()

  switch (method) {
    case 'GET':
      try {
        const { page = '1', limit = '20' } = req.query
        const products = await db.collection('products')
          .find({ status: 'available' })
          .sort({ createdAt: -1 })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .toArray()

        res.status(200).json(products)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' })
      }
      break

    case 'POST':
      try {
        const { name, description, price, imageUrl } = req.body
        const session = await getSession({ req })

        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' })
        }

        const product = await db.collection('products').insertOne({
          sellerId: session.userId,
          name,
          description,
          price,
          imageUrl,
          status: 'available',
          createdAt: new Date(),
          updatedAt: new Date(),
        })

        res.status(201).json(product)
      } catch (error) {
        res.status(500).json({ error: 'Failed to create product' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})

