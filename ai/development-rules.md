# Development Rules For AI Agents

## First Step
- Read all files in `/ai` before making changes.
- Follow the current architecture before introducing new abstractions.

## Scope Control
- Do not change configs, project setup, or dependencies unless the task requires it.
- Do not refactor unrelated files while implementing a feature.
- Prefer focused, minimal changes over broad rewrites.

## Frontend Rules
- Use existing UI components from `src/components/ui` first.
- Follow the current feature-based structure in `src/features`.
- Keep route files thin; move client logic into feature components when possible.
- Use `TanStack Query` for frontend server-state fetching and mutations.
- Use the shared Axios client in `src/lib/http.ts` and API wrappers in `src/lib/api`.
- Use `React Hook Form + Zod` for forms and validation.
- Match the existing visual language instead of inventing a new design system.

## Backend Rules
- Keep API routes thin.
- Put request parsing/response shaping in `controllers`.
- Put business logic in `services`.
- Put Prisma queries in `repositories`.
- Reuse shared validation schemas from `src/lib/validations`.
- Reuse shared auth/session helpers from `src/server/auth`.
- Do not bypass the service/repository structure for convenience.

## Data And Auth Rules
- Use the existing Prisma models and naming conventions.
- Prefer authenticated user context from the session cookie over trusting client-supplied IDs.
- Preserve guest flow behavior: guests can create links until the free limit, then must authenticate.
- Keep `GuestIdentity` separate from `User`; do not merge them.

## Code Style
- Use TypeScript types inferred from Zod where practical.
- Prefer existing utility helpers before adding new ones.
- Keep functions small and explicit.
- Avoid over-engineering for `v1`.
- Keep explanations and comments short.

## Safety Rules
- Do not remove or rewrite working auth protection without a clear reason.
- Do not replace live API-backed dashboard code with mocks.
- Do not change database schema casually; keep Prisma changes intentional and task-driven.
- If a page still uses mock content, preserve that unless the task is specifically to wire real data.

## Validation And Verification
- Run `bun run lint` after meaningful code changes.
- Run `bun run build` for changes that affect app structure, routing, or types.
- If a command needs escalation because of sandbox restrictions, request it instead of skipping verification.
