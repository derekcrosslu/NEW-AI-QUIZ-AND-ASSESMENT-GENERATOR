import type { NextApiRequest, NextApiResponse } from 'next'
import { Anthropic } from '@anthropic-ai/sdk'

const apiKey = process.env.ANTHROPIC_API_KEY

if (!apiKey) {
  console.error('Anthropic API key is not set. Please check your environment variables.')
}

const anthropic = new Anthropic({ apiKey: apiKey || 'dummy-key' })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { question, userAnswer, correctAnswer } = req.body

    try {
      const response = await anthropic.completions.create({
        model: 'claude-2',
        prompt: `\n\nHuman: Evaluate this answer. Question: ${question}\nUser's answer: ${userAnswer}\nCorrect answer: ${correctAnswer}\n\nIs the user's answer correct? Respond with 'yes' or 'no' and provide a brief explanation.\n\nAssistant: I'll evaluate the user's answer and provide a response.`,
        max_tokens_to_sample: 250,
        stop_sequences: ["\n\nHuman:"],
      })
      const aiResponse = response.completion.trim()
      const isCorrect = aiResponse.toLowerCase().startsWith('yes')
      
      res.status(200).json({ isCorrect, feedback: aiResponse })
    } catch (error) {
      console.error('Error evaluating answer:', error)
      res.status(500).json({ error: 'Failed to evaluate answer' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}