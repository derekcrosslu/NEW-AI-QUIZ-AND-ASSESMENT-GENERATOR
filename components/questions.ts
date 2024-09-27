'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface QuestionType {
  id: number;
  type: 'multiple_choice' | 'code' | 'open_ended';
  question: string;
  choices: string[] | null;
  correctAnswer: string;
  explanation: string | null;
  flag:'dont-ask-again' | 'ask-less-often' | 'pass' | null;
}

export default function useQuestions() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchQuestions = async () => {
    setLoading(true);
    const timestamp = new Date().getTime();
    try {
      const response = await axios.get(`/questions.json?t=${timestamp}`);
      if (response.data && Array.isArray(response.data.questions)) {
        const allQuestions = response.data.questions[0]; // Access the nested array
        
        const shuffledQuestions = shuffleArray([...allQuestions]);
       
        setQuestions(shuffledQuestions);
      } else {
        setError('Unexpected data format received from the server');
        console.error('Unexpected data format:', response.data);
      }
    } catch (error) {
      setError('Failed to fetch questions');
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  return { questions, loading, error };
}