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
    "Welcome to the macOS Portfolio!",
    "",
    "This interactive portfolio is designed to look and feel like a real macOS desktop. Here’s how you can make the most of it:",
    "",
    "• Drag & Drop: Move any folder or shortcut on the Home screen by dragging it anywhere you like. Arrange your workspace just like a real desktop!",
    "• Finder: Click any project folder to open it in a Finder window. Inside Finder, you can browse project files, images, and links. Switch between folders by clicking on the sidebar tabs.",
    "• Window Controls: Every window (Finder, Resume, Terminal, etc.) can be moved, resized, minimized, maximized, or closed using the colored buttons at the top left—just like macOS.",
    "• Dock: The Dock at the bottom gives you quick access to key apps like Portfolio, Articles, Gallery, Contact, and Skills. Click an icon to open or close its window.",
    "• Resume & About Me: Instantly open your Resume (PDF) or About Me (text) from the Home screen shortcuts for easy access.",
    "• Multi-Window: Open multiple windows at once and drag them around. Each window can be layered, focused, or hidden as you wish.",
    "• Navbar: Use the top Navbar for fast navigation to important sections and to keep track of the current time.",
    "• Interactive Animations: Enjoy smooth transitions, hover effects, and draggable elements throughout the app for a delightful user experience.",
    "• Mobile Notice: For the best experience, use this portfolio on a desktop or laptop.",
    "",
    "Explore, interact, and have fun discovering all the features of this macOS-inspired portfolio!",
  ],
};

const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

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
    Draggable.create(".folder");
  }, []);

  return (
    <section id='home'>
      <ul>
        {/* Project folders */}
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProjectFinder(project)}
          >
            <img src='/images/folder.png' alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}

        {/* About Me text file shortcut */}
        {aboutMeTextFile && (
          <li
            key='about-me-shortcut'
            className='group folder top-[58vh] left-[2.2vw]'
            onClick={handleOpenAboutMe}
            style={{ zIndex: 1 }}
          >
            <img src='/images/txt.png' alt='About Me' />
            <p>About Me</p>
          </li>
        )}

        {/* Resume PDF shortcut */}
        {resumePdfFile && (
          <li
            key='resume-shortcut'
            className='group folder top-[45vh] left-[2vw]'
            onClick={handleOpenResume}
            style={{ zIndex: 1 }}
          >
            <img src='/images/pdf.png' alt='Resume' />
            <p>Resume</p>
          </li>
        )}

        {/* Guide shortcut */}
        <li
          key='guide-shortcut'
          className='group folder top-[71vh] left-[2.6vw]'
          onClick={handleOpenGuide}
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
