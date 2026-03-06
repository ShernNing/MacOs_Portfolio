import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import React from "react";

const Safari = () => {
  return (
    <>
      <div id='window-header-safari' className='window-header'>
        <WindowControls target='safari' />
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
