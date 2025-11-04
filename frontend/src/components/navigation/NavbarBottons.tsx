import type { ReactNode } from "react";
import type { TUserTypeEnumSchema } from "@models/schemas";
import { BsFileEarmarkBarGraphFill, BsFillBoxSeamFill } from "react-icons/bs";
import { FaCalendarDays, FaPills } from "react-icons/fa6";
import type { IconType } from "react-icons/lib";

const navbarTitle = {
  inventory: 'Inventory',
  medication: 'Medication',
  reports: 'Reports',
  visits: 'Visits',
} as const;

const navbarRoutes = {
  inventory: '/inventory',
  medication: '/services/medication',
  reports: '/reports',
  visits: '/visits',
} as const;

export type NavbarButtonsType = {
  title: (typeof navbarTitle)[keyof typeof navbarTitle];
  route: (typeof navbarRoutes)[keyof typeof navbarRoutes];
  allowedRoles: TUserTypeEnumSchema[];
  icon: IconType;
};

const navbarButtons: NavbarButtonsType[] = [
  {
    title: 'Inventory',
    route: '/inventory',
    allowedRoles: ['DESK', 'ADMIN'],
    icon: BsFillBoxSeamFill
  }, {
    title: 'Medication',
    route: '/services/medication',
    allowedRoles: ['CLIENT', 'ADMIN'],
    icon: FaPills
  }, {
    title: 'Reports',
    route: '/reports',
    allowedRoles: ['DESK', 'ADMIN'],
    icon: BsFileEarmarkBarGraphFill
  }, {
    title: 'Visits',
    route: '/visits',
    allowedRoles: ['CLIENT', 'DOCTOR', 'ADMIN'],
    icon: FaCalendarDays
  }
];

export default navbarButtons;