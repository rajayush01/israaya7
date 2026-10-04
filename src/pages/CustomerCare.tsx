import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { IMAGES } from "../lib/images";

const SECTIONS: { id: string; title: string; body: string }[] = [
  {
    id: "contact",
    title: "Contact Us",
    body: "Reach us on WhatsApp for the fastest response, or write to us by email — we're happy to help with sizing, customization, order status or anything else. Instagram DMs work too.",
  },
  {
    id: "faqs",
    title: "FAQs",
    body: "Every piece is made to order, so timelines, sizing and customization questions are best answered directly by our team — message us on WhatsApp or email and we'll walk you through it.",
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    body: "Made to order and shipped both within India and internationally. Standard delivery is 15–20 days from order confirmation, with international orders taking slightly longer depending on destination.",
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    body: "Because every piece is made to order specifically for you, our returns and exchanges process differs from ready-to-wear. Reach out to our team and we'll guide you through what's possible for your order.",
  },
  {
    id: "cancellation",
    title: "Cancellation Policy",
    body: "As production begins once an order is confirmed, cancellation windows are limited. Contact us as soon as possible after placing an order if you need to make a change.",
  },
  {
    id: "size-guide",
    title: "Size Guide",
    body: "Our pieces are offered across an extended size range — typically XS to 6XL or 7XL depending on the style — with custom measurements available on request for the most precise fit.",
  },
  {
    id: "care-guide",
    title: "Care Guide",
    body: "Dry clean only. Store away from direct sunlight and handle embroidered areas with care. Colour may vary slightly piece to piece, a natural result of the handmade dyeing and embroidery process.",
  },
  {
    id: "bespoke",
    title: "Bespoke Enquiries",
    body: "Looking for something entirely your own — a custom silhouette, colourway or embroidery detail? Write to us with your vision and our team will get back to you about what's possible.",
  },
];

export default function CustomerCare() {
  const [openId, setOpenId] = useState<string | null>("contact");

  return (
    <div>
      <Nav />
      <PageHero
        eyebrow="We're Here to Help"
        title="Customer Care"
        texture="t3"
        image={IMAGES.careHero}
        label="Customer Care hero"
      />

      <section className="px-[5vw] py-[min(10vw,120px)] max-w-[760px] mx-auto">
        <div className="border-t border-espresso/15">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id} className="border-b border-espresso/15 scroll-mt-[110px]">
              <button
                onClick={() => setOpenId(openId === s.id ? null : s.id)}
                className="w-full flex justify-between items-center py-6 text-left hoverable"
              >
                <span className="font-serif text-lg md:text-xl">{s.title}</span>
                <span className="text-xl text-wine">{openId === s.id ? "—" : "+"}</span>
              </button>
              <div
                className="overflow-hidden transition-all duration-400 font-serif text-base text-[#4a3a34] leading-relaxed"
                style={{ maxHeight: openId === s.id ? 240 : 0, paddingBottom: openId === s.id ? 24 : 0 }}
              >
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-espresso text-ivory text-center px-[5vw] py-[min(10vw,110px)]">
        <div className="text-[11px] tracking-[0.28em] uppercase text-gold mb-4">Still Have Questions?</div>
        <h2 className="font-display text-[28px] md:text-[44px] mb-8">We're a Message Away.</h2>
        <div className="flex justify-center gap-8 text-sm tracking-[0.08em] uppercase">
          <a href="https://wa.me/" target="_blank" rel="noreferrer" className="border-b border-ivory/40 pb-1 hoverable hover:border-ivory transition-colors">
            WhatsApp
          </a>
          <a href="mailto:hello@israaya.com" className="border-b border-ivory/40 pb-1 hoverable hover:border-ivory transition-colors">
            Email
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="border-b border-ivory/40 pb-1 hoverable hover:border-ivory transition-colors">
            Instagram
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
