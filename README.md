# ChefGem

Practice-first fullstack web app for ingredient-based recipe generation with Gemini.

## Stack
- Frontend: Vite + React + TypeScript + Tailwind
- Backend: Express + TypeScript
- Database: Prisma + Supabase Postgres
- AI: Gemini (service placeholder scaffolded)

## Project Structure
- `src/`: frontend app, routing, features, and shared types
- `server/src/`: backend routes, controllers, services, middleware, validators
- `server/prisma/`: schema and seed scaffold

## Scripts
- `npm run dev:client`: start Vite app
- `npm run dev:server`: start Express server
- `npm run dev:all`: start both frontend and backend
- `npm run prisma:migrate`: run Prisma migration in server workspace
- `npm run prisma:generate`: generate Prisma client in server workspace

## Backend-First Timeline
1. Day 1: Scaffolding and environment wiring (done).
2. Days 2-3: Auth, validation, and recipe generation endpoint with Gemini integration.
3. Day 4: Save/list/detail recipe persistence and ownership checks.
4. Days 5-6: Frontend form, loading animation, swipe deck, saved recipes page.
5. Day 7: Error handling, retries, basic tests, and docs hardening.

## Mentorship Checkpoints
- End of Day 2: API contract review (`/auth`, `/recipes/generate`).
- End of Day 4: Data model and authorization review.
- End of Day 6: React state management and component boundaries review.
- End of Day 7: Refactor pass and deployment-readiness review.

## Next Steps
1. Install dependencies at root (`npm install`).
2. Copy `.env.example` to `.env` and paste your Supabase `DATABASE_URL` + `DIRECT_URL`.
3. Run `npm run prisma:migrate` then `npm run prisma:generate`.
4. Run `npm run dev:all`.
5. Start implementing TODO markers file-by-file.

## Supabase Notes
- `DATABASE_URL` is used by the app at runtime.
- `DIRECT_URL` is used by Prisma Migrate (recommended with Supabase pooler setups).
- In Supabase dashboard, use the Transaction Pooler string for `DATABASE_URL`.
- Use the direct database string for `DIRECT_URL`.
