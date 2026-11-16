
/* ==========================================
   INFALLIBLE ACADEMY - MAIN JAVASCRIPT
========================================== */

(function () {
  "use strict";

  function initWebsite() {

    /* ==========================================
       1. MOBILE NAVIGATION
    ========================================== */

    const menuButton = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {

      function closeMenu() {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      }

      menuButton.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
          "aria-label",
          isOpen ? "Close navigation" : "Open navigation"
        );
      });

      navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeMenu();
      });
    }


    /* ==========================================
       2. AUTOMATIC COPYRIGHT YEAR
    ========================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }


    /* ==========================================
       3. COMMON SCROLL REVEAL ANIMATION
    ========================================== */

    const revealElements = document.querySelectorAll(
      ".education-section .reveal, " +
      ".career-section .reveal, " +
      ".learning-section .reveal, " +
      ".contact-section .reveal"
    );

    if ("IntersectionObserver" in window) {

      const revealObserver = new IntersectionObserver(
        function (entries, observer) {

          entries.forEach(function (entry) {

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

      revealElements.forEach(function (element) {
        revealObserver.observe(element);
      });

    } else {

      revealElements.forEach(function (element) {
        element.classList.add("is-visible");
      });

    }


    /* ==========================================
       4. GOOGLE SHEETS CERTIFICATE VERIFICATION
    ========================================== */

    const CERTIFICATE_API_URL =
      "https://script.google.com/macros/s/AKfycbxsAULgob51T2DlycKnhPpLzgkHqUTtEJAZdC1yyuT6zs18Kic9Tf88l1JzwdIOEMvlSQ/exec";

    const certificateForm = document.getElementById("certificateForm");
    const certificateInput = document.getElementById("certificateNumber");
    const certificateResult = document.getElementById("certificateResult");

    if (certificateForm && certificateInput && certificateResult) {

      const submitButton = certificateForm.querySelector(
        'button[type="submit"]'
      );

      let activeCertificateRequest = false;

      function showCertificateMessage(message, type) {
    certificateResult.replaceChildren();
    certificateResult.classList.add("show");

    const messageBox = document.createElement("div");
    messageBox.className = "certificate-message " + type;
    messageBox.textContent = message;

    certificateResult.appendChild(messageBox);
}

      function setVerifyButtonState(isLoading) {

        if (!submitButton) return;

        submitButton.disabled = isLoading;

        const buttonText = submitButton.querySelector("span:first-child");

        if (buttonText) {
          buttonText.textContent = isLoading
            ? "Verifying..."
            : "Verify Certificate";
        }
      }

      function getDownloadURL(url) {

        if (!url) return "";

        try {

          const parsedURL = new URL(url);

          if (parsedURL.hostname === "drive.google.com") {

            const match =
              parsedURL.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
              parsedURL.search.match(/[?&]id=([a-zA-Z0-9_-]+)/);

            if (match) {
              return "https://drive.google.com/uc?export=download&id=" + match[1];
            }
          }

          return parsedURL.href;

        } catch (error) {
          return "";
        }
      }

      function showVerifiedCertificate(response) {

        const certificate = response.certificate;

        if (!certificate || typeof certificate !== "object") {
          showCertificateMessage(
            "Certificate data was not received correctly. Please try again.",
            "error"
          );
          return;
        }

        certificateResult.replaceChildren();
        certificateResult.classList.add("show");

        const card = document.createElement("div");
        card.className = "verified-certificate-card";

        const heading = document.createElement("div");
        heading.className = "verified-heading";
        heading.textContent = "✓ Certificate Verified";

        const description = document.createElement("p");
        description.className = "verified-description";
        description.textContent =
          "This certificate matches an active record in Infallible Academy.";

        const details = document.createElement("div");
        details.className = "verified-details";

        const fields = [
          ["Certificate ID", certificate.certificateId],
          ["Student Name", certificate.studentName],
          ["Course Name", certificate.courseName],
          ["Issue Date", certificate.issueDate],
          ["Status", certificate.status]
        ];

        fields.forEach(function (field) {

          const item = document.createElement("div");
          item.className = "verified-detail-item";

          const label = document.createElement("span");
          label.textContent = field[0];

          const value = document.createElement("strong");
          value.textContent = field[1] || "Not available";

          item.append(label, value);
          details.appendChild(item);

        });

        card.append(heading, description, details);

        const downloadURL = getDownloadURL(certificate.certificateURL);

        if (downloadURL) {

          const downloadButton = document.createElement("a");

          downloadButton.className = "certificate-download-btn";
          downloadButton.href = downloadURL;
          downloadButton.target = "_blank";
          downloadButton.rel = "noopener noreferrer";
          downloadButton.textContent = "↓ Download Certificate";

          card.appendChild(downloadButton);

        } else {

          const note = document.createElement("p");
          note.className = "certificate-no-download";
          note.textContent = "Certificate download is not available yet.";

          card.appendChild(note);
        }

        certificateResult.appendChild(card);
      }

      certificateForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (activeCertificateRequest) return;

        const certificateId = certificateInput.value.trim().toUpperCase();

        if (!certificateId) {
          showCertificateMessage(
            "Please enter your certificate number.",
            "error"
          );
          certificateInput.focus();
          return;
        }

        if (!CERTIFICATE_API_URL ||
            !CERTIFICATE_API_URL.startsWith("https://script.google.com/")) {

          showCertificateMessage(
            "Certificate verification service is not configured.",
            "error"
          );
          return;
        }

        activeCertificateRequest = true;
        setVerifyButtonState(true);

        showCertificateMessage(
          "Searching certificate records...",
          "loading"
        );

        const callbackName =
          "iaCertificateCallback_" + Date.now() + "_" +
          Math.random().toString(36).slice(2);

        const script = document.createElement("script");

        let completed = false;
        let timeoutId;

        function finishRequest() {

          if (completed) return;

          completed = true;
          activeCertificateRequest = false;

          setVerifyButtonState(false);

          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          script.remove();
          delete window[callbackName];
        }

        window[callbackName] = function (response) {

          if (completed) return;

          finishRequest();

          if (response && response.success === true) {

            showVerifiedCertificate(response);

          } else {

            showCertificateMessage(
              response && response.message
                ? response.message
                : "Certificate not found or invalid.",
              "error"
            );

          }
        };

        script.onerror = function () {

          if (completed) return;

          finishRequest();

          showCertificateMessage(
            "Unable to connect to verification service. Please try again.",
            "error"
          );
        };

        const separator = CERTIFICATE_API_URL.includes("?") ? "&" : "?";

        script.src =
          CERTIFICATE_API_URL +
          separator +
          "id=" + encodeURIComponent(certificateId) +
          "&callback=" + encodeURIComponent(callbackName) +
          "&_=" + Date.now();

        timeoutId = setTimeout(function () {

          if (completed) return;

          finishRequest();

          showCertificateMessage(
            "Verification is taking too long. Please try again.",
            "error"
          );

        }, 15000);

        document.body.appendChild(script);

      });
    }


    /* ==========================================
       5. LOGIN / SIGNUP PAGE
       FRONT-END DEMO ONLY
    ========================================== */

    const loginForm = document.getElementById("iaLoginForm");
    const signupForm = document.getElementById("iaSignupForm");

    const showSignup = document.getElementById("showSignup");
    const showLogin = document.getElementById("showLogin");

    const togglePassword = document.getElementById("toggleLoginPassword");
    const passwordInput = document.getElementById("loginPassword");

    const forgotPasswordLink = document.getElementById("forgotPasswordLink");

    const roleOptions = document.querySelectorAll(".role-option");

    // User / Admin selection
    roleOptions.forEach(function (option) {

      option.addEventListener("click", function () {

        roleOptions.forEach(function (item) {
          item.classList.remove("active");
        });

        this.classList.add("active");

      });

    });

    // Show signup form
    if (showSignup && loginForm && signupForm) {

      showSignup.addEventListener("click", function (event) {

        event.preventDefault();

        loginForm.hidden = true;
        signupForm.hidden = false;

      });
    }

    // Show login form
    if (showLogin && loginForm && signupForm) {

      showLogin.addEventListener("click", function (event) {

        event.preventDefault();

        signupForm.hidden = true;
        loginForm.hidden = false;

      });
    }

    // Show / hide login password
    if (togglePassword && passwordInput) {

      togglePassword.addEventListener("click", function () {

        const isPassword = passwordInput.type === "password";

        passwordInput.type = isPassword ? "text" : "password";
        togglePassword.textContent = isPassword ? "Hide" : "Show";

        togglePassword.setAttribute(
          "aria-label",
          isPassword ? "Hide password" : "Show password"
        );

      });
    }

    // Login form validation
    if (loginForm) {

      loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const selectedRole = document.querySelector(
          'input[name="loginRole"]:checked'
        );

        const emailInput = document.getElementById("loginEmail");
        const loginMessage = document.getElementById("loginMessage");

        const email = emailInput ? emailInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value : "";

        if (!loginMessage) return;

        if (!selectedRole || !email || !password) {

          loginMessage.style.color = "#dc3545";
          loginMessage.textContent =
            "Please select a role and enter your email and password.";

          return;
        }

        loginMessage.style.color = "#b7791f";

        loginMessage.textContent =
          selectedRole.value === "admin"
            ? "Admin login form is ready. Secure admin authentication backend is required."
            : "User login form is ready. User authentication backend is required.";

      });
    }

    // Signup form validation
    if (signupForm) {

      signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameInput = document.getElementById("signupName");
        const emailInput = document.getElementById("signupEmail");
        const newPasswordInput = document.getElementById("signupPassword");
        const confirmPasswordInput = document.getElementById("confirmPassword");
        const signupMessage = document.getElementById("signupMessage");

        if (!signupMessage) return;

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const password = newPasswordInput ? newPasswordInput.value : "";
        const confirmPassword = confirmPasswordInput
          ? confirmPasswordInput.value
          : "";

        if (!name || !email || !password || !confirmPassword) {

          signupMessage.style.color = "#dc3545";
          signupMessage.textContent = "Please complete all fields.";

          return;
        }

        if (password.length < 8) {

          signupMessage.style.color = "#dc3545";
          signupMessage.textContent =
            "Password must be at least 8 characters.";

          return;
        }

        if (password !== confirmPassword) {

          signupMessage.style.color = "#dc3545";
          signupMessage.textContent = "Passwords do not match.";

          return;
        }

        signupMessage.style.color = "#b7791f";
        signupMessage.textContent =
          "Form validation successful. Connect a secure backend to create your account.";

      });
    }

    // Forgot password demo
    if (forgotPasswordLink) {

      forgotPasswordLink.addEventListener("click", function (event) {

        event.preventDefault();

        alert(
          "Password reset is not connected yet. Please contact the administrator."
        );

      });
    }


    /* ==========================================
       6. OUR IMPACT - ANIMATED COUNTERS
    ========================================== */

    const impactSection = document.querySelector(".our-impact");

    if (impactSection) {

      const counters = impactSection.querySelectorAll(".impact-counter");

      function animateCounter(counter) {

        const target = Number(counter.dataset.target);

        if (!Number.isFinite(target) || target < 0) return;

        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {

          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const easedProgress = 1 - Math.pow(1 - progress, 3);

          counter.textContent = Math.floor(target * easedProgress);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }

        requestAnimationFrame(updateCounter);
      }

      if ("IntersectionObserver" in window) {

        let hasAnimated = false;

        const impactObserver = new IntersectionObserver(
          function (entries, observer) {

            entries.forEach(function (entry) {

              if (entry.isIntersecting && !hasAnimated) {

                hasAnimated = true;

                counters.forEach(animateCounter);

                observer.disconnect();
              }

            });

          },
          { threshold: 0.3 }
        );

        impactObserver.observe(impactSection);

      } else {

        counters.forEach(animateCounter);

      }
    }

  }


  /* ==========================================
     INITIALIZE AFTER HTML LOADS
  ========================================== */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWebsite);
  } else {
    initWebsite();
  }

})();



function downloadCertificate(certificateURL) {
  if (!certificateURL || certificateURL === "PDF link") {
    alert("Certificate PDF is not available yet.");
    return;
  }

  const link = document.createElement("a");
  link.href = certificateURL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.download = "Infallible-Academy-Certificate.pdf";

  document.body.appendChild(link);
  link.click();
  link.remove();
}
