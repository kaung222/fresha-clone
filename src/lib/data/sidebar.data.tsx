import IconBookPlus from "@/components/icons/IconBookPlus";
import IconCalendar from "@/components/icons/IconCalendar";
import IconCalendarCheck from "@/components/icons/IconCalendarCheck";
import IconChart from "@/components/icons/IconChart";
import IconChat from "@/components/icons/IconChat";
import IconGear from "@/components/icons/IconGear";
import IconGraduate from "@/components/icons/IconGradurate";
import IconInvoice from "@/components/icons/IconInvoice";
import IconPill from "@/components/icons/IconPill";
import IconProfile from "@/components/icons/IconProfile";
import IconService from "@/components/icons/IconService";
import IconTruck from "@/components/icons/IconTruck";
import IconUsers from "@/components/icons/IconUsers";
import { MessageCircle } from "lucide-react";

export const sidebar_items = [
  {
    name: "Dashboard",
    icon: <IconChart className="size-5 group-hover:stroke-button " />,
    link: "/",
  },

  {
    name: "Appointments",
    icon: <IconCalendarCheck />,
    link: "/appointments",
  },
  {
    name: "Doctors",
    icon: <IconGraduate />,
    link: "/doctors",
  },
  {
    name: "Services",
    icon: <IconService />,
    link: "/services",
  },
  {
    name: "Blogs",
    icon: <IconBookPlus />,
    link: "/blogs",
  },

  {
    name: "Pharmacy",
    icon: <IconPill />,
    link: "/medicines",
  },

  {
    name: "Orders",
    icon: <IconTruck />,
    link: "/orders",
  },
  {
    name: "Invoices",
    icon: <IconInvoice />,
    link: "/invoices",
  },

  {
    name: "Message",
    icon: <IconChat />,
    link: "/messages",
  },
  {
    name: "Profile",
    icon: <IconProfile />,
    link: "/profile",
  },
  {
    name: "Setting",
    icon: <IconGear />,
    link: "/setting",
  },
];

export const sideBarItems = [
  {
    name: "Overview",
    items: [
      {
        name: "Dashboard",
        icon: (
          <IconChart className="size-5 group-hover:stroke-button " />
        ),
        link: "/",
      },
      {
        name: "Analytics",
        icon: (
          <IconCalendar className="size-5 group-hover:stroke-button " />
        ),
        link: "/analytics",
      },
    ],
  },

  {
    name: "Main",
    items: [
      {
        name: "Appointments",
        icon: <IconCalendarCheck />,
        link: "/appointments",
      },
      // {
      //   name: "Time Table",
      //   icon: <IconCalendarCheck />,
      //   link: "/timeline",
      // },

      {
        name: "Orders",
        icon: <IconTruck />,
        link: "/orders",
      },
      {
        name: "Invoices",
        icon: <IconInvoice />,
        link: "/invoices",
      },
    ],
  },

  {
    name: "Manage",
    items: [
      {
        name: "Doctors",
        icon: <IconGraduate />,
        link: "/doctors",
      },
      {
        name: "Services",
        icon: <IconService />,
        link: "/services",
      },
      {
        name: "Blogs",
        icon: <IconBookPlus />,
        link: "/blogs",
      },

      {
        name: "Products",
        icon: <IconPill />,
        link: "/products",
      },
    ],
  },

  {
    name: "communication",
    items: [
      {
        name: "Message",
        icon: <MessageCircle />,
        link: "/messages",
      },
    ],
  },
  {
    name: "Account",
    items: [
      {
        name: "Profile",
        icon: <IconProfile />,
        link: "/profile",
      },
      {
        name: "Setting",
        icon: <IconGear />,
        link: "/setting",
      },
    ],
  },
];
