// StatusComponent.tsx
import  { FC } from 'react';

interface StatusProps {
  statusText: string;
}

const Status: FC<StatusProps> = ({ statusText }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="text-white text-2xl">{statusText}</div>
    </div>
  );
}

export default Status;
