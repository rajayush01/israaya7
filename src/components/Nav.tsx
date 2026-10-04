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

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const SearchIcon = () => (
  <svg {...iconProps}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const HeartIcon = () => (
  <svg {...iconProps}>
    <path d="M12 20s-7-4.4-9-9.2C1.8 7.6 3.6 4.5 6.8 4.5c2 0 3.5 1.1 5.2 3 1.7-1.9 3.2-3 5.2-3 3.2 0 5 3.1 3.8 6.3C19 15.6 12 20 12 20Z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg {...iconProps}>
    <path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.5L3 21Z" />
    <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-1.9-1.300-2.300-2.300l.8-1-1-2L9 8.500Z" />
  </svg>
);

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
          className={`pointer-events-auto mx-auto max-w-7xl rounded-full border backdrop-blur-md transition-all duration-500 grid grid-cols-[1fr_auto_1fr] items-center h-16 md:h-20 px-5 md:px-10 ${
            isTransparent
              ? "bg-ivory/10 border-ivory/25 text-ivory"
              : "bg-ivory/90 border-espresso/10 text-espresso shadow-[0_8px_30px_-12px_rgba(44,33,29,0.3)]"
          }`}
        >
          {/* left: links (desktop) / menu button (mobile + tablet) */}
          <div className="justify-self-start">
            <div className="hidden lg:flex gap-6 xl:gap-8 text-xs tracking-[0.12em] uppercase">
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
            <button
              className="lg:hidden text-[11px] tracking-[0.2em] uppercase"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              Menu
            </button>
          </div>

          {/* center: logo */}
          <Link to="/" aria-label="Israaya home" className="flex items-center justify-center">
            <img
              src={logo}
              alt="Israaya Logo"
              className="h-9 md:h-12 w-auto object-contain select-none"
              draggable={false}
            />
          </Link>

          {/* right: icons */}
          <div className="justify-self-end flex items-center gap-3 md:gap-5">
            <button type="button" aria-label="Search" className="hoverable">
              <SearchIcon />
            </button>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="hoverable"
            >
              <WhatsAppIcon />
            </a>
            <button type="button" aria-label="Wishlist" className="hoverable">
              <HeartIcon />
            </button>
          </div>
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