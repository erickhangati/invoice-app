import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '../../../data/db';

type Data = {
  status: string;
  results?: any;
  error?: any;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    try {
      const { invoiceCollection, client } = await getConnection();
      const results = await invoiceCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      res.status(200).json({
        status: 'success',
        results,
      });

      await client.close();
      return;
    } catch (error) {
      const { client } = await getConnection();
      res.status(500).json({
        status: 'failed',
        message: 'Failed to fetch data!',
      });

      client.close();
      return;
    }
  }

  if (req.method === 'POST') {
    try {
      const { invoiceCollection, client } = await getConnection();
      const data = req.body;
      const results = await invoiceCollection.insertOne(data);

      res.status(200).json({
        status: 'success',
        results,
      });

      client.close();
      return;
    } catch (error) {
      const { client } = await getConnection();
      res.status(500).json({
        status: 'failed',
        message: 'Failed to post data!',
      });

      client.close();
      return;
    }
  }

  res.status(200).json({ status: 'success' });
};

export default handler;
