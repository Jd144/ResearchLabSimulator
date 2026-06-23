export type ExperimentStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export type ExperimentDefinition = {
  id: string;
  title: string;
  status: ExperimentStatus;
};

// Future feature: SOP steps and mistake rules will attach here for Phase 1 lab experiment work.
export const phaseOneExperiment: ExperimentDefinition = {
  id: 'agarose-gel-electrophoresis',
  title: 'Agarose Gel Electrophoresis',
  status: 'locked',
};

