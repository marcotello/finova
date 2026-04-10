# Technical Architecture Document: Finova

**Version:** 1.8

**Status:** Approved - Clean Architecture & Read Model Pattern

**Stack:** Angular, NestJS, PostgreSQL, Prisma, Liquibase

## 1. System Overview

Finova is a decoupled, multi-platform financial intelligence system.

- **finova-api:** NestJS backend following **Clean Architecture (Hexagonal)** principles.
    
- **finova-web:** Angular-based **Responsive Web App** using NgRx Signal Store.
    

## 2. Backend Architecture (Clean Architecture)

### 2.1 Module Structure (Cohesion-First)

To ensure high cohesion and portability, each domain module (e.g., Accounts, Transactions) is organized into three distinct layers:

```
src/modules/[module-name]/
├── domain/                         # Core: Business Rules & Entities
│   ├── [entity].entity.ts          # Plain TypeScript classes
│   └── [domain].repository.port.ts # Abstract class (The "Port")
├── infrastructure/                 # Adapters: Implementation Details
│   └── persistence/
│       └── prisma/
│           ├── mappers/            # Domain <-> Prisma conversion
│           └── [domain].repository.ts # Concrete implementation
├── [module].controller.ts          # Presentation: HTTP layer
├── [module].service.ts             # Core: Use Case orchestration
└── [module].module.ts              # NestJS: Dependency Injection
```

### 2.2 Dependency Inversion (DI)

- **The Port:** Services inject **Abstract Classes** (defined in the `domain` folder) instead of concrete implementations.
    
- **The Adapter:** Concrete Prisma repositories implement these abstract classes.
    
- **Benefit:** This allows for seamless unit testing with in-memory mocks and keeps business logic agnostic of the database (Prisma).
    

### 2.3 Specialized Dashboard Architecture (Option B: Read Model)

The Dashboard module is treated as a **Consumer/Read Model** rather than a standard domain owner. To avoid complex service-to-service dependencies for data aggregation, it follows the **Query Service** pattern:

- **Logic:** The `DashboardRepository` has specialized read-only access to multiple tables (Transactions, Budgets, Accounts).
    
- **Implementation:** It performs optimized SQL/Prisma joins to aggregate totals (e.g., Net Worth, Budget Progress) in a single request.
    
- **Independence:** It does not rely on other modules' services for its data, keeping the dashboard logic self-contained and performant.
    

## 3. Global Infrastructure (`src/infrastructure/`)

Items that are shared across all business domains are located at the root level:

- **Prisma Service:** Global database connection management.
    
- **Intelligence Service (Finny):** AI orchestration (Gemini API) and context management.
    
- **Storage Service:** Driver for document attachments (local/cloud).
    

## 4. Data & Precision

- **Financial Accuracy:** All currency values are stored as `NUMERIC(19, 4)` in PostgreSQL.
    
- **Handling:** The backend uses `decimal.js` for all arithmetic operations to avoid floating-point errors.
    
- **Currency Isolation:** Aggregations are calculated per currency (MXN and USD separately).
    

## 5. Development Guidelines (The Rules)

1. **Strict Layering:** Presentation $\rightarrow$ Core (Service) $\rightarrow$ Domain (Entity/Port) $\leftarrow$ Infrastructure (Adapter).
    
2. **No Circulars:** Modules should not have circular dependencies. If Module A needs data from B, use Service-to-Service injection OR a Read Model (like the Dashboard).
    
3. **Mappers Required:** Data from Prisma must be mapped to a Domain Entity before leaving the Infrastructure layer. **Never** return Prisma-generated types from a Service.
    
4. **Abstract Injection:** Always use `constructor(private readonly repo: AbstractRepository)` to leverage NestJS DI with Clean Architecture.
    
5. **Finny Persona:** The Intelligence Service must strictly follow the "Finny" persona—friendly, expert, and data-driven—while only accessing data via designated Read Models.
    

## 6. Frontend Architecture (Angular)

- **State Management:** **NgRx Signal Store** for granular, high-performance reactivity.
    
- **API Client:** Automatically generated from the backend Swagger definition (`/api-json`).
    
- **UI Framework:** Tailwind CSS with a mobile-first responsive strategy.