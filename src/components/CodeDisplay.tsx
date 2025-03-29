
import React from 'react';
import { cn } from '@/lib/utils';

interface CodeDisplayProps {
  code: string;
  className?: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, className }) => {
  const lines = code.split('\n');

  return (
    <div className={cn("rounded-md border bg-code p-0 overflow-auto", className)}>
      <div className="flex">
        <div className="line-numbers py-4 pr-2 text-sm">
          {lines.map((_, i) => (
            <div key={i} className="px-2">
              {i + 1}
            </div>
          ))}
        </div>
        <pre className="py-4 overflow-visible code-editor">
          <code className="text-white">
            {lines.map((line, i) => (
              <div key={i} className="px-2">
                {line || ' '}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeDisplay;
