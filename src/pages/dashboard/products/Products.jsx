import React from "react";
import { Popcorn } from "lucide-react";
import "./Products.css"; // Stil faylini chaqirishni unutmang!

function Products() {
  return (
    <div className="products">
      <p>Mahsulotlar</p>
      <ul className="cards">
        <li className="card-item">
          <Popcorn />
          <span>Barcha mahsulotlar</span>
          <span>jami: 10 ta</span>
        </li>
        <li className="card-item">
          <Popcorn />
          <span>Omborda yo'qolganlar</span>
          <span>jami: 3 ta</span>
        </li>
        <li className="card-item">
          <Popcorn />
          <span>Kam qolganlar</span>
          <span>jami: 2 ta</span>
        </li>
        <li className="card-item">
          <Popcorn />
          <span>Sotuvda mavjudlar</span>
          <span>jami: 5 ta</span>
        </li>
      </ul>
    </div>
  );
}

export default Products;
