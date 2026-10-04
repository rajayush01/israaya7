import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { Link } from "react-router-dom";
import { IMAGES } from "../lib/images";


const EASE = [0.76, 0, 0.24, 1] as const;

const PLATES = [
  {
    label: "The Silhouette",
    caption: "Named for what the garden holds.",
    image: () => IMAGES.reveal1,
    className: "md:w-[82%] md:ml-auto aspect-[4/5]",
  },
  {
    label: "Close-Up",
    caption: "Zardozi, dori work, resham, beadwork.",
    image: () => IMAGES.reveal2,
    className: "md:w-[60%] aspect-[3/4]",
  },
  {
    label: "Architecture",
    caption: "Rooted in India, built for the world.",
    image: () => IMAGES.reveal3,
    className: "md:w-[88%] md:ml-auto aspect-[1/1]",
  },
  {
    label: "In Motion",
    caption: "Made to order. Made once it's called for.",
    image: () => IMAGES.reveal4,
    className: "md:w-[70%] aspect-[4/5]",
  },
];
function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="10"
      viewBox="0 0 22 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      aria-hidden
    >
      <path d="M0 5h20M16 1l4 4-4 4" />
    </svg>
  );
}

const CRAFTS = ["Zardozi", "Dori Work", "Resham", "Beadwork", "Gota Patti", "Hand Embroidery"];

/* ---------- Masked letter-by-letter title ---------- */
function MaskedTitle({ text }: { text: string }) {
  return (
    <h2
      aria-label={text}
      className="font-display text-[22vw] md:text-[17vw] leading-[0.82] tracking-[-0.03em] flex"
    >
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em]" aria-hidden>
          <motion.span
            className={`inline-block ${i % 2 ? "text-gold italic" : ""}`}
            initial={{ y: "110%", rotate: 6 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE, delay: i * 0.06 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

/* ---------- Rotating circular badge ---------- */
function Badge() {
  return (
    <motion.div
      className="relative w-[110px] h-[110px] md:w-[150px] md:h-[150px]"
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <path id="badge-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text className="fill-gold" fontSize="15" letterSpacing="5.2" style={{ textTransform: "uppercase" }}>
          <textPath href="#badge-circle">Chapter I • What gardens know • </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center font-serif italic text-gold text-3xl">
        I
      </span>
    </motion.div>
  );
}

/* ---------- A single plate with curtain reveal + parallax ---------- */
function Plate({
  plate,
  index,
  onActive,
}: {
  plate: (typeof PLATES)[number];
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className={`relative group hoverable ${plate.className}`}>
      <motion.div
        className="absolute inset-0 overflow-hidden bg-[#e9dfd6]"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        <motion.img
          src={plate.image()}
          alt={plate.label}
          style={{ y }}
          className="absolute left-0 top-[-10%] w-full h-[120%] object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </motion.div>

      {/* floating index tag */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute -left-3 md:-left-8 top-8 bg-[#f6efe8] text-gold px-4 py-2 text-[10px] tracking-[0.28em] uppercase shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]"
      >
        {String(index + 1).padStart(2, "0")} / {plate.label}
      </motion.div>

      {/* caption */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute left-6 bottom-6 right-6 font-serif italic text-white text-lg md:text-2xl drop-shadow"
      >
        {plate.caption}
      </motion.p>
    </div>
  );
}

/* ---------- Craft marquee ---------- */
function Marquee() {
  const row = [...CRAFTS, ...CRAFTS];
  return (
    <div className="overflow-hidden border-y border-gold/20 py-6 my-24 select-none">
      <motion.div
        className="flex w-max gap-10 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {row.map((c, i) => (
          <div key={i} className="flex items-center gap-10">
            <span
              className={`font-display text-5xl md:text-8xl whitespace-nowrap ${
                i % 2 ? "italic text-gold" : "text-transparent"
              }`}
              style={i % 2 ? undefined : { WebkitTextStroke: "1px currentColor", color: "transparent" }}
            >
              {c}
            </span>
            <span className="text-gold text-2xl">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- Main section ---------- */
function ChapterStorytelling() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  return (
    <section id="chapter" className="px-[5vw] pt-10">
      {/* Header */}
      <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 text-[11px] tracking-[0.28em] uppercase text-gold mb-6"
          >
            <span className="h-px w-12 bg-gold" /> Chapter I
          </motion.div>
          <MaskedTitle text="Nikhaar" />
        </div>
        <div className="flex md:flex-col items-center md:items-end gap-6">
          <Badge />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="font-serif italic text-xl md:text-3xl text-gold md:text-right"
          >
            What gardens know.
          </motion.p>
        </div>
      </div>

      {/* Sticky split */}
      <div ref={sectionRef} className="grid md:grid-cols-[4fr_7fr] gap-10 md:gap-20">
        {/* LEFT — pinned index */}
        <aside className="md:sticky md:top-0 md:h-screen flex flex-col justify-between py-6 md:py-14">
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#8a7a70]">
            10 Pieces — From the Nikhaar Chapter
          </div>

          <div className="hidden md:block">
            <div className="relative h-[16vw] max-h-[220px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="font-display text-[14vw] max-text-[200px] leading-none text-gold"
                >
                  {String(active + 1).padStart(2, "0")}
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="mt-8 space-y-4">
              {PLATES.map((p, i) => (
                <li key={p.label} className="flex items-center gap-4">
                  <span
                    className={`h-px transition-all duration-700 bg-gold ${
                      active === i ? "w-16" : "w-6 opacity-30"
                    }`}
                  />
                  <span
                    className={`text-[11px] tracking-[0.24em] uppercase transition-opacity duration-500 ${
                      active === i ? "text-gold" : "text-[#8a7a70] opacity-60"
                    }`}
                  >
                    {p.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* scroll progress */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative h-px flex-1 bg-gold/20 overflow-hidden">
              <motion.div className="absolute inset-0 bg-gold origin-left" style={{ scaleX: scrollYProgress }} />
            </div>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#8a7a70]">Scroll</span>
          </div>
        </aside>

        {/* RIGHT — plates */}
        <div className="flex flex-col gap-24 md:gap-[18vh] pb-10">
          {PLATES.map((p, i) => (
            <Plate key={p.label} plate={p} index={i} onActive={setActive} />
          ))}
        </div>
      </div>

      <Marquee />

      {/* CTA */}
      <div className="flex justify-center pb-28">
        <Link
          to="/shop"
          className="group hoverable relative grid place-items-center w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-full border border-gold/40 text-gold overflow-hidden"
        >
          <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full" />
          <span className="relative z-10 flex flex-col items-center gap-3 text-[11px] tracking-[0.24em] uppercase transition-colors duration-500 group-hover:text-[#f6efe8]">
            Explore the Collection
            <Arrow className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </section>
  );
}

export default ChapterStorytelling;