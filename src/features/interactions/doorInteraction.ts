import type { InteractionState, InteractionTarget } from './interactionTypes';
import type { PlayerPosition } from '../../player/playerTypes';

export function getDoorInteraction(
  playerPosition: PlayerPosition,
  door: InteractionTarget,
): InteractionState {
  const distance = Math.hypot(
    playerPosition.x - door.position.x,
    playerPosition.z - door.position.z,
  );

  return {
    id: door.id,
    label: door.label,
    actionLabel: door.actionLabel,
    isAvailable: distance <= door.interactionRadius,
    target: door,
  };
}

export function getNearestInteraction(
  playerPosition: PlayerPosition,
  targets: InteractionTarget[],
): InteractionState | null {
  const availableTargets = targets
    .map((target) => ({
      target,
      distance: Math.hypot(
        playerPosition.x - target.position.x,
        playerPosition.z - target.position.z,
      ),
    }))
    .filter(({ target, distance }) => distance <= target.interactionRadius)
    .sort((a, b) => a.distance - b.distance);

  const nearest = availableTargets[0]?.target;

  if (!nearest) {
    return null;
  }

  return {
    id: nearest.id,
    label: nearest.label,
    actionLabel: nearest.actionLabel,
    isAvailable: true,
    target: nearest,
  };
}
