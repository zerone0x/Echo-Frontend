import { useQueryClient } from "react-query";
import { DeleteFeedById } from "../_services/fetchDataAPI";
import { useState } from "react";

function ConfirmDialog({
  dialog,
  setDialog,
  dialogAction,
  loading,
}: {
  dialog: any;
  setDialog: any;
  dialogAction: any;
  loading: boolean;
}) {
  const queryClient = useQueryClient();
  async function delFeed(e: any) {
    e.preventDefault();
    dialogAction();
    // toast.success("Echo deleted successfully!");
  }
  return (
    <dialog
      open={dialog.isOpen}
      className="absolute inset-0 rounded-lg bg-white p-5 sm:max-w-lg"
    >
      <form onSubmit={(e) => delFeed(e)} className="flex flex-col gap-4 px-4">
        <div className="space-y-4 text-center">
          <h2>Delete Echo?</h2>
          <span>It can't be undone.</span>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setDialog({ isOpen: false, feedId: dialog.feedId })}
            className=""
          >
            Cancel
          </button>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default ConfirmDialog;
