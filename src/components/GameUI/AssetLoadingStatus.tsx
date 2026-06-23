import { useEffect, useMemo, useState } from 'react';
import {
  assetStatusEventName,
  getInitialAssetStatuses,
  type AssetStatusDetail,
} from '../../features/assets/assetStatus';

export function AssetLoadingStatus() {
  const [statuses, setStatuses] = useState(() => getInitialAssetStatuses());
  const statusList = useMemo(() => Object.values(statuses), [statuses]);

  useEffect(() => {
    const handleStatus = (event: Event) => {
      const { detail } = event as CustomEvent<AssetStatusDetail>;
      setStatuses((current) => ({
        ...current,
        [detail.assetId]: detail,
      }));
    };

    window.addEventListener(assetStatusEventName, handleStatus);

    return () => {
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
