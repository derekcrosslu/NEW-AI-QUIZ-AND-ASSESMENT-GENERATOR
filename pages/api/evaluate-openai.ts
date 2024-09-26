import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { question, userAnswer, correctAnswer, questionType } = req.body

  if (!question || !userAnswer || !correctAnswer || !questionType) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    console.log('Received request:', { question, userAnswer, correctAnswer, questionType })

    const prompt = `
Question: ${question}
Correct Answer: ${correctAnswer}
User Answer: ${userAnswer}
Question Type: ${questionType}

Evaluate the user's answer based on the following criteria:
1. Correctness: Is the answer factually correct?
2. Completeness: Does the answer address all parts of the question?
3. Clarity: Is the answer clear and well-explained?

Provide feedback in the following format:
Evaluation: [Correct/Partially Correct/Incorrect]
Feedback: [Detailed feedback explaining the evaluation]
`

    console.log('Sending request to OpenAI API')
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an AI assistant that evaluates answers to questions." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150,
    })
    console.log('Received response from OpenAI API:', completion)

    const response = completion.choices[0].message.content?.trim()
    const [evaluationLine, feedbackLine] = response?.split('\n') ?? []
    const evaluation = evaluationLine?.split(': ')[1]
    const feedback = feedbackLine?.split(': ')[1]

    const isCorrect = evaluation?.toLowerCase() === 'correct'

    console.log('Sending response:', { isCorrect, feedback })
    res.status(200).json({ isCorrect, feedback })
  } catch (error) {
    console.error('Detailed error:', error)
    res.status(500).json({ message: 'Error evaluating answer', error: error.message, stack: error.stack })
  }
}