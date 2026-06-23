import type { InteractionTarget } from '../features/interactions/interactionTypes';
import type { InteractableObject } from '../features/interactions/interactableObjectTypes';

export const molecularBiologyLabObjects: InteractableObject[] = [
  {
    id: 'user-lab-desk',
    name: 'User Desk',
    position: { x: -5.6, y: 0, z: 5.1 },
    interactionRadius: 1.5,
    interactionMessage: 'Assigned task panel opened.',
    onInteractAction: 'show-task-panel',
  },
  {
    id: 'centrifuge',
    name: 'Centrifuge',
    position: { x: -3.9, y: 0, z: -5.4 },
    interactionRadius: 1.55,
    interactionMessage: 'Centrifuge control panel opened.',
    onInteractAction: 'open-centrifuge-panel',
  },
  {
    id: 'microscope',
    name: 'Microscope',
    position: { x: 5.0, y: 0, z: -5.0 },
    interactionRadius: 1.45,
    interactionMessage: 'Microscope training coming soon',
    onInteractAction: 'show-microscope-training',
  },
  {
    id: 'gel-electrophoresis-unit',
    name: 'Gel Electrophoresis Unit',
    position: { x: 3.8, y: 0, z: -2.7 },
    interactionRadius: 1.5,
    interactionMessage: 'Agarose gel training module locked until centrifuge tutorial is completed',
    onInteractAction: 'show-gel-locked',
  },
  {
    id: 'chemical-shelf',
    name: 'Chemical Shelf',
    position: { x: 7.4, y: 0, z: 2.6 },
    interactionRadius: 1.55,
    interactionMessage: 'Inventory panel opened.',
    onInteractAction: 'open-inventory-panel',
  },
  {
    id: 'waste-bin',
    name: 'Waste Bin',
    position: { x: -7.1, y: 0, z: -1.2 },
    interactionRadius: 1.45,
    interactionMessage: 'Waste disposal guidance opened.',
    onInteractAction: 'show-waste-guidance',
  },
  {
    id: 'lab-exit-door',
    name: 'Lab Exit Door',
    position: { x: 0, y: 0, z: 8.35 },
    interactionRadius: 1.7,
    interactionMessage: 'Check lab lock requirements before leaving.',
    onInteractAction: 'attempt-lab-exit',
  },
];

export const molecularBiologyLabInteractions: InteractionTarget[] = molecularBiologyLabObjects.map(
  (object) => ({
    id: object.id,
    label: object.name,
    actionLabel: 'Press E',
    type: 'lab-object',
    position: object.position,
    interactionRadius: object.interactionRadius,
    message: object.interactionMessage,
    onInteractAction: object.onInteractAction,
  }),
);

