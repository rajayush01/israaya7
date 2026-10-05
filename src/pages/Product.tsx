import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ImageSlot from "../components/ImageSlot";
import { PRODUCTS } from "../data/products";
import { productDetail } from "../lib/images";

const ACCORDION: { title: string; body: (p: (typeof PRODUCTS)[number]) => string }[] = [
  { title: "The Story", body: (p) => p.story },
  {
    title: "Fabric & Composition",
    body: (p) =>
      `Kurta — ${p.fabric.kurta}. Dupatta — ${p.fabric.dupatta}. Bottom — ${p.fabric.bottom}.`,
  },
  {
    title: "Wash Care",
    body: () =>
      "Dry clean only. Colour may vary slightly due to the handmade nature of this piece. For detailed care, see our Care Guide.",
  },
  {
    title: "Customization",
    body: () =>
      "Every Israaya piece is made to order and open to customization, from sizing to small design changes. Reach out to us on WhatsApp or email to personalize your piece or request faster delivery for an upcoming event.",
  },
  {
    title: "Shipping & Delivery",
    body: () =>
      "Made to order and shipped both within India and internationally. Standard delivery is 15–20 days from order confirmation, with international orders taking slightly longer depending on destination.",
  },
];

export default function Product() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug) ?? PRODUCTS[0];
  const [openIndex, setOpenIndex] = useState(0);
  const complementary = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div>
      <Nav />

      <section className="px-[5vw] pt-[130px] pb-[min(10vw,120px)]">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-[70px] items-start">
          <div>
            {product.gallery.map((img, i) => ({
              texture: i % 2 ? product.altTexture : product.texture,
              image: img,
            })).map((v, i) => (
              <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4">
                <ImageSlot texture={v.texture} image={v.image} label={`${product.name} — view ${i + 1}`} priority={i === 0} sizes="(min-width:768px) 55vw, 100vw" />
              </div>
            ))}
          </div>

          <div className="md:sticky md:top-[110px]">
            <div className="text-[11px] tracking-[0.14em] uppercase text-wine mb-2.5">From the {product.chapter}</div>
            <h1 className="font-serif text-[30px] md:text-[44px] mb-1.5">{product.name}</h1>
            <div className="text-[13px] uppercase tracking-[0.1em] text-[#8a7a70] mb-4">{product.setType}</div>
            <div className="text-lg text-wine mb-6">{product.price}</div>

            <div className="flex flex-wrap gap-x-10 gap-y-3 mb-8 border-y border-espresso/15 py-5">
              <div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#8a7a70] mb-1">Color</div>
                <div className="text-sm">{product.color}</div>
              </div>
              <div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#8a7a70] mb-1">Size</div>
                <div className="text-sm">{product.sizeRange}</div>
              </div>
            </div>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center py-4 bg-espresso text-ivory tracking-[0.18em] uppercase text-xs mb-3 hover:bg-wine transition-colors hoverable"
            >
              Enquire to Order — WhatsApp
            </a>
            <p className="text-[11px] text-[#8a7a70] text-center mb-9 leading-relaxed">
              Made to order · 15–20 days · custom measurements on request
            </p>

            <div className="border-t border-espresso/15">
              {ACCORDION.map((item, i) => (
                <div key={item.title} className="border-b border-espresso/15">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="w-full flex justify-between py-4.5 text-xs tracking-[0.1em] uppercase hoverable"
                  >
                    {item.title}
                    <span>{openIndex === i ? "—" : "+"}</span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-400 font-serif text-base text-[#4a3a34] leading-relaxed"
                    style={{ maxHeight: openIndex === i ? 400 : 0, paddingBottom: openIndex === i ? 18 : 0 }}
                  >
                    {item.body(product)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[640px] mx-auto mb-12 text-center px-[5vw]">
        <div className="text-[11px] tracking-[0.28em] uppercase text-wine mb-4">The Story</div>
        <p className="font-serif italic text-xl md:text-2xl text-[#4a3a34]">"{product.story.split(". ")[0]}."</p>
      </section>

      <section className="relative h-[70vh]">
        <ImageSlot texture={product.altTexture} image={productDetail(PRODUCTS.indexOf(product))} label={`${product.name} — embroidery detail`} />
      </section>

      <section className="px-[5vw] py-[min(10vw,120px)]">
        <div className="text-center mb-10">
          <h2 className="font-display text-[30px] md:text-[46px]">Complete the Story</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {complementary.map((p) => (
            <Link key={p.slug} to={`/product/${p.slug}`} className="group block hoverable">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-3.5">
                <ImageSlot texture={p.texture} image={p.image} label={p.name} className="transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="font-serif text-lg">{p.name}</div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-[#8a7a70] mt-1.5">{p.setType}</div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
