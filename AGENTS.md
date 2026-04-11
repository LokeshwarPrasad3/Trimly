# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## First Steps

Read all files in `ai/` before making non-trivial changes. They contain context, rules, and full structure details that override general assumptions.

## Commands

Use Bun for all local work:

- `bun dev` — start the dev server
- `bun run lint` — run ESLint (run after every meaningful change)
- `bun run build` — verify production build and types (run when changing routes, types, auth, Prisma models, or shared infrastructure)
- `bun run format` — run Prettier across the project
- `bun run db:generate` — regenerate Prisma client after schema changes
- `bun run db:push` — apply schema changes to the database
- `bun run db:studio` — inspect data with Prisma Studio

There is no automated test suite. Verify changes manually: guest link creation, sign-in, dashboard access, and link CRUD flows.

## Architecture Overview

Trimly is a Next.js 16 App Router URL shortener with two user flows:

- **Guest flow**: anonymous users create up to 10 short links, tracked via `GuestIdentity` token stored client-side. After hitting the limit, they are prompted to sign up.
- **Authenticated flow**: session-based auth with `httpOnly` cookies. The dashboard exposes full link CRUD and click analytics.

### Route Groups

- `src/app/(marketing)/` — public pages (landing, pricing)
- `src/app/(dashboard)/` — protected pages under `/dashboard/*`
- `src/app/api/` — API endpoints grouped by domain: `auth`, `users`, `guest-identities`, `links`
- `src/app/s/[slug]/` — short-link resolver

Route protection is handled in `middleware.ts`: unauthenticated requests to `/dashboard/*` redirect to `/sign-in`; authenticated requests to auth pages redirect to `/dashboard`.

### Backend Layers

API `route.ts` files are thin entry points. Each calls into a layered structure:

```
route.ts → controller → service → repository (Prisma)
```

- `src/server/controllers/` — parse requests, shape responses
- `src/server/services/` — business logic (users, links, sessions, guests, click events)
- `src/server/repositories/` — all Prisma queries
- `src/server/auth/` — session resolution, cookie helpers, constants
- `src/server/http/` — shared `requests.ts` (parsing) and `responses.ts` (formatting)
- `src/server/errors/app-error.ts` — shared application error type
- `src/server/queries/short-links.ts` — reusable query helpers

Do not bypass this structure. Do not put Prisma calls directly in route files or controllers.

### Frontend Layers

- `src/features/` — domain UI grouped by feature (`auth`, `guest`, `short-links`, `dashboard`, `analytics`)
- `src/components/ui/` — primitive design-system components (Button, Card, Input, Table, Badge, etc.)
- `src/components/shared/` — public layout components (headers, footers)
- `src/components/dashboard/` — dashboard-specific presentation components (AppShell, MetricCard, LinksTable, Charts)
- `src/providers/` — global React providers (`query-provider.tsx` for TanStack Query)
- `src/hooks/` — small shared hooks

Route page files must stay thin; move client logic into feature components.

### Data Fetching & Forms

- Client server-state: **TanStack Query** with API wrappers in `src/lib/api/`
- HTTP client: shared Axios instance in `src/lib/http.ts` (`http`). Always use `unwrapResponse<T>()` to unwrap the `ApiEnvelope<T>` shape.
- Forms: **React Hook Form + Zod**. Infer types from Zod schemas where practical.
- Shared Zod schemas live in `src/lib/validations/`.

### Database Models

Defined in `prisma/schema.prisma`. The Prisma client is output to `src/generated/prisma`.

| Model           | Purpose                                                                    |
| --------------- | -------------------------------------------------------------------------- |
| `User`          | Registered account                                                         |
| `GuestIdentity` | Anonymous identity for pre-auth link creation and free-limit tracking      |
| `Session`       | `httpOnly` cookie-backed authenticated session                             |
| `ShortLink`     | Main shortened URL entity; belongs to either a `User` or a `GuestIdentity` |
| `ClickEvent`    | Analytics event recorded per click on a short link                         |

`ShortLink.userId` and `ShortLink.guestIdentityId` are both nullable; exactly one should be set. Do not merge `GuestIdentity` and `User`.

## Key Conventions

- **`@/*` alias** for all imports.
- **Auth**: always resolve the session server-side from the cookie; never trust client-supplied user IDs.
- **Responses**: all API routes return `{ success, data, meta? }` envelopes via helpers in `src/server/http/responses.ts`.
- **Naming**: PascalCase components, camelCase functions/variables, kebab-case file names and route segments.
- **Mock data**: `src/lib/mock-data.ts` is used only for UI-only sections. Do not replace live API-backed dashboard code with mocks.
- **Schema changes**: run `bun run db:generate` after every Prisma schema edit; run `bun run db:push` to apply.
