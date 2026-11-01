
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

function updateBusinessStatus() {
  const statusElement = document.getElementById('business-status');
  const now = new Date();
  
  const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const hour = now.getHours();

  // Check if Mon-Fri (1 through 5) and between 08:00 and 17:00 (5 PM)
  if (day >= 1 && day <= 5 && hour >= 8 && hour < 17) {
    statusElement.textContent = "● Open Now";
    statusElement.className = "status-badge open";
  } else {
    statusElement.textContent = "● Closed Now";
    statusElement.className = "status-badge closed";
  }
}

// Run the script when the page loads
document.addEventListener('DOMContentLoaded', updateBusinessStatus);


$(document).ready(function () {

    // All pages on the website
    const pages = [
        "index.html",
        "about.html",
        "services.html",
        "whychooseus.html",
        "contact.html"
    ];

    $("#search-form").on("submit", async function (e) {

        e.preventDefault();

        const searchTerm = $("#site-search")
            .val()
            .trim()
            .toLowerCase();

        const results = $("#search-results");

        if (!searchTerm) return;

        results.html("<p>Searching website...</p>");

        let matches = [];

        // Search every HTML page
        for (const page of pages) {

            try {

                const response = await $.get(page);

                const parser = new DOMParser();

                const doc = parser.parseFromString(
                    response,
                    "text/html"
                );

                // Get the actual page content
                const content = doc.querySelector("main")
                    || doc.querySelector("body");

                // Remove elements that should not be searched
                content.querySelectorAll(
                    "script, style, nav, header, footer, form"
                ).forEach(el => el.remove());

                const pageText = content.textContent
                    .replace(/\s+/g, " ")
                    .trim();

                // Search actual page text
                if (pageText.toLowerCase().includes(searchTerm)) {

                    const position = pageText.toLowerCase()
                        .indexOf(searchTerm);

                    const start = Math.max(0, position - 60);

                    const snippet = pageText.substring(
                        start,
                        position + searchTerm.length + 100
                    );

                    const title = doc.querySelector("title")
                        ?.textContent || page;

                    matches.push({
                        title: title,
                        url: page,
                        snippet: snippet
                    });

                }

            } catch (error) {

                console.error("Could not search:", page, error);

            }

        }

        // Display search results
        results.empty();

        if (matches.length > 0) {

            results.append(
                $("<h3>").text(
                    matches.length + " matching page(s) found"
                )
            );

            matches.forEach(function (match) {

                const item = $("<div>").addClass("search-result");

                const link = $("<a>")
                    .attr("href", match.url)
                    .text(match.title);

                const description = $("<p>")
                    .text(match.snippet + "...");

                item.append(link, description);

                results.append(item);

            });

        } else {

            results.append(
                $("<p>").text(
                    "No matching content found. Try another search term."
                )
            );

        }

    });

});
