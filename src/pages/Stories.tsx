import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ImageSlot from "../components/ImageSlot";
import { STORIES } from "../data/stories";
import { IMAGES } from "../lib/images";

const Arrow = () => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
    <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" />
  </svg>
);

export default function Stories() {
  return (
    <div>
      <Nav />
      <PageHero eyebrow="Journal" title="Stories" texture="t4" image={IMAGES.storiesHero} label="Stories cover — atelier interior" />

      <section className="px-[5vw] py-[min(10vw,120px)]">
        <div className="flex flex-col gap-16 md:gap-[70px]">
          {STORIES.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to={`/stories/${s.slug}`}
                className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center hoverable ${
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <ImageSlot texture={s.texture} image={s.image} label={s.title} />
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.28em] uppercase text-wine mb-2.5">Journal</div>
                  <h3 className="font-display text-2xl md:text-[34px] my-2.5">{s.title}</h3>
                  <p className="font-serif text-lg text-[#4a3a34] leading-relaxed mb-4.5">{s.description}</p>
                  <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase border-b border-espresso/30 pb-1.5">
                    Read the Story <Arrow />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
