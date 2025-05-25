import { toast } from "sonner";
import { create } from "zustand";
import axiosInstance from "./axios/axios";

export const FilterStore = create((set, get) => ({
  // GENERAL FILTER PART
  allGeneralFilters: [],

  async getAllGeneralFilters() {
    try {
      const res = await axiosInstance.get("/products/filters/general");

      if (res.data[0]?.id) {
        set({ allGeneralFilters: res.data });
      }
    } catch (err) {
      toast.error(err.message || "Brandlarni olishda xatolik");
    }
  },

  async createGeneralFilter(data) {
    try {
      const res = await axiosInstance.post("/products/filters/general", data);

      if (res.data?.id) {
        toast.success("Filter muvaffaqiyatli qo'shildi");
        await get().getAllGeneralFilters();
      }
    } catch (err) {
      toast.error(err.message || "Brandlarni olishda xatolik");
    }
  },

  async deleteFilter(id) {
    try {
      const res = await axiosInstance.delete("/products/filters/general/" + id);

      console.log({ res });

      if (res.data?.id) {
        toast.success(`${res.data?.title} filteri o'chirildi`);

        await get().getAllGeneralFilters();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Turkumlarni olishda xatolik bo'ldi");
    }
  },

  async updateFilter(id, data) {
    try {
      const res = await axiosInstance.patch(
        "/products/filters/general/" + id,
        data
      );

      console.log({ res });

      if (res.data?.id) {
        toast.success(`Brend muvaffaqiyatli yangilandi`);

        await get().getAllGeneralFilters();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Turkumlarni olishda xatolik bo'ldi");
    }
  },

  //   SPECIFIC FILTER PART

  //   CREATE VALUE

  async createValue(data) {
    try {
      const res = await axiosInstance.post("/products/filters/value", data);

      if (res.data[0]?.id) {
        toast.success("Filtrlar muvaffaqiyatli qo'shildi");
        await get().getAllGeneralFilters();
      }
    } catch (err) {
      toast.error(err.message || "Brandlarni olishda xatolik");
    }
  },
}));
