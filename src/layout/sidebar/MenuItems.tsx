import {
  IconLayoutDashboard,
  IconShoppingBag,
  IconPackage,
  IconUsers,
  IconCurrencyDollar,
  IconChartBar,
  IconListCheck,
  IconLogin,
  IconUserPlus,
  IconUsersGroup,
  IconRuler,
  IconAlertCircle,
  IconBuildingStore,
  IconHistory,
  IconArrowDown,
  IconArrowUp,
  IconAdjustments,
  IconTransfer,
  IconArrowsExchange,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "MAIN",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "LOCATIONS",
  },
  {
    id: uniqueId(),
    title: "Branches",
    icon: IconBuildingStore,
    href: "/branches",
  },
  {
    navlabel: true,
    subheader: "PRODUCTS",
  },
  {
    id: uniqueId(),
    title: "Categories",
    icon: IconListCheck,
    href: "/categories",
  },
  {
    id: uniqueId(),
    title: "Products",
    icon: IconShoppingBag,
    href: "/products",
  },
  {
    navlabel: true,
    subheader: "STOCK MANAGEMENT",
  },
  {
    id: uniqueId(),
    title: "Stock Entries",
    icon: IconArrowDown,
    href: "/stock-entries",
  },
  {
    id: uniqueId(),
    title: "Stock Outgoing",
    icon: IconArrowUp,
    href: "/stock-outgoing",
  },
  {
    id: uniqueId(),
    title: "Stock Transfer",
    icon: IconArrowsExchange,
    href: "/stock-transfer",
  },
  {
    navlabel: true,
    subheader: "STOCK OPERATIONS",
  },
  {
    id: uniqueId(),
    title: "Stock History",
    icon: IconHistory,
    href: "/stock-history",
  },
  {
    id: uniqueId(),
    title: "Adjustments",
    icon: IconAdjustments,
    href: "/adjustments",
  },
  {
    id: uniqueId(),
    title: "Stock Alerts",
    icon: IconAlertCircle,
    href: "/stock-alerts",
  },
  {
    navlabel: true,
    subheader: "SALES",
  },
  {
    id: uniqueId(),
    title: "Sales",
    icon: IconCurrencyDollar,
    href: "/sales",
  },
  {
    navlabel: true,
    subheader: "PARTNERS",
  },
  {
    id: uniqueId(),
    title: "Suppliers",
    icon: IconUsersGroup,
    href: "/suppliers",
  },
  {
    id: uniqueId(),
    title: "Customers",
    icon: IconUsers,
    href: "/customers",
  },
  {
    navlabel: true,
    subheader: "FINANCIAL",
  },
  {
    id: uniqueId(),
    title: "Transactions",
    icon: IconTransfer,
    href: "/transactions",
  },
  {
    navlabel: true,
    subheader: "REPORTS",
  },
  {
    id: uniqueId(),
    title: "Reports",
    icon: IconChartBar,
    href: "/reports",
  },
  {
    navlabel: true,
    subheader: "SETTINGS",
  },
  {
    id: uniqueId(),
    title: "Units",
    icon: IconRuler,
    href: "/units",
  },
  {
    navlabel: true,
    subheader: "AUTHENTICATION",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
];

export default Menuitems;
