import { toast } from "sonner";
import { create } from "zustand";
import axiosInstance from "./axios/axios";

export const BrandStore = create((set, get) => ({
  allBrands: [],

  async getAllBrands() {
    try {
      const res = await axiosInstance.get("/products/brand");

      if (res.data[0]?.id) {
        set({ allBrands: res.data });
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
}));
