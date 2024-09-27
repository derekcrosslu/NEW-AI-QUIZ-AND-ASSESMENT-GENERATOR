import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

interface CodeEditorProps {
    code: string;
    onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleCodeChange = (value: string) => {
    onChange(value);
  };

  const runCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission
    setError('');
    setOutput('');
    try {
      let consoleOutput = '';
      const customConsole = {
        log: (...args: any[]) => {
          consoleOutput += args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' ') + '\n';
        }
      };

      // Use Function constructor to create a new scope with our custom console
      const executionFunction = new Function('console', `
        try {
          ${code}
        } catch (e) {
          console.log('Error:', e.message);
        }
      `);

      executionFunction(customConsole);
      
      setOutput(consoleOutput || 'No output');
    } catch (err) {
      setError(err instanceof Error ? err.toString() : 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-800 rounded-lg">
      <CodeMirror
        value={code}
        height="200px"
        theme={vscodeDark}
        extensions={[javascript({ jsx: true })]}
        onChange={handleCodeChange}
      />
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={runCode}
      >
        Run Code
      </button>
      {output && (
        <div className="p-2 bg-gray-700 text-white border border-gray-600 rounded">
          <h3 className="font-bold">Output:</h3>
          <pre>{output}</pre>
        </div>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CodeEditor;