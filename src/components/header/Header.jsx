import { ChevronDown, Search } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import ProfileModal from "./profileModal/ProfileModal";

function Header({ pageName }) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header">
      <div className="container">
        <div className="page-name">
          <h2>{pageName}</h2>
        </div>
        <div className="search-input">
          <input type="text" placeholder="Qidiring..." />
          <Search />
        </div>

        <div className="profile-wrapper" ref={profileRef}>
          <div
            className="profile"
            onClick={() => setShowProfileModal((prev) => !prev)}
          >
            <div className="profile-image">
              <img src="../profile.png" alt="Profile image" />
            </div>
            <span className="username">Javohir Abdusharipov</span>
            <ChevronDown className="headerIcon" />
          </div>

          {showProfileModal && <ProfileModal />}
        </div>
      </div>
    </div>
  );
}

export default Header;
