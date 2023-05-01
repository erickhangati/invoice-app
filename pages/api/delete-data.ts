import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '../../data/db';

type Data = {
  status: string;
  results?: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'DELETE') return;

  const { invoiceCollection, client } = await getConnection();
  const results = await invoiceCollection.deleteMany({});
  client.close();

  res.status(200).json({ status: 'success', results });
};

export default handler;
