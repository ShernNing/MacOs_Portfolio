import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window";
import dayjs from "dayjs";
import React from "react";

const Navbar = () => {
  const { openWindow } = useWindowStore();

  const [currentTime, setCurrentTime] = React.useState(dayjs());

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
          {navLinks.map(({ id, name, link, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <a href={link} style={{ cursor: "pointer" }}>
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className='icon-hover' />
            </li>
          ))}
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
    </nav>
  );
};

export default Navbar;
