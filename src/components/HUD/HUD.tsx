import type { GameState } from '../../data/gameState';

type HUDProps = {
  gameState: GameState;
};

export function HUD({ gameState }: HUDProps) {
  return (
    <section className="hud-panel" aria-label="Player status">
      <div>
        <span className="hud-label">Location</span>
        <strong>{gameState.location}</strong>
      </div>
      <div>
        <span className="hud-label">Objective</span>
        <strong>{gameState.objective}</strong>
      </div>
      {gameState.notice ? (
        <div>
          <span className="hud-label">Notice</span>
          <strong>{gameState.notice}</strong>
        </div>
      ) : null}
      <div className="hud-stats">
        <div>
          <span className="hud-label">XP</span>
          <strong>{gameState.xp}</strong>
        </div>
        <div>
          <span className="hud-label">Level</span>
          <strong>{gameState.level}</strong>
        </div>
      </div>
    </section>
  );
}
