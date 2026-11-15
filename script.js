
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
