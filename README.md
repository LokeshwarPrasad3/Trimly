# URL Shortener V1

A minimal URL shortener built with `Next.js`, `TypeScript`, `Tailwind CSS`, `Prisma`, and `PostgreSQL`.

## Overview
The app supports two primary flows:
- `Guest users` can create up to 10 short links for free.
- `Authenticated users` get a protected dashboard for link management and analytics.

The codebase uses a feature-oriented frontend structure and a layered backend structure with API routes, controllers, services, and repositories.

## Tech Stack
- `Next.js 16` App Router
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `TanStack Query`
- `Axios`
- `React Hook Form + Zod`
- `Prisma 7 + PostgreSQL`
- `Bun`

## Getting Started
Run the development server:

```bash
bun dev
```

Useful scripts:

```bash
bun run lint
bun run build
bun run db:generate
bun run db:push
```

## AI Agent Note
Before making changes, read the documentation in [`/ai`](/D:/Lokeshwar/Work/Practice/AI-CLI/Codex/ai).
- [context.md](/D:/Lokeshwar/Work/Practice/AI-CLI/Codex/ai/context.md)
- [structure.md](/D:/Lokeshwar/Work/Practice/AI-CLI/Codex/ai/structure.md)
- [development-rules.md](/D:/Lokeshwar/Work/Practice/AI-CLI/Codex/ai/development-rules.md)
