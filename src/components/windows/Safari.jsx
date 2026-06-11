import { WindowControls } from "#components";
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
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

const Safari = () => {
  const openWindow = useWindowStore((s) => s.openWindow);

  const openPost = (post) => {
    if (post.content) {
      openWindow("txtfile", {
        name: post.title,
        subtitle: post.date,
        description: post.content,
      });
    } else if (post.link) {
      window.open(post.link, "_blank", "noopener,noreferrer");
    }
  };

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
          <ChevronLeft className='icon' />
          <ChevronRight className='icon' />
        </div>
        {/* Center: Search bar */}
        <div className='flex-1 flex items-center justify-center gap-3'>
          <ShieldHalf className='icon' />
          <div className='search'>
            <Search size={16} className='icon' />
            <input
              type='text'
              placeholder='https://shernningtan.com'
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

      {/* Blog content below header */}
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
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
