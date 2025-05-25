import { toast } from "sonner";
import { create } from "zustand";
import axiosInstance from "./axios/axios";

export const BrandStore = create((set, get) => ({
  allBrands: [],

  async getAllBrands() {
    try {
      const res = await axiosInstance.get("/products/brand");

      console.log(res);

      if (res.data[0]?.id) {
        set({ allBrands: res.data });
      }
    } catch (err) {
      toast.error(err.message || "Brandlarni olishda xatolik");
    }
  },

  async createBrand(data) {
    try {
      const res = await axiosInstance.post(
        "/products/brand/createBrandCategory",
        data
      );

      if (res.data?.createdRelations) {
        toast.success("Brand muvaffaqiyatli yaratildi");
      }
    } catch (err) {
      toast.error(err.message || "Brandlarni olishda xatolik");
    }
  },

  async deleteBrand(id) {
    try {
      const res = await axiosInstance.delete("/products/brand/" + id);

      if (res.data?.id) {
        toast.success(`${res.data?.name} brendi o'chirildi`);

        await get().getAllBrands();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Turkumlarni olishda xatolik bo'ldi");
    }
  },

  async updateBrand(id, data) {
    try {
      const res = await axiosInstance.patch("/products/brand/" + id, data);

      if (res.data?.brand) {
        toast.success(`Brend muvaffaqiyatli yangilandi`);

        await get().getAllBrands();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Turkumlarni olishda xatolik bo'ldi");
    }
  },
}));
