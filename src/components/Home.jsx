import { locations } from "#constants";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/Draggable";
import React from "react";

const projects = locations.work?.children ?? [];

// Add About Me (text file), Resume (PDF), and Guide as Home shortcuts
const aboutMeTextFile = locations.about.children.find(
  (item) => item.fileType === "txt",
);
const resumePdfFile = locations.resume.children.find(
  (item) => item.fileType === "pdf",
);

// Guide file data (not in locations, so define here)
const guideTextFile = {
  id: "guide-shortcut",
  name: "Guide.txt",
  icon: "/images/txt.png",
  kind: "file",
  fileType: "txt",
  description: [
    "Welcome to Shern Ning’s macOS Portfolio",
    "────────────────────────────────────────",
    "",
    "This portfolio runs as a fully interactive macOS desktop simulation. Everything you see, windows, the Dock, the Finder, the Navbar, behaves like the real thing. Here’s a quick tour.",
    "",
    "── NAVBAR (top bar) ──────────────────────",
    "",
    "• Navigation links: Jump directly to Projects, Contact, or Resume from the menu bar.",
    "• Live clock: The time display in the top right updates every second.",
    "• Theme toggle: Click the moon/sun icon in the top right to switch between light and dark mode. Your preference is saved and persists across sessions.",
    "",
    "── DESKTOP ───────────────────────────────",
    "",
    "• Drag & drop: Every folder and shortcut on the desktop is draggable, rearrange them just like a real macOS desktop.",
    "• Project folders: Double-click any folder (BFM, ChordVault, TransposeMe, etc.) to open it in Finder.",
    "• Quick-access shortcuts: The About Me, Resume, and this Guide file sit on the left side of the desktop for one-click access.",
    "",
    "── FINDER (Portfolio app) ────────────────",
    "",
    "• Browse projects in the sidebar, click a project tab to switch context.",
    "• Inside each project you’ll find: an About.txt (full project writeup), a Preview image, a Demo video, and links to the Live Site and Source Code where available.",
    "• File types open in their own viewer: .txt opens in the text reader, .png/.webp opens in the image viewer, .mp4 opens in the video player, and URL files launch externally.",
    "",
    "── WINDOWS ───────────────────────────────",
    "",
    "• Traffic-light controls: The red, yellow, and green buttons at the top left of every window close, minimise (hide), or maximise it, exactly like macOS.",
    "• Drag by the title bar to reposition any window freely.",
    "• Multi-window: Open as many windows as you like simultaneously. Click a window to bring it to the front.",
    "",
    "── DOCK (bottom bar) ─────────────────────",
    "",
    "• Portfolio, opens the project Finder.",
    "• Articles, opens the blog reader with long-form project writeups.",
    "• Gallery, opens the photo gallery.",
    "• Contact, opens the contact form to get in touch.",
    "• Skills, opens the Tech Stack terminal view.",
    "• Archive, the Trash (for show).",
    "",
    "── APPS ──────────────────────────────────",
    "",
    "• Articles (Safari): Read in-depth technical posts about project builds, real-time pitch shifting with WASM, CMS migrations, offline-first PWAs, and more.",
    "• Gallery (Photos): A curated photo gallery with sidebar navigation.",
    "• Skills (Terminal): A terminal-styled view listing the full tech stack by category.",
    "• Contact: A form to reach out directly.",
    "• Resume: Opens the CV as an embedded PDF.",
    "• About Me: A text file with a professional summary and skills overview.",
    "",
    "── ANIMATIONS ────────────────────────────",
    "",
    "• Hover over the welcome text on the landing screen, individual letters respond to your cursor position via a variable-font weight animation.",
    "• Windows open and close with smooth transitions powered by GSAP.",
    "",
    "── TIPS ──────────────────────────────────",
    "",
    "• Best experienced on a desktop or laptop browser at full screen.",
    "• All windows support overlapping and free-form positioning, treat it like a real workspace.",
    "• Theme preference (dark/light) persists in localStorage.",
    "",
    "Enjoy the tour!",
  ],
};

// Suppress the click that the browser fires right after a drag ends,
// so dragging a desktop icon doesn't also open it
const wasDragged = (e) => {
  const el = e.currentTarget;
  if (el.dataset.dragged === "true") {
    delete el.dataset.dragged;
    return true;
  }
  return false;
};

const keyboardActivate = (handler) => (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    handler();
  }
};

const Home = () => {
  const setActiveLocation = useLocationStore((s) => s.setActiveLocation);
  const openWindow = useWindowStore((s) => s.openWindow);

  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  // Open About Me text file directly
  const handleOpenAboutMe = () => {
    if (aboutMeTextFile) {
      openWindow("txtfile", aboutMeTextFile);
    }
  };

  // Open Resume PDF directly
  const handleOpenResume = () => {
    openWindow("resume");
  };

  // Open Guide text file directly
  const handleOpenGuide = () => {
    openWindow("txtfile", guideTextFile);
  };

  useGSAP(() => {
    const instances = Draggable.create(".folder", {
      onDragEnd: function () {
        this.target.dataset.dragged = "true";
      },
    });
    return () => instances.forEach((instance) => instance.kill());
  }, []);

  return (
    <section id='home'>
      <ul>
        {/* Project folders */}
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            role='button'
            tabIndex={0}
            onClick={(e) => !wasDragged(e) && handleOpenProjectFinder(project)}
            onKeyDown={keyboardActivate(() => handleOpenProjectFinder(project))}
          >
            <img src='/images/folder.png' alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}

        {/* About Me text file shortcut */}
        {aboutMeTextFile && (
          <li
            key='about-me-shortcut'
            className='group folder top-[38vh] left-[2vw]'
            role='button'
            tabIndex={0}
            onClick={(e) => !wasDragged(e) && handleOpenAboutMe()}
            onKeyDown={keyboardActivate(handleOpenAboutMe)}
            style={{ zIndex: 1 }}
          >
            <img src='/images/txt.png' alt='About Me' />
            <p className='pl-6'>About Me</p>
          </li>
        )}

        {/* Resume PDF shortcut */}
        {resumePdfFile && (
          <li
            key='resume-shortcut'
            className='group folder top-[20vh] left-[2.5vw]'
            role='button'
            tabIndex={0}
            onClick={(e) => !wasDragged(e) && handleOpenResume()}
            onKeyDown={keyboardActivate(handleOpenResume)}
            style={{ zIndex: 1 }}
          >
            <img src='/images/pdf.png' alt='Resume' />
            <p>Resume</p>
          </li>
        )}

        {/* Guide shortcut */}
        <li
          key='guide-shortcut'
          className='group folder top-[56vh] left-[3.4vw]'
          role='button'
          tabIndex={0}
          onClick={(e) => !wasDragged(e) && handleOpenGuide()}
          onKeyDown={keyboardActivate(handleOpenGuide)}
          style={{ zIndex: 1 }}
        >
          <img src='/images/txt.png' alt='Guide' />
          <p>Guide</p>
        </li>
      </ul>
    </section>
  );
};

export default Home;
