import { create } from "zustand";
import { axiosInstance } from "./axios/axios";
import { toast } from "sonner";

export const AuthStore = create((set, get) => ({
  admin: null,
  accessToken: window.localStorage.getItem("accessToken"),

  async login(data, navigate) {
    try {
      const res = await axiosInstance.post("/auth/admin/login", data);
      console.log({ res });

      if (res && res.data && res.data?.accessToken) {
        window.localStorage.setItem("accessToken", res.data?.accessToken);

        await get().fetchAdminInfo();
        toast.success(res.data?.message);

        navigate("/dashboard");
      } else {
        toast.error(
          res.data?.error ||
            "Nimadir xato ketdi, iltimos malumotlarni tekshiring"
        );
      }
    } catch (err) {
      console.log("Login errror", err);
    }
  },

  async fetchAdminInfo() {
    try {
      const { accessToken } = get();
      const res = await axiosInstance.get("/auth/admin/getAdminByToken", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      set({ admin: res.data });
    } catch (err) {
      console.log("Admin ma'lumotlarini olishda xatolik:", err);
    }
  },

  async logout() {
    try {
      const res = await axiosInstance.post("/auth/admin/logout");
      console.log({ res });

      if (res && res.data && res.data?.message) {
        window.localStorage.removeItem("accessToken");

        toast.success(res.data?.message);

        window.location.reload();
      } else {
        toast.error(
          res.data?.error ||
            "Nimadir xato ketdi, iltimos malumotlarni tekshiring"
        );
      }
    } catch (err) {
      console.log("Login errror", err);
    }
  },
}));
