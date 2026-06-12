import React, { useLayoutEffect } from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import WindowControls from "#components/WindowControls";

// --- Line classification -----------------------------------------------------
// The .txt content is a flat array of strings. We infer structure from the
// text patterns so plain lines render as a styled document instead of a wall
// of identical paragraphs.

const DIVIDER_RE = /^[─—–\-_=]{3,}$/;
const SECTION_RE = /^[─—–\-]{2,}\s*(.+?)\s*[─—–\-]{2,}$/;
const BULLET_RE = /^[•·▪◦]\s*/;

const wordCount = (s) => s.trim().split(/\s+/).length;

// Split "Lead term: rest of sentence" (or "Lead, rest") into an emphasised
// lead + remainder, but only when the lead is short enough to read as a label.
const splitLead = (text) => {
  const m = text.match(/^([^:,]{1,28})([:,])\s+(.+)$/);
  if (m && wordCount(m[1]) <= 4) {
    return { lead: m[1], sep: m[2], rest: m[3] };
  }
  return null;
};

const classify = (line) => {
  const t = line.trim();
  if (t === "") return { type: "space" };
  if (DIVIDER_RE.test(t)) return { type: "divider" };
  const sec = t.match(SECTION_RE);
  if (sec) return { type: "section", text: sec[1] };
  if (BULLET_RE.test(t)) return { type: "bullet", text: t.replace(BULLET_RE, "") };
  if (t.endsWith(":") && t.length <= 48) return { type: "label", text: t.slice(0, -1) };
  return { type: "paragraph", text: t };
};

// --- Renderers ---------------------------------------------------------------

const Bullet = ({ text }) => {
  const parts = splitLead(text);
  return (
    <li className='txt-bullet flex gap-3'>
      <span className='txt-bullet-dot mt-[0.55rem]' aria-hidden='true' />
      <span className='flex-1'>
        {parts ? (
          <>
            <span className='txt-bullet-lead font-semibold'>{parts.lead}</span>
            {parts.sep === ":" ? ": " : ", "}
            {parts.rest}
          </>
        ) : (
          text
        )}
      </span>
    </li>
  );
};

const Paragraph = ({ text }) => {
  const parts = splitLead(text);
  if (parts) {
    return (
      <p className='txt-para'>
        <span className='txt-bullet-lead font-semibold'>{parts.lead}</span>
        {parts.sep === ":" ? ": " : ", "}
        {parts.rest}
      </p>
    );
  }
  return <p className='txt-para'>{text}</p>;
};

// The headline line (first real paragraph). Splits "Name | Role" so the name
// reads as the title and the role as a lighter subtitle.
const Lead = ({ text }) => {
  const [name, ...rest] = text.split("|").map((s) => s.trim());
  const role = rest.join(" | ");
  return (
    <header className='txt-lead'>
      <h1 className='txt-lead-name'>{name}</h1>
      {role ? <p className='txt-lead-role'>{role}</p> : null}
    </header>
  );
};

const renderBody = (description) => {
  const classified = description.map(classify);
  const leadIndex = classified.findIndex((c) => c.type === "paragraph");

  const nodes = [];
  let bulletGroup = null;

  const flushBullets = (key) => {
    if (bulletGroup) {
      nodes.push(
        <ul key={`bl-${key}`} className='txt-bullets space-y-2'>
          {bulletGroup}
        </ul>,
      );
      bulletGroup = null;
    }
  };

  classified.forEach((c, i) => {
    if (c.type !== "bullet") flushBullets(i);

    switch (c.type) {
      case "space":
        break;
      case "divider":
        nodes.push(<hr key={i} className='txt-divider' />);
        break;
      case "section":
        nodes.push(
          <h2 key={i} className='txt-section'>
            <span className='txt-section-bar' aria-hidden='true' />
            {c.text}
          </h2>,
        );
        break;
      case "label":
        nodes.push(
          <h3 key={i} className='txt-label'>
            {c.text}
          </h3>,
        );
        break;
      case "bullet":
        if (!bulletGroup) bulletGroup = [];
        bulletGroup.push(<Bullet key={i} text={c.text} />);
        break;
      default: // paragraph
        if (i === leadIndex) nodes.push(<Lead key={i} text={c.text} />);
        else nodes.push(<Paragraph key={i} text={c.text} />);
    }
  });

  flushBullets("end");
  return nodes;
};

const Text = () => {
  const data = useWindowStore((s) => s.windows.txtfile?.data);

  // The Guide is a long read - open its window a little higher so there's more
  // vertical room. Reset for any other .txt that reuses this window.
  const isGuide = data?.id === "guide-shortcut";
  useLayoutEffect(() => {
    const section = document.getElementById("txtfile");
    if (!section) return;
    section.style.top = isGuide ? "4.5rem" : "";
  }, [isGuide]);

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div
        id='window-header-txtfile'
        className='window-header border-2 relative'
        role='banner'
      >
        <WindowControls target='txtfile' />
        <h2
          className='absolute left-0 right-0 px-20 truncate text-center text-sm font-bold text-gray-700 pointer-events-none'
          aria-label={name}
          title={name}
        >
          {name}
        </h2>
      </div>

      <div
        className='txt-doc bg-white'
        style={{ maxHeight: "75vh", overflowY: "auto" }}
      >
        {image || subtitle ? (
          <div className='txt-hero'>
            {image ? (
              <img src={image} alt={name} className='txt-hero-img' />
            ) : null}
            {subtitle ? <p className='txt-eyebrow'>{subtitle}</p> : null}
          </div>
        ) : null}

        {Array.isArray(description) && description.length > 0 ? (
          <div className='txt-content'>{renderBody(description)}</div>
        ) : null}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
