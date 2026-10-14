import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Retrieves all configured Gemini API keys from environment variables.
 * Supports:
 * - VITE_GEMINI_API_KEY (primary)
 * - VITE_GEMINI_API_KEY_1 through VITE_GEMINI_API_KEY_10 (numbered backups)
 * - VITE_GEMINI_API_KEYS (comma-separated list of keys)
 */
export function getGeminiApiKeys() {
  const keys = [];

  // Comma-separated list if provided
  if (import.meta.env.VITE_GEMINI_API_KEYS) {
    const list = import.meta.env.VITE_GEMINI_API_KEYS.split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    keys.push(...list);
  }

  // Numbered environment variables: VITE_GEMINI_API_KEY_1 through VITE_GEMINI_API_KEY_10
  for (let i = 1; i <= 10; i++) {
    const key = import.meta.env[`VITE_GEMINI_API_KEY_${i}`];
    if (key && typeof key === "string" && key.trim()) {
      keys.push(key.trim());
    }
  }

  // Primary VITE_GEMINI_API_KEY
  const primaryKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (primaryKey && typeof primaryKey === "string" && primaryKey.trim()) {
    if (!keys.includes(primaryKey.trim())) {
      keys.unshift(primaryKey.trim());
    }
  }

  // Return unique keys
  return Array.from(new Set(keys));
}

// Track current healthy key index across requests to avoid retrying already-exhausted keys
let currentWorkingKeyIndex = 0;

class GeminiAPI {
  constructor(customKeys = null) {
    this.keys = customKeys || getGeminiApiKeys();
    this.fallbackModels = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

    if (this.keys.length === 0) {
      console.warn("No Gemini API keys found. Please set VITE_GEMINI_API_KEY in your .env.local file.");
    }
  }

  async generateContent(prompt, context = "") {
    if (this.keys.length === 0) {
      throw new Error(
        "Gemini API key is missing. Please set VITE_GEMINI_API_KEY (and optional backups VITE_GEMINI_API_KEY_2, etc.) in your environment variables."
      );
    }

    const fullPrompt = context ? `${context}\n\nQuestion: ${prompt}` : prompt;
    let lastError = null;

    const totalKeys = this.keys.length;

    // Try keys sequentially starting from the last working key index
    for (let attempt = 0; attempt < totalKeys; attempt++) {
      const keyIndex = (currentWorkingKeyIndex + attempt) % totalKeys;
      const key = this.keys[keyIndex];
      const maskedKey = key.length > 8 ? `${key.slice(0, 4)}...${key.slice(-4)}` : "***";

      // Try each model in fallback order
      for (const modelToTry of this.fallbackModels) {
        try {
          const genAI = new GoogleGenerativeAI(key);
          const model = genAI.getGenerativeModel({ model: modelToTry });
          const result = await model.generateContent(fullPrompt);
          const response = await result.response;
          const text = response.text();

          // Succeeded! Keep this key as the current active key
          currentWorkingKeyIndex = keyIndex;
          return text;
        } catch (error) {
          lastError = error;
          console.warn(
            `[GeminiAPI] Attempt failed with key #${keyIndex + 1} (${maskedKey}) using model '${modelToTry}':`,
            error.message || error
          );

          const errorMsg = (error.message || "").toLowerCase();
          const isKeyExhaustedOrAuthError =
            errorMsg.includes("429") ||
            errorMsg.includes("quota") ||
            errorMsg.includes("resource_exhausted") ||
            errorMsg.includes("rate limit") ||
            errorMsg.includes("403") ||
            errorMsg.includes("401") ||
            errorMsg.includes("key not valid") ||
            errorMsg.includes("api_key_invalid");

          // If the key has quota/auth errors, no point trying other models with this same exhausted key
          if (isKeyExhaustedOrAuthError) {
            break;
          }
        }
      }
    }

    console.error("All Gemini API keys and fallback models failed.", lastError);
    throw new Error(
      `All ${totalKeys} Gemini API key(s) failed. Last error: ${lastError?.message || "Unknown error"}`
    );
  }
}

export { GeminiAPI };
