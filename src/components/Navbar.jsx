import { navIcons, navLinks } from "#constants";
import dayjs from "dayjs";
import React from "react";

const Navbar = () => {
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
        <img src='/images/logo.svg' alt='logo' />
        <p className='font-bold'>Shern Ning's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, link }) => (
            <li key={id}>
              <a href={link}>{name}</a>
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
