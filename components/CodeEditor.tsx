import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface CodeEditorProps {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
}

export default function CodeEditor({ code, setCode }: CodeEditorProps) {
  const [output, setOutput] = useState<string>('')

  const runCode = () => {
    try {
      // This is a simple and unsafe way to run code. In a real application,
      // you would want to use a sandboxed environment or send the code to a backend for execution.
      const result = eval(code)
      setOutput(String(result))
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`)
      } else {
        setOutput('An unknown error occurred')
      }
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here"
        className="font-mono"
        rows={10}
      />
      <SyntaxHighlighter language="javascript" style={docco}>
        {code}
      </SyntaxHighlighter>
      <Button onClick={runCode}>Run Code</Button>
      <div className="p-4 bg-gray-100 rounded">
        <h3 className="font-semibold">Output:</h3>
        <pre className="whitespace-pre-wrap break-words">{output}</pre>
      </div>
    </div>
  )
}