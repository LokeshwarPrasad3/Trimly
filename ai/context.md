# AI Context

## Purpose

This repository is a `v1` URL shortener built with Next.js App Router. It supports two main flows:

- `Guest flow`: anonymous users can create up to 10 short links without logging in.
- `Authenticated flow`: signed-in users get a protected dashboard for link management and analytics.

The current goal is a clean, minimal product that is already structured for future growth.

## Tech Stack

- `Next.js 16` with App Router
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `Base UI / shadcn-style components`
- `TanStack Query` for client data fetching and caching
- `Axios` for HTTP requests from the frontend
- `React Hook Form + Zod` for forms and validation
- `Prisma 7 + PostgreSQL`
- `Bun` for package management and scripts

## Main Features

- Public landing and pricing pages
- Guest short-link creation flow
- Guest free-tier limit handling
- Sign up / sign in / logout
- Cookie-based session auth with protected dashboard routes
- Authenticated short-link CRUD APIs
- Click event tracking APIs
- Dashboard pages connected to live authenticated APIs

## Core Data Models

- `User`: registered account
- `GuestIdentity`: anonymous identity for pre-login usage and free-limit tracking
- `Session`: cookie-backed authenticated session
- `ShortLink`: main shortened URL entity
- `ClickEvent`: analytics event per click

## Application Workflow

1. Guest user opens the public site.
2. Guest can create short links until the free limit is reached.
3. User signs up or logs in.
4. Guest links can be claimed into the user account.
5. Authenticated user accesses `/dashboard`.
6. Dashboard pages fetch live link and analytics data through internal API routes.

## Backend Pattern

The project uses a layered backend structure:

- `route.ts` files are thin HTTP entry points
- `controllers` parse requests and shape responses
- `services` hold business logic
- `repositories` contain Prisma data access
- `validations` define Zod schemas shared across the app

## Frontend Pattern

- `app/` holds routes and layouts
- `features/` groups domain-specific UI and hooks
- `lib/api` contains client API wrappers
- `hooks` and `providers` support shared frontend behavior
- Dashboard pages prefer live API data over local mocks

## Important Notes

- Auth is server-validated with `httpOnly` cookies and middleware-based route protection.
- Some UI-only pages still use mock content for non-critical sections, but dashboard links and analytics are now wired to live APIs.
- Before adding new libraries or patterns, check whether an existing utility, hook, or component already solves the problem.
