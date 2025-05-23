import React from "react";
import "./ProfileModal.css";
import { UserCog } from "lucide-react";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthStore } from "../../../stores/auth.store";

function ProfileModal() {
  const { logout } = AuthStore();

  return (
    <div className="profileModal">
      <ul>
        <li>
          <Link to="/profile">
            <span className="icon">
              <UserCog />
            </span>
            <span>Profilim</span>
          </Link>
        </li>
        <li onClick={logout}>
          <span className="icon">
            <LogOut />
          </span>
          <span>Chiqish</span>
        </li>
      </ul>
    </div>
  );
}

export default ProfileModal;
