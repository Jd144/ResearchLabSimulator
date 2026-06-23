import type { WorldZoneId } from './world';

export type GameState = {
  zoneId: WorldZoneId;
  location: string;
  objective: string;
  xp: number;
  level: string;
  notice?: string;
  completedInteractions: string[];
};

export const initialGameState: GameState = {
  zoneId: 'hostel-room',
  location: 'Hostel Room',
  objective: 'Reach the exit door and press E to leave the room.',
  xp: 0,
  level: 'Intern',
  completedInteractions: [],
};
