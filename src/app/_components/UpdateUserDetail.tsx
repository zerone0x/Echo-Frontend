function UpdateUserDetail({ isOpen, setOpenDialog }) {
  return (
    <dialog open={isOpen}>
      <form method="dialog">
        <button onClick={() => setOpenDialog(false)}>X</button>
        <h2>Update User Details</h2>
        <label htmlFor="banner" />
        <input type="file" id="banner" name="banner" accept="image/*" />
        <label htmlFor="avatar" />
        <input type="file" id="avatar" name="avatar" accept="image/*" />
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" name="bio"></textarea>
        <button type="submit">Save</button>
      </form>
    </dialog>
  );
}

export default UpdateUserDetail;
