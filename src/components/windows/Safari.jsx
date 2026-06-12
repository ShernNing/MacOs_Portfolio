import { WindowControls } from "#components";
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import React from "react";

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Turn the flat content array into structured blocks:
// trailing ":" => heading, leading "•" => bullet list, "" => spacer, else paragraph.
const renderArticleBody = (content) => {
  const blocks = [];
  let bullets = [];

  const flushBullets = () => {
    if (bullets.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className='article-list'>
          {bullets.map((b, i) => (
            <li key={i}>{b.replace(/^•\s*/, "")}</li>
          ))}
        </ul>
      );
      bullets = [];
    }
  };

  content.forEach((line, idx) => {
    const text = line.trim();

    if (text.startsWith("•")) {
      bullets.push(text);
      return;
    }
    flushBullets();

    if (text === "") {
      return;
    }

    if (text.endsWith(":") && text.length < 80) {
      blocks.push(
        <h2 key={`h-${idx}`} className='article-heading'>
          {text.replace(/:$/, "")}
        </h2>
      );
      return;
    }

    blocks.push(
      <p key={`p-${idx}`} className='article-para'>
        {text}
      </p>
    );
  });

  flushBullets();
  return blocks;
};

const Safari = () => {
  const [activePost, setActivePost] = React.useState(null);

  const openPost = (post) => {
    if (post.content) {
      setActivePost(post);
    } else if (post.link) {
      window.open(post.link, "_blank", "noopener,noreferrer");
    }
  };

  const goBack = () => setActivePost(null);

  const url = activePost
    ? `https://shernningtan.com/blog/${slugify(activePost.title)}`
    : "https://shernningtan.com";

  return (
    <>
      <div
        id='window-header-safari'
        className='window-header flex items-center gap-3 relative'
      >
        {/* Left: Controls and nav */}
        <div className='flex items-center gap-3'>
          <WindowControls target='safari' />
          <PanelLeft className='icon' />
          <ChevronLeft
            className={`icon ${activePost ? "cursor-pointer" : "opacity-40"}`}
            onClick={activePost ? goBack : undefined}
            role={activePost ? "button" : undefined}
            aria-label={activePost ? "Back to articles" : undefined}
          />
          <ChevronRight className='icon opacity-40' />
        </div>
        {/* Center: Search bar */}
        <div className='flex-1 flex items-center justify-center gap-3'>
          <ShieldHalf className='icon' />
          <div className='search'>
            <Search size={16} className='icon' />
            <input
              type='text'
              value={url}
              readOnly
              className='flex-1'
            />
          </div>
        </div>
        {/* Right: Actions */}
        <div className='flex items-center gap-3'>
          <Share className='icon' />
          <Plus className='icon' />
          <Copy className='icon' />
        </div>
      </div>

      {/* Article view: rendered as a styled website page */}
      {activePost ? (
        <div className='blog w-full px-0'>
          <article className='article'>
            <button
              type='button'
              className='article-back'
              onClick={goBack}
            >
              <ChevronLeft size={16} /> All articles
            </button>
            <p className='article-date'>{activePost.date}</p>
            <h1 className='article-title'>{activePost.title}</h1>
            {activePost.image ? (
              <img
                src={activePost.image}
                alt={activePost.title}
                className='article-hero'
              />
            ) : null}
            <div className='article-content'>
              {renderArticleBody(activePost.content)}
            </div>
          </article>
        </div>
      ) : (
        /* List view */
        <div className='blog w-full px-0'>
          <h2>My Thoughts</h2>
          {blogPosts.length === 0 ? (
            <div className='flex flex-col items-center justify-center min-h-[200px] text-gray-400'>
              <h3 className='text-2xl font-bold mb-2'>Coming Soon</h3>
              <p>Stay tuned for upcoming posts and insights!</p>
            </div>
          ) : (
            <div className='space-y-8'>
              {blogPosts.map((post) => (
                <div key={post.id} className='blog-post grid grid-cols-12 gap-5'>
                  <div className='col-span-2'>
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className='content col-span-10'>
                    <p>{post.date}</p>
                    <h3>{post.title}</h3>
                    <a
                      role='button'
                      tabIndex={0}
                      className='cursor-pointer'
                      onClick={() => openPost(post)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openPost(post);
                        }
                      }}
                    >
                      Read the full post <MoveRight className='icon-hover' />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
