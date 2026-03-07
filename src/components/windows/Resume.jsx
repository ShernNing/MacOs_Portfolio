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
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pdfError, setPdfError] = React.useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setPdfError(null);
  };

  const onDocumentError = (error) => {
    setPdfError("Failed to load PDF. Please try again later.");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft" && pageNumber > 1) setPageNumber(pageNumber - 1);
    if (e.key === "ArrowRight" && numPages && pageNumber < numPages)
      setPageNumber(pageNumber + 1);
  };

  return (
    <>
      <div
        id='window-header-resume'
        className='window-header'
        role='banner'
        style={{ position: "relative" }}
      >
        <WindowControls target='resume' />
        <h2
          className='w-full absolute left-0 right-0 mx-auto text-center pointer-events-none'
          aria-label='Resume PDF'
        >
          Resume.pdf
        </h2>
        <a
          href='files/resume copy.pdf'
          download
          className='cursor-pointer'
          title='Download resume'
          aria-label='Download resume as PDF'
        >
          <Download className='icon' />
        </a>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {pdfError ? (
          <div className='text-red-600 font-semibold p-4'>{pdfError}</div>
        ) : (
          <Document
            file='files/resume copy.pdf'
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentError}
            loading={<div className='p-4'>Loading PDF...</div>}
            error={
              <div className='text-red-600 font-semibold p-4'>
                Failed to load PDF.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={1.3}
              renderTextLayer
              renderAnnotationLayer
              onRenderError={onDocumentError}
              onLoadError={onDocumentError}
              aria-label={`PDF page ${pageNumber}`}
              tabIndex={0}
              onKeyDown={handleKeyDown}
            />
          </Document>
        )}
        <div
          style={{ display: "flex", gap: 12, marginTop: 12, marginBottom: 12 }}
        >
          <button
            aria-label='Previous page'
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            style={{
              padding: "6px 16px",
              borderRadius: 4,
              border: "1px solid #ccc",
              background: pageNumber <= 1 ? "#eee" : "#fff",
              cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>
          <span style={{ alignSelf: "center" }}>
            Page {pageNumber} of {numPages || "?"}
          </span>
          <button
            aria-label='Next page'
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={!numPages || pageNumber >= numPages}
            style={{
              padding: "6px 16px",
              borderRadius: 4,
              border: "1px solid #ccc",
              background: !numPages || pageNumber >= numPages ? "#eee" : "#fff",
              cursor:
                !numPages || pageNumber >= numPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
