# Repository Structure

## Root
- `src/`: main application source
- `prisma/`: Prisma schema and database modeling
- `public/`: static assets
- `middleware.ts`: route protection and auth redirects
- `package.json`: scripts and dependencies
- `prisma.config.ts`: Prisma runtime configuration
- `components.json`: shadcn/base-ui component config

## `src/app`
Next.js App Router routes, layouts, and API endpoints.

### Public routes
- `/`: landing page
- `/pricing`
- `/guest-links`
- `/guest-upgrade`
- `/sign-in`
- `/sign-up`
- `/forgot-password`
- `/s/[slug]`: short-link resolver page

### Dashboard routes
- `/dashboard`
- `/dashboard/links`
- `/dashboard/links/[id]`
- `/dashboard/create`
- `/dashboard/analytics`
- `/dashboard/profile`
- `/dashboard/settings`

### API routes
Located under `src/app/api/...`.
Main groups:
- `auth`: login, logout, current user
- `users`: signup and user lookup
- `guest-identities`: guest identity creation, lookup, claim
- `links`: short-link CRUD, lookup by slug, click events

## `src/components`
Reusable UI components.

### `src/components/ui`
Primitive design-system components such as:
- `button`, `card`, `input`, `table`, `badge`, `sheet`, `dropdown-menu`, `tabs`, `tooltip`

### `src/components/shared`
Shared public-layout components such as headers, footers, and section headings.

### `src/components/dashboard`
Reusable dashboard presentation components such as:
- `app-shell`
- `metric-card`
- `links-table`
- `charts`
- `activity-feed`

## `src/features`
Feature-based grouping for domain logic and UI.

### `src/features/auth`
- auth forms
- auth hooks
- dashboard user menu
- local auth-related helpers if needed

### `src/features/guest`
- guest token storage
- guest flow UI
- guest-specific helpers

### `src/features/short-links`
- short-link creation form
- authenticated short-link hooks
- short-link constants

### `src/features/dashboard`
- dashboard client components
- analytics transformation helpers

## `src/lib`
Shared application utilities.

### Key areas
- `api/`: Axios-based frontend API wrappers
- `validations/`: Zod schemas and shared types
- `prisma.ts`: Prisma client setup
- `http.ts`: shared Axios client and response helpers
- `utils.ts`: generic utility helpers
- `ui.ts`: shared UI class helpers
- `mock-data.ts`: leftover mock content for some UI-only sections

## `src/server`
Backend application layer used by API routes.

### `controllers`
Request/response orchestration.

### `services`
Business logic for users, links, sessions, guests, and click events.

### `repositories`
Prisma data-access layer.

### `auth`
Cookie/session handling and auth helpers.

### `http`
Reusable request parsing and response formatting helpers.

### `errors`
Shared application error types.

### `utils`
Backend-specific helpers like slug generation and crypto utilities.

## `src/providers`
Global React providers.
- `query-provider.tsx`: TanStack Query provider

## `src/hooks`
Small shared hooks.
- `use-mounted.ts`

## `src/types`
Shared TS types if needed across modules.

## `prisma/schema.prisma`
Defines the main database models:
- `User`
- `GuestIdentity`
- `Session`
- `ShortLink`
- `ClickEvent`
