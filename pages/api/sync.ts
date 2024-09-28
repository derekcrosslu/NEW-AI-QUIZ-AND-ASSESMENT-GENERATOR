import { createClient } from 'redis';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  console.log('Received sync request:', req.body)

  const { key, content } = req.body;

  const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });

  try {
    await client.connect();
    console.log('Connected to Redis')

    await client.set(key, content);
    console.log(`Saved to Redis. Key: ${key}, Content:`, content)

    await client.disconnect();
    console.log('Disconnected from Redis')

    res.status(200).json({ message: 'Note synced successfully' });
  } catch (error) {
    console.error('Failed to sync note with Redis:', error);
    res.status(500).json({ error: 'Failed to sync note with Redis' });
  }
}