import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ImageSlot from "../components/ImageSlot";
import { STORIES } from "../data/stories";
import { IMAGES } from "../lib/images";

export default function Story() {
  const { slug } = useParams();
  const story = STORIES.find((s) => s.slug === slug) ?? STORIES[0];

  return (
    <div>
      <Nav />
      <PageHero
        eyebrow="Journal"
        title={story.title}
        texture={story.texture}
        image={story.image}
        label={`${story.title} — cover`}
        height="64vh"
      />

      <section className="px-[5vw]">
        <div className="max-w-[720px] mx-auto py-20">
          <p className="font-serif text-xl leading-relaxed text-[#4a3a34] mb-6">
            <span className="font-display text-4xl text-wine">E</span>very chapter at Israaya begins the same way —
            not with a sketch, but with a feeling. {story.title} started as a single word whispered between two
            designers standing in a courtyard at first light, watching the way sun moved across old sandstone.
          </p>
          <p className="font-serif text-xl leading-relaxed text-[#4a3a34]">{story.description}</p>
        </div>
      </section>

      <section className="relative h-[60vh] my-8 mx-[5vw] overflow-hidden rounded-sm">
        <ImageSlot texture="t8" image={IMAGES.storyDetail} label={`${story.title} — embroidery detail`} />
      </section>

      <section className="px-[5vw]">
        <div className="max-w-[720px] mx-auto py-20">
          <p className="font-serif text-xl leading-relaxed text-[#4a3a34]">
            Every motif is hand-worked by artisans in small ateliers across India, using resham thread, silver
            pearls and sequins layered by hand over days, not hours. The result is a garment that ages the way
            memory does — softly, and without losing its shape.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
