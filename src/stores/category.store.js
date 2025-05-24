import { toast } from "sonner";
import { create } from "zustand";
import axiosInstance, { axiosMultipartHeader } from "./axios/axios";

export const CategoryStore = create((set, get) => ({
  allCategories: [],
  allChildCategories: [],
  parentCategory: null,
  setParentCategory: (category) => set({ parentCategory: category }),
  leafCategories: [],

  async getAllParentCategories() {
    try {
      const res = await axiosInstance.get("/products/category");

      if (res.data[0]?.id) {
        set({ allCategories: res.data });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Turkumlarni olishda xatolik bo'ldi");
    }
  },
  async createCategory(data) {
    try {
      const res = await axiosMultipartHeader.post("/products/category", data);
      if (res.data?.id) {
        await get().getAllParentCategories();
        toast.success("Kategoriya muvaffaqiyatli qo'shildi");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Turkumlarni olishda xatolik bo'ldi");
    }
  },
  async createSubCategory(data) {
    console.log({ data });

    try {
      const res = await axiosInstance.post(
        "/products/category/createSubCategory",
        data
      );

      if (res.data?.id) {
        toast.success("Yangi turkum qo'shildi");
        await get().getAllChildrenByParentCategory(data.parentId);
      }

      // if (res.data?.id) {
      //   await get().getAllParentCategories();
      //   toast.success("Kategoriya muvaffaqiyatli qo'shildi");
      // }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Turkumlarni olishda xatolik bo'ldi");
    }
  },
  async deleteCategory(data) {
    try {
      const res = await axiosMultipartHeader.delete(
        "/products/category/" + data
      );

      if (res.data?.message) {
        toast.success(res.data?.message);
        await get().getAllParentCategories();
        const parentCat = await get().parentCategory;

        await get().getAllChildrenByParentCategory(parentCat.id);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Turkumlarni olishda xatolik bo'ldi");
    }
  },

  async updateCategory(id, data) {
    try {
      const res = await axiosMultipartHeader.patch(
        "/products/category/" + id,
        data
      );
      if (res.data?.id) {
        toast.success("Turkum muvaffaqiyatli yangilandi");
        await get().getAllParentCategories();
        const parentCat = await get().parentCategory;

        await get().getAllChildrenByParentCategory(parentCat.id);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Turkumlarni olishda xatolik bo'ldi");
    }
  },

  async getAllChildrenByParentCategory(id) {
    try {
      const res = await axiosInstance.get(
        "/products/category/findAllChildCategories/" + id
      );

      set({ allChildCategories: res.data });
    } catch (err) {
      console.log(err);

      toast.error(err.message || "Ichki turkumlarni olishda xatolik");
    }
  },

  async getAllLeafCategory() {
    try {
      const res = await axiosInstance.get(
        "/products/category/getLeafCategories"
      );

      console.log({ res });
    } catch (err) {
      console.log(err);

      toast.error(err.message || "Ichki turkumlarni olishda xatolik");
    }
  },
}));
