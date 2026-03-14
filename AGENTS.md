# Repository Guidelines

## Project Structure & Module Organization

This repository is a `Next.js 16` App Router app for a URL shortener with guest and authenticated flows. Keep route files in `src/app` thin and move client-heavy logic into `src/features`. Reusable UI belongs in `src/components/ui` and shared layout elements in `src/components/shared` or `src/components/dashboard`. Put frontend API wrappers in `src/lib/api`, shared Zod schemas in `src/lib/validations`, and global providers in `src/providers`. Backend logic follows a layered pattern in `src/server`: `controllers` for request orchestration, `services` for business rules, and `repositories` for Prisma access. Database schema and migrations live in `prisma/`; static assets live in `public/`.

## Build, Test, and Development Commands

Use Bun for local work:

- `bun dev`: start the local dev server.
- `bun run lint`: run ESLint across the project.
- `bun run build`: verify production build, routing, and types.
- `bun run db:generate`: regenerate Prisma client after schema changes.
- `bun run db:push`: apply schema changes to the configured database.
- `bun run db:studio`: inspect local data with Prisma Studio.

## Coding Style & Naming Conventions

Use TypeScript with strict typing and the `@/*` import alias. Follow existing conventions: PascalCase for React components, camelCase for functions and variables, and kebab-case for route segments and most filenames. Reuse `src/components/ui` before adding new primitives. Forms should use `React Hook Form` with `Zod`; client data fetching should use `TanStack Query` and shared wrappers from `src/lib/http.ts` and `src/lib/api`. Keep comments brief and only where logic is not obvious.

## Testing Guidelines

There is no dedicated automated test suite yet. For every meaningful change, run `bun run lint`; also run `bun run build` when editing routes, types, auth, Prisma models, or shared infrastructure. Validate guest link creation, sign-in, dashboard access, and link CRUD flows manually when those areas change.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit style such as `feat:`, so keep commit messages imperative and scoped when useful, for example `fix: enforce guest link limit`. Pull requests should include a short summary, affected routes or modules, screenshots for UI changes, notes on schema or env changes, and the verification performed (`bun run lint`, `bun run build`, manual flow checks).

## Agent-Specific Notes

Read the files in `ai/` before making non-trivial changes. Preserve the current architecture, avoid broad refactors, and do not bypass the controller/service/repository structure for convenience.
