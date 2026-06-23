# RealLabVerse

**Train Virtually. Perform Confidently.**

RealLabVerse is a realistic virtual university campus and research laboratory training platform. The product is designed as an immersive 3D simulation where students move through a hostel, campus, department building, and laboratory before performing real laboratory workflows.

This repository now contains the first Phase 1 playable prototype foundation. The current build is intentionally small: hostel room, hostel corridor, campus ground, placeholder student avatar, WASD movement, third-person camera, world interactions, and HUD.

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
- Hostel corridor scene
- Campus ground scene
- Department lobby scene
- Lab floor corridor scene
- Basic Molecular Biology Lab scene
- Placeholder student avatar
- WASD movement
- Third-person camera follow
- Exit door, notice board, reception, stairs, lift, PPE station, and lab door interactions with `E`
- PPE-gated Molecular Biology Lab entry
- HUD showing location, objective, PPE status, nearby interaction, XP, and level

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
- `E` near highlighted objects to interact

## How to Add Real 3D Models

RealLabVerse now has a GLB/GLTF-ready asset loader. Place production-ready `.glb` files in these exact locations and filenames:

```text
public/models/lab/centrifuge.glb
public/models/lab/microscope.glb
public/models/lab/lab-bench.glb
public/models/lab/lab-chair.glb
public/models/lab/lab-desk.glb
public/models/lab/chemical-shelf.glb
public/models/lab/gel-electrophoresis.glb
public/models/lab/lab-door.glb
public/models/characters/student-labcoat.glb
public/models/characters/phd-scholar.glb
public/models/characters/pi.glb
```

Current imported local assets:

```text
public/models/lab/microscope.glb
public/models/lab/lab-bench.glb
public/models/lab/lab-desk.glb
public/models/lab/erlenmeyer-flask.glb
public/models/lab/blocks-lab-equipment.glb
public/models/lab/refrigerator.glb
public/models/lab/fridge.glb
public/models/ppe/glove.glb
public/models/ppe/glasses.glb
public/models/characters/student-labcoat.glb
public/models/characters/pi.glb
```

The loader checks these paths at runtime. If a model is present, the app loads it automatically. If a model is missing, the app keeps working with a clearly marked fallback and logs the missing path in the browser console only.

Recommended model rules:

- Export as `.glb`.
- Use real-world scale where possible.
- Keep origins near the object base/center.
- Use compressed textures for production.
- Keep PBR texture maps under `public/textures/`.
- Keep material notes under `public/materials/`.

## Development Rule

Do not generate the entire application at once. Build RealLabVerse as a modular simulation platform, one system at a time.
