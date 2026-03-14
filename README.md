# Trimly

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-Hosted-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1?style=for-the-badge)
![Bun](https://img.shields.io/badge/Bun-Tooling-F9F1E1?style=for-the-badge&logo=bun&logoColor=black)

Trimly is a modern URL shortener application built to demonstrate strong full-stack engineering decisions in a clean product setup.

The focus of this project is simple: when someone opens the repository, they should quickly understand the product idea, the architecture, and the technologies used to build it.

It also reflects deployment and infrastructure familiarity by being hosted on AWS.

## What Trimly Does

- Creates short links for guests and authenticated users
- Supports sign up, sign in, and session-based authentication
- Provides a dashboard for managing links
- Tracks click activity and analytics
- Uses a structured backend with controllers, services, and repositories

## Tech That Matters Here

- `Next.js 16` + `React 19` for App Router and modern UI architecture
- `TypeScript` for type-safe frontend and backend code
- `Tailwind CSS v4` for fast, scalable styling
- `Prisma` + `PostgreSQL` for database modeling and persistence
- `AWS` for hosting and deployment experience
- `TanStack Query` for client-side server state management
- `React Hook Form` + `Zod` for reliable forms and validation
- `Axios` for frontend API communication
- `Bun` for package management and scripts

## Run Locally

```bash
bun dev
bun run lint
bun run build
bun run db:generate
bun run db:push
```

## Project Structure

```bash
src/app        # routes and API endpoints
src/features   # feature-based UI and hooks
src/components # shared and UI components
src/server     # controllers, services, repositories
prisma         # schema and migrations
```
