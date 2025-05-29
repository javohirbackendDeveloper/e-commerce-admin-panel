import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import { X } from "lucide-react";
import { CouponStore } from "../../../stores/coupon.store";
import { CouponStatus } from "../../../constants/coupon.status";
import { toast } from "sonner";

function AddCoupon({ open, onClose, selectedCoupon }) {
  const { createCoupon, updateCoupon } = CouponStore();

  const [formData, setFormData] = useState({
    code: "",
    discount_value: "",
    min_order_amount: "",
    usage_limit: "",
    end_date: "",
    status: CouponStatus.FAOL,
  });

  const [loading, setLoading] = useState(false);

  // Formni selectedCoupon bo'yicha to'ldirish (update uchun)
  useEffect(() => {
    if (selectedCoupon) {
      setFormData({
        code: selectedCoupon.code || "",
        discount_value: selectedCoupon.discount_value || "",
        min_order_amount: selectedCoupon.min_order_amount || "",
        usage_limit: selectedCoupon.usage_limit || "",
        // Datetime-local formati uchun ISO stringni moslashtirish
        end_date: selectedCoupon.end_date
          ? new Date(selectedCoupon.end_date).toISOString().slice(0, 16)
          : "",
        status: selectedCoupon.status || CouponStatus.FAOL,
      });
    } else {
      // Yangi qo'shish bo'lsa, formni tozalash
      setFormData({
        code: "",
        discount_value: "",
        min_order_amount: "",
        usage_limit: "",
        end_date: "",
        status: CouponStatus.FAOL,
      });
    }
  }, [selectedCoupon, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        ...formData,
        discount_value: Number(formData.discount_value),
        min_order_amount: Number(formData.min_order_amount),
        usage_limit: Number(formData.usage_limit),
        end_date: new Date(formData.end_date + ":59").toISOString(),
      };

      const {
        code,
        discount_value,
        end_date,
        min_order_amount,
        status,
        usage_limit,
      } = data;

      if (
        !code ||
        !discount_value ||
        !end_date ||
        !min_order_amount ||
        !status ||
        !usage_limit
      ) {
        toast.error("Barcha maydonlar to'ldirilishi shart");
        setLoading(false);
        return;
      }

      if (selectedCoupon) {
        // Update qilish
        await updateCoupon(selectedCoupon.id, data);
      } else {
        // Yangi yaratish
        await createCoupon(data);
      }

      onClose();
    } catch (error) {
      console.error("Error saving coupon:", error);
      toast.error("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {selectedCoupon ? "Kuponni tahrirlash" : "Yangi Kupon Qo‘shish"}
          <IconButton onClick={() => onClose(false)}>
            <X size={20} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          margin="normal"
          fullWidth
          label="Kupon kodi"
          name="code"
          value={formData.code}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          type="number"
          label="Chegirma miqdori(so'mda)"
          name="discount_value"
          value={formData.discount_value}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          type="number"
          label="Minimal buyurtma summasi(so'mda)"
          name="min_order_amount"
          value={formData.min_order_amount}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          type="number"
          label="Foydalanish miqdori"
          name="usage_limit"
          value={formData.usage_limit}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          type="datetime-local"
          label="Tugash sanasi"
          name="end_date"
          InputLabelProps={{ shrink: true }}
          value={formData.end_date}
          onChange={handleChange}
        />
        <TextField
          select
          margin="normal"
          fullWidth
          label="Holati"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {Object.values(CouponStatus).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Bekor qilish</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCoupon;
