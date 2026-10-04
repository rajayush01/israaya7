import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ImageSlot from "../components/ImageSlot";
import { PRODUCTS } from "../data/products";
import { IMAGES } from "../lib/images";

const HEIGHTS = [420, 320, 500, 380, 300, 460, 340, 420, 300];

export default function Lookbook() {
  return (
    <div>
      <Nav />
      <PageHero eyebrow="The Lookbook" title="Nikhaar, in Full" texture="t9" image={IMAGES.lookbookHero} label="Lookbook cover — full campaign spread" />

      <section className="px-[5vw] py-[min(10vw,120px)]">
        <div className="columns-1 md:columns-3 gap-6 [column-fill:_balance]">
          {PRODUCTS.map((p, i) => (
            <Link
              key={p.slug}
              to={`/product/${p.slug}`}
              className="group relative block overflow-hidden rounded-sm mb-6 break-inside-avoid hoverable"
              style={{ height: HEIGHTS[i % HEIGHTS.length] }}
            >
              <ImageSlot
                texture={p.texture}
                image={p.image}
                label={p.name}
                className="transition-transform duration-700 group-hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </ImageSlot>
              <div className="absolute left-4 bottom-4 z-[2] text-ivory text-[11px] tracking-[0.1em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                {p.name} — Explore →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
