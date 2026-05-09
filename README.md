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

## Supabase Notes
- `DATABASE_URL` is used by the app at runtime.
- `DIRECT_URL` is used by Prisma Migrate (recommended with Supabase pooler setups).
- In Supabase dashboard, use the Transaction Pooler string for `DATABASE_URL`.
- Use the direct database string for `DIRECT_URL`.
