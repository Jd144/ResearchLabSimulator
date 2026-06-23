import type { DoorInteractionTarget } from '../features/interactions/interactionTypes';

export const hostelDoor: DoorInteractionTarget = {
  id: 'hostel-room-exit-door',
  label: 'Exit Hostel Room',
  position: { x: 0, y: 0, z: -4.25 },
  interactionRadius: 1.4,
};

export const roomBounds = {
  minX: -4.2,
  maxX: 4.2,
  minZ: -4.2,
  maxZ: 4.2,
};

