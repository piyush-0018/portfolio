"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Menu, X } from "lucide-react";
import { profile } from "../lib/resume";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.55);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-8 text-white md:px-12">
        <a href="#top" className="group flex items-center gap-1 text-base">
          <span className="inline-block transition-transform duration-500 group-hover:rotate-180">
            ©
          </span>{" "}
          Code by Piyush
        </a>
        <nav
          aria-label="Main navigation"
          className="flex gap-6 text-base md:gap-9"
        >
          {["Work", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative after:absolute after:-bottom-3 after:left-1/2 after:h-1 after:w-1 after:rounded-full after:bg-white after:opacity-0 after:transition-opacity hover:after:opacity-100"
            >
              {item}
            </a>
          ))}
        </nav>
      </header>
      <button
        ref={trigger}
        onClick={() => drawer.current?.showModal()}
        aria-label="Open navigation"
        aria-haspopup="dialog"
        className={`fixed right-6 top-6 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-white transition-all duration-300 md:right-10 md:top-8 ${scrolled ? "scale-100" : "pointer-events-none scale-0"}`}
        tabIndex={scrolled ? 0 : -1}
      >
        <Menu size={22} />
      </button>
      <dialog
        ref={drawer}
        aria-labelledby="navigation-title"
        onClose={() => trigger.current?.focus()}
        className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-[min(520px,100vw)] max-w-none bg-foreground px-10 py-12 text-white backdrop:bg-black/30 md:px-20"
      >
        <button
          onClick={() => drawer.current?.close()}
          aria-label="Close navigation"
          className="absolute right-6 top-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent"
        >
          <X size={22} />
        </button>
        <div className="flex min-h-full flex-col justify-center">
          <h2
            id="navigation-title"
            className="mb-8 border-b border-white/20 pb-6 text-xs uppercase tracking-wide text-white/50"
          >
            Navigation
          </h2>
          <nav aria-label="Expanded navigation" className="space-y-5">
            {["Home", "Work", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={item === "Home" ? "#top" : `#${item.toLowerCase()}`}
                onClick={() => drawer.current?.close()}
                className="block text-5xl tracking-tight transition-transform hover:translate-x-3"
              >
                {item}
              </a>
            ))}
          </nav>
          <p className="mb-5 mt-16 text-xs uppercase tracking-wide text-white/50">
            Socials
          </p>
          <div className="flex gap-7 text-sm">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}

export function MagneticLink({
  href,
  children,
  className = "",
  label,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  const link = useRef<HTMLAnchorElement>(null);
  return (
    <a
      ref={link}
      href={href}
      aria-label={label}
      onPointerMove={(event) => {
        if (
          event.pointerType !== "mouse" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (link.current)
          link.current.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.15}px, ${(event.clientY - rect.top - rect.height / 2) * 0.15}px)`;
      }}
      onPointerLeave={() => {
        if (link.current) link.current.style.transform = "";
      }}
      className={`inline-flex items-center justify-center rounded-full transition-[transform,background-color] duration-300 ${className}`}
    >
      {children}
    </a>
  );
}

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = element.current;
    if (!node || node.getBoundingClientRect().top < window.innerHeight) return;
    node.style.opacity = "0";
    node.style.transform = "translateY(32px)";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.style.opacity = "1";
          node.style.transform = "none";
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={element}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${className}`}
    >
      {children}
    </div>
  );
}

export function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);
  return <span>{time || "India"} IST</span>;
}

export function HeroRole() {
  return (
    <div className="absolute right-6 top-[37%] z-10 text-white md:right-[8%] md:top-[32%]">
      <ArrowDownRight
        size={34}
        strokeWidth={1.4}
        className="mb-8 md:mb-14"
        aria-hidden="true"
      />
      <p className="text-[clamp(1.3rem,2.6vw,2.6rem)] leading-[1.3] tracking-[-.04em]">
        Full-stack
        <br />& AI Developer
      </p>
    </div>
  );
}
