import {
  Finder,
  Resume,
  Safari,
  Terminal,
  Text,
  Image,
  Contact,
  Photos,
} from "#components/windows";
import { Navbar, Welcome, Dock, Home } from "./components";
import { gsap } from "gsap";
import { Draggable } from "gsap/draggable";
import React from "react";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
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
