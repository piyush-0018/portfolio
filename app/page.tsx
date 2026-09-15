import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import Orbit from "./components/orbit";
import Chat, { AskButton } from "./components/chat";
import {
  HeroRole,
  LocalTime,
  MagneticLink,
  Navigation,
  Reveal,
} from "./components/motion";
import {
  achievements,
  certifications,
  profile,
  projects,
  skills,
} from "./lib/resume";

const section = "mx-auto max-w-[1240px] px-6 md:px-16";
const label = "text-xs uppercase tracking-wide text-black/50";

export default function Home() {
  return (
    <main id="top">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-4"
      >
        Skip to projects
      </a>
      <Navigation />
      <section
        aria-label="Introduction"
        className="portfolio-hero relative h-svh min-h-[640px] overflow-hidden bg-[#999d9e] md:min-h-[720px]"
      >
        {profile.portrait && (
          <Image
            src={profile.portrait}
            alt="Piyush Mandal"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
          />
        )}
        <div className="absolute left-0 top-[44%] z-10 flex items-center gap-7 rounded-r-full bg-foreground py-4 pl-6 pr-4 text-white md:gap-10 md:pl-12">
          <p className="text-sm leading-[1.2] md:text-base">
            Located
            <br />
            in India
          </p>
          <div className="h-14 w-14 rounded-full bg-[#999d9e] md:h-16 md:w-16">
            <Orbit />
          </div>
        </div>
        <HeroRole />
        <h1 className="sr-only">
          Piyush Mandal — Computer Science undergraduate, full-stack and AI
          developer
        </h1>
        <div
          aria-hidden="true"
          className="absolute bottom-[5%] left-0 z-10 w-full select-none text-[24vw] leading-[1.05] tracking-[-.055em] text-white md:text-[20vw]"
        >
          <div className="hero-name-track flex w-max whitespace-nowrap">
            <span className="shrink-0 pr-[6vw]">Piyush Mandal —</span>
            <span className="shrink-0 pr-[6vw]">Piyush Mandal —</span>
          </div>
        </div>
      </section>

      <section id="about" className={`${section} py-24 md:py-40`}>
        <Reveal className="grid gap-12 md:grid-cols-[1.65fr_1fr] md:gap-24">
          <h2 className="text-[clamp(1.9rem,3.25vw,3rem)] leading-[1.35] tracking-[-.025em]">
            Building full-stack applications with thoughtful interfaces and
            AI-powered features. Connecting what you see to everything behind
            it.
          </h2>
          <div>
            <p className="text-base leading-7 text-black/75">
              I’m a Computer Science undergraduate at Roorkee Institute of
              Technology, working with Python, JavaScript, React and REST APIs.
            </p>
            <div className="mt-8">
              <AskButton />
            </div>
            <MagneticLink
              href="#background"
              className="mt-10 h-36 w-36 bg-foreground text-sm text-white hover:bg-accent md:h-44 md:w-44"
            >
              About me
            </MagneticLink>
          </div>
        </Reveal>
      </section>

      <section id="work" className={`${section} pb-24 md:pb-36`}>
        <h2 className={`${label} mb-9 md:ml-10`}>Selected work</h2>
        <div className="border-b border-black/20">
          {projects.map((project, index) => (
            <details
              key={project.name}
              className="group border-t border-black/20"
            >
              <summary className="grid list-none grid-cols-[1fr_auto] items-center gap-6 py-9 transition-colors marker:hidden hover:text-black/45 md:grid-cols-[1fr_.55fr_auto] md:px-10 md:py-12 [&::-webkit-details-marker]:hidden">
                <div>
                  <h3 className="text-[clamp(2rem,4.4vw,4rem)] font-normal leading-tight tracking-[-.035em] transition-transform duration-300 group-hover:-translate-x-2">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm text-black/55 md:hidden">
                    {project.category}
                  </p>
                </div>
                <div className="hidden text-sm md:block">
                  {project.category}
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 transition-all group-open:rotate-90 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight size={22} aria-hidden="true" />
                  <span className="sr-only">Show project details</span>
                </span>
              </summary>
              <div className="grid gap-8 pb-10 md:grid-cols-[1fr_.65fr] md:px-10">
                <div>
                  <p className="max-w-xl text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-black/65">
                    {project.detail}
                  </p>
                  <p className="mt-5 text-sm text-black/55">
                    0{index + 1}
                    {project.status && ` · ${project.status}`}
                  </p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 border-b border-black/30 pb-1 text-sm transition-colors hover:text-accent"
                    >
                      {project.linkLabel}
                      <ArrowUpRight size={16} aria-hidden="true" />
                      <span className="sr-only">
                        : {project.name} (opens in a new tab)
                      </span>
                    </a>
                  )}
                </div>
                <ul
                  aria-label={`${project.name} technology stack`}
                  className="flex content-start flex-wrap gap-2"
                >
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-black/15 px-3 py-2 text-sm"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <MagneticLink
            href={profile.github}
            className="h-20 border border-black/25 px-10 text-base hover:bg-foreground hover:text-white"
          >
            More on GitHub{" "}
            <ArrowUpRight size={16} className="ml-4" aria-hidden="true" />
          </MagneticLink>
        </div>
      </section>

      <section id="background" className={`${section} pb-24 md:pb-32`}>
        <Reveal>
          <h2 className={`${label} mb-10`}>Experience</h2>
          <div className="grid gap-10 border-t border-black/20 pt-10 md:grid-cols-[.65fr_1fr]">
            <div>
              <h3 className="text-4xl tracking-tight">CodSoft</h3>
              <p className="mt-3 text-black/65">Web Development Intern</p>
              <p className="mt-4 text-sm text-black/55">2025 · Remote</p>
            </div>
            <ul className="space-y-4 text-base leading-7 text-black/75">
              <li>
                Worked on HTML, CSS and JavaScript interfaces, with an emphasis
                on responsive design and usability.
              </li>
              <li>
                Built and refined reusable UI structures while strengthening
                practical frontend development skills.
              </li>
              <li>
                Used Git-based workflows for version control and project
                organization.
              </li>
            </ul>
          </div>
          <h2 className={`${label} mb-10 mt-20`}>The toolkit</h2>
          <div className="grid gap-x-12 gap-y-10 border-t border-black/20 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <h3 className="mb-4 text-xl tracking-tight">{group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-black/15 px-3 py-1.5 text-sm text-black/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className={`${section} pb-24 md:pb-32`}>
        <Reveal className="grid gap-16 md:grid-cols-2">
          <div>
            <h2 className={`${label} mb-10`}>Achievements</h2>
            {achievements.map((item) => (
              <div key={item.title} className="border-t border-black/20 py-6">
                <p className="text-xs text-black/55">{item.date}</p>
                <h3 className="mt-2 text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-black/70">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
          <div>
            <h2 className={`${label} mb-10`}>Certifications</h2>
            {certifications.map((item) => (
              <div key={item.title} className="border-t border-black/20 py-5">
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/65">
                  {item.issuer}
                  {item.date && ` · ${item.date}`}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className={`${section} pb-28 md:pb-40`}>
        <Reveal>
          <h2 className={`${label} mb-10`}>Education</h2>
          <div className="max-w-3xl border-t border-black/20 pt-8">
            <h3 className="text-2xl tracking-tight md:text-3xl">
              Roorkee Institute of Technology
            </h3>
            <p className="mt-3 text-black/70">
              B.Tech · Computer Science & Engineering
            </p>
            <p className="mt-4 text-sm text-black/55">
              August 2023 — June 2027 · Roorkee, Uttarakhand
            </p>
          </div>
          <a
            href="/piyush-mandal-resume.pdf"
            download
            className="mt-10 inline-flex items-center gap-3 border-b border-black/30 pb-2 text-sm hover:text-accent"
          >
            Download résumé <Download size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </section>

      <footer
        id="contact"
        className="relative bg-foreground pb-24 pt-24 text-white md:pb-10 md:pt-36"
      >
        <div className={section}>
          <div className="flex items-start justify-between">
            <h2 className="text-[clamp(3rem,7vw,6.5rem)] leading-[1.1] tracking-[-.04em]">
              Let’s work
              <br />
              together
            </h2>
            <ArrowDownRight
              size={40}
              strokeWidth={1}
              className="mt-4 mr-6"
              aria-hidden="true"
            />
          </div>
          <div className="relative mb-14 mt-20 h-px bg-white/20 md:mt-24">
            <MagneticLink
              href={`mailto:${profile.email}`}
              className="absolute right-4 -top-16 h-32 w-32 bg-accent text-sm text-white hover:bg-[#3345ca] md:right-20 md:-top-20 md:h-40 md:w-40"
            >
              Get in touch
            </MagneticLink>
          </div>
          <div className="flex flex-col items-start gap-4 pt-12 sm:flex-row md:pt-16">
            <MagneticLink
              href={`mailto:${profile.email}`}
              className="min-h-20 max-w-full border border-white/30 px-6 text-sm hover:bg-accent md:px-10 md:text-base"
            >
              {profile.email}
            </MagneticLink>
            <MagneticLink
              href="tel:+919835612855"
              className="min-h-20 border border-white/30 px-8 text-sm hover:bg-accent md:text-base"
            >
              {profile.phone}
            </MagneticLink>
          </div>
        </div>
        <div className="mt-24 flex flex-wrap items-end justify-between gap-10 px-6 md:px-12">
          <div className="flex gap-10">
            <div>
              <p className="mb-4 text-xs uppercase text-white/45">Version</p>
              <p className="text-sm">2026 © Edition</p>
            </div>
            <div>
              <p className="mb-4 text-xs uppercase text-white/45">Local time</p>
              <p className="text-sm">
                <LocalTime />
              </p>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase text-white/45">Socials</p>
            <div className="flex gap-7 text-sm">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Chat />
    </main>
  );
}
