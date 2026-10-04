import { Link } from "react-router-dom";

const LEGAL_LINKS = [
  "Privacy Policy",
  "Terms & Conditions",
  "Shipping Policy",
  "Return & Exchange Policy",
  "Cancellation Policy",
  "Disclaimer",
];

export default function Footer() {
  return (
    <footer className="bg-black text-ivory px-[5vw] pt-[70px] pb-7">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="font-display text-xl tracking-[0.3em] mb-3">ISRAAYA</div>
          <p className="font-serif italic text-peach text-base">
            Where Gardens Know
            <br />
            What Beauty Means.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] tracking-[0.18em] uppercase text-gold mb-4">Navigate</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-ivory/85">
            <li><Link to="/shop" className="hoverable">Shop</Link></li>
            <li><Link to="/shop" className="hoverable">Collections</Link></li>
            <li><Link to="/about" className="hoverable">Our Story</Link></li>
            <li><Link to="/about" className="hoverable">Our Founder</Link></li>
            <li><Link to="/customer-care" className="hoverable">Bespoke Enquiries</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] tracking-[0.18em] uppercase text-gold mb-4">Customer Care</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-ivory/85">
            <li><Link to="/customer-care#contact" className="hoverable">Contact Us</Link></li>
            <li><Link to="/customer-care#faqs" className="hoverable">FAQs</Link></li>
            <li><Link to="/customer-care#shipping" className="hoverable">Shipping & Delivery</Link></li>
            <li><Link to="/customer-care#returns" className="hoverable">Returns & Exchanges</Link></li>
            <li><Link to="/customer-care#size-guide" className="hoverable">Size Guide</Link></li>
            <li><Link to="/customer-care#care-guide" className="hoverable">Care Guide</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] tracking-[0.18em] uppercase text-gold mb-4">Stay in the Story</h4>
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent border-0 border-b border-ivory/40 text-ivory placeholder-ivory/50 py-2 text-sm w-full outline-none mb-3.5 hoverable"
          />
          <p className="font-serif italic text-sm mb-4">New chapters, before anyone else.</p>
          <div className="flex flex-col gap-1.5 text-sm text-ivory/85">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hoverable">Instagram</a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="hoverable">WhatsApp</a>
            <a href="mailto:hello@israaya.com" className="hoverable">Email</a>
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/15 pt-5 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-ivory/60 mb-4">
        {LEGAL_LINKS.map((l) => (
          <Link key={l} to="/customer-care" className="hoverable hover:text-ivory/90 transition-colors">
            {l}
          </Link>
        ))}
      </div>
      <div className="border-t border-ivory/15 pt-5 flex flex-wrap justify-between gap-2.5 text-[11px] text-ivory/60">
        <span>&copy; {new Date().getFullYear()} Israaya India. All rights reserved.</span>
        <span>Instagram &middot; WhatsApp</span>
      </div>
    </footer>
  );
}
