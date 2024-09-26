"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuestionComponent from './QuestionComponent'
import NotesList from './NotesList'
import CodeEditor from './CodeEditor'

interface Question {
  id: number
  type: 'multiple-choice' | 'open-ended' | 'coding'
  question: string
  choices?: string[]
  correctAnswer: string
  explanation: string
  flag: 'dont-ask-again' | 'ask-less-often' | 'pass' | null
}

interface Note {
  questionId: number
  question: string
  userAnswer: string
  explanation: string
  isCorrect: boolean
  notes: string
  versions: string[]
}

export function QuestionAnswerAppComponent() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [score, setScore] = useState(0)
  const [notes, setNotes] = useState<Note[]>([])
  const [activeTab, setActiveTab] = useState('question')

  useEffect(() => {
    // Fetch questions from an API or load from a local file
    // For now, we'll use a placeholder
    setQuestions([
      {
        "id": 1,
        "type": "code",
        "question": "Write a function that returns the sum of two numbers.",
        "choices": null,
        "correctAnswer": "function sum(a, b) {\n  return a + b;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 2,
        "type": "open-ended",
        "question": "Explain the concept of object-oriented programming.",
        "choices": null,
        "correctAnswer": "Object-oriented programming is a programming paradigm based on the concept of 'objects', which can contain data and code.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 3,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(typeof null);",
        "choices": [
          "null",
          "object",
          "undefined",
          "string"
        ],
        "correctAnswer": "object",
        "explanation": null,
        "flag": null
      },
      {
        "id": 4,
        "type": "code",
        "question": "Write a function that takes an array of numbers and returns the largest number.",
        "choices": null,
        "correctAnswer": "function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 5,
        "type": "open-ended",
        "question": "Explain the difference between let, const, and var in JavaScript.",
        "choices": null,
        "correctAnswer": "let and const are block-scoped, while var is function-scoped. const variables cannot be reassigned, while let and var variables can be reassigned.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 6,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(3 + '3');",
        "choices": [
          "6",
          "33",
          "63",
          "Error"
        ],
        "correctAnswer": "33",
        "explanation": null,
        "flag": null
      },
      {
        "id": 7,
        "type": "code",
        "question": "Write a function that takes a string and returns the reverse of that string.",
        "choices": null,
        "correctAnswer": "function reverseString(str) {\n  return str.split('').reverse().join('');\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 8,
        "type": "open-ended",
        "question": "Explain the difference between synchronous and asynchronous code in JavaScript.",
        "choices": null,
        "correctAnswer": "Synchronous code is executed in a single thread, one operation at a time. Asynchronous code allows for non-blocking operations, where the program can continue running while waiting for an operation to complete.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 9,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(typeof NaN);",
        "choices": [
          "number",
          "NaN",
          "undefined",
          "string"
        ],
        "correctAnswer": "number",
        "explanation": null,
        "flag": null
      },
      {
        "id": 10,
        "type": "code",
        "question": "Write a function that takes an array of numbers and returns the sum of all even numbers in the array.",
        "choices": null,
        "correctAnswer": "function sumEvenNumbers(arr) {\n  return arr.filter(num => num % 2 === 0).reduce((sum, num) => sum + num, 0);\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 11,
        "type": "open-ended",
        "question": "Explain the difference between the spread operator (...) and the rest parameter syntax (...) in JavaScript.",
        "choices": null,
        "correctAnswer": "The spread operator is used to spread the elements of an iterable into individual elements, while the rest parameter syntax is used to collect multiple values into a single array parameter in a function definition.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 12,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(false == '0');",
        "choices": [
          "true",
          "false",
          "Error",
          "undefined"
        ],
        "correctAnswer": "true",
        "explanation": null,
        "flag": null
      },
      {
        "id": 13,
        "type": "code",
        "question": "Write a function that takes a string and returns true if the string is a palindrome, and false otherwise.",
        "choices": null,
        "correctAnswer": "function isPalindrome(str) {\n  const reversed = str.split('').reverse().join('');\n  return str === reversed;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 14,
        "type": "open-ended",
        "question": "Explain the difference between the call, apply, and bind methods in JavaScript.",
        "choices": null,
        "correctAnswer": "call and apply are used to invoke a function with a specific 'this' value. Call takes individual arguments, apply takes an array of arguments. Bind returns a new function with a specific 'this' value.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 15,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(1 + '2' + '2');",
        "choices": [
          "122",
          "32",
          "5",
          "Error"
        ],
        "correctAnswer": "122",
        "explanation": null,
        "flag": null
      },
      {
        "id": 16,
        "type": "code",
        "question": "Write a function that takes an array of objects and returns a new array with only the unique objects based on a specific property.",
        "choices": null,
        "correctAnswer": "function getUniqueObjects(arr, prop) {\n  const seen = new Set();\n  return arr.filter(obj => {\n    const val = obj[prop];\n    if (seen.has(val)) return false;\n    seen.add(val);\n    return true;\n  });\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 17,
        "type": "open-ended",
        "question": "Explain the difference between the forEach and map methods in JavaScript.",
        "choices": null,
        "correctAnswer": "forEach is used to iterate over an array and perform an operation on each element, while map creates a new array by applying a function to each element of the original array.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 18,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(undefined == null);",
        "choices": [
          "true",
          "false",
          "Error",
          "undefined"
        ],
        "correctAnswer": "true",
        "explanation": null,
        "flag": null
      },
      {
        "id": 19,
        "type": "code",
        "question": "Write a function that takes a string and returns the number of occurrences of a specific character in that string.",
        "choices": null,
        "correctAnswer": "function countCharOccurrences(str, char) {\n  return str.split('').filter(c => c === char).length;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 20,
        "type": "open-ended",
        "question": "Explain the difference between the slice and splice methods in JavaScript.",
        "choices": null,
        "correctAnswer": "slice creates a new array by copying a portion of an existing array, while splice modifies the original array by adding, removing, or replacing elements.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 21,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(2 + 2 * 2);",
        "choices": [
          "4",
          "6",
          "8",
          "Error"
        ],
        "correctAnswer": "6",
        "explanation": null,
        "flag": null
      },
      {
        "id": 22,
        "type": "code",
        "question": "Write a function that takes an array of objects and returns a new array with only the objects that have a specific property value.",
        "choices": null,
        "correctAnswer": "function filterObjectsByProp(arr, prop, value) {\n  return arr.filter(obj => obj[prop] === value);\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 23,
        "type": "open-ended",
        "question": "Explain the difference between the arrow function syntax and the traditional function syntax in JavaScript.",
        "choices": null,
        "correctAnswer": "Arrow functions are a more concise syntax for writing function expressions, and they inherit the this value from the enclosing scope, while traditional functions have their own this value determined by how they are called.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 24,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(true + true + '2');",
        "choices": [
          "22",
          "4",
          "true2",
          "Error"
        ],
        "correctAnswer": "22",
        "explanation": null,
        "flag": null
      },
      {
        "id": 25,
        "type": "code",
        "question": "Write a function that takes a string and returns the number of words in that string.",
        "choices": null,
        "correctAnswer": "function countWords(str) {\n  return str.trim().split(/\\s+/).length;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 26,
        "type": "open-ended",
        "question": "Explain the difference between the Array.from and Array.of methods in JavaScript.",
        "choices": null,
        "correctAnswer": "Array.from creates a new array from an array-like or iterable object, while Array.of creates a new array with the provided arguments as its elements.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 27,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(2 ** 3);",
        "choices": [
          "6",
          "8",
          "9",
          "Error"
        ],
        "correctAnswer": "8",
        "explanation": null,
        "flag": null
      },
      {
        "id": 28,
        "type": "code",
        "question": "Write a function that takes an array of numbers and returns the second largest number.",
        "choices": null,
        "correctAnswer": "function findSecondLargest(arr) {\n  let max = -Infinity, secondMax = -Infinity;\n  for (const num of arr) {\n    if (num > max) {\n      secondMax = max;\n      max = num;\n    } else if (num > secondMax && num !== max) {\n      secondMax = num;\n    }\n  }\n  return secondMax;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 29,
        "type": "open-ended",
        "question": "Explain the difference between the for...in and for...of loops in JavaScript.",
        "choices": null,
        "correctAnswer": "The for...in loop iterates over the enumerable properties of an object, while the for...of loop iterates over the values of an iterable object, such as an array or string.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 30,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(1 + -'1' + 2);",
        "choices": [
          "2",
          "0",
          "12",
          "Error"
        ],
        "correctAnswer": "2",
        "explanation": null,
        "flag": null
      },
      {
        "id": 31,
        "type": "code",
        "question": "Write a function that takes a string and returns the first non-repeated character in that string.",
        "choices": null,
        "correctAnswer": "function firstNonRepeatedChar(str) {\n  for (const char of str) {\n    if (str.indexOf(char) === str.lastIndexOf(char)) {\n      return char;\n    }\n  }\n  return null;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 32,
        "type": "open-ended",
        "question": "Explain the difference between the Promise.all and Promise.race methods in JavaScript.",
        "choices": null,
        "correctAnswer": "Promise.all waits for all promises in an array to resolve and returns an array of their resolved values, while Promise.race returns the value of the first promise that resolves or rejects.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 33,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(2 > 1 || 2 < 1);",
        "choices": [
          "true",
          "false",
          "Error",
          "undefined"
        ],
        "correctAnswer": "true",
        "explanation": null,
        "flag": null
      },
      {
        "id": 34,
        "type": "code",
        "question": "Write a function that takes an array of objects and returns a new object with the count of each property value.",
        "choices": null,
        "correctAnswer": "function countPropertyValues(arr, prop) {\n  const counts = {};\n  for (const obj of arr) {\n    const val = obj[prop];\n    counts[val] = (counts[val] || 0) + 1;\n  }\n  return counts;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 35,
        "type": "open-ended",
        "question": "Explain the difference between the async/await syntax and traditional callback functions in JavaScript.",
        "choices": null,
        "correctAnswer": "async/await is a more modern and readable way to handle asynchronous code, allowing you to write asynchronous code that looks and behaves more like synchronous code, while callbacks are the traditional way of handling asynchronous operations, but can lead to callback hell and harder-to-read code.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 36,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(2 && 3);",
        "choices": [
          "2",
          "3",
          "true",
          "false"
        ],
        "correctAnswer": "3",
        "explanation": null,
        "flag": null
      },
      {
        "id": 37,
        "type": "code",
        "question": "Write a function that takes a string and returns the longest substring without repeating characters.",
        "choices": null,
        "correctAnswer": "function longestSubstringWithoutRepeats(str) {\n  let longest = '';\n  let seen = new Set();\n  let start = 0;\n  for (let i = 0; i < str.length; i++) {\n    const char = str[i];\n    if (!seen.has(char)) {\n      seen.add(char);\n      longest = longest.length > seen.size ? longest : str.slice(start, i + 1);\n    } else {\n      while (str[start] !== char) {\n        seen.delete(str[start]);\n        start++;\n      }\n      start++;\n      seen.clear();\n    }\n  }\n  return longest;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 38,
        "type": "open-ended",
        "question": "Explain the difference between the map, filter, and reduce methods in JavaScript.",
        "choices": null,
        "correctAnswer": "map creates a new array by applying a function to each element, filter creates a new array with elements that pass a test, and reduce applies a function against an accumulator to reduce an array to a single value.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 39,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(2 + '2' + 2);",
        "choices": [
          "42",
          "222",
          "24",
          "22"
        ],
        "correctAnswer": "222",
        "explanation": null,
        "flag": null
      },
      {
        "id": 40,
        "type": "code",
        "question": "Write a function that takes an array of strings and returns a new array with only the unique strings.",
        "choices": null,
        "correctAnswer": "function getUniqueStrings(arr) {\n  return [...new Set(arr)];\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 41,
        "type": "open-ended",
        "question": "Explain the difference between the == and === operators in JavaScript.",
        "choices": null,
        "correctAnswer": "The == operator performs type coercion before comparison, while the === operator does not perform type coercion and compares both value and type.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 42,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(true + true);",
        "choices": [
          "2",
          "true",
          "false",
          "Error"
        ],
        "correctAnswer": "2",
        "explanation": null,
        "flag": null
      },
      {
        "id": 43,
        "type": "code",
        "question": "Write a function that takes a string and returns the number of vowels in that string.",
        "choices": null,
        "correctAnswer": "function countVowels(str) {\n  const vowels = ['a', 'e', 'i', 'o', 'u'];\n  return str.split('').filter(char => vowels.includes(char.toLowerCase())).length;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 44,
        "type": "open-ended",
        "question": "Explain the difference between the Array.prototype.concat and Array.prototype.push methods in JavaScript.",
        "choices": null,
        "correctAnswer": "concat creates a new array by merging two or more arrays, while push adds one or more elements to the end of an existing array and returns the new length of the array.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 45,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(2 * '2');",
        "choices": [
          "4",
          "22",
          "NaN",
          "Error"
        ],
        "correctAnswer": "4",
        "explanation": null,
        "flag": null
      },
      {
        "id": 46,
        "type": "code",
        "question": "Write a function that takes an array of numbers and returns the second smallest number.",
        "choices": null,
        "correctAnswer": "function findSecondSmallest(arr) {\n  let min = Infinity, secondMin = Infinity;\n  for (const num of arr) {\n    if (num < min) {\n      secondMin = min;\n      min = num;\n    } else if (num < secondMin && num !== min) {\n      secondMin = num;\n    }\n  }\n  return secondMin === Infinity ? null : secondMin;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 47,
        "type": "open-ended",
        "question": "Explain the concept of closures in JavaScript.",
        "choices": null,
        "correctAnswer": "Closures are functions that have access to variables in their outer (enclosing) lexical scope, even after the outer function has returned.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 48,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(typeof []);",
        "choices": [
          "array",
          "object",
          "undefined",
          "null"
        ],
        "correctAnswer": "object",
        "explanation": null,
        "flag": null
      },
      {
        "id": 49,
        "type": "code",
        "question": "Write a function that removes duplicates from an array.",
        "choices": null,
        "correctAnswer": "function removeDuplicates(arr) {\n  return [...new Set(arr)];\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 50,
        "type": "open-ended",
        "question": "Explain the difference between null and undefined in JavaScript.",
        "choices": null,
        "correctAnswer": "undefined represents a variable that has been declared but not assigned a value, while null is an intentional absence of any object value.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 51,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log('5' - 3);",
        "choices": [
          "2",
          "53",
          "NaN",
          "Error"
        ],
        "correctAnswer": "2",
        "explanation": null,
        "flag": null
      },
      {
        "id": 52,
        "type": "code",
        "question": "Write a function that checks if a string is a valid email address.",
        "choices": null,
        "correctAnswer": "function isValidEmail(email) {\n  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email);\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 53,
        "type": "open-ended",
        "question": "Explain the concept of hoisting in JavaScript.",
        "choices": null,
        "correctAnswer": "Hoisting is JavaScript's default behavior of moving declarations to the top of their respective scopes during compilation, before code execution.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 54,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(0.1 + 0.2 === 0.3);",
        "choices": [
          "true",
          "false",
          "Error",
          "undefined"
        ],
        "correctAnswer": "false",
        "explanation": null,
        "flag": null
      },
      {
        "id": 55,
        "type": "code",
        "question": "Write a function that finds the intersection of two arrays.",
        "choices": null,
        "correctAnswer": "function intersection(arr1, arr2) {\n  const set1 = new Set(arr1);\n  return arr2.filter(item => set1.has(item));\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 56,
        "type": "open-ended",
        "question": "Explain the difference between localStorage and sessionStorage.",
        "choices": null,
        "correctAnswer": "localStorage persists data even when the browser is closed and reopened, while sessionStorage is cleared when the page session ends.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 57,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log('b' + 'a' + + 'a' + 'a');",
        "choices": [
          "baaaa",
          "baNaNa",
          "baa",
          "Error"
        ],
        "correctAnswer": "baNaNa",
        "explanation": null,
        "flag": null
      },
      {
        "id": 58,
        "type": "code",
        "question": "Write a function that implements the bubble sort algorithm.",
        "choices": null,
        "correctAnswer": "function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 59,
        "type": "open-ended",
        "question": "Explain the concept of event bubbling in JavaScript.",
        "choices": null,
        "correctAnswer": "Event bubbling is the process where an event triggers on the deepest target element, then propagates up through its ancestor elements in the DOM tree.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 60,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log([] == ![]);",
        "choices": [
          "true",
          "false",
          "Error",
          "undefined"
        ],
        "correctAnswer": "true",
        "explanation": null,
        "flag": null
      },
      {
        "id": 61,
        "type": "code",
        "question": "Write a function that implements the binary search algorithm.",
        "choices": null,
        "correctAnswer": "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 62,
        "type": "open-ended",
        "question": "Explain the difference between shallow copy and deep copy in JavaScript.",
        "choices": null,
        "correctAnswer": "A shallow copy creates a new object with references to the same nested objects as the original, while a deep copy creates a new object with new copies of all nested objects.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 63,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(parseInt('0.1'));",
        "choices": [
          "0.1",
          "0",
          "1",
          "NaN"
        ],
        "correctAnswer": "0",
        "explanation": null,
        "flag": null
      },
      {
        "id": 64,
        "type": "code",
        "question": "Write a function that implements the quicksort algorithm.",
        "choices": null,
        "correctAnswer": "function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[Math.floor(arr.length / 2)];\n  const left = arr.filter(x => x < pivot);\n  const middle = arr.filter(x => x === pivot);\n  const right = arr.filter(x => x > pivot);\n  return [...quickSort(left), ...middle, ...quickSort(right)];\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 65,
        "type": "open-ended",
        "question": "Explain the concept of prototypal inheritance in JavaScript.",
        "choices": null,
        "correctAnswer": "Prototypal inheritance is a method by which an object can inherit properties and methods from another object via the prototype chain.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 66,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(typeof typeof 1);",
        "choices": [
          "number",
          "string",
          "undefined",
          "object"
        ],
        "correctAnswer": "string",
        "explanation": null,
        "flag": null
      },
      {
        "id": 67,
        "type": "code",
        "question": "Write a function that checks if two strings are anagrams.",
        "choices": null,
        "correctAnswer": "function areAnagrams(str1, str2) {\n  return str1.split('').sort().join('') === str2.split('').sort().join('');\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 68,
        "type": "open-ended",
        "question": "Explain the difference between synchronous and asynchronous programming in JavaScript.",
        "choices": null,
        "correctAnswer": "Synchronous programming executes code sequentially, blocking until each operation completes, while asynchronous programming allows operations to run in the background without blocking the main thread.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 69,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(1 < 2 < 3);",
        "choices": [
          "true",
          "false",
          "Error",
          "undefined"
        ],
        "correctAnswer": "true",
        "explanation": null,
        "flag": null
      },
      {
        "id": 70,
        "type": "code",
        "question": "Write a function that implements a basic debounce mechanism.",
        "choices": null,
        "correctAnswer": "function debounce(func, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => func.apply(this, args), delay);\n  };\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 71,
        "type": "open-ended",
        "question": "Explain the concept of currying in JavaScript.",
        "choices": null,
        "correctAnswer": "Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 72,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(3 > 2 > 1);",
        "choices": [
          "true",
          "false",
          "Error",
          "undefined"
        ],
        "correctAnswer": "false",
        "explanation": null,
        "flag": null
      },
      {
        "id": 73,
        "type": "code",
        "question": "Write a function that returns the sum of two numbers.",
        "choices": null,
        "correctAnswer": "function sum(a, b) {\n  return a + b;\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 74,
        "type": "code",
        "question": "Write a function that takes an array of numbers and returns a new array with each number doubled.",
        "choices": null,
        "correctAnswer": "function doubleArray(arr) {\n  return arr.map(num => num * 2);\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 75,
        "type": "open-ended",
        "question": "Explain the difference between let, const, and var in JavaScript.",
        "choices": null,
        "correctAnswer": "var is function-scoped and can be re-declared, while let and const are block-scoped. const cannot be reassigned, but let can.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 76,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(3 + '3');",
        "choices": [
          "6",
          "33",
          "63",
          "Error"
        ],
        "correctAnswer": "33",
        "explanation": null,
        "flag": null
      },
      {
        "id": 77,
        "type": "code",
        "question": "Write a function that takes an array of strings and returns the first string that starts with the letter 'A'.",
        "choices": null,
        "correctAnswer": "function findA(arr) {\n  return arr.find(str => str.startsWith('A'));\n}",
        "explanation": null,
        "flag": null
      },
      {
        "id": 78,
        "type": "open-ended",
        "question": "Explain the concept of object-oriented programming.",
        "choices": null,
        "correctAnswer": "Object-oriented programming is a paradigm where data and methods are encapsulated within objects.",
        "explanation": null,
        "flag": null
      },
      {
        "id": 79,
        "type": "multiple-choice",
        "question": "What is the output of the following code?\n\nconsole.log(typeof null);",
        "choices": [
          "null",
          "object",
          "undefined",
          "string"
        ],
        "correctAnswer": "object",
        "explanation": null,
        "flag": null
      },
      {
        "id": 80,
        "type": "code",
        "question": "Write a function that takes an array of numbers and returns the largest number.",
        "choices": null,
        "correctAnswer": "function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}",
        "explanation": null,
        "flag": null
      }
    ]
    )
  }, [])

  useEffect(() => {
    if (questions.length > 0 && !currentQuestion) {
      setRandomQuestion()
    }
  }, [questions, currentQuestion])

  const setRandomQuestion = () => {
    const availableQuestions = questions.filter(q => q.flag !== 'dont-ask-again')
    if (availableQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length)
      setCurrentQuestion(availableQuestions[randomIndex])
    } else {
      setCurrentQuestion(null)
    }
  }

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return

    const isCorrect = answer === currentQuestion.correctAnswer
    setScore(prevScore => prevScore + (isCorrect ? 1 : 0))

    const newNote: Note = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      userAnswer: answer,
      explanation: currentQuestion.explanation,
      isCorrect,
      notes: '',
      versions: [],
    }

    setNotes(prevNotes => [...prevNotes, newNote])
    setRandomQuestion()
  }

  const handleFlag = (flag: 'dont-ask-again' | 'ask-less-often' | 'pass') => {
    if (!currentQuestion) return

    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === currentQuestion.id ? { ...q, flag } : q
      )
    )

    if (flag === 'pass') {
      setRandomQuestion()
    }
  }

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-800">Q&A App</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="question">Question</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="question">
              {currentQuestion ? (
                <>
                  <QuestionComponent
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    onFlag={handleFlag}
                  />
                  {currentQuestion.type === 'code' && <CodeEditor />}
                </>
              ) : (
                <div className="text-center text-gray-500">No more questions available.</div>
              )}
            </TabsContent>
            <TabsContent value="notes">
              <NotesList notes={notes} setNotes={setNotes} />
            </TabsContent>
          </Tabs>
          <div className="mt-4 text-xl font-semibold text-blue-800">Score: {score}</div>
        </CardContent>
      </Card>
    </div>
  )
}