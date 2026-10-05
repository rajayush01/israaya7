import { useState } from "react";
import { TEXTURES, type TextureKey } from "../lib/textures";

interface ImageSlotProps {
  texture: TextureKey;
  label: string;
  image?: string;
  className?: string;
  children?: React.ReactNode;
  /** Above-the-fold image: load immediately with high fetch priority. */
  priority?: boolean;
  /** Load immediately without raising priority (e.g. images inside a horizontally scrolled track). */
  eager?: boolean;
  /** Hint so the browser picks the right size; defaults to full width. */
  sizes?: string;
}

export default function ImageSlot({
  texture,
  label,
  image,
  className = "",
  children,
  priority = false,
  eager = false,
  sizes = "100vw",
}: ImageSlotProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden ${image ? "bg-[#e9dfd6]" : ""} ${className}`}
    >
      {image ? (
        <img
          // ref callback catches images that are already cached/complete before React attaches onLoad
          ref={(el) => {
            if (el?.complete && !loaded) setLoaded(true);
          }}
          src={image}
          alt={label}
          sizes={sizes}
          loading={priority || eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <>
          <div
            className="absolute inset-0 w-full h-full"
            style={{ background: TEXTURES[texture] }}
          />

          <span className="slot-tag absolute z-10">
            Image slot · {label}
          </span>
        </>
      )}

      {children}
    </div>
  );
}
