import { useEffect } from 'react';
import type { InteractionState } from '../../features/interactions/interactionTypes';

type InteractionPromptProps = {
  interaction: InteractionState | null;
  onInteract: () => void;
};

export function InteractionPrompt({ interaction, onInteract }: InteractionPromptProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'KeyE' && interaction?.isAvailable) {
        onInteract();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [interaction?.isAvailable, onInteract]);

  if (!interaction?.isAvailable) {
    return null;
  }

  return (
    <section className="interaction-prompt" aria-live="polite">
      <span>{interaction.actionLabel}</span>
      <strong>{interaction.label}</strong>
    </section>
  );
}
