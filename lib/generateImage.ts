export const generateImage = async (text: string, description: string) => {
   if (!text || !description) {
      throw new Error('Prompt is required');
   }
   const prompt = `generate a photo by title "${text}", and description "${description}"`;
   const queryParams = new URLSearchParams({
      width: '600',
      height: '600',
      seed: '42',
      model: 'turbo',
      nologo: 'true',
      enhance: 'false',
   });

   try {
      const url = `https://image.pollinations.ai/prompt/${prompt}?${queryParams.toString()}`;
      return url;
   } catch (err: unknown) {
      throw new Error(err instanceof Error ? err.message : 'An error occurred');
   }
}