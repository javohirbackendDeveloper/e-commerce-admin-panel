import React, { useState } from "react";
import General from "./general/General";
import Specific from "./specific/Specific";
import "./Variants.css"; // Styling faylini alohida yozamiz

function Variants() {
  const [currentPage, setCurrentPage] = useState(true);

  return (
    <div className="variants-container">
      <div className="tab-buttons">
        <button
          className={`tab-btn ${currentPage ? "active" : ""}`}
          onClick={() => setCurrentPage(true)}
        >
          Umumiy Filterlar
        </button>
        <button
          className={`tab-btn ${!currentPage ? "active" : ""}`}
          onClick={() => setCurrentPage(false)}
        >
          Maxsus Filterlar
        </button>
      </div>

      <div className="tab-content">
        {currentPage ? <General /> : <Specific />}
      </div>
    </div>
  );
}

export default Variants;
