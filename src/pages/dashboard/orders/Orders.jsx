import { Truck } from "lucide-react";
import React from "react";
import "./Orders.css"; // Stil faylini alohida ulaymiz

function Orders() {
  return (
    <div className="orders-page">
      <h2>Buyurtmalar</h2>
      <ul className="order-cards">
        <li className="order-card blue">
          <Truck />
          <span>Barcha buyurtmalar</span>
          <strong>jami: 20 ta</strong>
        </li>
        <li className="order-card red">
          <Truck />
          <span>Bekor qilingan buyurtmalar</span>
          <strong>jami: 6 ta</strong>
        </li>
        <li className="order-card yellow">
          <Truck />
          <span>To'lov qilinmagan buyurtmalar</span>
          <strong>jami: 5 ta</strong>
        </li>
        <li className="order-card green">
          <Truck />
          <span>To'lov qilingan buyurtmalar</span>
          <strong>jami: 3 ta</strong>
        </li>
        <li className="order-card orange">
          <Truck />
          <span>Jarayondagi buyurtmalar</span>
          <strong>jami: 2 ta</strong>
        </li>
        <li className="order-card purple">
          <Truck />
          <span>Jo'natilgan buyurtmalar</span>
          <strong>jami: 3 ta</strong>
        </li>
        <li className="order-card darkgreen">
          <Truck />
          <span>Yetkazib berilgan buyurtmalar</span>
          <strong>jami: 1 ta</strong>
        </li>
      </ul>
    </div>
  );
}

export default Orders;
