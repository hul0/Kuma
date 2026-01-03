import { GoogleGenAI } from "@google/genai";
import { ResumeData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateResumeWithGemini = async (data: ResumeData): Promise<string> => {
  const prompt = `
    You are an expert resume writer and career coach. 
    I will provide you with a user's career details in JSON format. 
    Your task is to write a professional, high-impact resume in Markdown format.
    
    Guidelines:
    1. Use a clean, professional Markdown structure.
    2. Start with a header containing Name and Contact info.
    3. Write a compelling Professional Summary based on the provided details.
    4. For Experience: enhancing the descriptions to be action-oriented (using strong verbs like Spearheaded, Developed, Optimized). Focus on achievements.
    5. Format Skills as a clean list or grouped logically.
    6. Do not include markdown code block fences (like \`\`\`markdown). Just return the raw markdown text.
    7. Ensure the tone is professional and suitable for ATS (Applicant Tracking Systems).

    User Data:
    ${JSON.stringify(data, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster text generation
      }
    });

    return response.text || "Failed to generate resume. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to connect to Gemini AI.");
  }
};
