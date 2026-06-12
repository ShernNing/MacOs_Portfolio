import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window";
import dayjs from "dayjs";
import React from "react";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const openWindow = useWindowStore((s) => s.openWindow);

  const [currentTime, setCurrentTime] = React.useState(dayjs());

  const [isDark, setIsDark] = React.useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  // Onboarding hint pointing at the theme toggle: null | "visible" | "hiding".
  const [themeHint, setThemeHint] = React.useState(null);

  const toggleTheme = React.useCallback(() => {
    setIsDark((prev) => !prev);
    setThemeHint(null);
  }, []);

  // Pop the hint a few seconds after load, hold it, then fade it out. Shows
  // once per browser so it nudges new visitors without nagging returning ones.
  React.useEffect(() => {
    try {
      if (localStorage.getItem("themeHintSeen")) return;
    } catch (e) {
      /* localStorage unavailable - ignore */
    }

    let hideT;
    let removeT;
    const showT = setTimeout(() => {
      setThemeHint("visible");
      try {
        localStorage.setItem("themeHintSeen", "1");
      } catch (e) {
        /* localStorage unavailable - ignore */
      }
      hideT = setTimeout(() => {
        setThemeHint("hiding");
        removeT = setTimeout(() => setThemeHint(null), 400);
      }, 6000);
    }, 2500);

    return () => {
      clearTimeout(showT);
      clearTimeout(hideT);
      clearTimeout(removeT);
    };
  }, []);

  // Keep <html> class + localStorage in sync. Idempotent, so StrictMode's
  // double-invoke in dev is harmless (unlike side effects in the updater).
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {
      /* localStorage unavailable - ignore */
    }
  }, [isDark]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.format("ddd, MMM D, hh:mm:ss A");

  return (
    <nav>
      <div>
        <a
          href='/'
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <img
            src='/images/logo.svg'
            alt='logo'
            style={{ cursor: "pointer" }}
          />
        </a>
        <a
          href='/'
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <p
            className='font-bold'
            style={{ marginLeft: 0, cursor: "pointer", color: "inherit" }}
          >
            Shern Ning's Portfolio
          </p>
        </a>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id}>
              <button
                type='button'
                onClick={() => openWindow(type)}
                style={{ cursor: "pointer" }}
              >
                <p>{name}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => {
            const isModeToggle = img === "/icons/mode.svg";
            return (
              <li
                key={id}
                style={isModeToggle ? { position: "relative" } : undefined}
              >
                {isModeToggle ? (
                  <>
                    <button
                      type='button'
                      onClick={toggleTheme}
                      aria-label='Toggle dark mode'
                      aria-pressed={isDark}
                      data-tooltip-id='theme-tooltip'
                      data-tooltip-content={
                        isDark ? "Switch to light mode" : "Switch to dark mode"
                      }
                      data-tooltip-delay-show={150}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background: "none",
                        border: 0,
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={img}
                        alt='toggle theme'
                        className='icon-hover'
                      />
                    </button>
                    {themeHint && (
                      <div
                        className={`theme-hint${
                          themeHint === "hiding" ? " theme-hint--hiding" : ""
                        }`}
                        role='status'
                        onClick={() => setThemeHint(null)}
                      >
                        Try dark mode 🌙
                      </div>
                    )}
                  </>
                ) : (
                  <img src={img} alt={`icon-${id}`} className='icon-hover' />
                )}
              </li>
            );
          })}
        </ul>

        <time
          dateTime={currentTime.toISOString()}
          style={{
            textAlign: "right",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formattedTime}
        </time>
      </div>

      <Tooltip id='theme-tooltip' place='bottom' className='tooltip' />
    </nav>
  );
};

export default Navbar;
