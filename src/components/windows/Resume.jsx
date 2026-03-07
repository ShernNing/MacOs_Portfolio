import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url,
// ).toString();

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
          Shern Ning Tan Resume.pdf
        </h2>
        <a
          href='files/Shern Ning Tan Resume.pdf'
          download
          className='cursor-pointer'
          title='Download resume'
          aria-label='Download resume as PDF'
        >
          <Download className='icon cursor-pointer' />
        </a>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {pdfError ? (
          <div className='text-red-600 font-semibold p-4'>{pdfError}</div>
        ) : (
          <Document
            file='files/Shern Ning Tan Resume.pdf'
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
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 16,
          }}
        >
          <button
            aria-label='Previous page'
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            style={{
              padding: "3px 12px",
              borderRadius: 999,
              border:
                pageNumber <= 1
                  ? "1px solid #e0e0e0"
                  : "1px solid rgba(180,180,200,0.18)",
              background:
                pageNumber <= 1
                  ? "rgba(245,245,247,0.7)"
                  : "rgba(255,255,255,0.35)",
              color: pageNumber <= 1 ? "#b0b0b0" : "#222",
              fontWeight: 400,
              fontSize: 12,
              boxShadow:
                pageNumber <= 1
                  ? "none"
                  : "0 1.5px 6px 0 rgba(120,140,180,0.10)",
              cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
              transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
              outline: "none",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              WebkitAppearance: "none",
              appearance: "none",
            }}
            onMouseOver={(e) => {
              if (pageNumber > 1) {
                e.currentTarget.style.background = "rgba(230,240,255,0.7)";
                e.currentTarget.style.color = "#235390";
                e.currentTarget.style.borderColor = "#b3cfff";
              }
            }}
            onMouseOut={(e) => {
              if (pageNumber > 1) {
                e.currentTarget.style.background = "rgba(255,255,255,0.35)";
                e.currentTarget.style.color = "#222";
                e.currentTarget.style.borderColor = "rgba(180,180,200,0.18)";
              }
            }}
          >
            ◀
          </button>
          <span
            style={{
              alignSelf: "center",
              fontSize: 12,
              color: "#666",
              fontWeight: 400,
              padding: "0 4px",
            }}
          >
            Page {pageNumber} of {numPages || "?"}
          </span>
          <button
            aria-label='Next page'
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={!numPages || pageNumber >= numPages}
            style={{
              padding: "3px 12px",
              borderRadius: 999,
              border:
                !numPages || pageNumber >= numPages
                  ? "1px solid #e0e0e0"
                  : "1px solid rgba(180,180,200,0.18)",
              background:
                !numPages || pageNumber >= numPages
                  ? "rgba(245,245,247,0.7)"
                  : "rgba(255,255,255,0.35)",
              color: !numPages || pageNumber >= numPages ? "#b0b0b0" : "#222",
              fontWeight: 400,
              fontSize: 12,
              boxShadow:
                !numPages || pageNumber >= numPages
                  ? "none"
                  : "0 1.5px 6px 0 rgba(120,140,180,0.10)",
              cursor:
                !numPages || pageNumber >= numPages ? "not-allowed" : "pointer",
              transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
              outline: "none",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              WebkitAppearance: "none",
              appearance: "none",
            }}
            onMouseOver={(e) => {
              if (numPages && pageNumber < numPages) {
                e.currentTarget.style.background = "rgba(230,240,255,0.7)";
                e.currentTarget.style.color = "#235390";
                e.currentTarget.style.borderColor = "#b3cfff";
              }
            }}
            onMouseOut={(e) => {
              if (numPages && pageNumber < numPages) {
                e.currentTarget.style.background = "rgba(255,255,255,0.35)";
                e.currentTarget.style.color = "#222";
                e.currentTarget.style.borderColor = "rgba(180,180,200,0.18)";
              }
            }}
          >
            ▶
          </button>
        </div>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
