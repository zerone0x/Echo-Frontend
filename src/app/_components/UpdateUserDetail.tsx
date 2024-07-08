function UpdateUserDetail({ isOpen, setOpenDialog }) {
  return (
    <dialog open={isOpen}>
      <form method="dialog" className="flex flex-col gap-4">
        <button onClick={() => setOpenDialog(false)}>X</button>
        <h2>Update User Details</h2>
        <label htmlFor="banner" />
        <input
          type="file"
          id="banner"
          name="banner"
          accept="image/*"
          className="input"
        />
        <label htmlFor="avatar" />
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          className="input"
        />
        <label htmlFor="name" className="text-xl">
          Name
        </label>
        <input type="text" id="name" name="name" className="input" required />
        <label htmlFor="bio" className="text-xl">
          Bio
        </label>
        <textarea id="bio" name="bio" className="input"></textarea>
        <button type="submit">Save</button>
      </form>
    </dialog>
  );
}

export default UpdateUserDetail;
