import type { NotebookEntry, TrainingMissionState } from './agaroseGelTraining';

const saveKey = 'reallabverse.phase1.save';

export type SavedTrainingData = {
  xp: number;
  level: string;
  completedTraining: string[];
  notebookEntries: NotebookEntry[];
};

export const defaultSavedTrainingData: SavedTrainingData = {
  xp: 0,
  level: 'Intern',
  completedTraining: [],
  notebookEntries: [],
};

export function loadTrainingSave(): SavedTrainingData {
  try {
    const raw = window.localStorage.getItem(saveKey);
    return raw ? { ...defaultSavedTrainingData, ...JSON.parse(raw) } : defaultSavedTrainingData;
  } catch {
    return defaultSavedTrainingData;
  }
}

export function saveTrainingProgress(data: SavedTrainingData) {
  window.localStorage.setItem(saveKey, JSON.stringify(data));
}

export function persistCompletedTraining({
  currentXP,
  currentLevel,
  mission,
}: {
  currentXP: number;
  currentLevel: string;
  mission: TrainingMissionState;
}) {
  if (!mission.report || !mission.notebookEntry) {
    return;
  }

  const existing = loadTrainingSave();
  const completedTraining = Array.from(
    new Set([...existing.completedTraining, 'agarose-gel-electrophoresis']),
  );

  saveTrainingProgress({
    xp: currentXP + mission.report.xpReward,
    level: currentLevel,
    completedTraining,
    notebookEntries: [...existing.notebookEntries, mission.notebookEntry],
  });
}

