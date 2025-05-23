import { Popcorn } from "lucide-react";
import React from "react";
import Products from "./products/Products";
import Orders from "./orders/Orders";

function Dashboard() {
  return (
    <div>
      <Orders />
      <Products />
    </div>
  );
}

export default Dashboard;
