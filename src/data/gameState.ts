export type GameState = {
  location: string;
  objective: string;
  xp: number;
  level: string;
  exitDoorReached: boolean;
};

export const initialGameState: GameState = {
  location: 'Hostel Room',
  objective: 'Reach the exit door and press E to leave the room.',
  xp: 0,
  level: 'Intern',
  exitDoorReached: false,
};
