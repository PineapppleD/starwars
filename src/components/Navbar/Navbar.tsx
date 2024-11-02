import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../store/authReducer";
import styles from "./style.module.css";

const Navbar: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  const navlinks = ["People", "Planets", "Starships"];

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {navlinks.map((link, index) => (
          <li className={styles.navItem}>
          <NavLink
            key={link + index}
            to={`/entities/${link.toLowerCase()}`}
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            {link}
          </NavLink>
          </li>
        ))}
        {isAuthenticated && (
          <li className={styles.navItem}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
