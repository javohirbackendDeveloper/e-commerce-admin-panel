import React, { useState } from "react";
import "./Profile.css";
import Sidebar from "./sidebar/Sidebar";
import ProfileSettings from "./settings/ProfileSettings";
import AdminSettings from "./settings/AdminSettings";
import PasswordSettings from "./settings/PasswordSettings";

function Profile() {
  const [activePage, setActivePage] = useState("profile");

  return (
    <div className="profile-container">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="profile-content">
        {activePage === "profile" && <ProfileSettings />}
        {activePage === "changePassword" && <PasswordSettings />}
        {activePage === "addAdmin" && <AdminSettings />}
      </div>
    </div>
  );
}

export default Profile;
