export type ActiveLabPanel = 'task' | 'centrifuge' | 'inventory' | 'message' | null;

export type CentrifugeState = {
  rpm: number;
  timeMinutes: number;
  isBalanced: boolean;
  isRunning: boolean;
};

export type LabRuntimeState = {
  activePanel: ActiveLabPanel;
  panelMessage: string;
  chemicalShelfOpen: boolean;
  labDoorLocked: boolean;
  centrifuge: CentrifugeState;
};

export const initialLabRuntimeState: LabRuntimeState = {
  activePanel: null,
  panelMessage: '',
  chemicalShelfOpen: false,
  labDoorLocked: false,
  centrifuge: {
    rpm: 3000,
    timeMinutes: 5,
    isBalanced: false,
    isRunning: false,
  },
};

