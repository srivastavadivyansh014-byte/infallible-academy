
(function () {

  const requiredRole = document.body.dataset.requiredRole;

  const isLoggedIn =
    sessionStorage.getItem("ia_logged_in") === "true";

  const userRole =
    sessionStorage.getItem("ia_user_role");

  // Check login and role
  if (!isLoggedIn || userRole !== requiredRole) {
    sessionStorage.clear();
    window.location.replace("login.html");
    return;
  }

  // Display logged-in user's name
  const nameElement = document.getElementById("loggedInUserName");

  if (nameElement) {
    nameElement.textContent =
      sessionStorage.getItem("ia_user_name") || "User";
  }

  // Logout functionality
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      sessionStorage.clear();
      window.location.replace("login.html");
    });
  }

})();
