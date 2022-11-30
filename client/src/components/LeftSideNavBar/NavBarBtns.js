export default function NavBarBtns({ isLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (isLoggedIn) {
    return (
      <div>
        <button onClick={handleLogout} class="button-solid signup">
          Logout
        </button>
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
