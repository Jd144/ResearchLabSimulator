export type AssetId =
  | 'student-humanoid'
  | 'phd-scholar'
  | 'pi'
  | 'lab-bench'
  | 'lab-chair'
  | 'user-desk'
  | 'erlenmeyer-flask'
  | 'blocks-lab-equipment'
  | 'refrigerator'
  | 'fridge'
  | 'ppe-glove'
  | 'ppe-glasses'
  | 'chemical-shelf'
  | 'centrifuge'
  | 'microscope'
  | 'gel-electrophoresis-unit'
  | 'waste-bin'
  | 'lab-door';

export type ModelAsset = {
  id: AssetId;
  name: string;
  path: string;
  available: boolean;
  materialHint: 'stainless-steel' | 'glass' | 'plastic' | 'painted-wall' | 'tile' | 'wood' | 'mixed';
};

export const modelAssets: Record<AssetId, ModelAsset> = {
  'student-humanoid': {
    id: 'student-humanoid',
    name: 'Student Labcoat Humanoid',
    path: '/models/characters/student-labcoat.glb',
    available: true,
    materialHint: 'mixed',
  },
  'phd-scholar': {
    id: 'phd-scholar',
    name: 'PhD Scholar Humanoid',
    path: '/models/characters/phd-scholar.glb',
    available: false,
    materialHint: 'mixed',
  },
  pi: {
    id: 'pi',
    name: 'Principal Investigator Humanoid',
    path: '/models/characters/pi.glb',
    available: true,
    materialHint: 'mixed',
  },
  'lab-bench': {
    id: 'lab-bench',
    name: 'Modern Laboratory Bench',
    path: '/models/lab/lab-bench.glb',
    available: true,
    materialHint: 'stainless-steel',
  },
  'lab-chair': {
    id: 'lab-chair',
    name: 'Laboratory Chair',
    path: '/models/lab/lab-chair.glb',
    available: false,
    materialHint: 'plastic',
  },
  'user-desk': {
    id: 'user-desk',
    name: 'Researcher Desk',
    path: '/models/lab/lab-desk.glb',
    available: true,
    materialHint: 'wood',
  },
  'erlenmeyer-flask': {
    id: 'erlenmeyer-flask',
    name: 'Erlenmeyer Flask',
    path: '/models/lab/erlenmeyer-flask.glb',
    available: true,
    materialHint: 'glass',
  },
  'blocks-lab-equipment': {
    id: 'blocks-lab-equipment',
    name: 'Blocks Lab Equipment',
    path: '/models/lab/blocks-lab-equipment.glb',
    available: true,
    materialHint: 'mixed',
  },
  refrigerator: {
    id: 'refrigerator',
    name: 'Laboratory Refrigerator',
    path: '/models/lab/refrigerator.glb',
    available: true,
    materialHint: 'mixed',
  },
  fridge: {
    id: 'fridge',
    name: 'Laboratory Fridge',
    path: '/models/lab/fridge.glb',
    available: true,
    materialHint: 'mixed',
  },
  'ppe-glove': {
    id: 'ppe-glove',
    name: 'PPE Glove',
    path: '/models/ppe/glove.glb',
    available: true,
    materialHint: 'plastic',
  },
  'ppe-glasses': {
    id: 'ppe-glasses',
    name: 'PPE Safety Glasses',
    path: '/models/ppe/glasses.glb',
    available: true,
    materialHint: 'glass',
  },
  'chemical-shelf': {
    id: 'chemical-shelf',
    name: 'Chemical Storage Shelf',
    path: '/models/lab/chemical-shelf.glb',
    available: false,
    materialHint: 'glass',
  },
  centrifuge: {
    id: 'centrifuge',
    name: 'Benchtop Centrifuge',
    path: '/models/lab/centrifuge.glb',
    available: false,
    materialHint: 'plastic',
  },
  microscope: {
    id: 'microscope',
    name: 'Research Microscope',
    path: '/models/lab/microscope.glb',
    available: true,
    materialHint: 'mixed',
  },
  'gel-electrophoresis-unit': {
    id: 'gel-electrophoresis-unit',
    name: 'Gel Electrophoresis Unit',
    path: '/models/lab/gel-electrophoresis.glb',
    available: false,
    materialHint: 'glass',
  },
  'waste-bin': {
    id: 'waste-bin',
    name: 'Laboratory Waste Bin',
    path: '/models/lab/safety/waste-bin.glb',
    available: false,
    materialHint: 'plastic',
  },
  'lab-door': {
    id: 'lab-door',
    name: 'Laboratory Exit Door',
    path: '/models/lab/lab-door.glb',
    available: false,
    materialHint: 'wood',
  },
};

export const environmentAssets = {
  hdri: '/textures/hdri/lab-studio.hdr',
  tileAlbedo: '/textures/pbr/tile/albedo.jpg',
  paintedWallAlbedo: '/textures/pbr/painted-wall/albedo.jpg',
};
