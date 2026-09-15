"use client";

import { useEffect, useRef, useState } from "react";

export default function OpeningIntro() {
  const [finished, setFinished] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (finished) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => setFinished(true), 0);
      return () => window.clearTimeout(timer);
    }

    const page = document.querySelector("main");
    const previousOverflow = document.body.style.overflow;
    const previousInert = page?.inert ?? false;
    document.body.style.overflow = "hidden";
    if (page) page.inert = true;

    const animation = overlay.current?.getAnimations()[0];
    animation?.finished.then(() => setFinished(true)).catch(() => {});
    const fallback = window.setTimeout(() => setFinished(true), 2600);

    return () => {
      window.clearTimeout(fallback);
      document.body.style.overflow = previousOverflow;
      if (page) page.inert = previousInert;
    };
  }, [finished]);

  if (finished) return null;

  return (
    <div ref={overlay} className="opening-intro" aria-hidden="true">
      <div className="opening-intro__screen">
        <p className="opening-intro__greeting">
          <span />
          Hello
        </p>
        <div className="opening-intro__curve" />
      </div>
    </div>
  );
}
