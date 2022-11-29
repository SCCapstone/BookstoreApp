export default function NavBarBtns({ isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <div>
        <h1>Hello love</h1>
      </div>
    );
  } else {
    return (
      <div className="button">
        <a href="/signup" class="button-solid signup">
          Sign up
        </a>

        <a href="/login" class="button-solid login">
          Login
        </a>
      </div>
    );
  }
}
