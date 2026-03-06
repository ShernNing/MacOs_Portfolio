import useWindowStore from "#store/window";
import React from "react";
import { Tooltip } from "react-tooltip";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, toggleMaximizeWindow } =
    useWindowStore();

  const tooltipId = `window-controls-tooltip-${target}`;

  return (
    <div id='window-controls'>
      <div
        className='close'
        data-tooltip-id={tooltipId}
        data-tooltip-content='Close'
        onClick={() => closeWindow(target)}
      />
      <div
        className='minimize'
        data-tooltip-id={tooltipId}
        data-tooltip-content='Minimize'
        onClick={() => minimizeWindow(target)}
      />
      <div
        className='maximize'
        data-tooltip-id={tooltipId}
        data-tooltip-content='Maximize'
        onClick={() => toggleMaximizeWindow(target)}
      />
      <Tooltip id={tooltipId} place='bottom' className='tooltip' />
    </div>
  );
};

export default WindowControls;
