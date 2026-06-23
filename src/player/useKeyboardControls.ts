import { useEffect, useState } from 'react';

export type MovementKeys = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

const keyMap: Record<string, keyof MovementKeys> = {
  KeyW: 'forward',
  ArrowUp: 'forward',
  KeyS: 'backward',
  ArrowDown: 'backward',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
};

const initialKeys: MovementKeys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

export function useKeyboardControls() {
  const [keys, setKeys] = useState<MovementKeys>(initialKeys);

  useEffect(() => {
    const updateKey = (event: KeyboardEvent, pressed: boolean) => {
      const mappedKey = keyMap[event.code];

      if (!mappedKey) {
        return;
      }

      event.preventDefault();
      setKeys((current) => ({ ...current, [mappedKey]: pressed }));
    };

    const handleKeyDown = (event: KeyboardEvent) => updateKey(event, true);
    const handleKeyUp = (event: KeyboardEvent) => updateKey(event, false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
}

