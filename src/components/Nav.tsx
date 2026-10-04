import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/ISRAAYA LOGO.svg";

const LINKS = [
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/shop" },
  { label: "Our Story", to: "/about" },
  { label: "Customer Care", to: "/customer-care" },
];

interface NavProps {
  /** When true, nav starts transparent over a hero and transitions on scroll. */
  transparentOnTop?: boolean;
}

export default function Nav({ transparentOnTop = false }: NavProps) {
  const [scrolled, setScrolled] = useState(!transparentOnTop);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!transparentOnTop) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOnTop]);

  const isTransparent = transparentOnTop && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between transition-all duration-500 ${
          isTransparent
            ? "bg-transparent px-[5vw] text-ivory"
            : "bg-ivory/90 backdrop-blur-md  px-[5vw] shadow-[0_1px_0_rgba(44,33,29,0.06)] text-espresso"
        }`}
      >
        <Link to="/" className="font-display text-xl tracking-[0.32em]">
          <img src={logo} alt="Israya Logo" className="h-20"/>
        </Link>

        <div className="hidden md:flex gap-10 text-xs tracking-[0.12em] uppercase">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`reveal-underline ${location.pathname === l.to ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex gap-6 text-xs tracking-[0.08em] uppercase">
          <span className="hoverable">Search</span>
          <a href="https://wa.me/" target="_blank" rel="noreferrer" className="hoverable">
            WhatsApp
          </a>
          <span className="hoverable">Wishlist</span>
        </div>

        <button
          className="md:hidden text-[11px] tracking-[0.2em] uppercase"
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[600] bg-ivory flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-7 right-[5vw] text-[11px] tracking-[0.2em] uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
