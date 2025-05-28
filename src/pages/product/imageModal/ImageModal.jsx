import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Box,
  Avatar,
} from "@mui/material";
import { Close, Delete, ChevronLeft, ChevronRight } from "@mui/icons-material";
import "./ImageModal.css";
import { ProductStore } from "../../../stores/product.store";

const ImageModal = ({ product, open, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product?.product_images || [];
  const { deleteImage, uploadImage } = ProductStore();

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleDelete = (index) => {
    const confirm = window.confirm("BU rasmni o'chirishni xohlaysizmi?");
    if (confirm) {
      deleteImage(images[index]?.id);
      if (index === currentImageIndex && images.length > 1) {
        setCurrentImageIndex(Math.max(0, currentImageIndex - 1));
      }
      setTimeout(() => {
        onClose(false);
      }, 4000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage({ product_images: file, productId: product.id });
      setTimeout(() => {
        onClose(false);
      }, 4000);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      maxWidth="md"
      fullWidth
      classes={{ paper: "image-modal-paper" }}
      className="imageModal"
    >
      <DialogTitle>
        <Box className="image-modal-title-box">
          <span>Mahsulot rasmlari</span>
          <IconButton onClick={() => onClose(false)} size="large">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box className="image-container">
          {images.length > 0 ? (
            <Box position="relative">
              <img
                src={images[currentImageIndex]?.imageUrl}
                alt={`Product ${currentImageIndex + 1}`}
                className="main-image"
              />
              <IconButton
                onClick={() => handleDelete(currentImageIndex)}
                size="large"
                className="delete-button"
              >
                <Delete color="error" />
              </IconButton>
            </Box>
          ) : (
            <Box textAlign="center" width="100%">
              <p>Hech qanday rasm mavjud emas</p>
            </Box>
          )}

          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                className="nav-button"
                size="large"
                style={{ left: 16 }}
                aria-label="Previous image"
              >
                <ChevronLeft fontSize="large" />
              </IconButton>
              <IconButton
                onClick={handleNext}
                className="nav-button"
                size="large"
                style={{ right: 16 }}
                aria-label="Next image"
              >
                <ChevronRight fontSize="large" />
              </IconButton>
            </>
          )}
        </Box>

        <Box className="thumbnails-box">
          {images.map((img, index) => (
            <Avatar
              key={index}
              src={img.imageUrl}
              variant="rounded"
              onClick={() => setCurrentImageIndex(index)}
              className={`thumbnail-avatar ${
                index === currentImageIndex ? "selected" : ""
              }`}
              alt={`Thumbnail ${index + 1}`}
            />
          ))}

          {images.length < 5 && (
            <label htmlFor="upload-image">
              <input
                id="upload-image"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <Avatar variant="rounded" className="upload-avatar">
                <span>Yuklang</span>
                <span>{images.length + 1}-rasm</span>
              </Avatar>
            </label>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
