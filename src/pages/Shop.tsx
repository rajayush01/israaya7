import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ImageSlot from "../components/ImageSlot";
import { PRODUCTS } from "../data/products";
import { IMAGES } from "../lib/images";

const FILTERS = ["All", "Dhoti Set", "Sharara Set", "Anarkali Set", "Farsi Suit Set", "Suit Set"];

export default function Shop() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.setType.toLowerCase().includes(active.toLowerCase()));

  return (
    <div>
      <Nav />
      <PageHero
        eyebrow="Chapter I — 10 Pieces"
        title="Nikhaar"
        texture="t2"
        image={IMAGES.shopHero}
        label="Shop hero — heritage courtyard"
      />

      <section className="px-[5vw] pt-[min(8vw,90px)] pb-8 max-w-[720px] mx-auto text-center">
        <p className="font-serif text-lg md:text-xl leading-relaxed text-[#4a3a34]">
          Nikhaar means the full blossoming of beauty into its most radiant form — the moment a flower stops
          growing and simply becomes what it was always meant to be. Our debut chapter draws its inspiration
          entirely from nature, from gardens, from the small, quiet details you only notice when you slow down
          and actually look. Like every chapter at Israaya, Nikhaar is one of a kind — it will not repeat, and
          it will not return once it closes.
        </p>
      </section>

      <section className="px-[5vw] py-[min(10vw,120px)]">
        <div className="flex gap-8 justify-center flex-wrap mb-16 text-[11px] tracking-[0.16em] uppercase">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`pb-1.5 border-b hoverable transition-colors ${
                active === f ? "text-wine border-wine" : "text-[#8a7a70] border-transparent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to={`/product/${p.slug}`} className="group block hoverable">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-3.5">
                  <ImageSlot
                    sizes="(min-width:768px) 33vw, 50vw"
                    texture={p.texture}
                    image={p.image}
                    label={p.name}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="font-display text-lg">{p.name}</div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-[#8a7a70] my-1.5">{p.setType}</div>
                <div className="text-sm text-wine">{p.color}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-espresso text-ivory px-[5vw] py-[min(10vw,110px)]">
        <div className="max-w-[900px] mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <div className="text-[11px] tracking-[0.28em] uppercase text-gold mb-3">Customization</div>
            <p className="font-serif text-base leading-relaxed text-ivory/85">
              Every Israaya piece is made to order and open to customization, from sizing to small design
              changes. Reach out to us on WhatsApp or email to personalize your piece or request faster
              delivery for an upcoming event.
            </p>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.28em] uppercase text-gold mb-3">Shipping</div>
            <p className="font-serif text-base leading-relaxed text-ivory/85">
              Made to order and shipped both within India and internationally. Standard delivery is 15–20
              days from order confirmation, with international orders taking slightly longer depending on
              destination.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
