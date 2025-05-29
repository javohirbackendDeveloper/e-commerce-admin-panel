import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddCoupon from "./addCouponModal/AddCoupon";
import { CouponStore } from "../../stores/coupon.store";
import "./Coupons.css";
import { useSearch } from "../../components/header/searchInput/SearchContext";

function Coupons() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const { getCoupons, coupons, deleteCoupon } = CouponStore();

  useEffect(() => {
    getCoupons();
  }, []);

  const handleUpdate = (coupon) => {
    setSelectedCoupon(coupon);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu kuponni o'chirishni xohlaysizmi?")) {
      deleteCoupon(id);
    }
  };

  const handleAddNew = () => {
    setSelectedCoupon(null);
    setShowModal(true);
  };

  // searching items
  const { query } = useSearch();

  const filtered = coupons.filter((p) =>
    p?.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNew}
        sx={{ mb: 2 }}
      >
        Kupon qo‘shish
      </Button>

      {showModal && (
        <AddCoupon
          open={showModal}
          onClose={() => setShowModal(false)}
          selectedCoupon={selectedCoupon}
        />
      )}

      {filtered.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Kupon kodi</TableCell>
                <TableCell>Chegirma</TableCell>
                <TableCell>Minimal summa</TableCell>
                <TableCell>Foydalanish limiti</TableCell>
                <TableCell>Tugash sanasi</TableCell>
                <TableCell>Holati</TableCell>
                <TableCell align="center">Amallar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((coupon, index) => (
                <TableRow key={coupon.id || index} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{coupon.code}</TableCell>
                  <TableCell>
                    {coupon.discount_value.toLocaleString()} so‘m
                  </TableCell>
                  <TableCell>
                    {coupon.min_order_amount.toLocaleString()} so‘m
                  </TableCell>
                  <TableCell>{coupon.usage_limit}</TableCell>
                  <TableCell>
                    {new Date(coupon.end_date).toLocaleString("uz-UZ")}
                  </TableCell>
                  <TableCell>{coupon.status}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="O'zgartirish">
                      <IconButton
                        color="primary"
                        onClick={() => handleUpdate(coupon)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="O'chirish">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(coupon?.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            color: "text.secondary",
          }}
        >
          <img
            src="../noCategory.png"
            alt="Kupon mavjud emas"
            style={{ width: 200, opacity: 0.5 }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Hozircha kuponlar mavjud emas
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Coupons;
