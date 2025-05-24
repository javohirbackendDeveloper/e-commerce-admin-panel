import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CategoryStore } from "../../../stores/category.store";
import "./GetOneCategory.css";
import AddSubCategoryModal from "../addSubCategoryModal/AddSubCategoryModal";
import Button from "@mui/material/Button";
import { Plus } from "lucide-react";
import { ArrowBigLeft } from "lucide-react";

function GetOneCategory() {
  const { id } = useParams();
  const {
    getAllChildrenByParentCategory,
    allChildCategories,
    parentCategory,
    setParentCategory,
    deleteCategory,
  } = CategoryStore();

  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleAddSubCategory = (category) => {
    setParentCategory(category);
    setSelectedCategory(null);
    setShowModal(true);
  };

  // deleting parent category

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
  }, [id]);

  // go back function
  const handleBackNavigate = () => {
    navigate(-1);
  };
  return (
    <div className="category-page">
      <ArrowBigLeft
        size={30}
        className="backIcon"
        onClick={handleBackNavigate}
      />
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
                expandedId === cat?.id ? "expanded" : ""
              }`}
              onClick={() => navigate(`/getOneCategory/${cat.id}`)}
            >
              <div className="category-header">
                <span>{cat.title}</span>

                <div className="category-actions">
                  <button
                    className="expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddSubCategory(cat);
                    }}
                    title="Subturkum qo‘shish"
                  >
                    <Plus size={15} />
                  </button>
                  <button
                    className="expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(cat);
                      setShowModal(true);
                    }}
                    title="Yangilash"
                  >
                    ✎
                  </button>
                  <button
                    className="expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(cat.id);
                    }}
                    title="O‘chirish"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))) || (
          <div className="notFoundCategory">
            <img src="../noCategory.png" alt="no category" />
            <h4>Bu turkumga hozircha ichki turkum qo'shilmagan</h4>
          </div>
        )}
      </div>

      {showModal && (
        <AddSubCategoryModal
          setShowModal={setShowModal}
          showAddModal={showModal}
          parentCategory={parentCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </div>
  );
}

export default GetOneCategory;
