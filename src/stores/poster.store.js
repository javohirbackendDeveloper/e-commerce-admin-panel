import { toast } from "sonner";
import { create } from "zustand";
import axiosInstance, { axiosMultipartHeader } from "./axios/axios";

export const PosterStore = create((set, get) => ({
  posters: [],

  async createPoster(data) {
    try {
      const res = await axiosMultipartHeader.post("/products/poster", data);

      if (res.data?.id) {
        toast.success("Poster muvaffaqiyatli qo'shildi");
      }
    } catch (err) {
      toast.error(err.message);
    }
  },

  async getPosters() {
    try {
      const res = await axiosMultipartHeader.get("/products/poster");

      console.log({ res });

      if (res.data[0]?.id) {
        set({ posters: res.data });
      }
    } catch (err) {
      toast.error(err.message);
    }
  },

  async deletePoster(id) {
    try {
      const res = await axiosInstance.delete("/products/poster/" + id);

      if (res.data?.id) {
        toast.success("Poster muvaffaqiyatli o'chirildi");
        await get().getPosters();
      }
    } catch (err) {
      toast.error(err.message);
    }
  },
}));
