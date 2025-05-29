import React, { useState } from "react";
import { CircleFadingPlus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [adminData, setAdminData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("This function is not working for now");
  };

  return (
    <div className="admin-settings">
      <h2 className="settings-title">
        <CircleFadingPlus size={24} />
        Admin qo'shish
      </h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Telefon raqam</label>
          <input
            type="tel"
            name="phone_number"
            value={adminData.phone_number}
            onChange={handleChange}
            placeholder="Yangi adminnning telefon raqami"
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={adminData.username}
            onChange={handleChange}
            placeholder="Yangi admin username"
          />
        </div>

        <div className="form-group">
          <label>Parol</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={adminData.password}
              onChange={handleChange}
              placeholder="Yangi admin paroli"
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Admin qo'shish
        </button>
      </form>
    </div>
  );
}
