# Technical Design

## Product Type

RealLabVerse is an immersive 3D EdTech simulation platform. It combines campus navigation, laboratory safety training, SOP-based experiments, mistake tracking, contamination logic, and faculty reporting.

## Frontend Design

### Framework

- React with TypeScript
- Three.js through React Three Fiber
- Tailwind CSS for dashboards and overlays

### Frontend Layers

- App shell
- Route system
- Auth provider
- 3D scene provider
- HUD overlays
- Dashboard pages
- Simulation state
- Supabase client

## Simulation Design

### World Zones

Each major place should be treated as a separate world zone:

- Hostel room
- Hostel corridor
- Campus
- Department building
- Lab floor
- Laboratory

This keeps performance manageable and lets the app load assets only when needed.

### Scene Loading

Use lazy loading for large 3D assets. Phase 1 should avoid loading the full campus and lab at the same time.

### Player Controller

The player controller should support:

- Walking
- Looking around
- Object interaction
- Door interaction
- Basic camera smoothing
- Collision boundaries

### NPC Behavior

Phase 1 should use simple scripted behavior:

- Idle
- Walk route
- Sit
- Type
- Work at bench
- Enter/leave room

Later versions can move toward schedule-based or AI-assisted NPC behavior.

## Experiment System

Experiments should be data-driven. Each experiment should define:

- Required training
- Required lab access level
- SOP steps
- Expected actions
- Mistake rules
- Contamination rules
- Result calculation rules
- Report fields

## Audio Design

Use positional audio for:

- Footsteps
- Doors
- Chair movement
- Keyboard typing
- AC and fan ambience
- Centrifuge
- PCR machine
- Lab equipment

Nearby audio should be louder. Far audio should naturally fade.

## Backend Design

Supabase should provide:

- Auth
- Database
- Storage
- Row Level Security
- Realtime presence in future phases
- Edge Functions for sensitive validation and report generation

## Security Design

- Never trust client-side experiment scores fully.
- Store action logs for experiment attempts.
- Use Edge Functions for final report validation.
- Use RLS to isolate institutes.
- Students should only access their own progress and assigned experiments.

## Future Multiplayer Readiness

Phase 1 should be single-player. However, world state and lab session design should keep future multiplayer in mind:

- User presence
- Shared lab rooms
- Collaborative experiments
- Faculty live monitoring

