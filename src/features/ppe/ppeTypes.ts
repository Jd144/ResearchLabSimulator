export type PPEState = {
  labCoat: boolean;
  gloves: boolean;
  goggles: boolean;
};

// Future feature: lab entry will require this state before the student can access experiments.
export const initialPPEState: PPEState = {
  labCoat: false,
  gloves: false,
  goggles: false,
};

