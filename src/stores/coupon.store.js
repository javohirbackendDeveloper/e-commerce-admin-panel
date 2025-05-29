import { toast } from "sonner";
import { create } from "zustand";
import axiosInstance from "./axios/axios";

export const CouponStore = create((set, get) => ({
  coupons: [],

  async createCoupon(data) {
    try {
      const res = await axiosInstance.post("/products/coupon", data);
      if (res.data?.id) {
        toast.success("Kupon muvaffaqiyatli qo'shildi");
        await get().getCoupons();
      }
    } catch (err) {
      toast.error(err.message);
    }
  },

  async getCoupons() {
    try {
      const res = await axiosInstance.get("/products/coupon");

      if (res.data[0]?.id) {
        set({ coupons: res.data });
      }
    } catch (err) {
      toast.error(err.message);
    }
  },

  async deleteCoupon(id) {
    try {
      const res = await axiosInstance.delete("/products/coupon/" + id);

      if (res.data?.id) {
        toast.success("Kupon muvaffaqiyatli o'chirildi");
        await get().getCoupons();
      }
    } catch (err) {
      console.log({ err });

      toast.error(err.message);
    }
  },

  async updateCoupon(id, data) {
    try {
      const res = await axiosInstance.patch("/products/coupon/" + id, data);

      console.log({ res });

      if (res.data?.id) {
        toast.success("Kupon muvaffaqiyatli yangilandi");
        await get().getCoupons();
      }
    } catch (err) {
      console.log({ err });

      toast.error(err.message);
    }
  },
}));
