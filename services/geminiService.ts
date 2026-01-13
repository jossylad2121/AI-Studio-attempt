import { GoogleGenAI } from "@google/genai";
import { GenerateContentResponse } from "../types";

export const generateColoringPageFish = async (fishType: string): Promise<string | null> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not defined in the environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const baseFishDescription = fishType.trim() ? `${fishType.trim()} fish` : 'a happy cartoon fish';
  const prompt = `A black and white children's coloring book page illustration of a very ${baseFishDescription}. The drawing should feature simple, thick black outlines, a plain white background, absolutely no shading, and no gradients. The ${fishType.trim() ? fishType.trim() : 'fish'} should be large and centered on the page, with clear, easy-to-color areas. Line art only.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Appropriate model for general image generation
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1", // Square aspect ratio for a balanced coloring page
        },
      },
    });

    // Iterate through all parts to find the image part
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        // The API returns base64 string without the prefix, add it for direct use in <img> src
        return `data:${part.inlineData.mimeType};base64,${base64EncodeString}`;
      }
    }

    throw new Error("No image data found in the response.");

  } catch (error) {
    console.error("Error generating fish image:", error);
    throw new Error(`Failed to generate image: ${(error as Error).message}`);
  }
};