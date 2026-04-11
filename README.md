# Trimly | Enterprise-Grade URL Management System

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.7-2D3748?style=for-the-badge&logo=prisma)
![AWS](https://img.shields.io/badge/AWS-Cloud_Native-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-Runtime-F9F1E1?style=for-the-badge&logo=bun&logoColor=black)

Trimly is a high-performance, scalable URL management platform engineered with modern full-stack architectural principles. Developed as a showcase of senior-level engineering standards, it demonstrates a rigorous approach to separation of concerns, infrastructure as code (IaC), and type-safe development.

---

## 🏗️ Architecture & Design Philosophy

The project follows a **Modular Monolith** structure with a clear boundary between the presentation layer and business logic, ensuring long-term maintainability and testability.

### Backend: Layered Architecture (Controller-Service-Repository)

To ensure business logic is decoupled from external dependencies (HTTP/DB), we implement a 3-tier architecture:

- **Controllers:** Responsible for request parsing, validation (Zod), and response orchestration.
- **Services:** Contains core business logic, domain rules, and cross-model orchestrations.
- **Repositories:** Encapsulates data access patterns using Prisma, providing a clean API for the service layer and facilitating easier mocking during unit testing.

### Frontend: Feature-Based Organization

The frontend is organized by **Features**, reducing cognitive load and improving scalability:

- `src/features/*`: Encapsulates logic, components, and hooks specific to a business domain (e.g., Auth, Dashboard, Analytics).
- `src/components/ui`: Atomic UI components built with Radix UI (Base UI) and Tailwind CSS v4.
- **Server State Management:** Leverages TanStack Query (v5) for robust caching, optimistic updates, and synchronization.

---

## 🚀 Key Features

- **Anonymous Shortening:** seamless "Guest Identity" system allowing users to shorten links without registration, with the ability to "claim" links upon sign-up.
- **Full-Stack Authentication:** Secure session-based authentication with password hashing and expiration logic.
- **Real-time Analytics:** Granular tracking of click events, including device type, OS, browser, and geographic metadata (anonymized).
- **Enterprise Dashboard:** Comprehensive management interface for link lifecycle (Active/Disabled/Expired).
- **Infrastructure as Code:** Fully automated deployment using **SST (Serverless Stack)** on AWS.

---

## 🛠️ Technical Stack & Rationale

| Technology                  | Rationale                                                                                  |
| :-------------------------- | :----------------------------------------------------------------------------------------- |
| **Next.js 16 (App Router)** | Leverages React Server Components (RSC) for optimal LCP and reduced client-side hydration. |
| **TypeScript 6.0**          | Strict type-safety across the entire stack, including database schemas via Prisma.         |
| **Tailwind CSS v4**         | Next-generation CSS engine for high-performance styling and zero-runtime overhead.         |
| **Prisma 7.7 + PostgreSQL** | Type-safe ORM with automated migrations and efficient connection pooling.                  |
| **SST (Serverless Stack)**  | Cloud-native deployment on AWS (Lambda, S3, RDS) for infinite scalability and low cost.    |
| **Bun**                     | High-performance JS runtime and package manager for faster build cycles.                   |

---

## 🛠️ Development & Engineering Excellence

### Prerequisites

- [Bun](https://bun.sh/) runtime installed.
- AWS CLI configured (for SST deployments).

### Local Setup

```bash
# Install dependencies
bun install

# Database synchronization
bun run db:generate
bun run db:push

# Launch development server
bun dev
```

### Quality Gates

We maintain high code quality through automated tooling:

- **Linting:** `bun run lint` (ESLint 9+ with Next.js rules)
- **Formatting:** `bun run format:check` (Prettier)
- **Type Checking:** `tsc --noEmit`
- **Git Hooks:** Husky-powered pre-commit hooks to ensure zero-regression on every commit.

---

## 📡 Infrastructure (AWS via SST)

Trimly is deployed using SST, orchestrating native AWS resources:

- **Next.js Website:** Hosted on AWS Lambda with OpenNext.
- **Database:** Amazon RDS (PostgreSQL).
- **Deployment:**
  ```bash
  bun sst deploy --stage prod
  ```

---

## 📁 Project Structure

```text
├── src/
│   ├── app/           # Next.js Routes & API Handlers
│   ├── features/      # Domain-specific UI, Hooks & Logic
│   ├── server/        # Business Logic (Controllers, Services, Repositories)
│   ├── lib/           # Shared Utilities & Shared Logic
│   ├── components/    # Shared UI Library (Atomic Design)
│   └── types/         # Global Type Definitions
├── prisma/            # Schema Design & Migrations
└── sst.config.ts      # Infrastructure as Code Definitions
```

---

_Developed with focus on scalability, security, and developer experience._
