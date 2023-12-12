// Helper Functions

getNumberOfPeople = () =>
  (numberOfPeople = peopleInput.value ? peopleInput.value : 1);

getMany = (selector) => document.querySelectorAll(selector);

getOne = (selector) => document.querySelector(selector);

getById = (id) => document.getElementById(id);

getValue = (selector) => selector.value;

setValue = (selector, value) => (selector.value = value);

clearLocalStorage = () => localStorage.clear();

// Variables

const valueInputs = getMany("input");
const tipButtons = getMany(".calculator__tip-selection");

const resetButton = getOne(".calculator__reset");

const billInput = getById("bill");
const peopleInput = getById("people");
const totalAmount = getById("js-total");
const tipAmount = getById("js-tip");

// Looping Event Listeners

valueInputs.forEach((input) => {
  input.addEventListener("input", updateUI);
});

tipButtons.forEach((button) => {
  button.onclick = function () {
    getNumberOfPeople();
    calculateTips(button.value);
  };
});

// Main Functions

function updateUI() {
  getNumberOfPeople();
  totalAmount.innerHTML = `$${(getValue(billInput) / numberOfPeople).toFixed(
    2
  )}`;
  if (localStorage.getItem("tip")) {
    calculateTips(localStorage.getItem("tip"));
  }
}

function calculateTips(tip) {
  if (tip) {
    localStorage.setItem("tip", tip);
    tipAmount.innerHTML = `$${(
      totalAmount.innerHTML.slice(1) *
      (tip.slice(0, -1) / 100)
    ).toFixed(2)}`;
  }
}

resetButton.onclick = function () {
  clearLocalStorage();
  setValue(billInput, 0);
  setValue(peopleInput, 1);
  tipAmount.innerHTML = "$0.00";
  updateUI();
};
