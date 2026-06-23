import type { PlayerPosition } from '../player/playerTypes';
import type { InteractionTarget } from '../features/interactions/interactionTypes';

export type WorldZoneId = 'hostel-room' | 'hostel-corridor' | 'campus-ground';

export type ZoneBounds = {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
};

export type WorldZone = {
  id: WorldZoneId;
  location: string;
  objective: string;
  spawnPoint: PlayerPosition;
  bounds: ZoneBounds;
  interactions: InteractionTarget[];
};

export const worldZones: Record<WorldZoneId, WorldZone> = {
  'hostel-room': {
    id: 'hostel-room',
    location: 'Hostel Room',
    objective: 'Reach the exit door and press E to leave the room.',
    spawnPoint: { x: 0, y: 0, z: 2 },
    bounds: {
      minX: -4.2,
      maxX: 4.2,
      minZ: -4.2,
      maxZ: 4.2,
    },
    interactions: [
      {
        id: 'hostel-room-exit-door',
        label: 'Exit Hostel Room',
        actionLabel: 'Press E',
        type: 'zone-transition',
        position: { x: 0, y: 0, z: -4.25 },
        interactionRadius: 1.4,
        nextZoneId: 'hostel-corridor',
        nextObjective: 'Read the notice board, then use the stairs or lift to reach campus ground.',
        xpReward: 15,
      },
    ],
  },
  'hostel-corridor': {
    id: 'hostel-corridor',
    location: 'Hostel Corridor',
    objective: 'Read the notice board, then use the stairs or lift to reach campus ground.',
    spawnPoint: { x: 0, y: 0, z: 5.4 },
    bounds: {
      minX: -3.4,
      maxX: 3.4,
      minZ: -8.2,
      maxZ: 8.2,
    },
    interactions: [
      {
        id: 'corridor-notice-board',
        label: 'Notice Board',
        actionLabel: 'Press E',
        type: 'notice',
        position: { x: -3.15, y: 0, z: 0.2 },
        interactionRadius: 1.5,
        message: "Today's objective: reach the department building from campus ground.",
        nextObjective: 'Use the stairs or lift to go down to campus ground.',
        xpReward: 5,
      },
      {
        id: 'corridor-stairs',
        label: 'Use Stairs',
        actionLabel: 'Press E',
        type: 'zone-transition',
        position: { x: 2.55, y: 0, z: -7.0 },
        interactionRadius: 1.5,
        nextZoneId: 'campus-ground',
        nextObjective: 'Walk along the campus pathway toward the department building.',
        xpReward: 20,
      },
      {
        id: 'corridor-lift',
        label: 'Use Lift',
        actionLabel: 'Press E',
        type: 'zone-transition',
        position: { x: -2.45, y: 0, z: -7.1 },
        interactionRadius: 1.5,
        nextZoneId: 'campus-ground',
        nextObjective: 'Walk along the campus pathway toward the department building.',
        xpReward: 20,
      },
    ],
  },
  'campus-ground': {
    id: 'campus-ground',
    location: 'Campus Ground',
    objective: 'Walk along the campus pathway toward the department building.',
    spawnPoint: { x: 0, y: 0, z: 8.5 },
    bounds: {
      minX: -9.5,
      maxX: 9.5,
      minZ: -12,
      maxZ: 10,
    },
    interactions: [
      {
        id: 'department-building-entry',
        label: 'Department Building',
        actionLabel: 'Press E',
        type: 'objective',
        position: { x: 0, y: 0, z: -10.4 },
        interactionRadius: 1.8,
        message: 'Department reached. The next Phase 1 slice will add department entry.',
        nextObjective: 'Prototype checkpoint reached: department building is ready for the next scene.',
        xpReward: 30,
      },
    ],
  },
};

