import { modelAssets, type AssetId } from '../../data/assetManifest';

export type ModelLoadStatus = 'model loaded' | 'fallback used';

export type AssetStatusDetail = {
  assetId: AssetId;
  name: string;
  path: string;
  status: ModelLoadStatus;
};

export const assetStatusEventName = 'reallabverse:model-status';

export function getInitialAssetStatuses(): Record<AssetId, AssetStatusDetail> {
  return Object.values(modelAssets).reduce(
    (statuses, asset) => ({
      ...statuses,
      [asset.id]: {
        assetId: asset.id,
        name: asset.name,
        path: asset.path,
        status: 'fallback used' as const,
      },
    }),
    {} as Record<AssetId, AssetStatusDetail>,
  );
}

export function reportAssetStatus(detail: AssetStatusDetail) {
  window.dispatchEvent(new CustomEvent<AssetStatusDetail>(assetStatusEventName, { detail }));
}

