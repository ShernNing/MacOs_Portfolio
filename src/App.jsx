import {
  Finder,
  Safari,
  Terminal,
  Text,
  Image,
  Contact,
  Photos,
} from "#components/windows";
import { Navbar, Welcome, Dock, Home } from "./components";
import useWindowStore from "#store/window";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import React, { Suspense } from "react";

gsap.registerPlugin(Draggable);

// react-pdf is heavy — only load it once the Resume window is opened
const Resume = React.lazy(() => import("#components/windows/Resume"));

const App = () => {
  const isResumeOpen = useWindowStore((s) => s.windows.resume.isOpen);

  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      {isResumeOpen && (
        <Suspense fallback={null}>
          <Resume />
        </Suspense>
      )}
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />
      <Home />
    </main>
  );
};

export default App;
