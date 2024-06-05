import { FaHome } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoBookmarkSharp } from "react-icons/io5";
function Sidebar() {
  return (
    <div className="text-4xl flex flex-col">
      <button>
        <FaHome />
      </button>
      <button>
        <IoIosNotifications />
      </button>
      <button>
        <IoBookmarkSharp />
      </button>
    </div>
  );
}

export default Sidebar;
