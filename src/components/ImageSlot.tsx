import { TEXTURES, type TextureKey } from "../lib/textures";

interface ImageSlotProps {
  texture: TextureKey;
  label: string;
  image?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ImageSlot({
  texture,
  label,
  image,
  className = "",
  children,
}: ImageSlotProps) {
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      {image ? (
        <img
          src={image}
          alt={label}
          loading="lazy"
          decoding="async"
           className="absolute inset-0 w-full h-full object-cover object-center"
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