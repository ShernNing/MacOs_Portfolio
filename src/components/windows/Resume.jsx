import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";
import React from "react";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Resume = () => {
  const [numPages, setNumPages] = React.useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
      <div id='window-header-resume' className='window-header'>
        <WindowControls target='resume' />
        <h2 className='w-full absolute left-0 right-0 mx-auto text-center pointer-events-none'>
          Resume.pdf
        </h2>
        <a
          href='files/resume.pdf'
          download
          className='cursor-pointer'
          title='Download resume'
        >
          <Download className='icon' />
        </a>
      </div>
      <Document file='files/resume.pdf' onLoadSuccess={onDocumentLoadSuccess}>
        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Page
            pageNumber={1}
            scale={1.3}
            renderTextLayer
            renderAnnotationLayer
          />
          {numPages && numPages > 1 && (
            <Page
              pageNumber={2}
              scale={1.3}
              renderTextLayer
              renderAnnotationLayer
            />
          )}
        </div>
      </Document>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
