import { FaBookmark, FaReply, FaStar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";

// TODO format data into variable
// then map to display
function EchoItem({ content }) {
  return (
    <div>
      <span>{content}</span>
      <div>
        <button>
          <FaReply />
        </button>
        <button>
          <BiRepost />
        </button>
        <button>
          <FaStar />
        </button>
        <button>
          <FaBookmark />
        </button>
        <button>
          <IoIosMore />
        </button>
      </div>
    </div>
  );
}

export default EchoItem;
