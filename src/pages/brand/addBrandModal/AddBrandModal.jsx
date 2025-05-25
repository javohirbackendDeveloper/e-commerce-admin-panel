import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CategoryStore } from "../../../stores/category.store";
import { BrandStore } from "../../../stores/brand.store";
import "./AddBrandModal.css";

function AddBrandModal({ setShowModal, showModal, selectedBrand }) {
  const { getAllLeafCategory, leafCategories } = CategoryStore();
  const { createBrand, updateBrand } = BrandStore();

  const [brandName, setBrandName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModal && selectedBrand) {
      setBrandName(selectedBrand.name || "");

      const selectedIds =
        selectedBrand.categories?.map((item) => item.categoryId) || [];

      setSelectedCategories(selectedIds);
    } else {
      setBrandName("");
      setSelectedCategories([]);
    }
  }, [showModal, selectedBrand]);

  useEffect(() => {
    getAllLeafCategory();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!brandName || selectedCategories.length === 0) {
      alert("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    setLoading(true);
    try {
      if (selectedBrand) {
        await updateBrand(selectedBrand.id, {
          name: brandName,
          categoryId: selectedCategories,
        });
      } else {
        await createBrand({
          name: brandName,
          categoryId: selectedCategories,
        });
      }

      setShowModal(false);
      setBrandName("");
      setSelectedCategories([]);
    } catch (err) {
      console.error("Brend saqlashda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      onClose={() => setShowModal(false)}
      open={showModal}
      maxWidth="sm"
      fullWidth
    >
      <div className="addBrandModal">
        <DialogTitle className="modal-title">
          {selectedBrand ? "Brendni tahrirlash" : "Brend qo‘shish"}
          <IconButton onClick={() => setShowModal(false)} className="close-btn">
            <X />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="modal-content">
            <TextField
              fullWidth
              label="Brend nomi"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
              margin="normal"
            />

            <div className="checkbox-group">
              <p className="checkbox-label">Turkum(lar)ni tanlang:</p>
              <FormGroup>
                {leafCategories.map((category) => (
                  <FormControlLabel
                    key={category.id}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCheckboxChange(category.id)}
                      />
                    }
                    label={category.title}
                  />
                ))}
              </FormGroup>
            </div>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : selectedBrand ? (
                "Yangilash"
              ) : (
                "Saqlash"
              )}
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default AddBrandModal;
