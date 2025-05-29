import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";
import { SettingStore } from "../../../stores/SettingStore";

export default function PasswordSettings() {
  const { updatePassword } = SettingStore();

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const togglePassword = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error("Yangi parol bilan tasdiqlash paroli bir xil emas");
      return;
    }
    updatePassword({
      newPassword: passwords.new,
      currentPassword: passwords.current,
    });

    setTimeout(() => {
      setPasswords({
        confirm: "",
        current: "",
        new: "",
      });
    }, 3000);
  };

  return (
    <div className="password-settings">
      <h2 className="settings-title">
        <Lock size={24} /> Parolni o'zgartirish
      </h2>

      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label>Hozirgi parol</label>
          <div className="password-input">
            <input
              type={showPasswords.current ? "text" : "password"}
              name="current"
              value={passwords.current}
              onChange={handleChange}
              placeholder="Hozirgi parolni kiriting"
            />
            <span onClick={() => togglePassword("current")}>
              {showPasswords.current ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Yangi parol</label>
          <div className="password-input">
            <input
              type={showPasswords.new ? "text" : "password"}
              name="new"
              value={passwords.new}
              onChange={handleChange}
              placeholder="Yangi parolni kiriting"
            />
            <span onClick={() => togglePassword("new")}>
              {showPasswords.new ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Yangi parolni tasdiqlash</label>
          <div className="password-input">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              name="confirm"
              value={passwords.confirm}
              onChange={handleChange}
              placeholder="Yangi parolni tasdiqlang"
            />
            <span onClick={() => togglePassword("confirm")}>
              {showPasswords.confirm ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Parolni yangilash
        </button>
      </form>
    </div>
  );
}
