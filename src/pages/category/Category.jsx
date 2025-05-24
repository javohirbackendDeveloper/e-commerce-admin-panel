import React, { useEffect } from "react";
import { CategoryStore } from "../../stores/category.store";
import "./Category.css";
import { Button } from "@mui/material";
import { useState } from "react";
import AddCategoryModal from "./addCategoryModal/AddCategoryModal";
import { useNavigate } from "react-router-dom";

function Category() {
  const {
    getAllParentCategories,
    allCategories,
    deleteCategory,
    setParentCategory,
  } = CategoryStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  //  delete parent category

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "!!! Agar bu turkumni o'chirsangiz uni ichki turkumlari ham o'chib ketadi,o'chirishni xohlaysizmi"
    );
    if (confirm) {
      deleteCategory(id);
    }
  };

  // get all parent categories
  useEffect(() => {
    getAllParentCategories();
  }, []);

  const handleRowClick = (category, e) => {
    if (e.target.closest(".action-btn")) return;

    setParentCategory(category);
    navigate("/getOneCategory/" + category.id);
  };

  return (
    <div className="category">
      <Button
        className="addCatBtn"
        onClick={() => setShowAddModal(!showAddModal)}
      >
        Turkum qo'shish
      </Button>
      <h2>Asosiy turkumlar</h2>
      <table className="category-table">
        {(allCategories.length > 0 && (
          <>
            <thead>
              <tr>
                <th>No</th>
                <th>Icon</th>
                <th>Nomi</th>
                <th>Ichki turkumlar</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {allCategories.length > 0 &&
                allCategories.map((category, index) => (
                  <tr
                    key={category.id}
                    onClick={(e) => handleRowClick(category, e)}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={category.icon}
                        alt="icon"
                        className="category-icon"
                      />
                    </td>
                    <td>{category.title}</td>
                    <td>{category.children || 0}</td>
                    <td>
                      <button
                        className="action-btn update"
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowAddModal(true);
                        }}
                      >
                        Yangilash
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(category.id)}
                      >
                        O‘chirish
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        )) || (
          <div className="notFoundCategory">
            <img src="../noCategory.png" alt="no category" />
            <h4>Bu turkumga hozircha ichki turkum qo'shilmagan</h4>
          </div>
        )}
      </table>
      {showAddModal && (
        <AddCategoryModal
          setShowModal={setShowAddModal}
          showAddModal={showAddModal}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </div>
  );
}

export default Category;
