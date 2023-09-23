document.addEventListener("DOMContentLoaded", function () {
  const seeMoreButton = document.getElementById("see-more-button");
  const fullDescription = document.querySelector(".full-description");
  
  seeMoreButton.addEventListener("click", function () {
    if (fullDescription.style.display === "block") {
      fullDescription.style.display = "none";
      seeMoreButton.textContent = "See More";
    } else {
      fullDescription.style.display = "block";
      seeMoreButton.textContent = "See Less";
    }
  });
});
// Get references to the form elements
const form = document.getElementById("payment-form");
const cardNumber = document.getElementById("card-number");
const expiryDate = document.getElementById("expiry-date");
const cvv = document.getElementById("cvv");
const submitButton = document.getElementById("submit-button");

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Disable the submit button to prevent multiple submissions
  submitButton.disabled = true;

  // Create an object to hold the form data
  const formData = {
    cardNumber: cardNumber.value,
    expiryDate: expiryDate.value,
    cvv: cvv.value,
  };

  // Perform client-side validation on the form data
  if (!validateFormData(formData)) {
    // If the data is invalid, re-enable the submit button and return
    submitButton.disabled = false;
    return;
  }

  // Send the form data to the server
  // The following is just an example and should not be used in a real-world scenario
  // as it lacks security measures and proper payment gateway integration
  fetch("/charge", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the server response
      if (data.success) {
        // Payment was successful
        alert("Payment successful!");
      } else {
        // Payment failed
        alert("Payment failed. Please try again.");
        submitButton.disabled = false;
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred. Please try again.");
      submitButton.disabled = false;
    });
});

function validateFormData(data) {
  // Example validation checks
  if (!data.cardNumber || data.cardNumber.length !== 16) {
    alert("Please enter a valid card number.");
    return false;
  }
  if (!data.expiryDate || data.expiryDate.length !== 5) {
    alert("Please enter a valid expiry date in the format MM/YY.");
    return false;
  }
  if (!data.cvv || data.cvv.length !== 3) {
    alert("Please enter a valid CVV.");
    return false;
  }
  return true;
}
