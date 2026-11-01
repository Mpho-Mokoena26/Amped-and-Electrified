
document.addEventListener("DOMContentLoaded", function () {

    // 1. Display a welcome message
    const welcomeMessage = document.getElementById("welcome-message");

    if (welcomeMessage) {
        const hour = new Date().getHours();
        let greeting;

        if (hour < 12) {
            greeting = "Good Morning.";
        } else if (hour < 18) {
            greeting = "Good Afternoon.";
        } else {
            greeting = "Good Evening.";
        }

        welcomeMessage.textContent =
            greeting + " Welcome to Amped & Electrified!";
    }

    // 2. Update the copyright year automatically
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 3. Toggle the mobile navigation menu
    const menuButton = document.getElementById("menu-toggle");
    const navigation = document.getElementById("main-navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            const menuIsOpen = navigation.classList.toggle("nav-open");

            menuButton.setAttribute(
                "aria-expanded",
                String(menuIsOpen)
            );

            menuButton.textContent = menuIsOpen ? "Close" : "Menu";
        });

        // Close the menu when a navigation link is clicked
        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("nav-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "Menu";
            });
        });
    }

});


document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");
    const contactForm = document.querySelector(".contact-form");
    const phoneError = document.getElementById("phone-error");

    if (!phoneInput || !contactForm) return;

    function validatePhone() {
        const phone = phoneInput.value.trim();

        // Accept common South African numbers:
        // 082 123 4567, 011 123 4567, +27 82 123 4567
        const phonePattern =
            /^(?:\+27|0)[\s-]?(?:\(?\d{2}\)?)[\s-]?\d{3}[\s-]?\d{4}$/;

        if (phone === "") {
            phoneError.textContent = "Please enter your phone number.";
            phoneInput.setCustomValidity("Phone number is required.");
            return false;
        }

        if (!phonePattern.test(phone)) {
            phoneError.textContent =
                "Enter a valid South African number, e.g. 082 123 4567.";
            phoneInput.setCustomValidity("Invalid phone number.");
            return false;
        }

        phoneError.textContent = "";
        phoneInput.setCustomValidity("");
        return true;
    }

    phoneInput.addEventListener("blur", validatePhone);

    phoneInput.addEventListener("input", function () {
        if (phoneInput.value.trim() !== "") {
            validatePhone();
        } else {
            phoneError.textContent = "";
            phoneInput.setCustomValidity("");
        }
    });

    contactForm.addEventListener("submit", function (event) {
        if (!validatePhone()) {
            event.preventDefault();
            phoneInput.reportValidity();
            phoneInput.focus();
        }
    });
});

 // Back-to-top button.
    const $backToTop = $("#backToTop");
    function updateBackToTop() {
      if ($(window).scrollTop() > 320) {
        $backToTop.stop(true, true).fadeIn(180);
      } else {
        $backToTop.stop(true, true).fadeOut(180);
      }
    }

    // Get the button element
const backToTopBtn = document.getElementById("backToTopBtn");

// When the user scrolls down 300px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
backToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Gives it that smooth scrolling effect
  });
});

