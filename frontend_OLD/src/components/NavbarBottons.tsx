import type { ReactNode } from "react";
import type { UserType } from "../models/User";
import { BsFileEarmarkBarGraphFill, BsFillBoxSeamFill } from "react-icons/bs";
import { FaCalendarDays, FaPills } from "react-icons/fa6";

const navbarTitle = {
  inventory: 'Inventory',
  medication: 'Medication',
  reports: 'Reports',
  visits: 'Visits',
} as const;

const navbarRoutes = {
  inventory: '/inventory',
  medication: '/medication',
  reports: '/reports',
  visits: '/visits',
} as const;

export type NavbarButtonsType = {
  title: (typeof navbarTitle)[keyof typeof navbarTitle];
  route: (typeof navbarRoutes)[keyof typeof navbarRoutes];
  allowedRoles: UserType[];
  icon: ReactNode;
};

const navbarButtons: NavbarButtonsType[] = [
  {
    title: 'Inventory',
    route: '/inventory',
    allowedRoles: ['DESK'],
    icon: <BsFillBoxSeamFill />
  }, {
    title: 'Medication',
    route: '/medication',
    allowedRoles: ['CLIENT'],
    icon: <FaPills />
  }, {
    title: 'Reports',
    route: '/reports',
    allowedRoles: ['DESK'],
    icon: <BsFileEarmarkBarGraphFill />
  }, {
    title: 'Visits',
    route: '/visits',
    allowedRoles: ['CLIENT', 'DOCTOR'],
    icon: <FaCalendarDays />
  }
];

export default navbarButtons;