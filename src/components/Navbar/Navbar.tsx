import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../store/authReducer";
import styles from './style.module.css';

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

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/entities/people" className={({ isActive }) => (isActive ? styles.activeLink : styles.navLink)}>
            People
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/entities/starships" className={({ isActive }) => (isActive ? styles.activeLink : styles.navLink)}>
            Starships
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/entities/planets" className={({ isActive }) => (isActive ? styles.activeLink : styles.navLink)}>
            Planets
          </NavLink>
        </li>
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