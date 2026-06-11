import React from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import WindowControls from "#components/WindowControls";

const Video = () => {
  const data = useWindowStore((s) => s.windows.videofile?.data);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [data?.videoUrl]);

  if (!data) return null;

  const { name, videoUrl } = data;

  return (
    <>
      <div id='window-header-videofile' className='window-header'>
        <WindowControls target='videofile' />
        <h2 className='w-full absolute left-0 right-0 mx-auto text-center pointer-events-none'>
          {name}
        </h2>
      </div>
      <div className='preview flex flex-col items-center justify-center p-0'>
        {failed ? (
          <div className='flex flex-col items-center justify-center min-h-[200px] p-6 text-gray-500 bg-white w-full'>
            <p className='font-semibold'>Demo video coming soon</p>
            <p className='text-sm mt-1'>Expected at {videoUrl}</p>
          </div>
        ) : (
          <video
            src={videoUrl}
            className='w-full h-auto max-h-[70vh] object-contain rounded shadow'
            controls
            autoPlay
            muted
            loop
            playsInline
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </>
  );
};

const VideoWindow = WindowWrapper(Video, "videofile");

export default VideoWindow;
