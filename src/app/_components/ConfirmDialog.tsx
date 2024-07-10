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
      className="absolute flex w-full items-center justify-center bg-white/80 p-4"
    >
      <form onSubmit={(e) => delFeed(e)}>
        <h2>Delete Echo?</h2>
        <label htmlFor="confirm">It can't be undone.</label>
        <button type="submit">Delete</button>
        <button
          type="button"
          onClick={() => setDialog({ isOpen: false, feedId: dialog.feedId })}
        >
          Cancel
        </button>
      </form>
    </dialog>
  );
}

export default ConfirmDialog;
