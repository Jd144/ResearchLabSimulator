import type { GameState } from '../../data/gameState';
import type { InteractionState } from '../../features/interactions/interactionTypes';

type HUDProps = {
  gameState: GameState;
  nearbyInteraction: InteractionState | null;
};

export function HUD({ gameState, nearbyInteraction }: HUDProps) {
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
      <div>
        <span className="hud-label">PPE Status</span>
        <strong>
          {gameState.ppe.labCoat && gameState.ppe.gloves && gameState.ppe.goggles
            ? 'Equipped'
            : 'Not equipped'}
        </strong>
      </div>
      <div>
        <span className="hud-label">Nearby Interaction</span>
        <strong>{nearbyInteraction?.label ?? 'None'}</strong>
      </div>
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
