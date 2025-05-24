import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { X, Upload } from "lucide-react";
import "./AddSubCategoryModal.css";
import { CategoryStore } from "../../../stores/category.store";
import { toast } from "sonner";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";

function AddSubCategoryModal({
  setShowModal,
  showAddModal,
  parentCategory,
  selectedCategory,
  setSelectedCategory,
}) {
  const { createSubCategory, updateCategory } = CategoryStore();

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title) {
      toast.error("Kategoriya nomini kiriting!");
      return;
    }

    try {
      setLoading(true);
      if (selectedCategory) {
        await updateCategory(selectedCategory?.id, { title });
      } else {
        await createSubCategory({ title, parentId: parentCategory?.id });
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleX = () => {
    setShowModal(!showAddModal);
    setSelectedCategory(null);
  };

  useEffect(() => {
    if (selectedCategory) {
      setTitle(selectedCategory.title || "");
    } else {
      setTitle("");
    }
  }, [selectedCategory]);

  return (
    <Dialog
      open={showAddModal}
      onClose={handleX}
      PaperProps={{
        className: "modal-container",
      }}
    >
      <div className="modal-header">
        <h3 className="modalTitle">
          {selectedCategory ? "Kategoriyani yangilash" : "Kategoriya qo'shish"}
        </h3>
        <X className="close-icon" onClick={handleX} />
      </div>

      <div className="modal-content">
        <label className="modal-label">Kategoriya nomi</label>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Kategoriya nomi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="modal-input"
        />

        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleSubmit}
          className="modal-button"
          style={{ marginTop: "20px" }}
        >
          Saqlash
        </LoadingButton>
      </div>
    </Dialog>
  );
}

export default AddSubCategoryModal;
