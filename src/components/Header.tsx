
import React from 'react';
import { Terminal } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-center border-b pb-4 mb-6">
      <div className="flex items-center gap-2">
        <Terminal size={32} className="text-primary animate-pulse" />
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          Python Explain-o-matic
        </h1>
      </div>
    </div>
  );
};

export default Header;
