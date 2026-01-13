import React from 'react';
import FishColoringPage from './components/FishColoringPage';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
        Color My Fish!
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        Enter a type of fish below, then click the button to generate a unique black and white coloring page,
        perfect for children with simple, bold outlines and a clean background.
      </p>
      <FishColoringPage />
    </div>
  );
};

export default App;