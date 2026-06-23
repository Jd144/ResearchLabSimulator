import type { LabRuntimeState } from '../../features/experiments/labRuntimeTypes';
import { labInventoryItems } from '../../features/inventory/inventoryData';

type CentrifugeSoundLevel = 'HIGH' | 'LOW' | 'SILENT';

type LabPanelsProps = {
  labRuntime: LabRuntimeState;
  centrifugeSoundLevel: CentrifugeSoundLevel;
  onClose: () => void;
  onSetCentrifugeRPM: (rpm: number) => void;
  onSetCentrifugeTime: (timeMinutes: number) => void;
  onToggleCentrifugeBalance: () => void;
  onStartCentrifuge: () => void;
  onStopCentrifuge: () => void;
};

export function LabPanels({
  labRuntime,
  centrifugeSoundLevel,
  onClose,
  onSetCentrifugeRPM,
  onSetCentrifugeTime,
  onToggleCentrifugeBalance,
  onStartCentrifuge,
  onStopCentrifuge,
}: LabPanelsProps) {
  if (!labRuntime.activePanel) {
    return null;
  }

  return (
    <section className="lab-panel" aria-live="polite">
      <header className="lab-panel-header">
        <strong>{getPanelTitle(labRuntime.activePanel)}</strong>
        <button type="button" onClick={onClose} aria-label="Close panel">
          Close
        </button>
      </header>

      {labRuntime.activePanel === 'task' ? <TaskPanel /> : null}

      {labRuntime.activePanel === 'centrifuge' ? (
        <CentrifugePanel
          labRuntime={labRuntime}
          soundLevel={centrifugeSoundLevel}
          onSetRPM={onSetCentrifugeRPM}
          onSetTime={onSetCentrifugeTime}
          onToggleBalance={onToggleCentrifugeBalance}
          onStart={onStartCentrifuge}
          onStop={onStopCentrifuge}
        />
      ) : null}

      {labRuntime.activePanel === 'inventory' ? <InventoryPanel /> : null}

      {labRuntime.activePanel === 'message' ? (
        <div className="lab-panel-body">
          <p>{labRuntime.panelMessage}</p>
        </div>
      ) : null}
    </section>
  );
}

function getPanelTitle(panel: NonNullable<LabRuntimeState['activePanel']>) {
  if (panel === 'task') return 'Assigned Task';
  if (panel === 'centrifuge') return 'Centrifuge Control';
  if (panel === 'inventory') return 'Inventory';
  return 'Lab Message';
}

function TaskPanel() {
  return (
    <div className="lab-panel-body">
      <p>Assigned task: complete Molecular Biology Lab orientation.</p>
      <ul>
        <li>Inspect the centrifuge.</li>
        <li>Review chemical shelf inventory.</li>
        <li>Learn waste disposal rules.</li>
      </ul>
    </div>
  );
}

function CentrifugePanel({
  labRuntime,
  soundLevel,
  onSetRPM,
  onSetTime,
  onToggleBalance,
  onStart,
  onStop,
}: {
  labRuntime: LabRuntimeState;
  soundLevel: CentrifugeSoundLevel;
  onSetRPM: (rpm: number) => void;
  onSetTime: (timeMinutes: number) => void;
  onToggleBalance: () => void;
  onStart: () => void;
  onStop: () => void;
}) {
  const { centrifuge } = labRuntime;

  return (
    <div className="lab-panel-body">
      <label>
        RPM
        <input
          min={500}
          max={15000}
          step={100}
          type="number"
          value={centrifuge.rpm}
          onChange={(event) => onSetRPM(Number(event.target.value))}
        />
      </label>
      <label>
        Time
        <input
          min={1}
          max={60}
          type="number"
          value={centrifuge.timeMinutes}
          onChange={(event) => onSetTime(Number(event.target.value))}
        />
      </label>
      <button type="button" className="panel-toggle" onClick={onToggleBalance}>
        Balance status: {centrifuge.isBalanced ? 'Balanced' : 'Unbalanced'}
      </button>
      {!centrifuge.isBalanced ? (
        <p className="panel-warning">Centrifuge cannot start. Tubes must be balanced.</p>
      ) : null}
      <div className="panel-row">
        <button type="button" onClick={onStart} disabled={centrifuge.isRunning}>
          Start
        </button>
        <button type="button" onClick={onStop} disabled={!centrifuge.isRunning}>
          Stop
        </button>
      </div>
      <p>Status: {centrifuge.isRunning ? 'Running' : 'Stopped'}</p>
      <p>Sound: {soundLevel}</p>
    </div>
  );
}

function InventoryPanel() {
  return (
    <div className="lab-panel-body">
      <ul>
        {labInventoryItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

