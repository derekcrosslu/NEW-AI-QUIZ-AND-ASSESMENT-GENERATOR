import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function CodeEditor() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')

  const runCode = () => {
    try {
      // This is a simple and unsafe way to run code. In a real application,
      // you would want to use a sandboxed environment or send the code to a backend for execution.
      const result = eval(code)
      setOutput(String(result))
    } catch (error) {
      setOutput(`Error: ${error}`)
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
      <Button onClick={runCode}>Run Code</Button>
      <div className="p-4 bg-gray-100 rounded">
        <h3 className="font-semibold">Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  )
}