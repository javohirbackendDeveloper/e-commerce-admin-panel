import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AddProductModal from "./addProductModal/AddProductModal";
import "./Product.css";
import { ProductStore } from "../../stores/product.store";
import ImageModal from "./imageModal/ImageModal";

function Product() {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageModal, setImageModal] = useState(false);

  // store functions
  const { getProducts, allProduct, deleteProduct } = ProductStore();

  useEffect(() => {
    getProducts();
  }, []);

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Bu mahsulotni o'chirishni xohlaysizmi");
    if (confirm) {
      deleteProduct(id);
    }
  };

  // open image modal

  const handleImageClicked = (product) => {
    setImageModal(true);
    setProduct(product);
  };
  return (
    <div className="product-page">
      <Button
        onClick={() => {
          setShowModal(true), setSelectedProduct(null);
        }}
        className="add-btn"
      >
        Mahsulot qo'shish
      </Button>

      {showModal && (
        <AddProductModal
          setShowModal={setShowModal}
          showModal={showModal}
          selectedProduct={selectedProduct}
        />
      )}
      {imageModal && (
        <ImageModal
          product={product}
          open={imageModal}
          onClose={setImageModal}
        />
      )}

      {(allProduct.length > 0 && (
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Rasm</th>
                <th>Nomi</th>
                <th>Turkum</th>
                <th>Brand</th>
                <th>Soni</th>
                <th>Narxi</th>
                <th>Status</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {allProduct.length > 0 &&
                allProduct.map((product) => (
                  <tr key={product.id}>
                    <td onClick={() => handleImageClicked(product)}>
                      <img
                        src={product.product_images[0]?.imageUrl}
                        alt={product.product_name}
                      />
                    </td>
                    <td>{product.product_name}</td>
                    <td>{product.category?.title}</td>
                    <td>{product.brand?.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price.toLocaleString()} so'm</td>
                    <td>{product.product_status}</td>
                    <td className="actions">
                      <button onClick={() => handleUpdate(product)}>
                        O'zgartirish
                      </button>
                      <button onClick={() => handleDelete(product.id)}>
                        O'chirish
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )) || (
        <div className="notFoundCategory">
          <img src="../noCategory.png" alt="no category" />
          <h4>Mahsulotlar mavjud emas</h4>
        </div>
      )}
    </div>
  );
}

export default Product;
