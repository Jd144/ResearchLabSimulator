import type { PlayerPosition } from '../../player/playerTypes';

export type DoorInteractionTarget = {
  id: string;
  label: string;
  position: PlayerPosition;
  interactionRadius: number;
};

export type InteractionState = {
  id: string;
  label: string;
  actionLabel: string;
  isAvailable: boolean;
};

