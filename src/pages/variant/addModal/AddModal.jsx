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

function AddModal({ showModal, setShowModal, currentPage, editingFilter }) {
  const [inputType, setInputType] = useState("");
  const [filterName, setFilterName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { createGeneralFilter, updateFilter } = FilterStore();

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
      console.log({ editingFilter });

      if (editingFilter) {
        await updateFilter(editingFilter.id, {
          inputType,
          title: filterName,
        });
      } else {
        await createGeneralFilter({
          inputType,
          title: filterName,
          type: currentPage === "Umumiy" ? "GENERAL" : "SPECIFIC",
        });
      }

      handleClose();
    } catch (err) {
      toast.error("Xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

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
