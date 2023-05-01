import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import { getConnection } from '../../../data/db';

type Data = {
  results?: any;
  status: string;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { invoiceId } = req.query;
  const data = req.body;

  if (req.method === 'GET') {
    try {
      const { client, invoiceCollection } = await getConnection();
      const results = await invoiceCollection.findOne({ id: invoiceId });

      res.status(200).json({ status: 'success', results });
      client.close();
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

  if (req.method === 'PATCH') {
    try {
      const { client, invoiceCollection } = await getConnection();
      const { status, objectId } = req.body;
      const id = new ObjectId(objectId);

      const results = await invoiceCollection.findOneAndUpdate(
        { _id: id },
        { $set: { status } }
      );

      res.status(200).json({ status: 'success', results });
      client.close();
      return;
    } catch (error) {
      const { client } = await getConnection();
      res.status(500).json({
        status: 'failed',
        message: 'Failed to update!',
      });
      client.close();
      return;
    }
  }

  if (req.method === 'PUT') {
    try {
      const { client, invoiceCollection } = await getConnection();
      const id = new ObjectId(data._id);
      delete data._id;

      const results = await invoiceCollection.findOneAndReplace(
        { _id: id },
        data
      );

      res.status(200).json({ status: 'success', results });
      client.close();
      return;
    } catch (error) {
      const { client } = await getConnection();
      res.status(500).json({
        status: 'failed',
        message: 'Failed to update!',
      });
      client.close();
      return;
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { client, invoiceCollection } = await getConnection();
      const results = await invoiceCollection.findOneAndDelete({
        id: invoiceId,
      });

      res.status(200).json({ status: 'success', results });
      client.close();
      return;
    } catch (error) {
      const { client } = await getConnection();
      res.status(500).json({
        status: 'failed',
        message: 'Failed to delete!',
      });
      client.close();
      return;
    }
  }

  res.status(200).json({ status: 'success' });
};

export default handler;
