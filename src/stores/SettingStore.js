import { toast } from "sonner";
import { create } from "zustand";
import axiosInstance, { axiosMultipartHeader } from "./axios/axios";

export const SettingStore = create((set, get) => ({
  async updateProfile(data) {
    try {
      const { id, ...requestData } = data;
      const res = await axiosInstance.patch(
        "/auth/admin/updateAdmin",
        requestData
      );

      if (res.data?.id) {
        toast.success("Profil muvaffaqiyatlo yangilandi");
      } else {
        toast.error("Profilni o'zgartirishda xatolik bo'ldi");
      }
    } catch (err) {
      toast.error(err.message);
    }
  },
  async updatePassword(data) {
    try {
      const res = await axiosInstance.patch("/auth/admin/changePassword", data);
      if (res.data?.id) {
        toast.success("Parol muvaffaqiyatli o'zgartirildi");
      }
    } catch (err) {
      toast.error(err.message);
    }
  },
  async updateImage(data) {
    try {
      const res = await axiosMultipartHeader.patch(
        "/auth/admin/updateProfileImage",
        data.formData
      );

      if (res.data?.id) {
        toast.success("Profil rasmi yuklandi");
      }
    } catch (err) {
      toast.error(err.message);
    }
  },
  async deleteImage() {
    try {
      const res = await axiosInstance.patch("/auth/admin/deleteProfileImage");
      if (res.data?.id) {
        toast.success("Rasm muvaffaqiyatli ozgartirildi");
      }
    } catch (err) {
      toast.error(err.message);
    }
  },
}));
