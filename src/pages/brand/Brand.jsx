import React, { useEffect } from "react";
import { BrandStore } from "../../stores/brand.store";
import { Pencil, Trash2 } from "lucide-react";
import "./Brand.css";
import { Button } from "@mui/material";
import { useState } from "react";
import AddBrandModal from "./addBrandModal/AddBrandModal";
import { CategoryStore } from "../../stores/category.store";
function Brand() {
  const { getAllBrands, allBrands, deleteBrand } = BrandStore();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getAllBrands();
  }, []);

  //   deleting brand

  const handleDelete = (id) => {
    const confirm = window.confirm("Bu brandni o'chirishni xohlaysizmi");
    if (confirm) {
      deleteBrand(id);
    }
  };

  return (
    <div className="brand">
      <Button className="addbtn" onClick={() => setShowModal(!showModal)}>
        Brend qo'shish
      </Button>
      <h2>Brendlar</h2>
      <table className="brand-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Brand nomi</th>
            <th>Turkum nomi</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {allBrands?.map((brand, index) => (
            <tr key={brand.id}>
              <td>{index + 1}</td>
              <td>{brand.name}</td>
              <td>{brand.category?.title || "No Category"}</td>
              <td>
                <button
                  className="brand-action-btn brand-update"
                  onClick={() => console.log("Update", brand.id)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="brand-action-btn brand-delete"
                  onClick={() => handleDelete(brand.id)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <AddBrandModal setShowModal={setShowModal} showModal={showModal} />
      )}
    </div>
  );
}

export default Brand;
