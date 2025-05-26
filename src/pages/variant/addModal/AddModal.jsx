import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { X } from "lucide-react";
import "./AddModal.css";
import { toast } from "sonner";
import { FilterStore } from "../../../stores/filter.store";
import { CategoryStore } from "../../../stores/category.store";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
function AddModal({ showModal, setShowModal, currentPage, editingFilter }) {
  const [inputType, setInputType] = useState("");
  const [filterName, setFilterName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { updateFilter, createSpecificFilter } = FilterStore();
  const { getAllLeafCategory, leafCategories } = CategoryStore();

  useEffect(() => {
    if (editingFilter) {
      setInputType(editingFilter.inputType || "");
      setFilterName(editingFilter.title || "");
    } else {
      setInputType("");
      setFilterName("");
    }
  }, [editingFilter]);

  const handleClose = () => {
    if (isLoading) return;
    setShowModal(false);
    setInputType("");
    setFilterName("");
  };

  const handleSubmit = async () => {
    if (!inputType || !filterName) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    try {
      setIsLoading(true);

      if (editingFilter) {
        await updateFilter(editingFilter.id, {
          inputType,
          title: filterName,
        });
      } else {
        await createSpecificFilter({
          inputType,
          title: filterName,
          type: currentPage === "Umumiy" ? "GENERAL" : "SPECIFIC",
          categoryIds: selectedCategories,
        });
      }

      handleClose();
    } catch (err) {
      toast.error("Xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllLeafCategory();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  console.log({ selectedCategories });

  return (
    <Dialog onClose={handleClose} open={showModal} maxWidth="sm" fullWidth>
      <div className="add-modal-container">
        <DialogTitle className="modal-header">
          <span>{`${
            editingFilter
              ? "Filterni tahrirlash"
              : `${currentPage} filter qo‘shish`
          }`}</span>
          <IconButton onClick={handleClose}>
            <X />
          </IconButton>
        </DialogTitle>

        <DialogContent className="modal-body">
          <FormControl fullWidth required margin="normal">
            <InputLabel>Filterdan foydalanish uslubi</InputLabel>
            <Select
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
              label="Filterdan foydalanish uslubi"
              disabled={isLoading}
            >
              <MenuItem value="CHECKBOX">Checkbox</MenuItem>
              <MenuItem value="RANGE">Range</MenuItem>
            </Select>
          </FormControl>

          {currentPage === "Maxsus" && (
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
          )}

          <TextField
            fullWidth
            required
            label="Filter nomi"
            placeholder="Masalan: Rangi, Narxi..."
            margin="normal"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            disabled={isLoading}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : editingFilter ? (
              "Yangilash"
            ) : (
              "Saqlash"
            )}
          </Button>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default AddModal;
