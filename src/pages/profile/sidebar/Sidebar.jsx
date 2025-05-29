import { CircleFadingPlus, Lock, User } from "lucide-react";

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="profile-sidebar">
      <ul>
        <li
          className={activePage === "profile" ? "active" : ""}
          onClick={() => setActivePage("profile")}
        >
          <User size={18} /> Profil
        </li>
        <li
          className={activePage === "changePassword" ? "active" : ""}
          onClick={() => setActivePage("changePassword")}
        >
          <Lock size={18} />
          Parol
        </li>
        <li
          className={activePage === "addAdmin" ? "active" : ""}
          onClick={() => setActivePage("addAdmin")}
        >
          <CircleFadingPlus size={18} />
          Admin qo'shish
        </li>
      </ul>
    </div>
  );
}
