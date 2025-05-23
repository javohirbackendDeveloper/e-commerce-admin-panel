import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { X, Upload } from "lucide-react";
import "./AddCategoryModal.css";
import { CategoryStore } from "../../../stores/category.store";
import { toast } from "sonner";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";

function AddCategoryModal({
  setShowModal,
  showAddModal,
  selectedCategory,
  setSelectedCategory,
}) {
  const { createCategory, updateCategory } = CategoryStore();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title) {
      toast.error("Kategoriya nomini kiriting!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);

    if (file) {
      formData.append("icon", file);
    }

    try {
      setLoading(true);
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, formData);
      } else {
        if (!file) {
          toast.error("Iltimos, rasm tanlang!");
          return;
        }
        await createCategory(formData);
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
      setPreviewUrl(selectedCategory.icon || null);
      setFile(null);
    } else {
      setTitle("");
      setPreviewUrl(null);
      setFile(null);
    }
  }, [selectedCategory]);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

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
        <label htmlFor="file-upload" className="custom-file-upload">
          <Upload className="upload-icon" />
          <span>Rasm tanlang</span>
        </label>
        <input
          id="file-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="preview"
            style={{
              marginTop: "10px",
              maxWidth: "150px",
              maxHeight: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        )}

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

export default AddCategoryModal;
