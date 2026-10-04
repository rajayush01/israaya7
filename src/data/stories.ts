import type { TextureKey } from "../lib/textures";

export interface Story {
  slug: string;
  title: string;
  description: string;
  texture: TextureKey;
  image: string;
}

import { IMAGES } from "../lib/images";

export const STORIES: Story[] = [
  {
    slug: "the-art-of-nikhaar",
    title: "The Art of Nikhaar",
    description: "How one chapter becomes a collection, and a collection becomes a memory worn on the skin.",
    texture: "t1",
    image: IMAGES.story1,
  },
  {
    slug: "crafted-by-hand",
    title: "Crafted by Hand",
    description: "Inside the ateliers where resham, pearl and sequin meet silk — slowly, deliberately.",
    texture: "t5",
    image: IMAGES.story2,
  },
  {
    slug: "the-silhouette",
    title: "The Silhouette",
    description: "Why Israaya begins every design with the shape a woman moves in, not the fabric she wears.",
    texture: "t8",
    image: IMAGES.story3,
  },
  {
    slug: "memory-in-thread",
    title: "Memory in Thread",
    description: "Every embroidery motif carries a story passed from one hand to the next.",
    texture: "t2",
    image: IMAGES.story4,
  },
  {
    slug: "made-in-india",
    title: "Made in India",
    description: "A look at the artisans and ateliers behind every Israaya piece.",
    texture: "t9",
    image: IMAGES.story5,
  },
];
