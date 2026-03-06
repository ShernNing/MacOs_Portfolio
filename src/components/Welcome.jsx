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
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (
    letter,
    weight,
    duration = 0.25,
    ease = "power2.out",
  ) => {
    gsap.killTweensOf(letter);
    return gsap.to(letter, {
      duration,
      ease,
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
    letters.forEach((letter) =>
      animateLetter(letter, base, 0.45, "power3.out"),
    );
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
    <section id='welcome' className='gap-2 px-4 sm:gap-8 sm:px-0'>
      <p
        ref={subtitleRef}
        style={{ display: "inline-block" }}
        className='text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-georama text-center'
      >
        {renderText(
          "Hey there, I'm Shern Ning! Welcome to my".split(""),
          "text-inherit font-georama",
          100,
        )}
      </p>
      <h1
        ref={titleRef}
        style={{ display: "inline-block" }}
        className='text-4xl xs:text-xl sm:text-7xl md:text-8xl lg:text-9xl font-georama italic text-center'
      >
        {renderText(
          "portfolio".split(""),
          "text-inherit font-georama italic",
          300,
        )}
      </h1>
      <div className='small-screen'>
        <p className='text-black'>
          This Portfolio is currently designed for desktop/tablet screens only.
        </p>
        <p className='text-black'>Stay tuned for more updates!</p>
      </div>
    </section>
  );
};

export default Welcome;
