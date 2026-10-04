import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const addHover = () => el.classList.add("hover");
    const removeHover = () => el.classList.remove("hover");

    const attach = () => {
      document.querySelectorAll("a, button, .hoverable").forEach((node) => {
        node.addEventListener("mouseenter", addHover);
        node.addEventListener("mouseleave", removeHover);
      });
    };

    window.addEventListener("mousemove", move);
    attach();

    // Re-attach on route changes / DOM updates
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, []);

  return <div ref={ref} className="cursor-dot" />;
}
