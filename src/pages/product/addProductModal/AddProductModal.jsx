import React, { useState, useEffect } from "react";
import "./AddProductModal.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import { X } from "lucide-react";

import { FilterStore } from "../../../stores/filter.store";
import { CategoryStore } from "../../../stores/category.store";
import { BrandStore } from "../../../stores/brand.store";
import { ProductStore } from "../../../stores/product.store";
import { toast } from "sonner";
import { colors } from "../../../constants/colors";

function AddProductModal({ setShowModal, showModal, selectedProduct }) {
  const [images, setImages] = useState([null, null, null, null, null]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(
    selectedProduct?.brandId || ""
  );
  const [filters, setFilters] = useState(selectedProduct?.filters || {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getAllLeafCategory, leafCategories } = CategoryStore();
  const { getBrandsByCategoryId, brandByCategory } = BrandStore();
  const { getFiltersByCatId, productFilters, createProduct, updateProduct } =
    ProductStore();

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    getAllLeafCategory();
    if (selectedProduct?.categoryId) {
      handleGetFilters(selectedProduct.categoryId);
    }
  }, []);

  const handleGetFilters = async (categoryId) => {
    setLoadingBrands(true);
    await getBrandsByCategoryId(categoryId);
    await getFiltersByCatId(categoryId);
    setLoadingBrands(false);
  };

  const handleFilterChange = (
    filterTitle,
    value,
    isCheckbox = false,
    checked
  ) => {
    setFilters((prev) => {
      if (isCheckbox) {
        const current = prev[filterTitle] || [];
        if (checked) {
          return { ...prev, [filterTitle]: [...current, value] };
        } else {
          return { ...prev, [filterTitle]: current.filter((v) => v !== value) };
        }
      } else {
        return { ...prev, [filterTitle]: value };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { color = [], ...otherFilters } = filters;

    try {
      const productData = {
        product_name: e.target.product_name.value,
        description: e.target.description.value,
        price: +e.target.price.value,
        oldPrice: +e.target.oldPrice.value,
        quantity: +e.target.quantity.value,
        categoryId: e.target.category.value,
        brandId: selectedBrand.toString(),
        filters: otherFilters,
        color,
      };

      if (selectedProduct) {
        await updateProduct(selectedProduct.id, productData);
      } else {
        if (!images.some((img) => img !== null)) {
          toast.error("Kamida 1 ta rasm yuklanishi shart");
          return;
        }
        await createProduct(images, productData);
      }

      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={showModal} onClose={handleClose} maxWidth="md" fullWidth>
      <div className="modal-header">
        <DialogTitle>
          {selectedProduct ? "✅ Mahsulotni yangilash" : "🛒 Mahsulot qo'shish"}
        </DialogTitle>
        <IconButton onClick={handleClose} className="close-btn">
          <X />
        </IconButton>
      </div>
      <DialogContent>
        <form className="add-product-form" onSubmit={handleSubmit}>
          {!selectedProduct && (
            <div className="image-inputs">
              {images.map((img, idx) => (
                <label key={idx} className="image-box">
                  {img ? (
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Image ${idx + 1}`}
                    />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const updated = [...images];
                        updated[idx] = file;
                        setImages(updated);
                      }
                    }}
                    hidden
                  />
                </label>
              ))}
            </div>
          )}

          <div className="form-fields">
            <TextField
              label="Mahsulot nomi"
              name="product_name"
              fullWidth
              required
              defaultValue={selectedProduct?.product_name || ""}
            />
            <TextField
              label="Tavsif"
              name="description"
              multiline
              rows={3}
              fullWidth
              required
              defaultValue={selectedProduct?.description || ""}
              inputProps={{ minLength: 30, maxLength: 500 }}
              helperText="Tavsif kamida 30 ta belgi bo'lishi kerak"
            />

            {colors.length > 0 && (
              <div className="color-checkboxes-wrapper">
                <p className="checkbox-title">
                  Mahsulotni qaysi ranglari mavjud?
                </p>
                <div className="color-checkboxes">
                  {colors.map((color) => (
                    <label key={color} className="checkbox-item">
                      <input
                        type="checkbox"
                        name="color"
                        value={color}
                        checked={filters?.color?.includes(color) || false}
                        onChange={(e) =>
                          handleFilterChange(
                            "color",
                            color,
                            true,
                            e.target.checked
                          )
                        }
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="price-quantity-row">
              <TextField
                label="Eski narxi (so'mda)"
                name="oldPrice"
                type="number"
                required
                defaultValue={selectedProduct?.oldPrice || ""}
              />
              <TextField
                label="Hozirgi narxi (so'mda)"
                name="price"
                type="number"
                required
                defaultValue={selectedProduct?.price || ""}
              />
              <TextField
                label="Soni"
                name="quantity"
                type="number"
                required
                defaultValue={selectedProduct?.quantity || ""}
              />
            </div>

            <TextField
              label="Turkum"
              name="category"
              select
              fullWidth
              required
              defaultValue={selectedProduct?.categoryId || ""}
              onChange={(e) => handleGetFilters(e.target.value)}
            >
              {leafCategories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.title}
                </MenuItem>
              ))}
            </TextField>

            {!loadingBrands && brandByCategory.length > 0 && (
              <TextField
                label="Brend"
                name="brand"
                select
                fullWidth
                required
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                {brandByCategory.map((item) => (
                  <MenuItem key={item?.brandId} value={item?.brandId}>
                    {item?.brand?.name}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {!loadingBrands &&
              productFilters.map((item) => (
                <TextField
                  key={item.filter.title}
                  label={item.filter.title}
                  name={item.filter.title}
                  select
                  fullWidth
                  required
                  value={filters[item.filter.title] || ""}
                  onChange={(e) =>
                    handleFilterChange(item.filter.title, e.target.value)
                  }
                >
                  {item.filter.values.map((v) => (
                    <MenuItem key={v.value} value={v.value}>
                      {v.value}
                    </MenuItem>
                  ))}
                </TextField>
              ))}

            {loadingBrands && (
              <p
                style={{
                  marginTop: "1rem",
                  fontStyle: "italic",
                  color: "#888",
                }}
              >
                Filtrlar yuklanmoqda...
              </p>
            )}
          </div>

          <div className="submit-row">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saqlanmoqda..."
                : selectedProduct
                ? "Yangilash"
                : "Saqlash"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProductModal;
