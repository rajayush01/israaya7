import type { TextureKey } from "../lib/textures";
import { productGallery } from "../lib/images";

export interface Product {
  slug: string;
  name: string;
  setType: string;
  chapter: string;
  price: string;
  color: string;
  sizeRange: string;
  fabric: { kurta: string; dupatta: string; bottom: string };
  texture: TextureKey;
  altTexture: TextureKey;
  image: string;
  altImage: string;
  gallery: string[];
  story: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "hansa",
    name: "Hansa",
    setType: "Three Piece Dhoti Set",
    chapter: "Nikhaar Chapter",
    price: "Price on request",
    color: "Pista Green",
    sizeRange: "XS – 7XL, Custom on request",
    fabric: {
      kurta: "Satin",
      dupatta: "Satin with embroidered border",
      bottom: "Satin dhoti pants",
    },
    texture: "t1",
    altTexture: "t4",
    image: productGallery(0)[0],
    altImage: productGallery(0)[1],
    gallery: productGallery(0),
    story:
      "Hansa is our interpretation of swans in love, drifting through a garden of their own making. Made in satin with dori embroidery and pearl work, this three piece dhoti set carries a vibrant colour that feels alive the moment it catches light. Swans move throughout the embroidery alongside pearls and delicate garden motifs, each detail hand worked and placed with precision. The dhoti silhouette feels modern yet rooted, easy to dress up or keep effortless depending on the day. Made for the woman who wants colour that speaks for itself, equally suited to a daytime celebration or an evening that calls for something memorable.",
  },
  {
    slug: "madhura",
    name: "Madhura",
    setType: "Three Piece Sharara Set",
    chapter: "Nikhaar Chapter",
    price: "Price on request",
    color: "Lilac",
    sizeRange: "XS – 7XL, Custom on request",
    fabric: {
      kurta: "Pure Chanderi",
      dupatta: "Chanderi with embroidered border",
      bottom: "Chanderi sharara",
    },
    texture: "t8",
    altTexture: "t2",
    image: productGallery(1)[0],
    altImage: productGallery(1)[1],
    gallery: productGallery(1),
    story:
      "Madhura is the perfect balance of subtle and fun, simple enough to feel effortless yet detailed enough to become a statement piece the moment you put it on. Crafted in pure Chanderi, it carries white and silver dori hand work embellished with pearls, the kind of detailing that reveals itself slowly rather than all at once. At its centre sits our own interpretation of the lotus, surrounded by florals that trail across the neckline as though they were always meant to be there. Perfect for daytime events, intimate occasions and destination weddings, Madhura moves easily between all of them without ever trying too hard.",
  },
  {
    slug: "sitara-chandni",
    name: "Sitara Chandni",
    setType: "Three Piece Anarkali Set",
    chapter: "Nikhaar Chapter",
    price: "Price on request",
    color: "White",
    sizeRange: "XS – 6XL, Custom on request",
    fabric: {
      kurta: "Pure Chanderi",
      dupatta: "Chanderi with embroidered border",
      bottom: "Chanderi pants",
    },
    texture: "t3",
    altTexture: "t1",
    image: productGallery(2)[0],
    altImage: productGallery(2)[1],
    gallery: productGallery(2),
    story:
      "Sitara Chandni is that one white staple anarkali you'll keep coming back to. Crafted in pure Chanderi, this three piece anarkali set is inspired by the way moonlight sits on everything it touches, never loud, never fading into the background either, just quietly impossible to look away from. Hand embroidered with intricate silver zardozi work, detailed with delicate floral motifs and subtle animal motifs woven through the yoke and sleeves, making it a one of a kind design unlike any other piece in the collection. Timeless in its silhouette and effortless to style across multiple occasions, Sitara Chandni is designed to be the kind of piece you hold onto, one that finds its way back into your wardrobe year after year.",
  },
  {
    slug: "kamal",
    name: "Kamal",
    setType: "Three Piece Farsi Suit Set",
    chapter: "Nikhaar Chapter",
    price: "Price on request",
    color: "Pink Ombre",
    sizeRange: "XS – 6XL, Custom on request",
    fabric: {
      kurta: "Silk",
      dupatta: "Organza (ombre)",
      bottom: "Silk farsi salwar",
    },
    texture: "t5",
    altTexture: "t1",
    image: productGallery(3)[0],
    altImage: productGallery(3)[1],
    gallery: productGallery(3),
    story:
      "Kamal is built around a version of festive dressing that whispers instead of shouts. Silk meets a flowing organza dupatta in an ombre that fades gently from one shade into another, soft enough to feel like it was dipped in colour rather than dyed into it. Come closer and the fabric tells its own story, butterflies caught mid flight and flowers formed through organza patchwork, finished with beadwork that lifts just slightly off the surface, catching light differently with every step. A short kurta, a farsi salwar and a dupatta rich with detail, relaxed in shape but never quiet in presence. Easy enough for a sunny brunch, dressed up enough for a soiree.",
  },
  {
    slug: "sona-pankh",
    name: "Sona Pankh",
    setType: "Three Piece Farsi Suit Set",
    chapter: "Nikhaar Chapter",
    price: "Price on request",
    color: "Champagne Gold",
    sizeRange: "XS – 6XL, Custom on request",
    fabric: {
      kurta: "Silk",
      dupatta: "Silk (heavily hand embroidered)",
      bottom: "Silk farsi salwar",
    },
    texture: "t7",
    altTexture: "t3",
    image: productGallery(4)[0],
    altImage: productGallery(4)[1],
    gallery: productGallery(4),
    story:
      "A three piece farsi suit set in warm champagne gold silk, comprising a straight silk kurta, a silk farsi salwar and the heaviest hand embroidered dupatta in the collection. Resham thread, pearls and sequins are worked by hand into a dense pattern of trees and birds, covering the dupatta from end to end. The kurta and salwar stay comparatively minimal, letting the dupatta carry the embroidery weight, so the set can be styled two ways, with the dupatta for a fully embellished look, or without it for something more relaxed and everyday.",
  },
  {
    slug: "komal-tara",
    name: "Komal Tara",
    setType: "Three Piece Suit Set",
    chapter: "Nikhaar Chapter",
    price: "Price on request",
    color: "Peach",
    sizeRange: "XS – 6XL, Custom on request",
    fabric: {
      kurta: "Silk",
      dupatta: "Silk (textured)",
      bottom: "Silk pants",
    },
    texture: "t2",
    altTexture: "t9",
    image: productGallery(5)[0],
    altImage: productGallery(5)[1],
    gallery: productGallery(5),
    story:
      "A three piece suit set in soft peach silk, comprising a long straight kurta, matching straight pants and a dupatta finished in a unique textured organza that sets it apart from the rest of the set. Resham thread and sequin embroidery run along the neckline and down the front split of the kurta, kept precise and detailed against the otherwise clean silhouette. The dupatta's texture adds dimension without embroidery, playing off the embellished neckline and split rather than competing with it, so the set feels considered from every angle.",
  },
];
