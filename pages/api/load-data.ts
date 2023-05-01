import { NextApiRequest, NextApiResponse } from 'next/types';
import path from 'path';
import fs from 'fs';

import { getConnection } from '../../data/db';

type Data = {
  status: string;
  results?: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'POST') return;

  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData.toString());

  const { invoiceCollection, client } = await getConnection();
  const results = await invoiceCollection.insertMany(data);
  client.close();

  res.status(200).json({ status: 'success', results });
};

export default handler;
