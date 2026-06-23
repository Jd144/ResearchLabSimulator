# RealLabVerse

**Train Virtually. Perform Confidently.**

RealLabVerse is a realistic virtual university campus and research laboratory training platform. The product is designed as an immersive 3D simulation where students move through a hostel, campus, department building, and laboratory before performing real laboratory workflows.

This repository is currently in the **planning and architecture phase only**. Application code will be added later in controlled development phases.

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

## Development Rule

Do not generate the entire application at once. Build RealLabVerse as a modular simulation platform, one system at a time.

