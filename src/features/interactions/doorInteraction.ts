import type { DoorInteractionTarget, InteractionState } from './interactionTypes';
import type { PlayerPosition } from '../../player/playerTypes';

export function getDoorInteraction(
  playerPosition: PlayerPosition,
  door: DoorInteractionTarget,
): InteractionState {
  const distance = Math.hypot(
    playerPosition.x - door.position.x,
    playerPosition.z - door.position.z,
  );

  return {
    id: door.id,
    label: door.label,
    actionLabel: 'Press E',
    isAvailable: distance <= door.interactionRadius,
  };
}

