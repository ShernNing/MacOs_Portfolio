import { Terminal } from "#components/windows";
import { Navbar, Welcome, Dock } from "./components";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import React from "react";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
    </main>
  );
};

export default App;
