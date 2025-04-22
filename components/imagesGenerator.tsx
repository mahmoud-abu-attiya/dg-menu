"use client"
import { useState } from 'react';

const ImagesGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = () => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const queryParams = new URLSearchParams({
        width: '800',
        height: '600',
        seed: '42',
        model: 'turbo',
        nologo: 'true',
        enhance: 'false',
      });
      setImageUrl(null);
      setIsLoading(true);

      const url = `https://image.pollinations.ai/prompt/${prompt}?${queryParams.toString()}`;
      setImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      
    }
  };

  return (
    <div>
      <textarea
        className='border'
        name="promp"
        id="promp"
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <button onClick={generateImage}>Generate Image</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated Image" onLoad={() => setIsLoading(false)}/>}
    </div>
  );
};

export default ImagesGenerator;