import { useQueryClient } from "react-query";
import { DeleteFeedById } from "../_services/fetchDataAPI";

function ConfirmDialog({ dialog, setDialog, dialogAction }) {
  const queryClient = useQueryClient();
  async function delFeed(e: any) {
    e.preventDefault();
    dialogAction();
    // toast.success("Echo deleted successfully!");
  }
  return (
    <dialog
      open={dialog.isOpen}
      className="absolute inset-0 flex w-full items-center justify-center bg-white bg-opacity-50 p-4"
    >
      <form onSubmit={(e) => delFeed(e)} className="">
        <h2>Delete Echo?</h2>
        <label htmlFor="confirm">It can't be undone.</label>
        <div className="bg-gray-500">
          <button
            type="button"
            onClick={() => setDialog({ isOpen: false, feedId: dialog.feedId })}
            className="btn bg-gray-500"
          >
            Cancel
          </button>
          <button type="submit" className="btn">
            Delete
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default ConfirmDialog;
