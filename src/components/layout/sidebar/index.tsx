import AdminLinks from "./AdminLinks";
import { LogOut } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common/Button";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const { logout, role } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await logout();
        navigate('/');
      } catch (error) {
        console.error("Logout failed:", error);
        // Still navigate even if logout fails
        navigate('/');
      }
    };

    let RoleLinks;
    switch (role) {
      case "super-admin":
        RoleLinks = <AdminLinks />;
        break;
      case "admin":
        RoleLinks = <AdminLinks />;
        break;
      default:
        RoleLinks = null;
    }

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-40 w-[15rem] h-screen transition-all duration-300 ease-in-out border-r dark:border-gray-600 border-gray-300",
        !isOpen ? "-translate-x-full" : "translate-x-0"
        // isExpanded ? "w-64" : "w-20"
      )}
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col py-4 bg-gray-100 dark:bg-gray-900">
            <div className="border-gray-200/10 border-b-2 pb-4 mb-6 px-3">
            <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white animate duration-500"
            >
                <span className="ml-3 text-lg">CHRONICLE CMS</span>
            </a>
            </div>

            <div className="flex-1 px-3 mt-4 pt-4 border-t border-gray-100/10 bg-gray-100 dark:bg-gray-900">
              <ul id="ul" className="space-y-2 font-medium">
                {RoleLinks}
              </ul>
            </div>
            
            <div className="px-3 pb-4 mt-auto">
              <Button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center gap-2"
              >
                <LogOut size={18} className="mt-1 mr-2" />
                <span>Logout</span>
              </Button>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;
