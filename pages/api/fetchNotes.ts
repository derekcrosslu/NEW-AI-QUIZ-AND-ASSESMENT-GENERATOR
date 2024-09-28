import { createClient } from 'redis';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });

  try {
    await client.connect();
    console.log('Connected to Redis');

    // Fetch all keys
    const keys = await client.keys('*');
    console.log(`Found ${keys.length} keys in Redis`);

    // Fetch all values
    const notesPromises = keys.map(key => client.get(key));
    const notesRaw = await Promise.all(notesPromises);

    // Parse the JSON strings back into objects
    const notes = notesRaw.map(note => note ? JSON.parse(note) : null).filter(Boolean);
    console.log(`Parsed ${notes.length} notes from Redis`);

    await client.disconnect();
    console.log('Disconnected from Redis');

    res.status(200).json(notes);
  } catch (error) {
    console.error('Failed to fetch notes from Redis:', error);
    res.status(500).json({ error: 'Failed to fetch notes from Redis', details: error.message });
  } finally {
    if (client.isOpen) {
      await client.disconnect();
      console.log('Disconnected from Redis after error');
    }
  }
}