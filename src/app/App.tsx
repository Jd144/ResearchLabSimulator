import { useMemo, useState } from 'react';
import { Game } from './Game';
import { HUD } from '../components/HUD/HUD';
import { InteractionPrompt } from '../components/GameUI/InteractionPrompt';
import { LabPanels } from '../components/GameUI/LabPanels';
import { initialGameState } from '../data/gameState';
import { worldZones } from '../data/world';
import { molecularBiologyLabObjects } from '../data/labInteractables';
import { initialLabRuntimeState } from '../features/experiments/labRuntimeTypes';
import { getNearestInteraction } from '../features/interactions/doorInteraction';
import type { GameState } from '../data/gameState';
import type { LabRuntimeState } from '../features/experiments/labRuntimeTypes';
import type { InteractableAction } from '../features/interactions/interactableObjectTypes';
import type { PlayerPosition } from '../player/playerTypes';

export function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [labRuntime, setLabRuntime] = useState<LabRuntimeState>(initialLabRuntimeState);
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

  const centrifugeSoundLevel = useMemo(() => {
    if (!labRuntime.centrifuge.isRunning || gameState.zoneId !== 'molecular-biology-lab') {
      return 'SILENT';
    }

    const centrifuge = molecularBiologyLabObjects.find((object) => object.id === 'centrifuge');

    if (!centrifuge) {
      return 'SILENT';
    }

    const distance = Math.hypot(
      playerPosition.x - centrifuge.position.x,
      playerPosition.z - centrifuge.position.z,
    );

    if (distance <= 2.4) return 'HIGH';
    if (distance <= 6) return 'LOW';
    return 'SILENT';
  }, [gameState.zoneId, labRuntime.centrifuge.isRunning, playerPosition]);

  const handleInteraction = () => {
    if (!activeInteraction?.target) {
      return;
    }

    const interaction = activeInteraction.target;

    if (interaction.type === 'lab-object' && interaction.onInteractAction) {
      handleLabObjectInteraction(interaction.onInteractAction);
      return;
    }

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

    if (interaction.id === 'molecular-biology-lab-door') {
      setLabRuntime((current) => ({
        ...current,
        activePanel: null,
        panelMessage: '',
        chemicalShelfOpen: false,
        labDoorLocked: false,
      }));
    }
  };

  const handleLabObjectInteraction = (action: InteractableAction) => {
    if (action === 'show-task-panel') {
      setLabRuntime((current) => ({
        ...current,
        activePanel: 'task',
        panelMessage: '',
        chemicalShelfOpen: false,
      }));
      setGameState((current) => ({ ...current, notice: 'Assigned task panel opened.' }));
      return;
    }

    if (action === 'open-centrifuge-panel') {
      setLabRuntime((current) => ({
        ...current,
        activePanel: 'centrifuge',
        panelMessage: '',
        chemicalShelfOpen: false,
      }));
      setGameState((current) => ({ ...current, notice: 'Centrifuge control panel opened.' }));
      return;
    }

    if (action === 'open-inventory-panel') {
      setLabRuntime((current) => ({
        ...current,
        activePanel: 'inventory',
        panelMessage: '',
        chemicalShelfOpen: true,
      }));
      setGameState((current) => ({ ...current, notice: 'Chemical shelf inventory opened.' }));
      return;
    }

    if (action === 'attempt-lab-exit') {
      handleLabExitAttempt();
      return;
    }

    const message =
      action === 'show-microscope-training'
        ? 'Microscope training coming soon'
        : action === 'show-gel-locked'
          ? 'Agarose gel training module locked until centrifuge tutorial is completed'
          : 'Waste disposal guidance: segregate biological waste, sharps, and chemical waste before leaving.';

    setLabRuntime((current) => ({
      ...current,
      activePanel: 'message',
      panelMessage: message,
      chemicalShelfOpen: false,
    }));
    setGameState((current) => ({ ...current, notice: message }));
  };

  const handleLabExitAttempt = () => {
    if (labRuntime.centrifuge.isRunning) {
      showLabWarning('Stop the centrifuge before leaving the lab.');
      return;
    }

    if (labRuntime.chemicalShelfOpen) {
      showLabWarning('Close the chemical shelf inventory before leaving the lab.');
      return;
    }

    if (!labRuntime.labDoorLocked) {
      setLabRuntime((current) => ({
        ...current,
        activePanel: 'message',
        panelMessage: 'Lab door locked. Press E at the exit door again to leave.',
        labDoorLocked: true,
      }));
      setGameState((current) => ({
        ...current,
        notice: 'Lab door locked. Press E again to leave.',
        objective: 'Exit the lab after locking the door.',
      }));
      return;
    }

    const nextZone = worldZones['lab-floor-corridor'];
    setLabRuntime((current) => ({ ...current, activePanel: null, panelMessage: '' }));
    setGameState((current) => ({
      ...current,
      zoneId: nextZone.id,
      location: nextZone.location,
      objective: 'Lab exited safely. Phase 1 lab interaction checkpoint complete.',
      notice: 'Lab exit completed safely.',
    }));
  };

  const showLabWarning = (message: string) => {
    setLabRuntime((current) => ({ ...current, activePanel: 'message', panelMessage: message }));
    setGameState((current) => ({ ...current, notice: message }));
  };

  const handleClosePanel = () => {
    setLabRuntime((current) => ({
      ...current,
      activePanel: null,
      panelMessage: '',
      chemicalShelfOpen: current.activePanel === 'inventory' ? false : current.chemicalShelfOpen,
    }));
  };

  const updateCentrifuge = (updater: (current: LabRuntimeState['centrifuge']) => LabRuntimeState['centrifuge']) => {
    setLabRuntime((current) => ({
      ...current,
      centrifuge: updater(current.centrifuge),
    }));
  };

  return (
    <main className="app-shell">
      <Game currentZone={currentZone} labRuntime={labRuntime} onPlayerMove={setPlayerPosition} />
      <HUD gameState={gameState} nearbyInteraction={activeInteraction} />
      <InteractionPrompt interaction={activeInteraction} onInteract={handleInteraction} />
      <LabPanels
        labRuntime={labRuntime}
        centrifugeSoundLevel={centrifugeSoundLevel}
        onClose={handleClosePanel}
        onSetCentrifugeRPM={(rpm) =>
          updateCentrifuge((current) => ({ ...current, rpm: Number.isFinite(rpm) ? rpm : current.rpm }))
        }
        onSetCentrifugeTime={(timeMinutes) =>
          updateCentrifuge((current) => ({
            ...current,
            timeMinutes: Number.isFinite(timeMinutes) ? timeMinutes : current.timeMinutes,
          }))
        }
        onToggleCentrifugeBalance={() =>
          updateCentrifuge((current) => ({ ...current, isBalanced: !current.isBalanced }))
        }
        onStartCentrifuge={() => {
          updateCentrifuge((current) =>
            current.isBalanced ? { ...current, isRunning: true } : current,
          );
          if (!labRuntime.centrifuge.isBalanced) {
            setGameState((current) => ({
              ...current,
              notice: 'Centrifuge cannot start. Tubes must be balanced.',
            }));
          }
        }}
        onStopCentrifuge={() => updateCentrifuge((current) => ({ ...current, isRunning: false }))}
      />
    </main>
  );
}
