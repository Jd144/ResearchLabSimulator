export type InventoryItem = {
  id: string;
  name: string;
  category: 'personal' | 'ppe' | 'lab-material' | 'document';
};

// Future feature: inventory state will track PPE, notebook, keys, reagents, and lab materials.
export type InventoryState = {
  items: InventoryItem[];
};

