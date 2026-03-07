import React from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import WindowControls from "#components/WindowControls";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id='window-header-txtfile' className='window-header' role='banner'>
        <WindowControls target='txtfile' />
        <h2
          className='w-full absolute left-0 right-0 mx-auto text-center pointer-events-none'
          aria-label={name}
        >
          {name}
        </h2>
      </div>

      <div className='p-4 space-y-6 bg-white'>
        {image ? (
          <div className='w-full flex justify-center'>
            <img
              src={image}
              alt={name}
              className='rounded object-cover'
              style={{
                width: 240,
                height: 240,
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
        ) : null}

        {subtitle ? (
          <h3 className='text-lg font-semi-bold'>{subtitle}</h3>
        ) : null}

        {Array.isArray(description) && description.length > 0 ? (
          <div className='space-y-3 leading-relaxed text-base text-gray-800'>
            {description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
