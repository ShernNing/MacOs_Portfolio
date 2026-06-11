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
    // Add project folders here. Template:
    // {
    //   id: 5,
    //   name: "My Project",
    //   icon: "/images/folder.png",
    //   kind: "folder",
    //   position: "top-10 left-5",          // icon position inside Finder
    //   windowPosition: "top-[5vh] left-5", // desktop icon position
    //   children: [
    //     { id: 1, name: "About.txt", icon: "/images/txt.png", kind: "file", fileType: "txt", position: "top-5 left-10", description: ["..."] },
    //     { id: 2, name: "Live site", icon: "/images/safari.png", kind: "file", fileType: "url", href: "https://example.com", position: "top-10 right-20" },
    //     { id: 3, name: "Preview.png", icon: "/images/image.png", kind: "file", fileType: "img", imageUrl: "/images/my-project.png", position: "top-52 right-80" },
    //   ],
    // },
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
