import type { WorldZoneId } from './world';
import { initialPPEState, type PPEState } from '../features/ppe/ppeTypes';

export type GameState = {
  zoneId: WorldZoneId;
  location: string;
  objective: string;
  ppe: PPEState;
  xp: number;
  level: string;
  notice?: string;
  completedInteractions: string[];
};

export const initialGameState: GameState = {
  zoneId: 'hostel-room',
  location: 'Hostel Room',
  objective: 'Reach the exit door and press E to leave the room.',
  ppe: initialPPEState,
  xp: 0,
  level: 'Intern',
  completedInteractions: [],
};
