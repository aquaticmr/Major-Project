import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

class GeminiAPI {
  constructor() {
    if (!GEMINI_API_KEY) {
      throw new Error(
        "Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your environment variables."
      );
    }
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateContent(prompt, context = "") {
    try {
      const fullPrompt = context ? `${context}\n\nQuestion: ${prompt}` : prompt;
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating content with Gemini:", error);
      throw new Error("Failed to generate response from Gemini API.");
    }
  }
}

export { GeminiAPI };
