import { MongoClient } from 'mongodb';

export const getConnection = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.ldtv9dk.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  );

  const db = client.db();
  const invoiceCollection = db.collection('invoices');

  return { invoiceCollection, client };
};
