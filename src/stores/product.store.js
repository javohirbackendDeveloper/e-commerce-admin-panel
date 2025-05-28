import { toast } from "sonner";
import { create } from "zustand";
import axiosInstance, { axiosMultipartHeader } from "./axios/axios";

export const ProductStore = create((set, get) => ({
  productFilters: [],
  allProduct: [],

  async getFiltersByCatId(id) {
    try {
      const res = await axiosInstance.get("/products/filters/specific/" + id);

      if (res.data[0]?.id) {
        set({ productFilters: res.data });
      }
    } catch (err) {
      toast.error(err.message);
    }
  },

  async createProductImages(imageUrls) {
    try {
      const formData = new FormData();

      imageUrls.forEach((file) => {
        if (file) {
          formData.append("product_images", file);
        }
      });

      const res = await axiosMultipartHeader.post(
        "/products/product/createImages",
        formData
      );

      if (res.data?.uploadedFileUrls) {
        return res.data?.uploadedFileUrls;
      } else {
        return false;
      }
    } catch (err) {
      toast.error(err.message);
    }
  },

  async createProduct(imageUrls, data) {
    try {
      const filteredImages = imageUrls.filter((item) => item !== null);

      const images = await get().createProductImages(filteredImages);

      if (!images) {
        toast.error("Rasm yuklashda xatolik bo'ldi");
        return;
      }
      const requestData = {
        product_images: images,
        ...data,
      };

      const res = await axiosInstance.post("/products/product", requestData);

      if (res.data?.id) {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi");
        await get().getProducts({});
      }
    } catch (err) {
      toast.error(err.message);
    }
  },

  async getProducts(filters) {
    try {
      const res = await axiosInstance.get("/products/search/filter", {
        params: filters,
      });

      if (res.data[0]?.id) {
        set({ allProduct: res.data });
      }
    } catch (err) {
      toast.error(err.message);
    }
  },

  async deleteProduct(id) {
    try {
      const res = await axiosInstance.delete("/products/product/" + id);

      console.log({ res });

      if (res.data?.success) {
        toast.success(`Mahsulot muvaffaqiyatli o'chirildi`);

        await get().getProducts({});
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Mahsulotlarni o'chirishda xatolik bo'ldi");
    }
  },

  async updateProduct(id, data) {
    try {
      const res = await axiosInstance.patch("/products/product/" + id, data);

      console.log({ res });

      if (res.data?.id) {
        toast.success(`Mahsulot muvaffaqiyatli yangilandi`);

        await get().getProducts();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Mahsulotni yangilashda xatolik bo'ldi");
    }
  },

  async deleteImage(id) {
    try {
      const res = await axiosInstance.delete("/products/product/image/" + id);

      if (res.data?.id) {
        toast.success(`Rasm muvaffaqiyatli o'chirildi`);

        await get().getProducts({});
      } else {
        toast.error(res.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Mahsulotlarni o'chirishda xatolik bo'ldi");
    }
  },

  async uploadImage(data) {
    console.log({ data });

    try {
      const res = await axiosMultipartHeader.post(
        "/products/product/uploadImage",
        data
      );

      if (res.data?.id) {
        toast.success(`Rasm muvaffaqiyatli qo'shildi`);

        await get().getProducts({});
      } else {
        toast.error(res.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Mahsulotlarni o'chirishda xatolik bo'ldi");
    }
  },
}));
