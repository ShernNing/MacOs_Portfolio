import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/draggable";
import React, { useLayoutEffect, useRef } from "react";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    // Animate window open
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;
      el.style.display = "block";
      gsap.fromTo(
        el,
        { scale: 0.9, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
      );
    }, [isOpen]);

    // Prevent drag when maximized; drag header to unmaximize
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;
      const store = useWindowStore.getState();
      const headerId = `window-header-${windowKey}`;
      const [instance] = Draggable.create(el, {
        handle: `#${headerId}`,
        onPress: function () {
          if (store.windows[windowKey].isMaximized) {
            store.toggleMaximizeWindow(windowKey);
            return false;
          }
          focusWindow(windowKey);
        },
      });
      return () => instance.kill();
    }, [windowKey, isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const headerId = `window-header-${windowKey}`;
      const [instance] = Draggable.create(el, {
        handle: `#${headerId}`,
        onPress: () => focusWindow(windowKey),
      });

      return () => instance.kill();
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    // Maximize logic: fill below navbar and above dock
    const NAVBAR_HEIGHT = 42; // px
    const DOCK_HEIGHT = 120; // px (adjust to match your dock's height + margin)
    const windowStyle = windows[windowKey].isMaximized
      ? {
          zIndex,
          position: "fixed",
          top: NAVBAR_HEIGHT,
          left: 0,
          width: "100vw",
          height: `calc(100vh - ${NAVBAR_HEIGHT + DOCK_HEIGHT}px)`,
          margin: 0,
        }
      : { zIndex };

    return (
      <section
        id={windowKey}
        ref={ref}
        style={windowStyle}
        className='absolute'
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
