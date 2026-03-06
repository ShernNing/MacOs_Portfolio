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

const Safari = () => {
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
        <div className='space-y-8'>
          {blogPosts.map(({ id, image, title, date, link }) => (
            <div key={id} className='blog-post grid grid-cols-12 gap-5'>
              <div className='col-span-2'>
                <img src={image} alt={title} />
              </div>
              <div className='content col-span-10'>
                <p>{date}</p>
                <h3>{title}</h3>
                <a href={link} target='_blank' rel='noopener noreferrer'>
                  Check out the full post <MoveRight className='icon-hover' />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
