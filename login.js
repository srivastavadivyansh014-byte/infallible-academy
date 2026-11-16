
// =====================================
// INFALLIBLE ACADEMY LOGIN SYSTEM
// =====================================

const LOGIN_API_URL = "https://script.google.com/macros/s/AKfycbxVUcJqMKDtTB9OaYYImFg52aFN3nsHXqdbTrOA6k7MGJ1TfhTxNvKsiCYahxyf_5apmQ/exec";

const loginForm = document.getElementById("iaLoginForm");
const loginMessage = document.getElementById("loginMessage");
const loginButton = loginForm
  ? loginForm.querySelector('button[type="submit"]')
  : null;

// Show login messages
function showLoginMessage(message, type = "error") {
  loginMessage.textContent = message;
  loginMessage.className = "login-message " + type;
}

// JSONP request to Google Apps Script
function verifyLogin(email, password, role) {
  return new Promise((resolve, reject) => {

    const callbackName =
      "iaLoginCallback_" + Date.now() + "_" +
      Math.floor(Math.random() * 100000);

    const script = document.createElement("script");

    const params = new URLSearchParams({
      email: email,
      password: password,
      role: role,
      callback: callbackName
    });

    let finished = false;

    function cleanup() {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      delete window[callbackName];
      clearTimeout(timeout);
    }

    function finish(callback, value) {
      if (finished) return;

      finished = true;
      cleanup();
      callback(value);
    }

    window[callbackName] = function(response) {
      finish(resolve, response);
    };

    script.onerror = function() {
      finish(reject, new Error("Unable to connect. Please try again."));
    };

    const timeout = setTimeout(() => {
      finish(reject, new Error("Request timed out. Please try again."));
    }, 15000);

    script.src = LOGIN_API_URL + "?" + params.toString();

    document.body.appendChild(script);
  });
}

// Handle login form
if (loginForm) {

  loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail")
      .value.trim();

    const password = document.getElementById("loginPassword")
      .value;

    const selectedRole = document.querySelector(
      'input[name="loginRole"]:checked'
    );

    if (!selectedRole) {
      showLoginMessage("Please select a login type.");
      return;
    }

    // Existing HTML uses "user" for student.
    const role = selectedRole.value === "admin"
      ? "admin"
      : "student";

    showLoginMessage("Verifying your account...", "loading");

    loginButton.disabled = true;
    loginButton.querySelector("span").textContent = "Please wait...";

    try {

      const response = await verifyLogin(
        email,
        password,
        role
      );

      if (response.success) {

        sessionStorage.setItem("ia_logged_in", "true");
        sessionStorage.setItem("ia_user_role", response.role);
        sessionStorage.setItem("ia_user_name", response.name);
        sessionStorage.setItem("ia_user_id", response.userId);
        
        showLoginMessage("Login successful! Redirecting...", "success");

        window.location.href = response.redirect;

      } else {

        showLoginMessage(
          response.message || "Invalid login details."
        );

      }

    } catch (error) {

      showLoginMessage(error.message);

    } finally {

      loginButton.disabled = false;
      loginButton.querySelector("span").textContent = "Login to Account";

    }

  });

}

// Show / hide password
const passwordToggle = document.getElementById(
  "toggleLoginPassword"
);

if (passwordToggle) {

  passwordToggle.addEventListener("click", function() {

    const passwordInput = document.getElementById("loginPassword");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordToggle.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      passwordToggle.textContent = "Show";
    }

  });

}

// Highlight selected login role
document.querySelectorAll('input[name="loginRole"]').forEach(input => {

  input.addEventListener("change", function() {

    document.querySelectorAll(".role-option").forEach(label => {
      label.classList.remove("active");
    });

    this.closest(".role-option").classList.add("active");

  });

});

// Disable unused signup and forgot-password links
const signupLink = document.getElementById("showSignup");
const forgotLink = document.getElementById("forgotPasswordLink");

if (signupLink) {
  signupLink.addEventListener("click", event => event.preventDefault());
}

if (forgotLink) {
  forgotLink.addEventListener("click", event => event.preventDefault());
}
