
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Open and Close Mobile Menu
menuButton.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

});

// Close Menu After Clicking Any Link
document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute("aria-label", "Open navigation");

    });

});

// Automatically Update Copyright Year
document.getElementById("year").textContent =
    new Date().getFullYear();
/* ==========================================
   EDUCATION SECTION SCROLL ANIMATION
========================================== */

const educationRevealElements =
    document.querySelectorAll(".education-section .reveal");

const educationObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);

educationRevealElements.forEach((element) => {
    educationObserver.observe(element);
});

/* CAMPUS TO CAREER SCROLL ANIMATION */

const careerElements = document.querySelectorAll(
    ".career-section .reveal"
);

const careerObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

careerElements.forEach((element) => {
    careerObserver.observe(element);
});
const learningElements = document.querySelectorAll(
    ".learning-section .reveal"
);

const learningObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

learningElements.forEach((element) => {
    learningObserver.observe(element);
});
/* CONTACT SECTION SCROLL ANIMATION */

const contactRevealElements = document.querySelectorAll(
    ".contact-section .reveal"
);

const contactObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

contactRevealElements.forEach((element) => {
    contactObserver.observe(element);
});

/* ==========================================
   CERTIFICATE VERIFICATION FORM
========================================== */

const certificateForm = document.getElementById("certificateForm");

if (certificateForm) {

    certificateForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const certificateInput =
            document.getElementById("certificateNumber");

        const result =
            document.getElementById("certificateResult");

        const certificateNumber =
            certificateInput.value.trim();

        if (!certificateNumber) {

            result.className = "certificate-result show";

            result.style.background = "#fff4e5";
            result.style.color = "#a66a13";

            result.textContent =
                "Please enter your certificate number.";

            return;
        }

        result.className = "certificate-result show";

        result.style.background = "#eaf3ff";
        result.style.color = "#2876bb";

        result.textContent =
            "Certificate number received: " +
            certificateNumber +
            ". Online verification database is not connected yet.";

    });

}


document.addEventListener("DOMContentLoaded", function () {

  const loginForm = document.getElementById("iaLoginForm");
  const signupForm = document.getElementById("iaSignupForm");

  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");

  // USER / ADMIN SELECTION
  const roleOptions = document.querySelectorAll(".role-option");

  roleOptions.forEach(option => {
    option.addEventListener("click", function () {
      roleOptions.forEach(item => item.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // SHOW SIGNUP
  showSignup.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.hidden = true;
    signupForm.hidden = false;
  });

  // SHOW LOGIN
  showLogin.addEventListener("click", function (e) {
    e.preventDefault();
    signupForm.hidden = true;
    loginForm.hidden = false;
  });

  // SHOW / HIDE PASSWORD
  const togglePassword = document.getElementById("toggleLoginPassword");
  const passwordInput = document.getElementById("loginPassword");

  togglePassword.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";
    this.textContent = isPassword ? "Hide" : "Show";
  });

  // DEMO LOGIN
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const role = document.querySelector(
      'input[name="loginRole"]:checked'
    ).value;

    const email = document.getElementById("loginEmail").value.trim();
    const password = passwordInput.value;
    const message = document.getElementById("loginMessage");

    if (!email || !password) {
      message.textContent = "Please enter your email and password.";
      return;
    }

    message.style.color = "#b7791f";

    if (role === "admin") {
      message.textContent =
        "Admin login selected. Connect your secure admin authentication system.";
    } else {
      message.textContent =
        "User login selected. Connect your user authentication system.";
    }

    console.log("Demo Login:", {
      role: role,
      email: email
    });
  });

  // DEMO SIGNUP
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("signupMessage");

    if (password.length < 8) {
      message.style.color = "#dc3545";
      message.textContent = "Password must be at least 8 characters.";
      return;
    }

    if (password !== confirmPassword) {
      message.style.color = "#dc3545";
      message.textContent = "Passwords do not match.";
      return;
    }

    message.style.color = "#b7791f";
    message.textContent =
      "Demo registration form completed. Connect an authentication backend to create your account.";
  });

  // FORGOT PASSWORD DEMO
  document.getElementById("forgotPasswordLink").addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      alert("Password reset feature will be available soon.");
    }
  );

});


document.addEventListener("DOMContentLoaded", function () {

  const impactSection = document.querySelector(".our-impact");

  if (!impactSection) return;

  const counters = impactSection.querySelectorAll(".impact-counter");
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting && !hasAnimated) {

        hasAnimated = true;

        counters.forEach(counter => {

          const target = Number(counter.dataset.target);
          const duration = 1800;
          const startTime = performance.now();

          function updateCounter(currentTime) {

            const progress = Math.min(
              (currentTime - startTime) / duration, 1
            );

            const easedProgress = 1 - Math.pow(1 - progress, 3);

            counter.textContent = Math.floor(
              target * easedProgress
            );

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);

        });

        observer.disconnect();
      }

    });

  }, { threshold: 0.3 });

  observer.observe(impactSection);

});
