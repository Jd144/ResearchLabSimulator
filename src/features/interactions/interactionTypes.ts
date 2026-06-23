import type { PlayerPosition } from '../../player/playerTypes';
import type { WorldZoneId } from '../../data/world';

export type InteractionType = 'zone-transition' | 'notice' | 'objective';

export type InteractionTarget = {
  id: string;
  label: string;
  actionLabel: string;
  type: InteractionType;
  position: PlayerPosition;
  interactionRadius: number;
  nextZoneId?: WorldZoneId;
  nextObjective?: string;
  message?: string;
  xpReward?: number;
};

export type InteractionState = {
  id: string;
  label: string;
  actionLabel: string;
  isAvailable: boolean;
  target?: InteractionTarget;
};
