import React, { useState, useEffect } from "react";
import { Check, Trash2, User } from "lucide-react";
import { toast } from "sonner";
import { AuthStore } from "../../../stores/auth.store";
import { SettingStore } from "../../../stores/SettingStore";

export default function ProfileSettings() {
  const { admin, fetchAdminInfo } = AuthStore();
  const { updateProfile, updateImage, deleteImage } = SettingStore();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        first_name: admin.first_name || "",
        last_name: admin.last_name || "",
        phone_number: admin.phone_number || "",
      });
    }
  }, [admin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        id: admin.id,
        ...formData,
      });

      fetchAdminInfo();
    } catch (error) {
      toast.error("Profilni yangilashda xatolik yuz berdi");
    }
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        await updateImage({
          id: admin.id,
          formData,
        });

        fetchAdminInfo();
      } catch (err) {
        toast.error("Rasm yuklashda xatolik yuz berdi");
      }
    }
  };

  const handleRemoveImage = async () => {
    if (!admin?.profileImg) {
      toast.error("Sizning profilingizda rasm mavjud emas");
      return;
    }

    const confirm = window.confirm(
      "Profil rasmingizni o'chirishni istaysizmi?"
    );
    if (confirm) {
      try {
        await deleteImage(admin.id);
        fetchAdminInfo();
      } catch (error) {
        toast.error("Rasmni o'chirishda xatolik yuz berdi");
      }
    }
  };

  return (
    <div className="profile-settings">
      <h2 className="settings-title">
        <User size={24} /> Profil Sozlamalari
      </h2>

      <div className="avatar-section">
        <div className="avatar-container">
          <img
            src={admin?.profileImg || "/avatar.png"}
            alt="Profile"
            className="avatar-image"
          />
        </div>
        <div className="avatar-actions">
          <button
            type="button"
            className="avatar-action-btn danger"
            onClick={handleRemoveImage}
          >
            <Trash2 size={16} /> Rasmni o'chirish
          </button>
          <label className="avatar-action-btn primary">
            <Check size={16} /> Rasm yuklash
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Ism</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="Ismingizni kiriting"
            />
          </div>

          <div className="form-group">
            <label>Familiya</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              placeholder="Familiyangizni kiriting"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Telefon raqam</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Telefon raqamni kiriting"
          />
        </div>

        <button type="submit" className="submit-btn">
          O'zgarishlarni saqlash
        </button>
      </form>
    </div>
  );
}
