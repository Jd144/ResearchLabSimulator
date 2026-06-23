# Decision 0001: Tech Stack

## Status

Proposed

## Decision

Use React, TypeScript, Three.js, React Three Fiber, Tailwind CSS, and Supabase.

## Reason

This stack supports a browser-based 3D simulation with dashboards, authentication, database storage, asset storage, and future realtime features.

## Stack

- React for UI
- TypeScript for safer development
- Three.js for 3D rendering
- React Three Fiber for React-based Three.js scenes
- Tailwind CSS for dashboard and HUD styling
- Supabase Auth for login
- Supabase Postgres for structured data
- Supabase Storage for SOPs, reports, and assets
- Supabase Realtime for future multiplayer presence

## Consequences

- Browser performance must be managed carefully.
- 3D assets must be optimized.
- Multiplayer should be added after the single-player MVP works.

