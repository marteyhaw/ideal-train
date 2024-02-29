import { SideNavItem } from "./definitions";
import {
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassIcon,
  ArrowPathRoundedSquareIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: ChartBarIcon,
  },
  {
    title: "Waybills",
    path: "/dashboard/waybills",
    icon: DocumentTextIcon,
    submenu: true,
    subMenuItems: [
      { title: "Search", path: "/dashboard/waybills" },
      { title: "Create", path: "/dashboard/waybills/create" },
    ],
  },
  {
    title: "Customers",
    path: "/dashboard/customers",
    icon: UserGroupIcon,
    submenu: true,
    subMenuItems: [
      { title: "Search", path: "/dashboard/customers" },
      { title: "Create", path: "/dashboard/customers/create" },
    ],
  },
  {
    title: "Manifests",
    path: "/dashboard/manifests",
    icon: DocumentDuplicateIcon,
    submenu: true,
    subMenuItems: [
      { title: "Search", path: "/dashboard/manifests" },
      { title: "Create", path: "/dashboard/manifests/create" },
    ],
  },
  {
    title: "Cargo Lookup",
    path: "/dashboard/cargos/lookup",
    icon: MagnifyingGlassIcon,
  },
  {
    title: "Status Update",
    path: "/dashboard/status/update",
    icon: ArrowPathRoundedSquareIcon,
  },
  {
    title: "Help",
    path: "/dashboard/help",
    icon: QuestionMarkCircleIcon,
  },
];
