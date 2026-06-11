import useWindowStore from "#store/window";
import React from "react";
import { Tooltip } from "react-tooltip";

const WindowControls = ({ target }) => {
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const toggleMaximizeWindow = useWindowStore((s) => s.toggleMaximizeWindow);

  const tooltipId = `window-controls-tooltip-${target}`;

  return (
    <div id='window-controls'>
      <button
        type='button'
        className='close'
        aria-label='Close window'
        data-tooltip-id={tooltipId}
        data-tooltip-content='Close'
        onClick={() => closeWindow(target)}
      />
      <button
        type='button'
        className='minimize'
        aria-label='Minimize window'
        data-tooltip-id={tooltipId}
        data-tooltip-content='Minimize'
        onClick={() => minimizeWindow(target)}
      />
      <button
        type='button'
        className='maximize'
        aria-label='Maximize window'
        data-tooltip-id={tooltipId}
        data-tooltip-content='Maximize'
        onClick={() => toggleMaximizeWindow(target)}
      />
      <Tooltip id={tooltipId} place='bottom' className='tooltip' />
    </div>
  );
};

export default WindowControls;
