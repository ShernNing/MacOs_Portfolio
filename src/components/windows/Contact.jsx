import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import React from "react";

const Contact = () => {
  return (
    <>
      <div id='window-header-contact' className='window-header'>
        <WindowControls target='contact' />
        <h2 className='w-full absolute left-0 right-0 mx-auto text-center pointer-events-none'>
          Contact Me
        </h2>
      </div>

      <div className='p-4 space-y-5 bg-white'>
        <img
          src='/images/gal2.png'
          alt='Shern Ning'
          className='w-20 aspect-square rounded-full object-cover'
        />

        <h3>Let's get in Touch!</h3>

        <p>
          Interested in collaborating, have a question, or just want to say
          hello? <br />
          Feel free to reach out. I'm always open to new connections and
          opportunities!
        </p>

        <div>
          <a
            href='mailto:sherningtan@gmail.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 underline hover:text-blue-800'
          >
            sherningtan@gmail.com
          </a>
        </div>

        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2'
                title={text}
              >
                <img src={icon} alt={text} className='size-5' />
                <p>{text}</p>
              </a>{" "}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
