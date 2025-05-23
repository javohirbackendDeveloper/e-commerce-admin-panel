import React from "react";
import { Pages } from "../../constants/sidebarPages";
import { Link } from "react-router-dom";
import "./Sidebar.css";
function Sidebar({ setPageName }) {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="logo-section">
          <img src="../logo.png" alt="Logo" className="logo-img" />
        </div>
        <hr className="divider" />
        <ul className="sidebar-list">
          {Pages.map((page) => (
            <li
              onClick={() => setPageName(page.name)}
              key={page.id}
              className="sidebar-list-item"
            >
              <Link to={page.url} className="sidebar-link">
                {page.icon && <page.icon className="sidebar-icon" size={20} />}
                <span className="sidebar-text">{page.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
