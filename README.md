# RealLabVerse

**Train Virtually. Perform Confidently.**

RealLabVerse is a realistic virtual university campus and research laboratory training platform. The product is designed as an immersive 3D simulation where students move through a hostel, campus, department building, and laboratory before performing real laboratory workflows.

This repository now contains the first Phase 1 playable prototype foundation. The current build is intentionally small: a hostel room scene, placeholder student avatar, WASD movement, third-person camera, door interaction, and HUD.

## Vision

RealLabVerse is not a simple website, lab information portal, or basic experiment simulator. It is a digital university and laboratory training environment where students can:

- Navigate a realistic campus.
- Enter a laboratory only after PPE and safety checks.
- Interact with faculty, students, lab assistants, and instruments.
- Perform experiments using real SOP-based steps.
- Make mistakes and see realistic consequences.
- Build confidence before entering a physical lab.

## Phase 1 Goal

The first version should deliver one polished vertical slice:

- Student login
- Hostel room spawn
- Hostel corridor
- Campus path
- Department building
- Laboratory access gate
- One realistic laboratory
- One playable student
- One experiment: Agarose Gel Electrophoresis
- Basic NPC activity
- Basic audio ambience
- Mistake tracking
- Contamination tracking
- Faculty dashboard MVP

## Current Prototype Scope

Implemented now:

- React + Vite frontend project
- Three.js scene through React Three Fiber
- Hostel room scene
- Placeholder student avatar
- WASD movement
- Third-person camera follow
- Exit door interaction with `E`
- HUD showing location, objective, XP, and level

Not implemented yet:

- Full campus
- Full lab
- Multiplayer
- Login/backend
- Payments
- Dashboards

## Documentation

- [Project Architecture](docs/architecture/PROJECT_ARCHITECTURE.md)
- [Technical Design](docs/architecture/TECHNICAL_DESIGN.md)
- [Database Schema](docs/database/DATABASE_SCHEMA.md)
- [User Flows](docs/user-flows/USER_FLOWS.md)
- [Development Roadmap](docs/roadmap/ROADMAP.md)
- [Agarose Gel Electrophoresis SOP](docs/experiments/agarose-gel-electrophoresis.md)
- [Decision 0001: Tech Stack](docs/decisions/0001-tech-stack.md)
- [Decision 0002: Phase 1 Scope](docs/decisions/0002-phase-1-scope.md)

## Planned Tech Stack

- React
- TypeScript
- Three.js
- React Three Fiber
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Supabase Realtime

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Controls:

- `W`, `A`, `S`, `D` or arrow keys to move
- `E` near the hostel door to interact

## Development Rule

Do not generate the entire application at once. Build RealLabVerse as a modular simulation platform, one system at a time.
