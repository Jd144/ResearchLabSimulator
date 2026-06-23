import type { PlayerPosition } from '../player/playerTypes';
import type { InteractionTarget } from '../features/interactions/interactionTypes';

export type WorldZoneId =
  | 'hostel-room'
  | 'hostel-corridor'
  | 'campus-ground'
  | 'department-lobby'
  | 'lab-floor-corridor'
  | 'molecular-biology-lab';

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
        type: 'zone-transition',
        position: { x: 0, y: 0, z: -10.4 },
        interactionRadius: 1.8,
        nextZoneId: 'department-lobby',
        message: 'Department reached. Check reception or go to the lab floor.',
        nextObjective: 'Collect lab access instructions, then use stairs or lift to reach the lab floor.',
        xpReward: 30,
      },
    ],
  },
  'department-lobby': {
    id: 'department-lobby',
    location: 'Department Lobby',
    objective: 'Collect lab access instructions, then use stairs or lift to reach the lab floor.',
    spawnPoint: { x: 0, y: 0, z: 6.5 },
    bounds: {
      minX: -7.5,
      maxX: 7.5,
      minZ: -7.5,
      maxZ: 7.5,
    },
    interactions: [
      {
        id: 'department-reception',
        label: 'Reception Desk',
        actionLabel: 'Press E',
        type: 'notice',
        position: { x: 0, y: 0, z: 1.6 },
        interactionRadius: 1.8,
        message: 'Collect lab access instructions',
        nextObjective: 'Read the lab safety notice, then go to the lab floor by stairs or lift.',
        xpReward: 10,
      },
      {
        id: 'department-notice-board',
        label: 'Lab Safety Notice',
        actionLabel: 'Press E',
        type: 'notice',
        position: { x: -6.8, y: 0, z: -0.8 },
        interactionRadius: 1.6,
        message: 'Lab safety notice: PPE is mandatory before entering any wet lab.',
        nextObjective: 'Use stairs or lift to reach the lab floor corridor.',
        xpReward: 10,
      },
      {
        id: 'department-stairs',
        label: 'Use Stairs',
        actionLabel: 'Press E',
        type: 'zone-transition',
        position: { x: 5.8, y: 0, z: -6.4 },
        interactionRadius: 1.6,
        nextZoneId: 'lab-floor-corridor',
        nextObjective: 'Find the Molecular Biology Lab and equip PPE before entry.',
        xpReward: 15,
      },
      {
        id: 'department-lift',
        label: 'Use Lift',
        actionLabel: 'Press E',
        type: 'zone-transition',
        position: { x: -5.8, y: 0, z: -6.4 },
        interactionRadius: 1.6,
        nextZoneId: 'lab-floor-corridor',
        nextObjective: 'Find the Molecular Biology Lab and equip PPE before entry.',
        xpReward: 15,
      },
    ],
  },
  'lab-floor-corridor': {
    id: 'lab-floor-corridor',
    location: 'Lab Floor Corridor',
    objective: 'Find the Molecular Biology Lab and equip PPE before entry.',
    spawnPoint: { x: 0, y: 0, z: 7.4 },
    bounds: {
      minX: -4.6,
      maxX: 4.6,
      minZ: -9.5,
      maxZ: 9.5,
    },
    interactions: [
      {
        id: 'ppe-station',
        label: 'PPE Station',
        actionLabel: 'Press E',
        type: 'ppe-station',
        position: { x: -3.65, y: 0, z: -4.6 },
        interactionRadius: 1.6,
        message: 'PPE equipped: lab coat, gloves, and goggles are now on.',
        nextObjective: 'Enter the Molecular Biology Lab.',
        xpReward: 20,
      },
      {
        id: 'molecular-biology-lab-door',
        label: 'Molecular Biology Lab',
        actionLabel: 'Press E',
        type: 'lab-door',
        position: { x: 3.75, y: 0, z: -5.2 },
        interactionRadius: 1.7,
        requiresPPE: true,
        blockedMessage: 'PPE required before lab entry',
        nextZoneId: 'molecular-biology-lab',
        message: 'Molecular Biology Lab entry granted.',
        nextObjective: 'Explore the lab layout. Full experiment workflow comes next.',
        xpReward: 35,
      },
      {
        id: 'pi-office-door',
        label: 'PI Office Door',
        actionLabel: 'Press E',
        type: 'notice',
        position: { x: -3.85, y: 0, z: 2.2 },
        interactionRadius: 1.4,
        message: 'PI office: meetings are scheduled after lab orientation.',
        nextObjective: 'Equip PPE and enter the Molecular Biology Lab.',
        xpReward: 5,
      },
    ],
  },
  'molecular-biology-lab': {
    id: 'molecular-biology-lab',
    location: 'Molecular Biology Lab',
    objective: 'Explore the lab layout. Full experiment workflow comes next.',
    spawnPoint: { x: 0, y: 0, z: 7.0 },
    bounds: {
      minX: -8.2,
      maxX: 8.2,
      minZ: -8.5,
      maxZ: 8.5,
    },
    interactions: [
      {
        id: 'user-lab-desk',
        label: 'User Desk',
        actionLabel: 'Press E',
        type: 'notice',
        position: { x: -5.6, y: 0, z: 5.1 },
        interactionRadius: 1.5,
        message: 'Your lab desk is ready. Notebook and assigned tasks will be added in the experiment phase.',
        nextObjective: 'Inspect the lab equipment placeholders.',
        xpReward: 5,
      },
      {
        id: 'gel-electrophoresis-unit',
        label: 'Gel Electrophoresis Unit',
        actionLabel: 'Press E',
        type: 'notice',
        position: { x: 3.8, y: 0, z: -2.7 },
        interactionRadius: 1.5,
        message: 'Gel electrophoresis unit placeholder. SOP workflow will connect here later.',
        nextObjective: 'Lab entry flow complete. Experiment workflow is next.',
        xpReward: 5,
      },
    ],
  },
};
