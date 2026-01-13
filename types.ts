/**
 * Represents the structure of an image part in the Gemini API response.
 */
export interface InlineData {
  data: string;
  mimeType: string;
}

/**
 * Represents a part of the content in the Gemini API response.
 */
export interface ContentPart {
  inlineData?: InlineData;
  text?: string;
}

/**
 * Represents a candidate response from the Gemini API.
 */
export interface Candidate {
  content: {
    parts: ContentPart[];
  };
}

/**
 * Represents the full response from the Gemini API generateContent call.
 */
export interface GenerateContentResponse {
  candidates?: Candidate[];
  text?: string;
}
