import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ImageSlot from "../components/ImageSlot";
import type { TextureKey } from "../lib/textures";
import { IMAGES } from "../lib/images";

const GRID: { texture: TextureKey; image: string; label: string; tall?: boolean }[] = [
  { texture: "t1", image: IMAGES.aboutGallery1, label: "Heritage home exterior", tall: true },
  { texture: "t5", image: IMAGES.aboutGallery2, label: "Craft close-up" },
  { texture: "t8", image: IMAGES.aboutGallery3, label: "Fabric macro" },
  { texture: "t2", image: IMAGES.aboutGallery4, label: "Behind the scenes" },
  { texture: "t3", image: IMAGES.aboutGallery5, label: "Architecture detail" },
];

const VALUES = [
  {
    title: "Built by the hands we build around",
    body: "Israaya exists because of the karigars who make it. Every decision, from technique to timeline, is shaped around giving their craft the space and respect it has always deserved.",
  },
  {
    title: "Made to order, not made to sit",
    body: "Nothing is produced until it is ordered. Every piece is cut, fitted and finished for one person.",
  },
  {
    title: "Time is part of the design",
    body: "Every piece carries the time intention takes to get right, not the time a deadline allows. We build slowly on purpose, because craftsmanship rushed is craftsmanship compromised.",
  },
  {
    title: "Custom made for every body",
    body: "Standard sizing was never the standard here. Every piece is available in a full size range with custom measurements on request, because fit should never be the reason a woman goes without.",
  },
  {
    title: "India on the global stage",
    body: "We build with the belief that Indian craft belongs at the same table as the world's finest maisons, not referenced from a distance but recognised outright.",
  },
  {
    title: "Craft as opportunity",
    body: "Every order supports the women and karigar families behind it, and we are building toward deeper partnerships in education and craft preservation so that opportunity extends further than one order at a time.",
  },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div>
      <Nav />

      <section className="relative flex items-end overflow-hidden" style={{ height: "56vh", minHeight: 380 }}>
        <ImageSlot texture="t9" image={IMAGES.aboutHero} label="About hero — heritage interior">
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 to-transparent" />
        </ImageSlot>
        <div className="relative z-[2] text-ivory px-[5vw] pb-[50px]">
          <h1 className="font-display text-[34px] md:text-[64px] leading-tight">
            Craft, Handled With Care,
            <br />
            Holds Its Own Anywhere.
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-[5vw] py-[min(10vw,120px)] max-w-[720px] mx-auto text-center">
        <FadeIn>
          <div className="text-[11px] tracking-[0.28em] uppercase text-wine mb-4">Our Story</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-[#4a3a34] mb-6">
            Israaya is built on a simple belief, that Indian wear does not have to choose between heritage and
            ease, between occasion and everyday, between tradition and the rest of the world. Conceived to
            reimagine what Indian wear can be for the woman of today, Israaya exists at the intersection of
            craft, comfort and global design sensibility.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="font-serif text-base md:text-lg leading-relaxed text-[#4a3a34]/90">
            Each collection under Israaya exists as its own chapter — a distinct world built around a theme, an
            era or an idea that will never be repeated. No chapter borrows from the one before it; each is
            created once and retired to make space for the next. Every piece begins with karigars practising
            techniques passed down through generations, reimagined through a modern lens. Nothing is mass
            produced — every piece is made to order and hand embroidered only once it is called for, because
            slow fashion is not a limitation but the intended way forward.
          </p>
        </FadeIn>
      </section>

      <section className="px-[5vw]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-4">
          {GRID.map((g) => (
            <div
              key={g.label}
              className={`relative overflow-hidden rounded-sm ${g.tall ? "row-span-2 aspect-auto" : "aspect-[3/4]"}`}
            >
              <ImageSlot texture={g.texture} image={g.image} label={g.label} />
            </div>
          ))}
        </div>
      </section>

      {/* Our Founder */}
      <section className="px-[5vw] py-[min(12vw,140px)] max-w-[760px] mx-auto text-center">
        <FadeIn>
          <div className="text-[11px] tracking-[0.28em] uppercase text-wine mb-4">Our Founder</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="font-serif text-lg md:text-xl leading-relaxed text-[#4a3a34] mb-8">
            Israaya is the work of <span className="italic">Khushi Dang</span>, Founder and Creative Director,
            built from a pull toward Indian craft, fashion and culture that began early and never faded,
            sharpened later by an education in fashion and luxury business between London and Manchester, and
            by a life lived between India and abroad. That movement between worlds became the lens Israaya was
            eventually built through — a way of seeing Indian craftsmanship not as something regional, but as
            something the rest of the world had simply never been given proper access to.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="font-display italic text-2xl md:text-3xl text-wine leading-snug">
            "Indian artists and Indian ideas have shaped the world for centuries without ever being given full
            credit for it. Israaya exists to change that, one piece at a time."
          </p>
        </FadeIn>
      </section>

      {/* Our Philosophy */}
      <div className="bg-espresso text-ivory px-[5vw] py-[min(12vw,140px)]">
        <div className="max-w-[760px] mx-auto text-center">
          <FadeIn>
            <div className="text-[11px] tracking-[0.28em] uppercase text-gold mb-4">Our Philosophy</div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[28px] md:text-[46px] leading-snug mb-8">
              As easy to live in as it is beautiful to look at.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-serif text-base md:text-lg leading-relaxed text-ivory/85 mb-6">
              A silhouette that looks stunning but restricts movement is a failed design, not a finished one.
              So every cut is tested against how it moves, not just how it photographs. Craft comes before
              decoration — we do not add embroidery to fill space or justify a price point. Every technique
              used, zardozi, dori work, resham, beadwork, is chosen because it is the right technique for that
              piece, developed in conversation with the karigars who actually know how to execute it well.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-serif text-base md:text-lg leading-relaxed text-ivory/85">
              Craft, for us, is also livelihood. Every order placed puts income directly into the hands of the
              women and karigar families who make it, and we are actively building the systems to make that
              support go further — from consistent, fair work to skill development that lasts beyond a single
              order.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Our Values */}
      <section className="px-[5vw] py-[min(12vw,140px)]">
        <div className="text-center mb-16">
          <div className="text-[11px] tracking-[0.28em] uppercase text-wine mb-3">Our Values</div>
          <h2 className="font-display text-[30px] md:text-[46px]">What We Build Around</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 max-w-[1100px] mx-auto">
          {VALUES.map((v, i) => (
            <FadeIn key={v.title} delay={(i % 3) * 0.1}>
              <div className="text-wine font-display text-2xl mb-3">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-serif text-lg md:text-xl mb-3">{v.title}</h3>
              <p className="text-sm leading-relaxed text-[#4a3a34]/80">{v.body}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Made in India */}
      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] min-h-[340px]">
          <ImageSlot texture="t4" image={IMAGES.madeInIndia} label="Made in India — artisan workshop">
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
          </ImageSlot>
          <div className="absolute inset-0 z-[2] flex items-end px-[5vw] pb-[50px]">
            <h2 className="font-display text-[30px] md:text-[54px] text-ivory leading-tight">
              Made in India.
              <br />
              Worn Around the World.
            </h2>
          </div>
        </div>
        <div className="px-[5vw] py-[min(10vw,120px)] max-w-[760px] mx-auto text-center">
          <FadeIn>
            <p className="font-serif text-base md:text-lg leading-relaxed text-[#4a3a34]">
              Every Israaya piece is made in India, start to finish, by karigar families who have carried their
              craft across generations — artisans trained not in a single technique but in an entire inherited
              language of embroidery, skills passed down as knowledge rather than instruction, refined over
              years until they become instinct rather than method. Our artisans come from different cities
              across India, each carrying craft shaped by its own region, era and cultural history, so every
              piece draws from a distinct part of the country rather than one single tradition.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="font-serif italic text-lg md:text-xl text-wine mt-8">
              This is India's craft, made by India's hands, for the world.
            </p>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
