// Add an event listener to trigger the fetchRates function when the DOM is loaded.
document.addEventListener("DOMContentLoaded", fetchRates);

// Declare a variable to store currency rate data.
let currency;

// Function to fetch currency exchange rate data from the CoinCap API.
function fetchRates() {
  fetch("https://api.coincap.io/v2/rates")
    .then((response) => response.json())
    .then((data) => {
      // Store the retrieved data in the currency variable.
      currency = data.data;

      // Populate the base and target currency select elements with options.
      currency.forEach((item) => {
        const base = document.querySelector("#base");
        const baseOption = document.createElement("option");
        baseOption.textContent = item.id;
        base.appendChild(baseOption);

        const target = document.querySelector("#target");
        const targetOption = document.createElement("option");
        targetOption.textContent = item.id;
        target.appendChild(targetOption);
      });
    });
}

// Select the form element and add an event listener for form submission.
const form = document.querySelector("#form");
form.addEventListener("submit", handleConvert);

// Function to handle currency conversion when the form is submitted.
function handleConvert(e) {
  e.preventDefault(); // Prevent the default form submission.

  // Get the selected base and target currencies and the amount to convert.
  const baseInput = document.querySelector("#base").value;
  const targetInput = document.querySelector("#target").value;
  const amount = document.querySelector("#amount").value;
  form.reset(); // Reset the form fields.

  // Find the currency objects for the selected base and target currencies.
  const baseCurrency = currency.find((item) => item.id === baseInput);
  const targetCurrency = currency.find((item) => item.id === targetInput);

  // If both base and target currencies are found, perform the conversion.
  if (baseCurrency && targetCurrency) {
    const rateUsdBase = baseCurrency.rateUsd;
    const rateUsdTarget = targetCurrency.rateUsd;

    // Display the conversion result in the #result element.
    const result = document.querySelector("#result");
    result.textContent = `${amount} ${baseInput} = ${(
      (amount * rateUsdBase) /
      rateUsdTarget
    ).toFixed(2)} ${targetInput}`;
  }
}
