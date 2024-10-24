import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';
import { GiFilmProjector } from 'react-icons/gi';
import { IoHome } from 'react-icons/io5';
import { RiMovie2Line } from 'react-icons/ri';

const Navigation = () => {
  const linkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <header className={css.header}>
      <p>
        FilmScope
        <GiFilmProjector />
      </p>

      <nav>
        <ul className={css.nav}>
          <li>
            <NavLink to="/" className={linkClass}>
              Home
              <IoHome />
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={linkClass}>
              Movies
              <RiMovie2Line />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
