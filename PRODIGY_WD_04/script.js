document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = document.querySelector('button[type="submit"]');
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.textContent = "Your message has been sent! Thank you for reaching out.";

    // Function to show success message with fade-in and slide-in effects
    function showSuccessMessage() {
        document.body.appendChild(successMessage);
        successMessage.style.transition = "opacity 0.3s ease, transform 0.3s ease";  // Adding smooth transition
        successMessage.style.opacity = 1;
        successMessage.style.transform = "translateY(0)";
    }

    // Function to hide success message with fade-out and slide-out effects
    function hideSuccessMessage() {
        successMessage.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        successMessage.style.opacity = 0;
        successMessage.style.transform = "translateY(-20px)";
        setTimeout(() => successMessage.remove(), 300); // Wait for the animation to finish before removing the element
    }

    // Add event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();  // Prevent the default form submission behavior
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Validate form fields before proceeding
        if (!name || !email || !message) {
            alert("Please fill out all fields.");
            return;
        }

        // Disable the submit button to prevent multiple submissions
        submitButton.disabled = true;

        // Simulate form submission with a delay
        setTimeout(() => {
            showSuccessMessage();  // Show success message after form submission
            form.reset();  // Reset the form fields
            submitButton.disabled = false;  // Re-enable the submit button

            // Hide success message after a few seconds
            setTimeout(hideSuccessMessage, 3000);
        }, 1000);  // Simulate a short delay before displaying success message
    });
});
