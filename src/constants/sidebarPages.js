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
import Brand from "../pages/brand/Brand";
import Variants from "../pages/variant/Variants";
import Coupons from "../pages/coupons/Coupons";
import Poster from "../pages/poster/Poster";

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
    id: 4,
    name: "Brendlar",
    component: Brand,
    url: "/brands",
    icon: Slack,
  },
  {
    id: 5,
    name: "Filterlar",
    component: Variants,
    url: "/variants",
    icon: Variable,
  },
  {
    id: 6,
    name: "Mahsulotlar",
    component: Product,
    url: "/products",
    icon: Popcorn,
  },
  {
    id: 7,
    name: "Buyurtmalar",
    component: Dashboard,
    url: "/orders",
    icon: ListOrdered,
  },
  {
    id: 8,
    name: "Kuponlar",
    component: Coupons,
    url: "/coupons",
    icon: Coins,
  },
  {
    id: 9,
    name: "Posterlar",
    component: Poster,
    url: "/poster",
    icon: Image,
  },
  {
    id: 10,
    name: "Bildirishnomalar",
    component: Dashboard,
    url: "/notifications",
    icon: Bell,
  },
];
