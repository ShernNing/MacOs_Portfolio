import React from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import WindowControls from "#components/WindowControls";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id='window-header-imgfile' className='window-header'>
        <WindowControls target='imgfile' />
        <h2 className='w-full absolute left-0 right-0 mx-auto text-center pointer-events-none'>
          {name}
        </h2>
      </div>
      <div className='preview flex flex-col items-center justify-center p-0'>
        {imageUrl ? (
          <div className='w-full'>
            <img
              src={imageUrl}
              alt={name}
              className='w-full h-auto max-h-[70vh] object-contain rounded shadow'
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
