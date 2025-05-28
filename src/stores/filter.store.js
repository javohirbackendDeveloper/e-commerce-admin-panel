import { toast } from "sonner";
import { create } from "zustand";
import axiosInstance from "./axios/axios";

export const FilterStore = create((set, get) => ({
  // GENERAL FILTER PART
  allGeneralFilters: [],
  foundOneFilter: null,
  allSpecificFilters: [],

  async findOneFilter(id) {
    try {
      const res = await axiosInstance.get("/products/filters/general/" + id);

      if (res.data?.id) {
        set({ foundOneFilter: res.data });
      }
    } catch (err) {
      toast.error(err.message || "Brandlarni olishda xatolik");
    }
  },

  async updateFilter(id, data) {
    try {
      const res = await axiosInstance.patch(
        "/products/filters/general/" + id,
        data
      );

      if (res.data?.id) {
        toast.success(`Filter muvaffaqiyatli yangilandi`);

        await get().getAllSpecificFilters();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Turkumlarni olishda xatolik bo'ldi");
    }
  },

  //   SPECIFIC FILTER PART

  async createSpecificFilter(data) {
    try {
      console.log({ data });

      const res = await axiosInstance.post("/products/filters/specific", data);

      if (res.data?.createdFilterCategories) {
        toast.success("Filter muvaffaqiyatli qo'shildi");
        await get().getAllSpecificFilters();
      }
    } catch (err) {
      toast.error(err.message || "Brandlarni olishda xatolik");
    }
  },

  async getAllSpecificFilters() {
    try {
      const res = await axiosInstance.get("/products/filters/specific");

      console.log({ res });

      set({ allSpecificFilters: res.data });
    } catch (err) {
      toast.error(err.message || "Brandlarni olishda xatolik");
    }
  },

  async deleteFilter(id) {
    try {
      const res = await axiosInstance.delete(
        "/products/filters/specific/" + id
      );

      console.log({ res });

      if (res.data?.id) {
        toast.success(`${res.data?.title} filteri o'chirildi`);

        await get().getAllSpecificFilters();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Turkumlarni olishda xatolik bo'ldi");
    }
  },

  //   CREATE VALUE

  async createValue(data) {
    try {
      const res = await axiosInstance.post("/products/filters/value", data);

      if (res.data[0]?.id) {
        toast.success("Filtrlar muvaffaqiyatli qo'shildi");
      }
    } catch (err) {
      toast.error(err.message || "Brandlarni olishda xatolik");
    }
  },

  async deleteValue(data) {
    try {
      const res = await axiosInstance.delete(
        "/products/filters/value/" + data.id
      );

      if (res.data?.id) {
        toast.success(res.data?.value + " muvaffaqiyatli o'chirildi");
      }
    } catch (err) {
      toast.error(err.message || "Brandlarni olishda xatolik");
    }
  },
}));
