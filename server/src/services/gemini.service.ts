import { env } from '../config/env.js';
import type { GeneratedRecipe, IngredientInput } from '../types/recipe.types.js'
import { GoogleGenAI } from "@google/genai"
import { AppError, errors } from "../lib/errors.js"
import { normalizeGeminiRecipes } from "../services/recipe-parser.service.js"

// Initialise the AI
const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY
});

const contextString = `You are a chef who is knowledgable on all cuisines, 
dishes and ingredients of the world. Your aim is to help those with limited 
ingredients find both delicious and available recipes that are not too exotic.
You will always be given a set of ingredients, and their metrics, and your aim
is to generate 5 new recipes that match what ingredients they have. Always 
assume that they have standard items such as cutlery, kitchenware, salt, pepper,
and oil. Don't limit the recipes to only their ingredients, allow for 1-2 optional
ingredients when searching for recipes, and label any spices as optional when possible,
unless they are strictly needed. Always return a single JSON object with this shape 
(no markdown, no prose):
{
  "recipes": [
    {
      "title": string,
      "prepMinutes": number,
      "cookMinutes": number,
      "servings": number,
      "ingredients": string[],
      "steps": string[],
      "optionalIngredients": string[],
      "imageQuery": string
    }
  ]
}
There must be exactly 5 items in "recipes".`

/**
 * @param {IngredientInput[]} ingredients
 * @returns {Promise<GeneratedRecipe[]>}
 * 
 * Given the ingredients list from a request body, the function passes this to 
 * gemini to then generate 5 new recipes in object format.
 */
export async function generateRecipesWithGemini( ingredients: IngredientInput[] ): Promise<GeneratedRecipe[]> {
  // 0 length array early break
  if (ingredients.length === 0) {
    throw errors.badRequest('RECIPE_INGREDIENTS_EMPTY', 'At least one ingredient is required')
  }

  // Instruction
  const userPrompt = `Here are the ingredients on hand (JSON array). Use them to suggest recipes as specified in your instructions. 
  ${JSON.stringify(ingredients, null, 2)}`

  try {
    // API Call
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      config: {
        systemInstruction: contextString,
        responseMimeType: "application/json",
      },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    })

    return normalizeGeminiRecipes(result)
  } catch (err) {
    // Throw appropriate errors, or build one if API at fault
    if (env.NODE_ENV === "development") {
      console.error("[generateRecipesWithGemini]", err)
    }
    if (err instanceof AppError) {
      throw err
    }
    throw new AppError({
      status: 502,
      code: 'RECIPE_GENERATION_FAILED',
      message: 'Unable to generate recipe at this time',
    })
  }
}
