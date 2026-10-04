import ImageSlot from "./ImageSlot";
import type { TextureKey } from "../lib/textures";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  texture: TextureKey;
  label: string;
  image?: string;
  height?: string;
}

export default function PageHero({ eyebrow, title, texture, label, image, height = "56vh" }: PageHeroProps) {
  return (
    <section className="relative flex items-end overflow-hidden" style={{ height, minHeight: 380 }}>
      <ImageSlot texture={texture} image={image} label={label}>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 to-transparent" />
      </ImageSlot>
      <div className="relative z-[2] text-ivory px-[5vw] pb-[50px]">
        <div className="text-[11px] tracking-[0.28em] uppercase text-peach mb-2.5">{eyebrow}</div>
        <h1 className="font-display text-[40px] md:text-[84px] leading-tight">{title}</h1>
      </div>
    </section>
  );
}
