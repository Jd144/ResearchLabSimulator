import { useMemo, useState } from 'react';
import { Game } from './Game';
import { HUD } from '../components/HUD/HUD';
import { InteractionPrompt } from '../components/GameUI/InteractionPrompt';
import { hostelDoor } from '../data/hostelRoom';
import { initialGameState } from '../data/gameState';
import { getDoorInteraction } from '../features/interactions/doorInteraction';
import type { GameState } from '../data/gameState';
import type { PlayerPosition } from '../player/playerTypes';

export function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({
    x: 0,
    y: 0,
    z: 2,
  });

  const doorInteraction = useMemo(
    () => getDoorInteraction(playerPosition, hostelDoor),
    [playerPosition],
  );

  const handleExitDoor = () => {
    if (!doorInteraction.isAvailable) {
      return;
    }

    setGameState((current) => {
      if (current.exitDoorReached) {
        return current;
      }

      return {
        ...current,
        objective: 'Prototype complete: hostel exit reached. Campus unlock comes next.',
        xp: current.xp + 25,
        exitDoorReached: true,
      };
    });
  };

  return (
    <main className="app-shell">
      <Game onPlayerMove={setPlayerPosition} />
      <HUD gameState={gameState} />
      <InteractionPrompt interaction={doorInteraction} onInteract={handleExitDoor} />
    </main>
  );
}
