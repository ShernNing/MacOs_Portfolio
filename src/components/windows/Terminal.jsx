import { WindowControls } from "#components";
import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag } from "lucide-react";
import React from "react";

const Terminal = () => {
  return (
    <>
      <div id='window-header-terminal' className='window-header'>
        <WindowControls target='terminal' />

        <h2 className='w-full absolute left-0 right-0 mx-auto text-center pointer-events-none'>
          Tech Stack
        </h2>
      </div>

      <div className='techstack'>
        <p>
          <span className='font-bold'>@Shern Ning % </span>
          show tech stack
        </p>

        <div className='label flex gap-4 mb-2'>
          <p className='font-bold min-w-max'>Category</p>
          <p className='font-bold flex-1 ml-[72px]'>Technologies</p>
        </div>

        <ul className='content'>
          {techStack.map(({ category, items }) => (
            <li key={category} className='flex gap-4 mb-4 items-start'>
              <div className='flex items-center gap-2 min-w-max'>
                <Check className='check' size={20} />
                <h3 className='font-semibold text-[#00A154]'>{category}</h3>
              </div>
              <ul className='flex flex-wrap gap-x-3 gap-y-1 flex-1'>
                {items.map((item, i) => (
                  <li key={i} className='whitespace-normal'>
                    {item}{i < items.length - 1 ? ',' : ''}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className='footnote'>
          <p>
            <Check size={20} /> 5 of 5 stacks loaded successfully (100%)
          </p>

          <p className='text-black'>
            <Flag size={15} fill='black' /> Render time: 6ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
