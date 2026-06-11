const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

// Each post: { id, date, title, image, link } — Safari shows "Coming Soon" while empty
const blogPosts = [];

const techStack = [
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Context API",
      "Custom Hooks",
      "Data Caching",
      "Performance Optimization"
    ],
  },
  {
    category: "Testing & Security",
    items: [
      "Jest",
      "React Testing Library",
      "Secure API Consumption"
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      "AWS (EC2, S3, CloudFront, CloudSearch)",
      "Vercel",
      "CI/CD"
    ],
  },
  {
    category: "Media & Native APIs",
    items: [
      "Live Stream/Podcast Integration",
      "Native Web APIs",
      "Ad-Tech",
      "Cross-Browser Compatibility"
    ],
  },
  {
    category: "State & Data",
    items: [
      "RESTful API Integration",
      "Strapi (Legacy Migration)",
      "Firebase",
      "Webhooks"
    ],
  },
  {
    category: "Design & UI",
    items: [
      "Tailwind CSS",
      "SCSS",
      "Responsive Component Architecture",
      "Figma"
    ],
  },
  {
    category: "Dev Tools",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Vercel",
      "Docker"
    ],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/ShernNing",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/shern-ning-tan-942527106/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.jpg",
  },
  {
    id: 2,
    img: "/images/gal2.jpg",
  },
  {
    id: 3,
    img: "/images/gal3.jpg",
  },
  {
    id: 4,
    img: "/images/gal4.jpg",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    {
      id: "chordvault",
      name: "ChordVault",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-10",
      windowPosition: "top-[10vh] right-10",
      children: [
        {
          id: 1,
          name: "About.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-10 left-10",
          subtitle: "ChordVault — Personal Chord Sheet Manager for Musicians",
          description: [
            "A searchable, transposable library for every song you play — available on any device, even offline.",
            "",
            "The Problem:",
            "Musicians hoard chord sheets across paper binders, Word docs, screenshots and notes apps. Finding the right version of a song mid-rehearsal — in the right key — is slow, and none of it works reliably offline on stage.",
            "",
            "What it does:",
            "• Library of chord sheets with search, tags and key filtering",
            "• One-tap transposition to any key with musically correct enharmonic spelling",
            "• Setlist builder with drag-and-drop song ordering for gigs and rehearsals",
            "• Import songs from DOCX, export sheets to PDF and DOCX",
            "• Chord voicings reference for guitar",
            "• Installable PWA — previously viewed songs stay readable with no connection",
            "",
            "Built with:",
            "React 18 + Vite, Tailwind CSS, Supabase (Postgres + Auth), tonal (music theory engine), Tone.js, @dnd-kit, jsPDF + html2canvas, docx + mammoth, vite-plugin-pwa + Workbox. Hosted on Vercel — runs on free tiers end to end.",
            "",
            "Challenges overcome:",
            "• Transposition is music theory, not string replacement — used the tonal engine to keep enharmonics correct (F# vs Gb) across every key",
            "• Parsing messy real-world DOCX chord sheets into clean, structured song data on import",
            "• Offline-first architecture: Supabase as the source of truth with a localStorage cache, so a gig never depends on venue Wi-Fi",
            "• Pixel-faithful PDF export of formatted chord sheets via html2canvas + jsPDF",
          ],
        },
        {
          id: 2,
          name: "Live Site",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://chordvault-ten.vercel.app/",
          position: "top-10 left-60",
        },
        {
          id: 3,
          name: "Preview.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/projects/chordvault.png",
          position: "top-48 left-10",
        },
      ],
    },
    {
      id: "workout-tracker",
      name: "Workout Tracker",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-60",
      windowPosition: "top-[28vh] right-10",
      children: [
        {
          id: 1,
          name: "About.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-10 left-10",
          subtitle: "Workout Tracker — Your Personal Strength Journal",
          description: [
            "Track progress, stay consistent, get stronger.",
            "",
            "The Problem:",
            "Gym logs in a notes app can't compute progression, and paper can't chart it. Tracking sets between exercises needs to be near-instant, or it doesn't happen at all.",
            "",
            "What it does:",
            "• Log every set, rep and weight with a UI built for one-handed use mid-workout",
            "• Smart daily workout recommendations based on training history",
            "• Full-body warm-up day included in the programme",
            "• Personal bests detected and tracked automatically",
            "• Complete session history with progress charts",
            "",
            "Built with:",
            "React + Vite, Tailwind CSS, Supabase (Auth + Postgres), Recharts for progress visualisation, Framer Motion, @dnd-kit, vite-plugin-pwa + Workbox. Hosted on Vercel.",
            "",
            "Challenges overcome:",
            "• Designing a logging flow fast enough to use between sets — minimal taps, large touch targets, sensible defaults from the previous session",
            "• Computing personal bests across the full training history without slowing down the UI",
            "• Making it installable as a PWA so it feels like a native app at the gym",
          ],
        },
        {
          id: 2,
          name: "Live Site",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://workouttracker-xi.vercel.app/",
          position: "top-10 left-60",
        },
        {
          id: 3,
          name: "Preview.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/projects/workout-tracker.png",
          position: "top-48 left-10",
        },
      ],
    },
    {
      id: "transposeme",
      name: "TransposeMe",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 right-20",
      windowPosition: "top-[46vh] right-10",
      children: [
        {
          id: 1,
          name: "About.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-10 left-10",
          subtitle: "TransposeMe — Shift Pitch & Tempo of Any Audio, Instantly",
          description: [
            "Shift the pitch and tempo of YouTube videos and audio files — locally, instantly.",
            "",
            "The Problem:",
            "Singers and musicians constantly need songs in a different key (or at a slower tempo) to practise. The usual options are a heavyweight DAW round-trip, or online tools that upload your audio to someone else's server.",
            "",
            "What it does:",
            "• Paste a YouTube link or drop in a file — MP3, WAV, FLAC, AAC, M4A, MP4, MOV, WebM, up to 5 GB",
            "• Drag a slider or pick a target key; pitch shifts in real time with tempo preserved",
            "• Automatic key detection for YouTube audio",
            "• Playback position is retained seamlessly while changing keys mid-song",
            "• Download the transposed result",
            "• Also packaged as an Electron desktop app",
            "",
            "Built with:",
            "React + Vite, Tailwind CSS, rubberband-wasm + SoundTouchJS for in-browser pitch shifting, ffmpeg.wasm for decoding, Node.js/Express backend with yt-dlp for YouTube audio extraction, Rubber Band CLI for server-side rendering, Python + Essentia for automatic key detection, Electron, PWA.",
            "",
            "Challenges overcome:",
            "• Real-time, tempo-preserving pitch shifting in the browser using WASM DSP without audible glitches",
            "• Keeping playback position seamless while the user sweeps through keys mid-playback",
            "• Handling multi-gigabyte media files in a web app",
            "• Orchestrating an audio pipeline that spans browser WASM, a Node backend and a Python key-detection service",
          ],
        },
        {
          id: 2,
          name: "Live Site",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://transposeme.vercel.app/",
          position: "top-10 left-60",
        },
        {
          id: 3,
          name: "Preview.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/projects/transposeme.png",
          position: "top-48 left-10",
        },
      ],
    },
    {
      id: "bfm",
      name: "BFM 89.9",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-48 left-10",
      windowPosition: "top-[10vh] right-64",
      children: [
        {
          id: 1,
          name: "About.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-10 left-10",
          subtitle: "BFM 89.9 — Malaysia's Business Radio Station (Professional Work)",
          description: [
            "The official website of BFM 89.9, Malaysia's only independent business radio station — 24/7 live radio, thousands of podcasts and articles across Business, Personal Finance, Current Affairs, Arts & Culture and Health.",
            "",
            "My Role:",
            "Front-End Developer owning the web platform end to end — feature development, performance, infrastructure and CMS migrations for a high-traffic national media site.",
            "",
            "Built with:",
            "Next.js + React, SCSS, Firebase, Swiper, Strapi CMS, AWS (EC2, S3, CloudFront, CloudSearch).",
            "",
            "Challenges overcome:",
            "• A persistent global live-stream and podcast player that survives page navigation without dropping audio",
            "• Large-scale Strapi CMS migration (v3 to v5) with zero editorial downtime",
            "• Search across a massive podcast and article archive with AWS CloudSearch",
            "• High-traffic performance: caching, CDN strategy and efficient re-render cycles",
            "• Ad-tech integration and cross-browser audio playback quirks",
          ],
        },
        {
          id: 2,
          name: "Live Site",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://www.bfm.my/",
          position: "top-10 left-60",
        },
        {
          id: 3,
          name: "Preview.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/projects/bfm.png",
          position: "top-48 left-10",
        },
      ],
    },
    {
      id: "caijin",
      name: "Caijin 财今",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-48 left-60",
      windowPosition: "top-[28vh] right-64",
      children: [
        {
          id: 1,
          name: "About.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-10 left-10",
          subtitle: "Caijin 财今 — Chinese-Language Business Media Platform (Professional Work)",
          description: [
            "BFM's Chinese-language financial media platform — podcasts and articles across 商业 Business, 股市 Markets, 创业 Entrepreneurship, 金融 Finance and 新闻 News, serving Malaysia's Chinese-speaking business audience.",
            "",
            "My Role:",
            "Front-End Developer leading the 2025 rebuild of the platform onto a modern, typed stack.",
            "",
            "Built with:",
            "Next.js (App Router) + TypeScript, Tailwind CSS, Radix UI primitives with shadcn-style components, Zustand, Embla Carousel, html-react-parser + isomorphic-dompurify, Biome.",
            "",
            "Challenges overcome:",
            "• Rebuilding a legacy site onto Next.js + TypeScript while the publication kept running",
            "• Rendering CMS-authored HTML safely — sanitised with DOMPurify before parsing into React",
            "• Bilingual UI and typography tuned for Chinese-language content",
            "• Keeping a carousel-heavy, media-rich homepage fast with server rendering and image optimisation",
          ],
        },
        {
          id: 2,
          name: "Live Site",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://www.caijin.my/",
          position: "top-10 left-60",
        },
        {
          id: 3,
          name: "Preview.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/projects/caijin.png",
          position: "top-48 left-10",
        },
      ],
    },
    {
      id: "managerpro",
      name: "ManagerPro",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-48 right-20",
      windowPosition: "top-[46vh] right-64",
      children: [
        {
          id: 1,
          name: "About.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-10 left-10",
          subtitle: "BFM ManagerPro — Radio Station Management System (Professional Work)",
          description: [
            "The internal content management system that powers BFM's publishing — where producers and editors manage podcasts, episodes, articles and station content. (Internal tool — the live site shows the login gate.)",
            "",
            "The Problem:",
            "A radio station's editorial workflow — uploading episodes, writing show notes, scheduling content, managing images — needs one purpose-built tool instead of a patchwork of generic CMS screens.",
            "",
            "Built with:",
            "Nuxt 2 (Vue 2), @nuxtjs/auth, Tailwind CSS, TipTap rich-text editor, VeeValidate, vue-cropperjs, Dropzone uploads, vue-multiselect.",
            "",
            "Challenges overcome:",
            "• Authenticated, role-aware workflows for the whole editorial team",
            "• A rich-text editing experience with embedded images and links built on TipTap",
            "• Media upload pipeline with in-browser image cropping before upload",
            "• Validation-heavy publishing forms that catch errors before content goes live",
            "• A v3 rebuild of the platform is currently in progress",
          ],
        },
        {
          id: 2,
          name: "Live Site",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://managerpro-v2.vercel.app/",
          position: "top-10 left-60",
        },
        {
          id: 3,
          name: "Preview.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/projects/managerpro.png",
          position: "top-48 left-10",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/gal2.jpg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/gal3.jpg",
    },
    {
      id: 3,
      name: "me-2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/gal4.jpg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/gal2.jpg",
      description: [
        "Shern Ning Tan | Front-End Developer & Business Leader",
        "Date of Birth: 18/04/1993",
        "",
        "Professional Summary:",
        "An autonomous Front-End Developer with a background in Finance and Business Directorship. Expert in React and Next.js, specializing in high traffic media platforms and complex system migrations. Passionate about building resilient, testable React architecture that prioritizes data integrity and efficient re-rendering cycles. Proven ability to operate in ‘no manager’ environments, taking full ownership of project lifecycles, from large scale Strapi migrations (v3 to v5) to optimizing cloud infrastructure for global scalability.",
        "",

        "Technical Skills:",
        "• Expert React: Custom Hooks, Context API, Data Caching and Performance Optimization.",
        "• Testing & Security: Unit Testing (Jest, React Testing Library), focusing on edge case user interactions and secure API consumption.",
        "• Cloud & Infrastructure: AWS (EC2, S3, CloudFront, CloudSearch), Vercel and CI/CD.",
        "• Media & Native APIs: Global live stream/podcast player integration, native web APIs (Localstorage, Event listeners), ad-tech implementation and cross browser compatibility.",
        "• State & Data: RESTful API integration, Strapi (Legacy Migration), Firebase and Webhooks.",
        "• Design & UI: Tailwind CSS, SCSS, Responsive component architecture and Figma.",
        "",
        "Let's connect to discuss how I can bring value to your team!",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.jpg",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.jpg",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
