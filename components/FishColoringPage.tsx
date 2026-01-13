import React, { useState, useCallback } from 'react';
import { generateColoringPageFish } from '../services/geminiService';

const FishColoringPage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fishType, setFishType] = useState<string>(''); // New state for fish type input

  const generateImage = useCallback(async () => {
    setLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      // Pass the current fishType state to the service function
      const url = await generateColoringPageFish(fishType);
      setImageUrl(url);
    } catch (e) {
      setError((e as Error).message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, [fishType]); // Dependency array includes fishType

  // No initial image generation on component mount; user will trigger it.
  // React.useEffect(() => {
  //   generateImage();
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-4 w-full max-w-sm">
        <label htmlFor="fish-type-input" className="block text-gray-700 text-sm font-bold mb-2 sr-only">
          Type of Fish
        </label>
        <input
          id="fish-type-input"
          type="text"
          value={fishType}
          onChange={(e) => setFishType(e.target.value)}
          placeholder="e.g., clownfish, shark, goldfish..."
          aria-label="Enter type of fish"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <button
        onClick={generateImage}
        disabled={loading}
        className="mb-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 transition-all duration-300 ease-in-out"
      >
        {loading ? 'Generating...' : 'Generate Coloring Page!'}
      </button>

      {loading && (
        <div className="flex items-center space-x-2 text-gray-700" role="status" aria-live="polite">
          <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>A friendly fish is on its way...</span>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md border border-red-300" role="alert">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
          <p className="mt-2 text-sm text-red-500">Please try generating again. If the issue persists, ensure your API key is correctly configured and has access to the image generation model.</p>
        </div>
      )}

      {imageUrl && !loading && (
        <div className="mt-8 p-4 border-2 border-dashed border-gray-300 rounded-lg max-w-full">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Your Coloring Page!</h2>
          <img
            src={imageUrl}
            alt={`${fishType.trim() || 'Happy cartoon'} fish coloring page`}
            className="w-full h-auto max-w-xl mx-auto rounded-md shadow-lg"
            onLoad={() => console.log("Image loaded successfully.")}
            onError={() => setError("Failed to load generated image. The URL might be broken or expired.")}
          />
          <p className="mt-4 text-sm text-gray-500 text-center">
            Right-click or long-press the image to save it for coloring!
          </p>
        </div>
      )}
    </div>
  );
};

export default FishColoringPage;