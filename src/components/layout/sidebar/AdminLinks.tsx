import clsx from "clsx";
import {
  LayoutDashboardIcon,
  User,
  BarChart3,
  ClipboardList,
  Folder,
  FileText,
  BookOpen,
  Megaphone,
  AlertTriangle
} from "lucide-react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../../../contexts/AuthContext";

const AdminLinks = () => {
  const location = useLocation();
//   const { role } = useAuth();
//   const isSuperAdmin = role === "super-admin";
  
  const links = useMemo(
    () => {
      const baseLinks = [
        {
          icon: <LayoutDashboardIcon />,
          title: "Dashboard",
          link: "/dashboard",
        },
        {
          icon: <User />,
          title: "Users",
          link: "/dashboard/users",
        },
        {
          icon: <Folder />,
          title: "Categories",
          link: "/dashboard/categories",
        },
        {
          icon: <FileText />,
          title: "Articles",
          link: "/dashboard/articles",
        },
        {
          icon: <BookOpen />,
          title: "Stories",
          link: "/dashboard/stories",
        },
        {
          icon: <Megaphone />,
          title: "Breaking News",
          link: "/dashboard/breaking-news",
        },
        {
          icon: <BarChart3 />,
          title: "Reports",
          link: "/dashboard/reports",
        }
      ];
      
      
      return baseLinks;
    },
    []
  );
  
  return (
    <>
      {links.map((link, index) => (
        <li key={index}>
          <Link
            to={link.link}
            className={clsx(
              "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 animate duration-200",
              { "bg-blue-300/40 dark:bg-gray-300/40": link.link === location.pathname }
            )}
          >
            {link.icon}
            <span className="ml-3">{link.title}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

export default AdminLinks;
