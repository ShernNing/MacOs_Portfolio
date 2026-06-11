import { locations, socials } from "#constants";
import React from "react";

// Compact, scrollable fallback for small screens, where the desktop
// experience (#home, Dock) is hidden. Derives its cards from the same
// WORK_LOCATION data that powers Finder, so it never goes stale.
const projects = (locations.work?.children ?? []).map((folder) => {
  const find = (predicate) => folder.children?.find(predicate);
  const about = find((c) => c.fileType === "txt");
  const live = find((c) => c.name === "Live Site");
  const source = find((c) => c.name === "Source Code");
  const preview = find((c) => c.fileType === "img");

  return {
    id: folder.id,
    name: folder.name,
    blurb: about?.description?.[0] ?? "",
    image: preview?.imageUrl,
    live: live?.href,
    source: source?.href,
  };
});

const pill =
  "px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-sm text-white";

const MobileHome = () => (
  <section
    className='sm:hidden fixed inset-0 z-[2000] overflow-y-auto bg-cover bg-center'
    style={{ backgroundImage: "url(/images/wallpaper.jpg)" }}
  >
    <div className='min-h-full bg-black/45 px-5 py-10 flex flex-col gap-8'>
      <header className='text-white'>
        <h1 className='text-3xl font-bold'>Shern Ning Tan</h1>
        <p className='text-white/80 mt-1'>
          Front-End Developer - React, Next.js, AWS
        </p>
        <div className='flex flex-wrap gap-3 mt-4'>
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.link}
              target='_blank'
              rel='noopener noreferrer'
              className={pill}
            >
              {s.text}
            </a>
          ))}
          <a href='/files/Shern Ning Tan Resume.pdf' download className={pill}>
            Resume
          </a>
        </div>
      </header>

      <p className='text-white/70 text-sm leading-relaxed'>
        The full portfolio is an interactive macOS desktop experience with
        folders, windows, a dock, the lot. It needs a bigger screen, so here's
        the quick tour instead.
      </p>

      <ul className='flex flex-col gap-5'>
        {projects.map((p) => (
          <li
            key={p.id}
            className='rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/15'
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                className='w-full h-40 object-cover object-top'
                loading='lazy'
              />
            )}
            <div className='p-4 text-white'>
              <h2 className='text-lg font-semibold'>{p.name}</h2>
              <p className='text-sm text-white/75 mt-1 leading-relaxed'>
                {p.blurb}
              </p>
              <div className='flex gap-4 mt-3'>
                {p.live && (
                  <a
                    className='text-sm underline underline-offset-4'
                    href={p.live}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Live site
                  </a>
                )}
                {p.source && (
                  <a
                    className='text-sm underline underline-offset-4'
                    href={p.source}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Source code
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <footer className='text-white/60 text-xs pb-6'>
        Visit on a desktop for the full macOS experience.
      </footer>
    </div>
  </section>
);

export default MobileHome;
