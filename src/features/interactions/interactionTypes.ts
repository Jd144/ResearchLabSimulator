import type { PlayerPosition } from '../../player/playerTypes';
import type { WorldZoneId } from '../../data/world';
import type { InteractableAction } from './interactableObjectTypes';

export type InteractionType =
  | 'zone-transition'
  | 'notice'
  | 'objective'
  | 'ppe-station'
  | 'lab-door'
  | 'lab-object';

export type InteractionTarget = {
  id: string;
  label: string;
  actionLabel: string;
  type: InteractionType;
  position: PlayerPosition;
  interactionRadius: number;
  nextZoneId?: WorldZoneId;
  nextObjective?: string;
  blockedMessage?: string;
  message?: string;
  onInteractAction?: InteractableAction;
  requiresPPE?: boolean;
  xpReward?: number;
};

export type InteractionState = {
  id: string;
  label: string;
  actionLabel: string;
  isAvailable: boolean;
  target?: InteractionTarget;
};
