import type { NotebookEntry, TrainingMissionState } from './agaroseGelTraining';

const saveKey = 'reallabverse.phase1.save';

export type StudentProfile = {
  id: string;
  name: string;
  institute: string;
  department: string;
};

export type CertificationRecord = {
  certificateId: string;
  completionDate: string;
  trainingName: string;
};

export type StudentTrainingAttempt = {
  id: string;
  trainingName: string;
  completed: boolean;
  score: number;
  safetyScore: number;
  commonMistakes: string[];
  timeSpentSeconds: number;
  completedAt: string;
};

export type SavedTrainingData = {
  profile: StudentProfile;
  xp: number;
  level: string;
  completedTraining: string[];
  notebookEntries: NotebookEntry[];
  attempts: StudentTrainingAttempt[];
  certifications: CertificationRecord[];
};

export const defaultSavedTrainingData: SavedTrainingData = {
  profile: {
    id: 'student-local-001',
    name: 'Aarav Sharma',
    institute: 'RealLabVerse University',
    department: 'Molecular Biology',
  },
  xp: 0,
  level: 'Intern',
  completedTraining: [],
  notebookEntries: [],
  attempts: [],
  certifications: [],
};

export function loadTrainingSave(): SavedTrainingData {
  try {
    const raw = window.localStorage.getItem(saveKey);
    if (!raw) {
      return defaultSavedTrainingData;
    }

    const parsed = JSON.parse(raw) as Partial<SavedTrainingData>;

    return {
      ...defaultSavedTrainingData,
      ...parsed,
      profile: { ...defaultSavedTrainingData.profile, ...parsed.profile },
      completedTraining: parsed.completedTraining ?? [],
      notebookEntries: parsed.notebookEntries ?? [],
      attempts: parsed.attempts ?? [],
      certifications: parsed.certifications ?? [],
    };
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
  const certification =
    mission.report.score > 80
      ? {
          certificateId: `RLV-AGE-${Date.now().toString(36).toUpperCase()}`,
          completionDate: new Date().toLocaleDateString(),
          trainingName: 'Agarose Gel Electrophoresis Training',
        }
      : null;
  const attempt: StudentTrainingAttempt = {
    id: `attempt-${Date.now().toString(36)}`,
    trainingName: 'Agarose Gel Electrophoresis Training',
    completed: mission.status === 'passed',
    score: mission.report.score,
    safetyScore: mission.report.safetyScore,
    commonMistakes: mission.report.mistakeReport,
    timeSpentSeconds: mission.report.timeSpentSeconds,
    completedAt: new Date().toLocaleString(),
  };

  saveTrainingProgress({
    profile: existing.profile,
    xp: currentXP + mission.report.xpReward,
    level: currentLevel,
    completedTraining,
    notebookEntries: [...existing.notebookEntries, mission.notebookEntry],
    attempts: [...existing.attempts, attempt],
    certifications: certification ? [...existing.certifications, certification] : existing.certifications,
  });
}
