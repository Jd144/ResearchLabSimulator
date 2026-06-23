import { useMemo, useState } from 'react';
import { Game } from './Game';
import { HUD } from '../components/HUD/HUD';
import { InteractionPrompt } from '../components/GameUI/InteractionPrompt';
import { LabPanels } from '../components/GameUI/LabPanels';
import { RoleSelection } from '../components/GameUI/RoleSelection';
import { StudentProfilePanel } from '../components/GameUI/StudentProfilePanel';
import { TeacherDashboard } from '../components/GameUI/TeacherDashboard';
import { initialGameState } from '../data/gameState';
import { worldZones } from '../data/world';
import { molecularBiologyLabObjects } from '../data/labInteractables';
import {
  agaroseGelTrainingSteps,
  buildNotebookEntry,
  buildTrainingReport,
  initialTrainingMissionState,
} from '../features/experiments/agaroseGelTraining';
import { initialLabRuntimeState } from '../features/experiments/labRuntimeTypes';
import { loadTrainingSave, persistCompletedTraining } from '../features/experiments/trainingSave';
import { getNearestInteraction } from '../features/interactions/doorInteraction';
import type { GameState } from '../data/gameState';
import type { TrainingMissionState } from '../features/experiments/agaroseGelTraining';
import type { LabRuntimeState } from '../features/experiments/labRuntimeTypes';
import type { InteractableAction } from '../features/interactions/interactableObjectTypes';
import type { SavedTrainingData } from '../features/experiments/trainingSave';
import type { UserRole } from '../features/auth/roleTypes';
import type { PlayerPosition } from '../player/playerTypes';

export function App() {
  const [role, setRole] = useState<UserRole>(null);
  const [savedData, setSavedData] = useState<SavedTrainingData>(() => loadTrainingSave());
  const [gameState, setGameState] = useState<GameState>(() => {
    return {
      ...initialGameState,
      xp: savedData.xp,
      level: savedData.level,
      completedTraining: savedData.completedTraining,
      notebookEntries: savedData.notebookEntries,
    };
  });
  const [labRuntime, setLabRuntime] = useState<LabRuntimeState>(initialLabRuntimeState);
  const [trainingMission, setTrainingMission] =
    useState<TrainingMissionState>(initialTrainingMissionState);
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

  const handleOpenTraining = () => {
    setLabRuntime((current) => ({ ...current, activePanel: 'training', panelMessage: '' }));
  };

  const handleStartTraining = () => {
    setTrainingMission({
      ...initialTrainingMissionState,
      status: 'in_progress',
      startedAt: Date.now(),
    });
    setGameState((current) => ({
      ...current,
      objective: 'Complete Agarose Gel Electrophoresis training.',
      notice: 'Training mission started.',
    }));
  };

  const handleAdvanceTraining = () => {
    setTrainingMission((current) => {
      if (current.status !== 'in_progress') {
        return current;
      }

      const step = agaroseGelTrainingSteps[current.currentStepIndex];
      const ppeReady = gameState.ppe.labCoat && gameState.ppe.gloves && gameState.ppe.goggles;
      const mistakes = [...current.mistakes];
      const safetyFlags = [...current.safetyFlags];
      let contaminationScore = current.contaminationScore;

      if (step.id === 'wear-ppe' && !ppeReady) {
        mistakes.push('Contamination risk');
        safetyFlags.push('PPE was missing at training start.');
        contaminationScore += 2;
      }

      if (step.id === 'measure-agarose' && current.agaroseAmount !== 1) {
        mistakes.push('Gel concentration incorrect');
      }

      if (step.id === 'add-buffer-volume' && current.bufferVolume !== 100) {
        mistakes.push('Improper gel preparation');
      }

      if (step.id === 'analyze-result' && !current.wasteDisposed) {
        safetyFlags.push('Waste disposal was not confirmed.');
        contaminationScore += 1;
      }

      const completedStepIds = Array.from(new Set([...current.completedStepIds, step.id]));
      const nextStepIndex = current.currentStepIndex + 1;

      if (nextStepIndex < agaroseGelTrainingSteps.length) {
        return {
          ...current,
          currentStepIndex: nextStepIndex,
          completedStepIds,
          mistakes,
          safetyFlags,
          contaminationScore,
        };
      }

      const completedMission = {
        ...current,
        completedStepIds,
        mistakes,
        safetyFlags,
        contaminationScore,
        completedAt: Date.now(),
      };
      const report = buildTrainingReport(completedMission);
      const notebookEntry = buildNotebookEntry(report);
      const status = report.score >= 70 ? 'passed' : 'failed';
      const certifiedBadgeUnlocked = report.score > 80;
      const finalMission: TrainingMissionState = {
        ...completedMission,
        status,
        report,
        notebookEntry,
        certifiedBadgeUnlocked,
      };

      setGameState((game) => {
        const completedTraining = certifiedBadgeUnlocked
          ? Array.from(new Set([...game.completedTraining, 'agarose-gel-electrophoresis']))
          : game.completedTraining;
        const notebookEntries = [...game.notebookEntries, notebookEntry];
        const nextGame = {
          ...game,
          xp: game.xp + report.xpReward,
          completedTraining,
          notebookEntries,
          notice: certifiedBadgeUnlocked
            ? 'Agarose Gel Training Completed'
            : `Training finished: ${report.result}`,
          objective: certifiedBadgeUnlocked
            ? 'Gel Electrophoresis Certified Badge unlocked.'
            : 'Review the report and repeat training for certification.',
        };

        persistCompletedTraining({
          currentXP: game.xp,
          currentLevel: game.level,
          mission: finalMission,
        });
        setSavedData(loadTrainingSave());

        return nextGame;
      });

      return finalMission;
    });
  };

  const handleSetAgaroseAmount = (amount: number) => {
    setTrainingMission((current) => ({
      ...current,
      agaroseAmount: Number.isFinite(amount) ? amount : current.agaroseAmount,
    }));
  };

  const handleSetBufferVolume = (volume: number) => {
    setTrainingMission((current) => ({
      ...current,
      bufferVolume: Number.isFinite(volume) ? volume : current.bufferVolume,
    }));
  };

  const handleDisposeWaste = () => {
    setTrainingMission((current) => ({
      ...current,
      wasteDisposed: true,
      safetyFlags: Array.from(new Set([...current.safetyFlags, 'Waste disposal confirmed.'])),
    }));
  };

  const handleUnsafeAction = () => {
    setTrainingMission((current) => ({
      ...current,
      unsafeActions: current.unsafeActions + 1,
      contaminationScore: current.contaminationScore + 1,
      safetyFlags: [...current.safetyFlags, 'Unsafe action recorded during analysis.'],
    }));
  };

  if (!role) {
    return <RoleSelection onSelectRole={setRole} />;
  }

  if (role === 'teacher') {
    return <TeacherDashboard savedData={savedData} onSwitchRole={setRole} />;
  }

  return (
    <main className="app-shell">
      <Game currentZone={currentZone} labRuntime={labRuntime} onPlayerMove={setPlayerPosition} />
      <HUD gameState={gameState} nearbyInteraction={activeInteraction} />
      <StudentProfilePanel savedData={savedData} onSwitchRole={setRole} />
      <InteractionPrompt interaction={activeInteraction} onInteract={handleInteraction} />
      <LabPanels
        labRuntime={labRuntime}
        trainingMission={trainingMission}
        ppe={gameState.ppe}
        centrifugeSoundLevel={centrifugeSoundLevel}
        onClose={handleClosePanel}
        onOpenTraining={handleOpenTraining}
        onStartTraining={handleStartTraining}
        onAdvanceTraining={handleAdvanceTraining}
        onSetAgaroseAmount={handleSetAgaroseAmount}
        onSetBufferVolume={handleSetBufferVolume}
        onDisposeWaste={handleDisposeWaste}
        onUnsafeAction={handleUnsafeAction}
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
