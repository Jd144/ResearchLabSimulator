export type AssetId =
  | 'student-humanoid'
  | 'lab-bench'
  | 'lab-chair'
  | 'user-desk'
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
    name: 'Student Humanoid Placeholder',
    path: '/models/characters/student-humanoid.glb',
    available: false,
    materialHint: 'mixed',
  },
  'lab-bench': {
    id: 'lab-bench',
    name: 'Modern Laboratory Bench',
    path: '/models/lab/furniture/lab-bench.glb',
    available: false,
    materialHint: 'stainless-steel',
  },
  'lab-chair': {
    id: 'lab-chair',
    name: 'Laboratory Chair',
    path: '/models/lab/furniture/lab-chair.glb',
    available: false,
    materialHint: 'plastic',
  },
  'user-desk': {
    id: 'user-desk',
    name: 'Researcher Desk',
    path: '/models/lab/furniture/user-desk.glb',
    available: false,
    materialHint: 'wood',
  },
  'chemical-shelf': {
    id: 'chemical-shelf',
    name: 'Chemical Storage Shelf',
    path: '/models/lab/storage/chemical-shelf.glb',
    available: false,
    materialHint: 'glass',
  },
  centrifuge: {
    id: 'centrifuge',
    name: 'Benchtop Centrifuge',
    path: '/models/lab/instruments/centrifuge.glb',
    available: false,
    materialHint: 'plastic',
  },
  microscope: {
    id: 'microscope',
    name: 'Research Microscope',
    path: '/models/lab/instruments/microscope.glb',
    available: false,
    materialHint: 'mixed',
  },
  'gel-electrophoresis-unit': {
    id: 'gel-electrophoresis-unit',
    name: 'Gel Electrophoresis Unit',
    path: '/models/lab/instruments/gel-electrophoresis-unit.glb',
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
    path: '/models/building/lab-door.glb',
    available: false,
    materialHint: 'wood',
  },
};

export const environmentAssets = {
  hdri: '/textures/hdri/lab-studio.hdr',
  tileAlbedo: '/textures/pbr/tile/albedo.jpg',
  paintedWallAlbedo: '/textures/pbr/painted-wall/albedo.jpg',
};

