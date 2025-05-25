import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import { X } from "lucide-react";
import { FilterStore } from "../../../stores/filter.store";
import { toast } from "sonner";

function AddValueModal({ setShowModal, showModal, selectedFilter }) {
  const { createValue } = FilterStore();

  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false); // ⬅️ loading holati

  const handleAddValue = () => {
    if (!inputValue.trim()) return;
    setValues((prev) => [...prev, inputValue.trim()]);
    setInputValue("");
  };

  const handleCreateValues = async () => {
    if (!values.length || !selectedFilter) {
      toast.error("Maydon to'ldirilishi shart");
      return;
    }

    try {
      setLoading(true);
      await createValue({
        filterId: selectedFilter,
        value: values,
      });

      setInputValue("");
      setValues([]);
      setShowModal(false);
    } catch (error) {
      toast.error("Xatolik yuz berdi");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    setInputValue("");
    setValues([]);
    setShowModal(false);
  };

  const handleDeleteValue = (valueToDelete) => {
    setValues((prev) => prev.filter((val) => val !== valueToDelete));
  };

  return (
    <Dialog open={showModal} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Filterlarga qiymat qo'shish</span>
        <IconButton onClick={handleClose}>
          <X />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" gap={2} alignItems="center" mb={2}>
          <TextField
            fullWidth
            label="Qiymatni kiriting"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
          />
          <Button
            variant="contained"
            onClick={handleAddValue}
            disabled={loading}
          >
            +
          </Button>
        </Box>

        {values.length > 0 && (
          <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
            {values.map((val, idx) => (
              <Chip
                key={idx}
                label={val}
                onDelete={() => handleDeleteValue(val)}
              />
            ))}
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreateValues}
          disabled={!values.length || loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading ? "Yuklanmoqda..." : "Barchasini qo‘shish"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddValueModal;
