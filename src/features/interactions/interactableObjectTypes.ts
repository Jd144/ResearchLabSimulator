import type { PlayerPosition } from '../../player/playerTypes';

export type InteractableAction =
  | 'show-task-panel'
  | 'open-centrifuge-panel'
  | 'show-microscope-training'
  | 'show-gel-locked'
  | 'open-inventory-panel'
  | 'show-waste-guidance'
  | 'attempt-lab-exit';

export type InteractableObject = {
  id: string;
  name: string;
  position: PlayerPosition;
  interactionRadius: number;
  interactionMessage: string;
  onInteractAction: InteractableAction;
};

