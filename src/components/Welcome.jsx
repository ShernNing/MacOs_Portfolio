import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [
    ...text.map((char, i) => (
      <span
        key={i}
        className={className}
        style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    )),
  ];
};

const setupTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;

    letters.forEach((letter) => {
      const letterRect = letter.getBoundingClientRect();
      const letterCenter =
        letterRect.left - containerRect.left + letterRect.width / 2;
      const distance = Math.abs(mouseX - letterCenter);
      const intensity = Math.exp(-(distance ** 2) / 20000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, base, 0.3));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = React.useRef(null);

  const subtitleRef = React.useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      titleCleanup && titleCleanup();
      subtitleCleanup && subtitleCleanup();
    };
  }, []);

  return (
    <section id='welcome' className='gap-8'>
      <p ref={subtitleRef} style={{ display: "inline-block" }}>
        {renderText(
          "Hey there, I'm Shern Ning! Welcome to my".split(""),
          "text-3xl font-georama",
          100,
        )}
      </p>
      <h1 ref={titleRef} style={{ display: "inline-block" }}>
        {renderText("portfolio".split(""), "text-9xl font-georama italic", 200)}
      </h1>
      <div className='small-screen'>
        <p>
          This Portfolio is currently designed for desktop/tablet screens only.
        </p>
      </div>
    </section>
  );
};

export default Welcome;
