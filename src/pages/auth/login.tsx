function login() {
  return (
    <body className="text-center space-y-5">
      <h1 className="text-lg text-green-300">Come on in!</h1>
      <div className="flex flex-col">
        <button>Sign in with Google</button>

        <button>Sign in with Github</button>
      </div>
      <form className="flex flex-col">
        <label htmlFor="email">
          Email
          <input type="email" id="email" name="email" />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" name="password" />
        </label>
        <button type="submit">Let's go →</button>
      </form>
    </body>
  );
}

export default login;
