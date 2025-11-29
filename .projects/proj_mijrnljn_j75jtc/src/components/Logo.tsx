import React from 'react';
import { Rocket } from 'lucide-react';

interface LogoProps {
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ light = false }) => {
  return (
    <div className="flex items-center">
      <Rocket className="h-8 w-8 text-primary" />
      <span className={`ml-2 text-xl font-bold ${light ? 'text-white' : 'text-gray-900'}`}>
        ModernWeb
      </span>
    </div>
  );
};

export default Logo;