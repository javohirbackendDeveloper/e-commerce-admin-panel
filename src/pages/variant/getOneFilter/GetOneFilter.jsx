import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FilterStore } from "../../../stores/filter.store";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { Trash2 } from "lucide-react";
import { ArrowBigLeft } from "lucide-react";
import "./GetOneFilter.css";
function GetOneFilter() {
  const { id } = useParams();
  const { findOneFilter, foundOneFilter, deleteValue } = FilterStore();
  const navigate = useNavigate();

  const handleDelete = (val) => {
    const confirm = window.confirm("Bu qiymatni o'chirishni xohlaysizmi");
    if (confirm) {
      deleteValue(val);
    }
  };
  useEffect(() => {
    findOneFilter(id);
  }, [id, handleDelete]);

  if (!foundOneFilter) {
    return (
      <div>
        <span>Hech narsa topilmadi</span>
      </div>
    );
  }

  return (
    <div className="getOneFilter" style={{ padding: "20px" }}>
      <ArrowBigLeft
        size={30}
        onClick={() => navigate(-1)}
        className="arrow-icon"
      />
      <Typography variant="h5" gutterBottom>
        {foundOneFilter.title} filtri bo‘yicha qiymatlar
      </Typography>
      <Typography variant="body1" mb={2}>
        Jami: {foundOneFilter.values.length} ta qiymat mavjud
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={1}>
        {foundOneFilter.values.map((val, idx) => (
          <Chip
            key={val.id || idx}
            label={val.value}
            onDelete={() => handleDelete(val)}
            deleteIcon={<Trash2 size={18} />}
            sx={{
              backgroundColor: "#f0f4ff",
              fontWeight: 500,
              ".MuiChip-deleteIcon": {
                color: "#ff1744",
              },
              "&:hover": {
                backgroundColor: "#e3edff",
              },
            }}
          />
        ))}
      </Box>
    </div>
  );
}

export default GetOneFilter;
