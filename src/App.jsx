import { Resume, Safari, Terminal } from "#components/windows";
import { Navbar, Welcome, Dock } from "./components";
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
    </main>
  );
};

export default App;
