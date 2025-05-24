import { Dialog } from "@mui/material";
import { X } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { CategoryStore } from "../../../stores/category.store";

function AddBrandModal({ setShowModal, showModal }) {
  const { getAllLeafCategory } = CategoryStore();

  useEffect(() => {
    getAllLeafCategory();
  }, [setShowModal]);
  return (
    <Dialog onClose={setShowModal} open={showModal}>
      <X onClick={() => setShowModal(!showModal)} />
      <h3>Brend qo'shish</h3>
      <input type="text" />
      <select>
        <option value="">Kategoriya tanlash</option>
      </select>
    </Dialog>
  );
}

export default AddBrandModal;
