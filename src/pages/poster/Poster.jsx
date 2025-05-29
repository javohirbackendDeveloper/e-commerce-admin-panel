import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Camera, Trash } from "lucide-react";
import "./Poster.css";
import { PosterStore } from "../../stores/poster.store";
import { useSearch } from "../../components/header/searchInput/SearchContext";

export default function Poster() {
  const { posters, getPosters, createPoster, deletePoster } = PosterStore();
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    img: null,
  });

  useEffect(() => {
    getPosters();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, img: file });

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.img) return;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("img", formData.img);

    await createPoster(data);
    setOpen(false);
    setFormData({ title: "", img: null });
    setImagePreview(null);
    getPosters();
  };

  // searching items
  const { query } = useSearch();

  const filtered = posters.filter((p) =>
    p?.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="poster-container">
      <div className="poster-header">
        <h2>Posterlar</h2>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Poster qo‘shish
        </Button>
      </div>

      {(filtered.length > 0 && (
        <table className="poster-table">
          <thead>
            <tr>
              <th>T/r</th>
              <th>Sarlavha</th>
              <th>Rasm</th>
              <th>Amal</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((poster, i) => (
              <tr key={poster.id}>
                <td>{i + 1}</td>
                <td>{poster.title}</td>
                <td>
                  <img
                    src={poster.img}
                    alt="poster"
                    onClick={() => setFullImage(poster.img)}
                    className="poster-img"
                  />
                </td>
                <td>
                  <Trash
                    size={18}
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => {
                      if (window.confirm("Haqiqatan ham o‘chirmoqchimisiz?")) {
                        deletePoster(poster.id);
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )) || (
        <div className="notFoundCategory">
          <img src="../noCategory.png" alt="no category" />
          <h4>Hozircha posterlar mavjud emas</h4>
        </div>
      )}

      {/* Add Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Poster qo‘shish</DialogTitle>
        <DialogContent>
          <TextField
            label="Sarlavha"
            fullWidth
            margin="dense"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <div className="image-upload-container">
            <label htmlFor="poster-upload" className="image-upload-label">
              <Camera size={24} className="upload-icon" />
              <span>Rasm tanlang</span>
              <input
                type="file"
                id="poster-upload"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </label>

            {imagePreview && (
              <img src={imagePreview} alt="preview" className="preview-img" />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Bekor qilish</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Saqlash
          </Button>
        </DialogActions>
      </Dialog>

      {/* Full Image Modal */}
      <Dialog
        open={!!fullImage}
        onClose={() => setFullImage(null)}
        maxWidth="md"
      >
        <img src={fullImage} alt="full" className="full-image" />
      </Dialog>
    </div>
  );
}
