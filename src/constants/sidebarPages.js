import { ListTree } from "lucide-react";
import { Variable } from "lucide-react";
import { ListOrdered } from "lucide-react";
import { Image } from "lucide-react";
import { Bell } from "lucide-react";
import { Coins } from "lucide-react";
import { FileType } from "lucide-react";
import { Slack } from "lucide-react";
import { ChartBarStacked } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import Dashboard from "../pages/dashboard/Dashboard";
import Product from "../pages/product/Product";
import { Popcorn } from "lucide-react";

export const Pages = [
  {
    id: 1,
    name: "Asosiy panel",
    component: Dashboard,
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    name: "Turkumlar",
    component: Dashboard,
    url: "/category",
    icon: ChartBarStacked,
  },
  {
    id: 3,
    name: "Ichki turkumlar",
    component: Dashboard,
    url: "/subCategory",
    icon: ListTree,
  },
  {
    id: 4,
    name: "Brendlar",
    component: Dashboard,
    url: "/brands",
    icon: Slack,
  },
  {
    id: 5,
    name: "Variant turlar",
    component: Dashboard,
    url: "/variantType",
    icon: FileType,
  },
  {
    id: 6,
    name: "Variantlar",
    component: Dashboard,
    url: "/variants",
    icon: Variable,
  },
  {
    id: 7,
    name: "Mahsulotlar",
    component: Product,
    url: "/products",
    icon: Popcorn,
  },
  {
    id: 8,
    name: "Buyurtmalar",
    component: Dashboard,
    url: "/orders",
    icon: ListOrdered,
  },
  {
    id: 9,
    name: "Kuponlar",
    component: Dashboard,
    url: "/coupons",
    icon: Coins,
  },
  {
    id: 10,
    name: "Posterlar",
    component: Dashboard,
    url: "/posters",
    icon: Image,
  },
  {
    id: 11,
    name: "Bildirishnomalar",
    component: Dashboard,
    url: "/notifications",
    icon: Bell,
  },
];
