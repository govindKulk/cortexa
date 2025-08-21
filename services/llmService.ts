import PRODUCT_CATALOG from "@/data/catalog";
import { Recommendation } from "@/types/types";
import { GoogleGenAI } from "@google/genai";


// API Key from Expo config (best practice: avoid hardcoding, use env vars)
const API_KEY  = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("Gemini API key is not configured in app.json");
}

// Initialize Gemini SDK
const genAI = new GoogleGenAI({
  apiKey: API_KEY,
});

// System prompt for recommendations (best practice: reusable, clear, and instructive)
const SYSTEM_PROMPT = `
You are an expert AI Product Advisor that provides personalized, accurate recommendations based on the user's natural language query and the provided product catalog subset.

Guidelines:
- Recommend 3-5 products that best match the user's needs.
- For each recommendation, include a clear "why" explanation (2-3 sentences) highlighting how the product fits the query.
- Base recommendations solely on the catalog provided.
- Prioritize relevance, value, and user satisfaction.
- Output in strict JSON format as per the schema; no additional text.
`;

const getAllAvailableCategories = () => {
  return Array.from(new Set(PRODUCT_CATALOG.map((product) => product.category)));
}

const categories = getAllAvailableCategories();


/**
 * Extracts relevant categories from the user query using Gemini.
 * @param query User input query
 * @returns Array of category strings
 */
export async function getCategories(query: string): Promise<string[]> {
  try {

    const prompt = `Extract 2-5 relevant product categories from this user query: "${query}". Return the categories as a JSON array of strings, for example: ["Healthtech and Wellness", "Pain Relief", "Fitness"]
    from the available Categories ${JSON.stringify(categories)}
    `;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ 
        role: "user", 
        parts: [{ text: prompt }] 
      }],
    });

    console.log("result: ", JSON.stringify(result, null, 2));

    // Parse the JSON response
    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    // console.log("responseText: " , responseText)


    try {
      const categories = JSON.parse(responseText);
      return Array.isArray(categories) ? categories : [];
    } catch {
      // Fallback: extract categories from text using simple parsing
      const matches = responseText.match(/\[([^\]]+)\]/);
      if (matches) {
        return matches[1].split(',').map((cat: string) => cat.trim().replace(/"/g, ''));
      }
      return [];
    }
  } catch (error) {
    console.error("Error extracting categories:", error);
    throw new Error("Failed to extract categories from query");
  }
}

/**
 * Generates recommendations based on query and filtered categories.
 * Filters catalog locally, then prompts Gemini with subset.
 * @param query User input query
 * @param categories Array of categories to filter by
 * @returns Array of Recommendation objects
 */
export async function getRecommendations(query: string, categories: string[]): Promise<Recommendation[]> {
  try {
    // Filter catalog locally (best practice: efficient, reduces prompt size)
    const filteredCatalog = PRODUCT_CATALOG.filter((product) =>
      categories.some((cat) => product.category.toLowerCase().includes(cat.toLowerCase()))
    );

    if (filteredCatalog.length === 0) {
      return []; // Or throw error/handle gracefully
    }

    const catalogJson = JSON.stringify(filteredCatalog);
    const userPrompt = `${SYSTEM_PROMPT}\n\nUser query: "${query}"\nCatalog subset: ${catalogJson}

Please provide 3-5 product recommendations in the following JSON format:
{
  "recommendations": [
    {
      "product_name": "Product Name",
      "brand": "Brand Name",
      "price": 99.99,
      "category": "Category",
      "description": "Product description",
      "why": "2-3 sentence explanation of why this product fits the user's query"
    }
  ]
}`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ 
        role: "user", 
        parts: [{ text: userPrompt }] 
      }],
    });

    console.log("result: ", result);

    // Parse the JSON response
    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    console.log("responseText: ", responseText)
    try {
      const parsed = JSON.parse(responseText);
      return parsed.recommendations || [];
    } catch {
      // Fallback parsing for cases where the JSON might be wrapped in markdown
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || responseText.match(/```\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          return parsed.recommendations || [];
        } catch {
          return [];
        }
      }
      return [];
    }
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw new Error("Failed to generate recommendations");
  }
}
