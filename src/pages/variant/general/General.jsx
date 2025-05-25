import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import { Pencil, Trash2, Plus } from "lucide-react";
import AddModal from "../addModal/AddModal";
import { FilterStore } from "../../../stores/filter.store";
import "./General.css";
import AddValueModal from "../addValueModal/AddValueModal";
import { Link } from "react-router-dom";

function General() {
  const [showModal, setShowModal] = useState(false);
  const [showValueModal, setShowValueModal] = useState(false);
  const [editingFilter, setEditingFilter] = useState(null);
  const [selectedFilter, setSelectedValue] = useState("");
  const { getAllGeneralFilters, allGeneralFilters, deleteFilter } =
    FilterStore();

  useEffect(() => {
    getAllGeneralFilters();
  }, []);

  function findInputType(inputType) {
    if (inputType === "CHECKBOX") return <input type="checkbox" />;
    if (inputType === "RANGE") return <input type="range" />;
    return null;
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Bu filterni o'chirsangiz uni qiymatlari ham avtomatik o'chiriladi"
    );
    if (confirm) {
      await deleteFilter(id);
    }
  };

  return (
    <div className="general">
      <div className="general-header">
        <Button
          className="titleBtn"
          variant="contained"
          onClick={() => {
            setEditingFilter(null);
            setShowModal(true);
          }}
        >
          Umumiy Filter qo‘shish
        </Button>
      </div>

      {showModal && (
        <AddModal
          setShowModal={setShowModal}
          showModal={showModal}
          currentPage="Umumiy"
          editingFilter={editingFilter}
        />
      )}

      {showValueModal && (
        <AddValueModal
          setShowModal={setShowValueModal}
          showModal={showValueModal}
          selectedFilter={selectedFilter.id}
        />
      )}

      <div className="filter-table-wrapper">
        <table className="filter-table">
          {allGeneralFilters && allGeneralFilters.length > 0 ? (
            <>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Filter nomi</th>
                  <th>Filterdan foydalanish uslubi</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {allGeneralFilters.map((filter, index) => (
                  <tr key={filter.id}>
                    <td>{index + 1}</td>
                    <td className="linkTd">
                      <Link
                        to={`/getOneFilter/${filter.id}`}
                        className="linkText"
                      >
                        {filter.title}
                      </Link>
                    </td>
                    <td>{findInputType(filter.inputType)}</td>
                    <td className="action-icons">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => {
                          setSelectedValue(filter);
                          setShowValueModal(!showValueModal);
                        }}
                      >
                        <Plus size={18} />
                      </IconButton>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => {
                          setEditingFilter(filter);
                          setShowModal(true);
                        }}
                      >
                        <Pencil size={18} />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(filter.id)}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <div className="notFoundCategory">
              <img src="../noCategory.png" alt="no category" />
              <h4>Hozircha filterlar mavjud emas</h4>
            </div>
          )}
        </table>
      </div>
    </div>
  );
}

export default General;
