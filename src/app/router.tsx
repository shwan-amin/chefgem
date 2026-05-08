import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { LoadingPage } from '../features/recipes/pages/LoadingPage'
import { SwipePage } from '../features/recipes/pages/SwipePage'
import { SavedRecipesPage } from '../features/saved/pages/SavedRecipesPage'

function IngredientEntryPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl p-6">
      <h1 className="text-3xl font-semibold">ChefGem</h1>
      <p className="mt-2 text-sm text-neutral-600">
        TODO: Build dynamic ingredient entry form and submit flow.
      </p>
    </main>
  )
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<IngredientEntryPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/swipe" element={<SwipePage />} />
      <Route path="/saved" element={<SavedRecipesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
