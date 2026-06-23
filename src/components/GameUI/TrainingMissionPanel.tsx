import {
  agaroseGelTrainingSteps,
  getTrainingProgressPercent,
  type TrainingMissionState,
} from '../../features/experiments/agaroseGelTraining';
import type { PPEState } from '../../features/ppe/ppeTypes';

type TrainingMissionPanelProps = {
  mission: TrainingMissionState;
  ppe: PPEState;
  onStart: () => void;
  onAdvance: () => void;
  onSetAgaroseAmount: (amount: number) => void;
  onSetBufferVolume: (volume: number) => void;
  onDisposeWaste: () => void;
  onUnsafeAction: () => void;
};

export function TrainingMissionPanel({
  mission,
  ppe,
  onStart,
  onAdvance,
  onSetAgaroseAmount,
  onSetBufferVolume,
  onDisposeWaste,
  onUnsafeAction,
}: TrainingMissionPanelProps) {
  const currentStep = agaroseGelTrainingSteps[mission.currentStepIndex];
  const progress = getTrainingProgressPercent(mission);
  const ppeReady = ppe.labCoat && ppe.gloves && ppe.goggles;

  return (
    <div className="lab-panel-body training-panel">
      <div className="mission-header">
        <strong>{mission.title}</strong>
        <span>{mission.status.toUpperCase()}</span>
      </div>
      <div className="progress-track">
        <div style={{ width: `${progress}%` }} />
      </div>
      <p>Progress: {progress}%</p>

      {mission.status === 'not_started' ? (
        <button type="button" onClick={onStart}>
          Start Training
        </button>
      ) : null}

      {mission.status === 'in_progress' && currentStep ? (
        <>
          <p>
            Step {mission.currentStepIndex + 1}: {currentStep.title}
          </p>
          <p>{currentStep.instruction}</p>

          {currentStep.id === 'wear-ppe' ? (
            <p className={ppeReady ? 'panel-success' : 'panel-warning'}>
              PPE: {ppeReady ? 'Ready' : 'Missing PPE. Contamination risk'}
            </p>
          ) : null}

          {currentStep.id === 'measure-agarose' ? (
            <label>
              Agarose Amount
              <input
                type="number"
                min={0}
                step={0.1}
                value={mission.agaroseAmount}
                onChange={(event) => onSetAgaroseAmount(Number(event.target.value))}
              />
            </label>
          ) : null}

          {currentStep.id === 'add-buffer-volume' ? (
            <label>
              Buffer Volume
              <input
                type="number"
                min={0}
                step={5}
                value={mission.bufferVolume}
                onChange={(event) => onSetBufferVolume(Number(event.target.value))}
              />
            </label>
          ) : null}

          {currentStep.id === 'analyze-result' ? (
            <div className="panel-row">
              <button type="button" onClick={onDisposeWaste}>
                Dispose Waste
              </button>
              <button type="button" onClick={onUnsafeAction}>
                Unsafe Action
              </button>
            </div>
          ) : null}

          <button type="button" onClick={onAdvance}>
            Complete Step
          </button>
        </>
      ) : null}

      {mission.report ? (
        <div className="report-grid">
          <p>Result: {mission.report.result}</p>
          <p>Score: {mission.report.score}%</p>
          <p>XP Reward: {mission.report.xpReward}</p>
          {mission.certifiedBadgeUnlocked ? (
            <p className="panel-success">Agarose Gel Training Completed</p>
          ) : null}
          {mission.certifiedBadgeUnlocked ? (
            <p className="panel-success">Gel Electrophoresis Certified Badge unlocked</p>
          ) : null}
          <details>
            <summary>Mistake Report</summary>
            <ul>
              {mission.report.mistakeReport.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </details>
          <details>
            <summary>Safety Report</summary>
            <ul>
              {mission.report.safetyReport.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
          {mission.notebookEntry ? (
            <details>
              <summary>Notebook Entry</summary>
              <p>Date: {mission.notebookEntry.date}</p>
              <p>Experiment: {mission.notebookEntry.experiment}</p>
              <p>Materials: {mission.notebookEntry.materials.join(', ')}</p>
              <p>Observations: {mission.notebookEntry.observations.join(' ')}</p>
              <p>Result: {mission.notebookEntry.result}</p>
            </details>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

