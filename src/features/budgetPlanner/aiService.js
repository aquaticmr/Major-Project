// src/features/budgetPlanner/aiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getGeminiApiKeys } from '../chatAI/GeminiAPI';

const STABLE_MODEL_NAME = "gemini-2.5-flash";
const FALLBACK_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

// --- Generation Configuration ---
const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

let currentWorkingKeyIndex = 0;

const generateBudgetReport = async (prompt) => {
    const keys = getGeminiApiKeys();
    if (keys.length === 0) {
        throw new Error("No Gemini API keys found. Please set VITE_GEMINI_API_KEY in your .env.local file.");
    }

    let lastError = null;
    const totalKeys = keys.length;

    for (let attempt = 0; attempt < totalKeys; attempt++) {
        const keyIdx = (currentWorkingKeyIndex + attempt) % totalKeys;
        const key = keys[keyIdx];
        const maskedKey = key.length > 8 ? `${key.slice(0, 4)}...${key.slice(-4)}` : "***";

        for (const modelName of FALLBACK_MODELS) {
            try {
                console.log(`[BudgetPlanner AI] Trying key #${keyIdx + 1} (${maskedKey}) with model: ${modelName}`);
                const genAI = new GoogleGenerativeAI(key);
                const model = genAI.getGenerativeModel({ model: modelName });

                const chatSession = model.startChat({
                    generationConfig,
                    history: [],
                });

                const result = await chatSession.sendMessage(prompt);
                const response = result.response;

                if (!response) {
                    console.error("API Response was undefined or null", result);
                    throw new Error("Received no response from the AI model.");
                }

                if (response.promptFeedback?.blockReason) {
                    console.warn("Prompt blocked by safety settings:", response.promptFeedback);
                    throw new Error(`Request blocked due to safety filters: ${response.promptFeedback.blockReason}.`);
                }

                if (!response.candidates || response.candidates.length === 0 || response.candidates[0].content?.parts.length === 0) {
                    if (response.candidates?.[0]?.finishReason && response.candidates[0].finishReason !== 'STOP') {
                        console.warn("Candidate generation finished unexpectedly:", response.candidates[0].finishReason);
                        throw new Error(`AI generation failed. Reason: ${response.candidates[0].finishReason}.`);
                    } else {
                        throw new Error("Received an empty or invalid response from the AI model.");
                    }
                }

                currentWorkingKeyIndex = keyIdx;
                return response.text();

            } catch (error) {
                lastError = error;
                console.warn(`[BudgetPlanner AI] Key #${keyIdx + 1} (${maskedKey}) with model ${modelName} failed:`, error.message);

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

                if (isKeyExhaustedOrAuthError) {
                    break; // Move to next backup key
                }
            }
        }
    }

    console.error('All keys failed in generateBudgetReport:', lastError);
    throw lastError || new Error("All Gemini API keys failed for budget report generation.");
};

const isAIModelInitialized = () => {
    return getGeminiApiKeys().length > 0;
};

const getAIModelName = () => {
    return STABLE_MODEL_NAME;
};

const apiKey = getGeminiApiKeys()[0] || "";

export { generateBudgetReport, isAIModelInitialized, getAIModelName, apiKey };
