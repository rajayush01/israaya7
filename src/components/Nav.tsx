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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOnTop]);

  const isTransparent = transparentOnTop && !scrolled;

  return (
    <>
      <header className="fixed top-3 md:top-5 inset-x-0 z-[500] px-3 md:px-8 pointer-events-none">
        <nav
          className={`pointer-events-auto mx-auto max-w-7xl rounded-full border backdrop-blur-md transition-all duration-500 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] h-16 md:h-20 px-6 md:px-10 ${
            isTransparent
              ? "bg-ivory/10 border-ivory/25 text-ivory"
              : "bg-ivory/90 border-espresso/10 text-espresso shadow-[0_8px_30px_-12px_rgba(44,33,29,0.3)]"
          }`}
        >
          {/* logo */}
          <Link to="/" aria-label="Israaya home" className="justify-self-start flex items-center">
            <img
              src={logo}
              alt="Israaya Logo"
              className="h-9 md:h-12 w-auto object-contain select-none"
              draggable={false}
            />
          </Link>

          {/* center links */}
          <div className="hidden md:flex justify-center gap-10 text-xs tracking-[0.12em] uppercase">
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

          {/* right actions */}
          <div className="hidden md:flex justify-self-end gap-6 text-xs tracking-[0.08em] uppercase">
            <span className="hoverable">Search</span>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="hoverable">
              WhatsApp
            </a>
            <span className="hoverable">Wishlist</span>
          </div>

          {/* mobile toggle */}
          <button
            className="md:hidden text-[11px] tracking-[0.2em] uppercase"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[600] bg-ivory text-espresso flex flex-col items-center justify-center gap-8">
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