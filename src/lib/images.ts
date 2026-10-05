import links from "./uploaded-links.json";

/**
 * Every image on the site comes from uploaded-links.json (R2-hosted).
 * PHOTOS is the ordered pool; IMAGES names the non-product slots and
 * productGallery() hands each product its own four photos.
 * To re-map a slot, just change the index here — nothing else needs to move.
 */
export const PHOTOS: string[] = (links as { file: string; url: string }[]).map((l) => l.url);

const p = (i: number) => PHOTOS[i % PHOTOS.length];

/** Four distinct photos per product (indices 0–23 for the six products). */
export const productGallery = (productIndex: number): string[] =>
  [0, 1, 2, 3].map((k) => p(productIndex * 4 + k));

/** Wide "detail" strip on each product page (indices 24+). */
export const productDetail = (productIndex: number): string => p(24 + productIndex);

export const IMAGES = {
  // Home
  homeHero: p(30),
  reveal1: p(31),
  reveal2: p(32),
  reveal3: p(33),
  reveal4: p(34),
  collNikhaar: p(35),
  collChapter2: p(36),
  collChapter3: p(37),
  craftZardozi: p(38),
  craftDori: p(39),
  craftResham: p(40),
  craftBead: p(41),
  craftIndia: p(42),
  // Page heroes
  shopHero: p(43),
  careHero: p(30),
  storiesHero: p(31),
  lookbookHero: p(32),
  aboutHero: p(33),
  // About
  aboutGallery1: p(34),
  aboutGallery2: p(35),
  aboutGallery3: p(36),
  aboutGallery4: p(37),
  aboutGallery5: p(38),
  madeInIndia: p(39),
  // Stories
  story1: p(24),
  story2: p(25),
  story3: p(26),
  story4: p(27),
  story5: p(28),
  storyDetail: p(29),
} as const;

export type ImageKey = keyof typeof IMAGES;

/**
 * Warm the browser cache for below-the-fold images once the page is idle,
 * two at a time, so scrolling never waits on the network and the hero
 * isn't competing with them for bandwidth.
 */
const warmed = new Set<string>();
export function prefetchImages(urls: string[], concurrency = 2) {
  if (typeof window === "undefined") return;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return;

  const queue = urls.filter((u) => u && !warmed.has(u));
  queue.forEach((u) => warmed.add(u));

  const next = () => {
    const url = queue.shift();
    if (!url) return;
    const img = new Image();
    img.decoding = "async";
    img.onload = img.onerror = next;
    img.src = url;
  };

  const start = () => {
    for (let i = 0; i < concurrency; i++) next();
  };
  const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
    .requestIdleCallback;
  const kick = () => (idle ? idle(start, { timeout: 2500 }) : setTimeout(start, 600));
  if (document.readyState === "complete") kick();
  else window.addEventListener("load", kick, { once: true });
}
