import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import React, { useLayoutEffect, useRef, useEffect } from "react";

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

    // Only allow resizing if not Finder
    const isResizable = windowKey !== "finder";

    // Resizing logic (all corners)
    useEffect(() => {
      if (!isResizable) return;
      const el = ref.current;
      if (!el) return;
      let isResizing = false;
      let lastX = 0;
      let lastY = 0;
      let startWidth = 0;
      let startHeight = 0;
      let startLeft = 0;
      let startTop = 0;
      const MIN_WIDTH = 320;
      const MIN_HEIGHT = 220;

      const handleResize = (corner) => (e) => {
        e.stopPropagation();
        e.preventDefault();
        isResizing = true;
        lastX = e.clientX;
        lastY = e.clientY;
        startWidth = el.offsetWidth;
        startHeight = el.offsetHeight;
        startLeft = el.offsetLeft;
        startTop = el.offsetTop;
        document.body.style.userSelect = "none";

        const onMouseMove = (moveEvent) => {
          if (!isResizing) return;
          const dx = moveEvent.clientX - lastX;
          const dy = moveEvent.clientY - lastY;
          let newWidth = startWidth;
          let newHeight = startHeight;
          let newLeft = startLeft;
          let newTop = startTop;
          if (corner === "br") {
            newWidth = Math.max(MIN_WIDTH, startWidth + dx);
            newHeight = Math.max(MIN_HEIGHT, startHeight + dy);
          } else if (corner === "bl") {
            newWidth = Math.max(MIN_WIDTH, startWidth - dx);
            newHeight = Math.max(MIN_HEIGHT, startHeight + dy);
            newLeft = startLeft + dx;
          } else if (corner === "tr") {
            newWidth = Math.max(MIN_WIDTH, startWidth + dx);
            newHeight = Math.max(MIN_HEIGHT, startHeight - dy);
            newTop = startTop + dy;
          } else if (corner === "tl") {
            newWidth = Math.max(MIN_WIDTH, startWidth - dx);
            newHeight = Math.max(MIN_HEIGHT, startHeight - dy);
            newLeft = startLeft + dx;
            newTop = startTop + dy;
          }
          el.style.width = newWidth + "px";
          el.style.height = newHeight + "px";
          el.style.left = newLeft + "px";
          el.style.top = newTop + "px";
          el.style.maxWidth = "100vw";
          el.style.maxHeight = "100vh";
        };
        const onMouseUp = () => {
          isResizing = false;
          document.body.style.userSelect = "";
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      };

      // Create invisible resize handles for all corners
      const handles = [
        { corner: "br", style: { right: 0, bottom: 0 } },
        { corner: "bl", style: { left: 0, bottom: 0 } },
        { corner: "tr", style: { right: 0, top: 0 } },
        { corner: "tl", style: { left: 0, top: 0 } },
      ];
      // Remove any existing handles
      handles.forEach(({ corner }) => {
        const existing = el.querySelector(`.window-resize-handle-${corner}`);
        if (existing) el.removeChild(existing);
      });
      // Add handles
      handles.forEach(({ corner, style }) => {
        const handle = document.createElement("div");
        handle.className = `window-resize-handle window-resize-handle-${corner}`;
        Object.assign(handle.style, {
          position: "absolute",
          width: "16px",
          height: "16px",
          zIndex: 10,
          opacity: 0,
          cursor:
            corner === "br" || corner === "tl" ? "nwse-resize" : "nesw-resize",
          ...style,
        });
        handle.addEventListener("mousedown", handleResize(corner));
        el.appendChild(handle);
      });
      return () => {
        handles.forEach(({ corner }) => {
          const existing = el.querySelector(`.window-resize-handle-${corner}`);
          if (existing) el.removeChild(existing);
        });
      };
    }, [isResizable, isOpen]);

    // Render resize handles only if resizable
    return (
      <section
        id={windowKey}
        ref={ref}
        style={windowStyle}
        className='absolute'
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
