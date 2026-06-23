import { useEffect, useMemo, useState } from 'react';
import {
  assetStatusEventName,
  getInitialAssetStatuses,
  reportAssetStatus,
  type AssetStatusDetail,
} from '../../features/assets/assetStatus';
import { modelAssets } from '../../data/assetManifest';

export function AssetLoadingStatus() {
  const [statuses, setStatuses] = useState(() => getInitialAssetStatuses());
  const statusList = useMemo(() => Object.values(statuses), [statuses]);

  useEffect(() => {
    const controller = new AbortController();

    Object.values(modelAssets).forEach((asset) => {
      fetch(asset.path, { method: 'HEAD', signal: controller.signal })
        .then((response) => {
          reportAssetStatus({
            assetId: asset.id,
            name: asset.name,
            path: asset.path,
            status: response.ok ? 'model loaded' : 'fallback used',
          });
        })
        .catch(() => {
          if (!controller.signal.aborted) {
            reportAssetStatus({
              assetId: asset.id,
              name: asset.name,
              path: asset.path,
              status: 'fallback used',
            });
          }
        });
    });

    const handleStatus = (event: Event) => {
      const { detail } = event as CustomEvent<AssetStatusDetail>;
      setStatuses((current) => ({
        ...current,
        [detail.assetId]: detail,
      }));
    };

    window.addEventListener(assetStatusEventName, handleStatus);

    return () => {
      controller.abort();
      window.removeEventListener(assetStatusEventName, handleStatus);
    };
  }, []);

  return (
    <section className="asset-status-panel" aria-label="Asset loading status">
      <span className="hud-label">3D Assets</span>
      <div className="asset-status-list">
        {statusList.map((asset) => (
          <div className="asset-status-row" key={asset.assetId}>
            <span>{asset.name}</span>
            <strong className={asset.status === 'model loaded' ? 'asset-loaded' : 'asset-fallback'}>
              {asset.status}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}
