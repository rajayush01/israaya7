import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ImageSlot from "../components/ImageSlot";
import ChapterStorytelling from "../components/ChapterStorytelling";
import { PRODUCTS } from "../data/products";
import { IMAGES, prefetchImages } from "../lib/images";
import logo from "../assets/ISRAAYA LOGO.svg";
import logo1 from "../assets/ISRAAYA MOTIF.svg";
import HERO_VIDEO from "../assets/israaya-video.mp4";
import HERO_VIDEO_SMALL from "../assets/israaya-video-720.mp4";

/* ------------------------------------------------------------------ */
/*  CONFIG — swap these for your R2 URLs                              */
/* ------------------------------------------------------------------ */
// const HERO_VIDEO = "/videos/hero.mp4"; // H.264 mp4, ~1080p, under 4 MB, loopable
// const HERO_VIDEO_WEBM = "/videos/hero.webm"; // optional smaller fallback source
// Tiny same-origin poster (preloaded in index.html) so the hero paints instantly
const HERO_POSTER = "/hero-poster.webp";

const EASE = [0.76, 0, 0.24, 1] as const;

const Arrow = ({ className = "" }: { className?: string }) => (
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

/* ------------------------------------------------------------------ */
/*  Shared: masked text reveal (letters or words slide up from a line) */
/*  Pass `show` to control it manually, omit it to reveal on scroll.   */
/* ------------------------------------------------------------------ */
function Masked({
  text,
  by = "word",
  show,
  delay = 0,
  className = "",
  altClass = "",
}: {
  text: string;
  by?: "char" | "word";
  show?: boolean;
  delay?: number;
  className?: string;
  altClass?: string;
}) {
  const parts = by === "char" ? text.split("") : text.split(" ");
  const trigger: any =
    show === undefined
      ? { whileInView: { y: 0, rotate: 0 }, viewport: { once: true, amount: 0.6 } }
      : { animate: show ? { y: 0, rotate: 0 } : { y: "110%", rotate: 6 } };

  return (
    <span aria-label={text} className={`flex flex-wrap ${className}`}>
      {parts.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className={`inline-block overflow-hidden pb-[0.1em] ${
            by === "word" && i < parts.length - 1 ? "mr-[0.25em]" : ""
          }`}
        >
          <motion.span
            className={`inline-block ${altClass && i % 2 ? altClass : ""}`}
            initial={{ y: "110%", rotate: 6 }}
            {...trigger}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * (by === "char" ? 0.06 : 0.08) }}
          >
            {p}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`flex items-center gap-4 text-[11px] tracking-[0.28em] uppercase ${
        light ? "text-ivory/80" : "text-gold"
      }`}
    >
      <span className="h-px w-12 bg-gold" />
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Preloader — counter + curtain that lifts away                      */
/* ------------------------------------------------------------------ */
function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let raf = 0;
    let finished = false;
    let ready = false;
    let shown = 0;
    const t0 = performance.now();
    const MIN = 700; // never flash
    const MAX = 3000; // never hang

    // "Ready" = hero poster decoded + fonts loaded (whichever comes first with the MAX cap)
    const poster = new Image();
    poster.src = HERO_POSTER;
    Promise.all([poster.decode().catch(() => {}), document.fonts?.ready ?? Promise.resolve()]).then(() => {
      ready = true;
    });

    const finish = () => {
      if (finished) return;
      finished = true;
      setLeaving(true);
      document.body.style.overflow = "";
      onDone();
    };

    const tick = (now: number) => {
      const elapsed = now - t0;
      // glide toward 90% while loading, snap to 100% once ready
      const target = ready && elapsed > MIN ? 100 : Math.min(90, (elapsed / 1400) * 90);
      shown += (target - shown) * 0.12;
      const n = Math.min(100, Math.round(shown + (target === 100 ? 1 : 0)));
      setCount((c) => (c === n ? c : n));
      if ((target === 100 && n >= 99) || elapsed > MAX) {
        setCount(100);
        setTimeout(finish, 200);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: leaving ? "-100%" : 0 }}
      transition={{ duration: 1.1, ease: EASE }}
      onAnimationComplete={() => leaving && setGone(true)}
      style={{ pointerEvents: leaving ? "none" : "auto", willChange: "transform" }}
      className="fixed inset-0 z-[10000] bg-ivory flex flex-col items-center justify-center"
    >
      <div className="flex items-center">
        <img src={logo1} alt="Israaya motif" className="h-16 md:h-20" />
        <img src={logo} alt="Israaya" className="h-16 md:h-20 -ml-5" />
      </div>
      <div className="absolute left-[5vw] right-[5vw] bottom-[5vw] flex items-end justify-between">
        <div className="relative h-px flex-1 bg-gold/25 mr-8 overflow-hidden">
          <div
            className="absolute inset-0 bg-gold origin-left"
            style={{ transform: `scaleX(${count / 100})`, transition: "transform .15s linear" }}
          />
        </div>
        <span className="font-display text-5xl md:text-7xl leading-none text-gold tabular-nums">
          {String(count).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — full-bleed video that frames itself as you scroll           */
/* ------------------------------------------------------------------ */
function Hero({ loaded }: { loaded: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // transform + radius only: the browser can do this on the GPU without re-rasterising the video
  // (the old animated clip-path forced a repaint of the playing video on every scroll frame)
  const frameScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.88]);
  const frameRadius = useTransform(scrollYProgress, [0, 0.8], [0, 28]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Pick the right file only AFTER the page has loaded so the video never fights
  // the images/fonts for bandwidth; skip it entirely on Save-Data / reduced-motion.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pick = () => setVideoSrc(window.innerWidth < 900 ? HERO_VIDEO_SMALL : HERO_VIDEO);
    if (document.readyState === "complete") {
      const id = setTimeout(pick, 300);
      return () => clearTimeout(id);
    }
    window.addEventListener("load", pick, { once: true });
    return () => window.removeEventListener("load", pick);
  }, []);

  // Only decode video while the hero is actually on screen
  useEffect(() => {
    const v = videoRef.current;
    const el = ref.current;
    if (!v || !el || !videoSrc) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    const onVis = () => (document.hidden ? v.pause() : undefined);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [videoSrc]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] bg-espresso">
      {/* video frame */}
      <motion.div
        style={{ scale: frameScale, borderRadius: frameRadius, willChange: "transform" }}
        className="absolute inset-0 overflow-hidden origin-center"
      >
        <motion.div style={{ scale: videoScale, willChange: "transform" }} className="absolute inset-0">
          <video
            ref={videoRef}
            key={videoSrc ?? "poster"}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "50% 35%" }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
            src={videoSrc ?? undefined}
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(12,12,11,0.35) 0%,rgba(12,12,11,0.15) 35%,rgba(3,3,3,0.78) 100%)",
          }}
        />
      </motion.div>

      {/* content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-x-0 bottom-0 z-[2] px-[5vw] pb-[5vw] md:pb-[3.5vw] text-ivory flex items-end justify-between gap-8"
      >
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center gap-4 text-[11px] tracking-[0.28em] uppercase text-peach font-medium mb-4"
          >
            <span className="h-px w-12 bg-peach" /> Chapter I
          </motion.div>
          <h1 aria-label="Nikhaar" className="font-display text-[24vw] md:text-[16vw] leading-[0.82] tracking-[-0.03em]">
            <Masked text="Nikhaar" by="char" show={loaded} delay={0.2} altClass="text-gold italic" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
            transition={{ delay: 1, duration: 1 }}
            className="font-serif italic text-lg md:text-3xl text-gold mt-5"
          >
            An ode to quiet radiance.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="hidden md:flex flex-col items-end gap-8 pb-3"
        >
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-pressed={!muted}
            className="hoverable text-[11px] tracking-[0.22em] uppercase border-b border-ivory/40 pb-1.5 hover:border-gold hover:text-gold transition-colors"
          >
            Sound {muted ? "off" : "on"}
          </button>
          <Link
            to="/shop"
            className="group hoverable inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase border-b border-ivory/40 pb-1.5 hover:gap-4 transition-all"
          >
            Discover the Collection
            <Arrow className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <div className="hidden md:block absolute right-[2.2vw] top-1/2 -translate-y-1/2 z-[2]">
        <div className="relative h-24 w-px bg-ivory/25 overflow-hidden">
          <div className="absolute inset-x-0 h-8 bg-gold anim-cue" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand intro — statement that fills in word by word on scroll       */
/* ------------------------------------------------------------------ */
function ScrollWord({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
}

function BrandIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = "Indian wear does not have to choose between heritage and ease.".split(" ");

  return (
    <section className="px-[5vw] py-[min(16vw,190px)]">
      <div className="grid md:grid-cols-[3fr_9fr] gap-10 md:gap-20">
        <div className="flex md:flex-col items-start gap-6">
          <Eyebrow>The House</Eyebrow>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-start"
          >
            <img src={logo1} alt="Israaya motif" className="h-14 md:h-16" />
            <img src={logo} alt="Israaya" className="h-14 md:h-16" />
          </motion.div>
        </div>

        <div>
          <p
            ref={ref as React.RefObject<HTMLParagraphElement>}
            className="font-display text-[34px] md:text-[5.2vw] leading-[1.08] tracking-[-0.01em] text-espresso"
          >
            {words.map((w, i) => {
              const start = i / words.length;
              return (
                <ScrollWord
                  key={i}
                  word={w}
                  progress={scrollYProgress}
                  range={[start * 0.8, start * 0.8 + 0.2]}
                />
              );
            })}
          </p>
          <div className="mt-12 flex items-center gap-6">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
              className="h-px w-24 bg-gold origin-left"
            />
            <p className="font-serif italic text-lg md:text-2xl text-gold">
              Made in India. Worn around the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Craft — pinned horizontal scroll on desktop, snap scroller on mobile */
/* ------------------------------------------------------------------ */
const CRAFT_TAGS: { tag: string; texture: any; image: string }[] = [
  { tag: "Zardozi", texture: "t5", image: IMAGES.craftZardozi },
  { tag: "Dori Work", texture: "t6", image: IMAGES.craftDori },
  { tag: "Resham", texture: "t7", image: IMAGES.craftResham },
  { tag: "Beadwork", texture: "t8", image: IMAGES.craftBead },
  { tag: "Crafted in India", texture: "t4", image: IMAGES.craftIndia },
];

function CraftIntro() {
  return (
    <div>
      <Eyebrow light>Our Craft</Eyebrow>
      <h2 className="font-display text-[56px] md:text-[8vw] leading-[0.9] tracking-[-0.02em] mt-6 mb-8">
        <Masked text="Made Slowly." altClass="text-gold italic" />
      </h2>
      <p className="font-serif text-base md:text-xl leading-relaxed text-ivory/75 max-w-[460px]">
        Nothing is mass produced. Every piece is made to order and hand embroidered only once it is called for.
      </p>
    </div>
  );
}

function CraftSection() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (trackRef.current) setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      });
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  return (
    <>
      {/* Desktop — pinned */}
      <section ref={ref} className="hidden md:block relative h-[420vh] bg-espresso text-ivory">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.div ref={trackRef} style={{ x, willChange: "transform" }} className="flex items-center gap-[4vw] pl-[5vw] pr-[10vw] w-max">
            <div className="w-[34vw] shrink-0">
              <CraftIntro />
            </div>
            {CRAFT_TAGS.map((c, i) => (
              <div
                key={c.tag}
                className={`relative shrink-0 h-[58vh] aspect-[3/4] overflow-hidden rounded-sm ${
                  i % 2 ? "translate-y-[7vh]" : "-translate-y-[7vh]"
                }`}
              >
                <ImageSlot texture={c.texture} image={c.image} label={c.tag} eager sizes="35vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 font-serif italic text-2xl text-ivory">{c.tag}</span>
              </div>
            ))}
          </motion.div>

          <div className="absolute left-[5vw] right-[5vw] bottom-10 flex items-center gap-4">
            <div className="relative h-px flex-1 bg-gold/25 overflow-hidden">
              <motion.div className="absolute inset-0 bg-gold origin-left" style={{ scaleX: scrollYProgress }} />
            </div>
            <span className="text-[10px] tracking-[0.22em] uppercase text-ivory/60">Scroll</span>
          </div>
        </div>
      </section>

      {/* Mobile — native snap scroller */}
      <section className="md:hidden bg-espresso text-ivory py-24">
        <div className="px-[5vw] mb-12">
          <CraftIntro />
        </div>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-[5vw] pb-4 [scrollbar-width:none]">
          {CRAFT_TAGS.map((c) => (
            <div
              key={c.tag}
              className="relative snap-center shrink-0 w-[72vw] aspect-[3/4] overflow-hidden rounded-sm"
            >
              <ImageSlot texture={c.texture} image={c.image} label={c.tag} sizes="72vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-serif italic text-xl text-ivory">{c.tag}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured edit — oversized product index with a cursor-led preview  */
/* ------------------------------------------------------------------ */
function FeaturedEdit() {
  const items = PRODUCTS.slice(0, 4);
  const [hover, setHover] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 26 });
  const sy = useSpring(my, { stiffness: 220, damping: 26 });

  return (
    <section
      className="px-[5vw] py-[min(14vw,160px)]"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      onMouseLeave={() => setHover(null)}
    >
      <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
        <div>
          <Eyebrow>The Edit</Eyebrow>
          <h2 className="font-display text-[44px] md:text-[8vw] leading-[0.9] tracking-[-0.02em] mt-6">
            <Masked text="The Nikhaar Edit" altClass="text-gold italic" />
          </h2>
        </div>
        <Link
          to="/shop"
          className="group hoverable inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase border-b border-gold/40 text-gold pb-1.5 hover:gap-4 transition-all"
        >
          View all
          <Arrow className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="border-b border-espresso/15">
        {items.map((p, i) => (
          <Link
            key={p.slug}
            to={`/product/${p.slug}`}
            onMouseEnter={() => setHover(i)}
            className="group hoverable relative flex items-center gap-5 md:gap-10 py-6 md:py-9 border-t border-espresso/15"
          >
            {/* mobile thumbnail */}
            <div className="md:hidden relative w-20 aspect-[3/4] shrink-0 overflow-hidden rounded-sm">
              <ImageSlot texture={p.texture} image={p.image} label={p.name} sizes="80px" />
            </div>

            <div
              className={`flex-1 font-display text-[28px] md:text-[5vw] leading-[1] tracking-[-0.01em] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:group-hover:translate-x-[2vw] md:group-hover:text-gold ${
                hover !== null && hover !== i ? "md:opacity-25" : ""
              }`}
            >
              {p.name}
            </div>

            <div className="text-right shrink-0">
              <div className="text-[11px] uppercase tracking-[0.12em] text-[#8a7a70]">{p.setType}</div>
              <div className="font-serif italic text-base md:text-xl text-gold mt-1">{p.color}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* cursor-led preview (desktop) */}
      <AnimatePresence>
        {hover !== null && (
          <motion.div
            key="preview"
            style={{ left: sx, top: sy, x: "-50%", y: "-50%" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="pointer-events-none fixed z-50 hidden md:block w-[240px] aspect-[3/4] overflow-hidden rounded-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
          >
            <ImageSlot
              texture={items[hover].texture}
              image={items[hover].image}
              label={items[hover].name}
              eager
              sizes="240px"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing — one giant link                                           */
/* ------------------------------------------------------------------ */
function Closing() {
  return (
    <section className="bg-espresso text-ivory px-[5vw] py-[min(18vw,220px)] overflow-hidden">
      <Eyebrow light>Chapter I is open</Eyebrow>
      <p className="font-serif italic text-xl md:text-3xl text-ivory/70 mt-6 mb-10 max-w-[520px]">
        Each chapter is created once and never repeated.
      </p>
      <Link
        to="/shop"
        className="group hoverable relative inline-flex items-end gap-[2vw] font-display text-[18vw] md:text-[12vw] leading-[0.9] tracking-[-0.03em]"
      >
        <span className="transition-colors duration-500 group-hover:text-gold">Shop Nikhaar</span>
        <Arrow className="mb-[2.2vw] md:mb-[1.8vw] w-[8vw] h-auto text-gold transition-transform duration-500 group-hover:translate-x-3" />
        <span className="absolute left-0 right-0 bottom-0 h-px bg-ivory/25" />
        <span className="absolute left-0 right-0 bottom-0 h-px bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
      </Link>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);

  // After the page is idle, quietly pull in the images further down so they're
  // already cached by the time you scroll to them (2 at a time, hero first).
  useEffect(() => {
    prefetchImages([
      IMAGES.reveal1,
      IMAGES.reveal2,
      IMAGES.reveal3,
      IMAGES.reveal4,
      IMAGES.craftZardozi,
      IMAGES.craftDori,
      IMAGES.craftResham,
      IMAGES.craftBead,
      IMAGES.craftIndia,
      ...PRODUCTS.slice(0, 4).map((p) => p.image),
    ]);
  }, []);

  return (
    <div>
      <Preloader onDone={onDone} />
      <Nav transparentOnTop />
      <Hero loaded={loaded} />
      <BrandIntro />
      <ChapterStorytelling />
      <CraftSection />
      <FeaturedEdit />
      <Closing />
      <Footer />
    </div>
  );
}