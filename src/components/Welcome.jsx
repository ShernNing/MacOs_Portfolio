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
    const subtitle2Cleanup = setupTextHover(subtitleRef.current2, "subtitle");

    return () => {
      titleCleanup && titleCleanup();
      subtitleCleanup && subtitleCleanup();
      subtitle2Cleanup && subtitle2Cleanup();
    };
  }, []);

  return (
    <section id='welcome' className='gap-2 px-4 sm:gap-8 sm:px-0'>
      <p
        ref={subtitleRef}
        style={{ display: "inline-block" }}
        className='text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-georama text-center'
      >
        {(() => {
          const text = "Hey there, I'm Shern Ning!";
          const chars = text.split("");
          const boldStart = text.indexOf("Shern Ning");
          const boldEnd = boldStart + "Shern Ning".length;
          return chars.map((char, i) =>
            i >= boldStart && i < boldEnd ? (
              <span
                key={i}
                className='text-inherit font-georama'
                style={{ fontVariationSettings: `'wght' 200` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ) : (
              <span
                key={i}
                className='text-inherit font-georama'
                style={{ fontVariationSettings: `'wght' 100` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ),
          );
        })()}
      </p>
      <p
        ref={(el) => (subtitleRef.current2 = el)}
        style={{ display: "inline-block" }}
        className='text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-georama text-center mt-2'
      >
        {renderText(
          "Welcome to my interactive MacOs".split(""),
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
          "Portfolio".split(""),
          "text-inherit font-georama italic",
          300,
        )}
      </h1>
      <div
        className='small-screen sm:hidden flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-xl shadow-lg'
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "420px",
          zIndex: 30,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.7) 60%, rgba(230,240,255,0.5) 100%)",
          backdropFilter: "blur(12px) saturate(1.2)",
          WebkitBackdropFilter: "blur(12px) saturate(1.2)",
          border: "1.5px solid rgba(180,200,255,0.18)",
          boxShadow:
            "0 4px 24px 0 rgba(120,140,180,0.10), 0 1.5px 4px 0 rgba(255,255,255,0.18) inset",
          paddingBottom: "28px",
        }}
      >
        <svg
          width='32'
          height='32'
          fill='none'
          viewBox='0 0 24 24'
          aria-hidden='true'
          className='mb-1'
        >
          <circle cx='12' cy='12' r='10' fill='#e0e7ef' />
          <path
            d='M12 8v4m0 4h.01'
            stroke='#2563eb'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <p className='text-gray-800 font-semibold text-base text-center'>
          Desktop Experience Recommended
        </p>
        <p className='text-gray-600 text-sm text-center'>
          This portfolio is currently designed for desktop screens only.
          <br />
          Some features may be limited on mobile.
        </p>
      </div>
    </section>
  );
};

export default Welcome;
