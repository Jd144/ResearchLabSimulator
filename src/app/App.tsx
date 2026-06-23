import { useMemo, useState } from 'react';
import { Game } from './Game';
import { HUD } from '../components/HUD/HUD';
import { InteractionPrompt } from '../components/GameUI/InteractionPrompt';
import { initialGameState } from '../data/gameState';
import { worldZones } from '../data/world';
import { getNearestInteraction } from '../features/interactions/doorInteraction';
import type { GameState } from '../data/gameState';
import type { PlayerPosition } from '../player/playerTypes';

export function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({
    x: 0,
    y: 0,
    z: 2,
  });

  const currentZone = worldZones[gameState.zoneId];

  const activeInteraction = useMemo(
    () => getNearestInteraction(playerPosition, currentZone.interactions),
    [currentZone.interactions, playerPosition],
  );

  const handleInteraction = () => {
    if (!activeInteraction?.target) {
      return;
    }

    const interaction = activeInteraction.target;

    setGameState((current) => {
      const ppeComplete = current.ppe.labCoat && current.ppe.gloves && current.ppe.goggles;

      if (interaction.type === 'lab-door' && interaction.requiresPPE && !ppeComplete) {
        return {
          ...current,
          notice: interaction.blockedMessage ?? 'PPE required before lab entry',
          objective: 'Equip PPE at the station before entering the Molecular Biology Lab.',
        };
      }

      const hasCompletedInteraction = current.completedInteractions.includes(interaction.id);
      const xpReward = hasCompletedInteraction ? 0 : (interaction.xpReward ?? 0);
      const nextZone = interaction.nextZoneId ? worldZones[interaction.nextZoneId] : null;
      const nextPPE =
        interaction.type === 'ppe-station'
          ? { labCoat: true, gloves: true, goggles: true }
          : current.ppe;

      return {
        ...current,
        zoneId: nextZone?.id ?? current.zoneId,
        location: nextZone?.location ?? current.location,
        objective: interaction.nextObjective ?? nextZone?.objective ?? current.objective,
        ppe: nextPPE,
        notice: interaction.message ?? current.notice,
        xp: current.xp + xpReward,
        completedInteractions: hasCompletedInteraction
          ? current.completedInteractions
          : [...current.completedInteractions, interaction.id],
      };
    });
  };

  return (
    <main className="app-shell">
      <Game currentZone={currentZone} onPlayerMove={setPlayerPosition} />
      <HUD gameState={gameState} nearbyInteraction={activeInteraction} />
      <InteractionPrompt interaction={activeInteraction} onInteract={handleInteraction} />
    </main>
  );
}
