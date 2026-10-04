// Placeholder art-direction gradients standing in for real campaign photography.
// Swap any of these for a real image URL — components accept an optional
// `image` prop that takes priority over the texture when provided.
export const TEXTURES = {
  t1: "linear-gradient(140deg,#E8B8A7,#C9827A 55%,#7D1638)",
  t2: "linear-gradient(140deg,#B89A5B,#7D1638 60%,#2C211D)",
  t3: "linear-gradient(140deg,#F5F1E8,#E8B8A7 50%,#C9827A)",
  t4: "linear-gradient(140deg,#570D26,#2C211D 70%)",
  t5: "radial-gradient(circle at 30% 30%,#B89A5B,#570D26 70%)",
  t6: "radial-gradient(circle at 60% 40%,#E8B8A7,#2C211D 75%)",
  t7: "radial-gradient(circle at 40% 60%,#C9827A,#7D1638 70%)",
  t8: "linear-gradient(150deg,#F5F1E8,#C9827A)",
  t9: "linear-gradient(160deg,#7D1638,#B89A5B 120%)",
} as const;

export type TextureKey = keyof typeof TEXTURES;
