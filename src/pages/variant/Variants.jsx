import React, { useState } from "react";
import Specific from "./specific/Specific";
import "./Variants.css";

function Variants() {
  const [currentPage, setCurrentPage] = useState(true);

  return (
    <div className="variants-container">
      <div className="tab-content">
        <Specific />
      </div>
    </div>
  );
}

export default Variants;
