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
  const [selectedBrand, setSelectedBrand] = useState(null);

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

  //   update brand

  const updateBrand = (brand) => {
    setShowModal(!showModal);
    setSelectedBrand(brand);
  };

  return (
    <div className="brand">
      <Button className="addbtn" onClick={() => setShowModal(!showModal)}>
        Brend qo'shish
      </Button>
      <h2>Brendlar</h2>
      <table className="brand-table">
        {(allBrands.length > 0 && (
          <>
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
                  <td>{brand?.name}</td>
                  <td>
                    <select>
                      {brand?.categories.map((cat) => (
                        <option key={cat.id}>{cat?.category?.title}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="brand-action-btn brand-update"
                      onClick={() => updateBrand(brand)}
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
          </>
        )) || (
          <div className="notFoundCategory">
            <img src="../noCategory.png" alt="no category" />
            <h4>Hozircha brandlar qo'shilmagan</h4>
          </div>
        )}
      </table>
      {showModal && (
        <AddBrandModal
          setShowModal={setShowModal}
          showModal={showModal}
          selectedBrand={selectedBrand}
        />
      )}
    </div>
  );
}

export default Brand;
