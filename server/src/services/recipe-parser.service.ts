import { z } from 'zod'
import type { GeneratedRecipe } from '../types/recipe.types.js'
import { AppError } from '../lib/errors.js'

const rawRecipeSchema = z.object({
  title: z.string().min(1),
  prepMinutes: z.number().int().nonnegative(),
  cookMinutes: z.number().int().nonnegative(),
  servings: z.number().int().positive(),
  ingredients: z.array(z.string().min(1)).min(1),
  steps: z.array(z.string().min(1)).min(1),
  optionalIngredients: z.array(z.string()).optional().default([]),
  imageQuery: z.string().min(1),
})

const geminiPayloadSchema = z.object({
  recipes: z.array(rawRecipeSchema).length(5),
})

function stripJsonFences(text: string): string {
  const t = text.trim()
  const fenced = /^```(?:json)?\s*([\s\S]*?)```$/m.exec(t)
  if (fenced?.[1]) return fenced[1].trim()
  return t
}

function extractTextFromPayload(payload: unknown): string {
  if (typeof payload === 'string') {
    return stripJsonFences(payload)
  }

  if (payload !== null && typeof payload === 'object') {
    const maybeText = (payload as { text?: unknown }).text
    if (typeof maybeText === 'string' && maybeText.length > 0) {
      return stripJsonFences(maybeText)
    }
  }

  throw new AppError({
    status: 502,
    code: 'RECIPE_GEMINI_EMPTY_RESPONSE',
    message: 'Model did not return text to parse',
  })
}

function mapRawToGenerated(raw: z.infer<typeof rawRecipeSchema>): GeneratedRecipe {
  const optional = raw.optionalIngredients ?? []
  const baseIngredients = raw.ingredients.map((s) => s.trim()).filter(Boolean)
  const taggedOptional = optional
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `(optional) ${s}`)

  return {
    title: raw.title.trim(),
    prepMinutes: raw.prepMinutes,
    cookMinutes: raw.cookMinutes,
    servings: raw.servings,
    ingredients: [...baseIngredients, ...taggedOptional],
    steps: raw.steps.map((s) => s.trim()).filter(Boolean),
    imageQuery: raw.imageQuery.trim(),
  }
}

/**
 * Parses Gemini output (SDK response object, or raw string) into five {@link GeneratedRecipe} rows.
 * Throws {@link AppError} with 502 when JSON is missing/invalid or shape does not match.
 */
export function normalizeGeminiRecipes(payload: unknown): GeneratedRecipe[] {
  const text = extractTextFromPayload(payload)

  let parsed: unknown
  try {
    parsed = JSON.parse(text) as unknown
  } catch {
    throw new AppError({
      status: 502,
      code: 'RECIPE_GEMINI_INVALID_JSON',
      message: 'Model response was not valid JSON',
    })
  }

  const outcome = geminiPayloadSchema.safeParse(parsed)
  if (!outcome.success) {
    throw new AppError({
      status: 502,
      code: 'RECIPE_GEMINI_INVALID_SHAPE',
      message: 'Model JSON did not match the expected recipe schema',
      details: outcome.error.flatten(),
    })
  }

  return outcome.data.recipes.map(mapRawToGenerated)
}
