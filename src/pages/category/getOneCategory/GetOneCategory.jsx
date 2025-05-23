import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryStore } from "../../../stores/category.store";
import "./GetOneCategory.css";
import AddSubCategoryModal from "../addSubCategoryModal/AddSubCategoryModal";
import { Button } from "@mui/material";
import { Plus } from "lucide-react";

function GetOneCategory() {
  const { id } = useParams();
  const {
    getAllChildrenByParentCategory,
    allChildCategories,
    parentCategory,
    deleteCategory,
  } = CategoryStore();

  const [parentCat, setParentCat] = useState(parentCategory);
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddSubCategory = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Bu turkumni o‘chirishni xohlaysizmi?"
    );
    if (confirmDelete) {
      deleteCategory(id);
    }
  };

  useEffect(() => {
    getAllChildrenByParentCategory(id);
    setParentCat(parentCategory);
  }, [id, parentCategory]);

  const toggleExpand = (categoryId) => {
    setExpandedId(expandedId === categoryId ? null : categoryId);
  };

  return (
    <div className="category-page">
      {parentCategory && (
        <div className="parent-category">
          {parentCategory.icon && (
            <img src={parentCategory.icon} alt="Icon" className="parent-icon" />
          )}
          <h2 className="parent-title">{parentCategory.title}</h2>
          <Button
            className="add-subcategory-btn"
            onClick={() => handleAddSubCategory(parentCategory)}
          >
            <Plus />
          </Button>
        </div>
      )}

      <div className="child-categories">
        {(allChildCategories.length > 0 &&
          allChildCategories.map((cat) => (
            <div
              key={cat.id}
              className={`category-card ${
                expandedId === cat.id ? "expanded" : ""
              }`}
            >
              <div className="category-header">
                <span>{cat.title}</span>
                <div className="category-actions">
                  <button
                    className="expand-btn"
                    onClick={() => handleAddSubCategory(cat)}
                    title="Subturkum qo‘shish"
                  >
                    <Plus size={15} />
                  </button>
                  <button
                    className="expand-btn"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowModal(true);
                    }}
                    title="Yangilash"
                  >
                    ✎
                  </button>
                  <button
                    className="expand-btn"
                    onClick={() => handleDelete(cat.id)}
                    title="O‘chirish"
                  >
                    🗑
                  </button>
                  <button
                    className="expand-btn"
                    onClick={() => toggleExpand(cat.id)}
                    title="Ochish/Yopish"
                  >
                    {expandedId === cat.id ? "▲" : "▼"}
                  </button>
                </div>
              </div>

              {expandedId === cat.id && (
                <div className="category-details">
                  <p>Children (dynamic load in future)</p>
                </div>
              )}
            </div>
          ))) || (
          <div className="notFoundCategory">
            <img src="../noCategory.png" alt="no category" />
            <h4>Bu turkumda hozricha ichki turkum qo'shilmagan</h4>
          </div>
        )}
      </div>

      {showModal && (
        <AddSubCategoryModal
          setShowModal={setShowModal}
          showAddModal={showModal}
          parentCategory={selectedCategory}
        />
      )}
    </div>
  );
}

export default GetOneCategory;
