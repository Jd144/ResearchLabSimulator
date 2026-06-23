export type TrainingStatus = 'not_started' | 'in_progress' | 'passed' | 'failed';

export type TrainingStepId =
  | 'wear-ppe'
  | 'go-chemical-shelf'
  | 'collect-agarose'
  | 'measure-agarose'
  | 'collect-tae-buffer'
  | 'add-buffer-volume'
  | 'heat-mixture'
  | 'pour-gel'
  | 'insert-comb'
  | 'wait-solidification'
  | 'load-dna-sample'
  | 'run-gel'
  | 'analyze-result';

export type TrainingStep = {
  id: TrainingStepId;
  title: string;
  instruction: string;
  inputLabel?: string;
  expectedValue?: number;
  unit?: string;
  mistakeMessage?: string;
};

export type NotebookEntry = {
  date: string;
  experiment: string;
  materials: string[];
  observations: string[];
  result: 'Perfect' | 'Acceptable' | 'Failed';
};

export type TrainingReport = {
  mistakeReport: string[];
  safetyReport: string[];
  xpReward: number;
  result: 'Perfect' | 'Acceptable' | 'Failed';
  score: number;
  safetyScore: number;
  timeSpentSeconds: number;
};

export type TrainingMissionState = {
  title: string;
  status: TrainingStatus;
  currentStepIndex: number;
  completedStepIds: TrainingStepId[];
  mistakes: string[];
  safetyFlags: string[];
  contaminationScore: number;
  agaroseAmount: number;
  bufferVolume: number;
  wasteDisposed: boolean;
  unsafeActions: number;
  startedAt?: number;
  completedAt?: number;
  report?: TrainingReport;
  notebookEntry?: NotebookEntry;
  certifiedBadgeUnlocked: boolean;
};

export const agaroseGelTrainingSteps: TrainingStep[] = [
  {
    id: 'wear-ppe',
    title: 'Wear PPE',
    instruction: 'Confirm lab coat, gloves, and goggles before starting.',
    mistakeMessage: 'Contamination risk',
  },
  {
    id: 'go-chemical-shelf',
    title: 'Go to Chemical Shelf',
    instruction: 'Move to the chemical shelf and prepare to collect materials.',
  },
  {
    id: 'collect-agarose',
    title: 'Collect Agarose',
    instruction: 'Collect agarose powder from the chemical shelf.',
  },
  {
    id: 'measure-agarose',
    title: 'Measure Agarose',
    instruction: 'Enter the measured agarose quantity.',
    inputLabel: 'Agarose',
    expectedValue: 1,
    unit: 'g',
    mistakeMessage: 'Gel concentration incorrect',
  },
  {
    id: 'collect-tae-buffer',
    title: 'Collect TAE Buffer',
    instruction: 'Collect TAE buffer from the chemical shelf.',
  },
  {
    id: 'add-buffer-volume',
    title: 'Add Correct Buffer Volume',
    instruction: 'Enter the buffer volume used for gel preparation.',
    inputLabel: 'TAE Buffer',
    expectedValue: 100,
    unit: 'ml',
    mistakeMessage: 'Improper gel preparation',
  },
  { id: 'heat-mixture', title: 'Heat Mixture', instruction: 'Heat agarose and buffer until dissolved.' },
  { id: 'pour-gel', title: 'Pour Gel', instruction: 'Pour the heated mixture into the casting tray.' },
  { id: 'insert-comb', title: 'Insert Comb', instruction: 'Insert the comb without damaging the gel.' },
  {
    id: 'wait-solidification',
    title: 'Wait For Solidification',
    instruction: 'Wait for the gel to solidify before loading samples.',
  },
  { id: 'load-dna-sample', title: 'Load DNA Sample', instruction: 'Load the DNA sample into the gel well.' },
  { id: 'run-gel', title: 'Run Gel', instruction: 'Run the gel under controlled settings.' },
  { id: 'analyze-result', title: 'Analyze Result', instruction: 'Dispose waste, observe bands, and generate result.' },
];

export const initialTrainingMissionState: TrainingMissionState = {
  title: 'Agarose Gel Electrophoresis Training Simulator',
  status: 'not_started',
  currentStepIndex: 0,
  completedStepIds: [],
  mistakes: [],
  safetyFlags: [],
  contaminationScore: 0,
  agaroseAmount: 1,
  bufferVolume: 100,
  wasteDisposed: false,
  unsafeActions: 0,
  certifiedBadgeUnlocked: false,
};

export function getTrainingProgressPercent(mission: TrainingMissionState) {
  return Math.round((mission.completedStepIds.length / agaroseGelTrainingSteps.length) * 100);
}

export function buildTrainingReport(mission: TrainingMissionState): TrainingReport {
  const score = Math.max(0, 100 - mission.mistakes.length * 15 - mission.contaminationScore * 10);
  const safetyScore = Math.max(0, 100 - mission.contaminationScore * 15 - mission.unsafeActions * 10);
  const result = score >= 90 ? 'Perfect' : score >= 70 ? 'Acceptable' : 'Failed';

  return {
    mistakeReport: mission.mistakes.length ? mission.mistakes : ['No procedural mistakes recorded.'],
    safetyReport: mission.safetyFlags.length ? mission.safetyFlags : ['Safety checks passed.'],
    xpReward: score > 80 ? 100 : score >= 70 ? 60 : 20,
    result,
    score,
    safetyScore,
    timeSpentSeconds: mission.startedAt ? Math.max(1, Math.round(((mission.completedAt ?? Date.now()) - mission.startedAt) / 1000)) : 0,
  };
}

export function buildNotebookEntry(report: TrainingReport): NotebookEntry {
  return {
    date: new Date().toLocaleDateString(),
    experiment: 'Agarose Gel Electrophoresis Training',
    materials: ['Agarose 1g', 'TAE Buffer 100ml', 'DNA Sample', 'Comb', 'Gel tray'],
    observations: [
      'Gel mixture prepared and poured.',
      'Comb inserted and gel solidified.',
      `Training result: ${report.result} (${report.score}%).`,
    ],
    result: report.result,
  };
}
