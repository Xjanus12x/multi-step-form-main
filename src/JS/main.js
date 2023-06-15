// previos and next button
const formButtons = document.querySelector(".form__buttons");
const stepIndicatorContainer = document.querySelector(".form-tracker");
const stepIndicators = [
  ...document.querySelectorAll(".step > div:first-child"),
];
const formSteps = [...document.querySelectorAll(".form")];
const nextButton = formButtons.querySelector("[data-next]");
const previousButton = formButtons.querySelector("[data-previous]");
const formStepLength = formSteps.length - 1;
let index = 0;
let currentStep = formSteps[index];
let currentStepIndicator = stepIndicators[index];
formButtons.addEventListener("click", (event) => {
  const isNextButton = event.target.dataset.next;
  const isPreviousButton = event.target.dataset.previous;

  // to make sure only next or prev and changePlan button will trigger this
  if (isNextButton || isPreviousButton) {
    validatePersonalFormInputs();
    if (isValidInputs) {
      currentStep.classList.add("hidden");
      currentStepIndicator.classList.remove("current-step");

      if (isNextButton && index < formStepLength) index++;
      else if (isPreviousButton && index !== 0) index--;
      if (index <= 3) {
        currentStepIndicator = stepIndicators[index];
        currentStepIndicator.classList.add("current-step");
      }
      if (index === 3) {
        nextButton.textContent = "Confirm";
        nextButton.classList.add("confirm");
      } else {
        nextButton.textContent = "Next Step";
        nextButton.classList.remove("confirm");
      }
      if (window.innerWidth > 700 && index === formStepLength) {
        stepIndicatorContainer.classList.add("hidden");
        formButtons.classList.add("hidden");
      }
      formButtons.classList.toggle("hidden", index === formStepLength);

      currentStep = formSteps[index];
      currentStep.classList.remove("hidden");
      previousButton.classList.toggle("hidden", index === 0);

      animateStepIndicator();
      animateForm();
    }
    setTotalPayment(userSelectedPlan);
  }
});

const changePlanButton = document.querySelector(".change-plan");
changePlanButton.addEventListener("click", changePlan);

function changePlan() {
  currentStep.classList.add("hidden");
  currentStepIndicator.classList.remove("current-step");
  index = index - 2;
  currentStep = formSteps[index];
  currentStepIndicator = stepIndicators[index];
  currentStep.classList.remove("hidden");
  currentStepIndicator.classList.add("current-step");
  animateStepIndicator();
  animateForm();
}

function animateForm() {
  if (nextButton.dataset.next || previousButton.dataset.next) {
    formSteps.forEach((step, stepIndex) => {
      step.style.animation = `fadeInOut 300ms ${
        Math.abs(stepIndex - index) * 0.1
      }s both`;
    });
  }
  setTimeout(() => {
    formSteps.forEach((step) => {
      step.style.animation = "";
    });
  }, 400);
}
function animateStepIndicator() {
  stepIndicators.forEach((step, stepIndex) => {
    if (stepIndex === index) {
      step.classList.add("animate");
    } else {
      step.classList.remove("animate");
    }
  });
}

// Personal Info form
const personalInfoInputs = document.querySelectorAll(
  ".input-container > input"
);

const emptyInputLabel = document.querySelectorAll(".empty-field");
let isValidInputs = true;
function validatePersonalFormInputs() {
  personalInfoInputs.forEach((input, index) => {
    if (input.value.trim() === "") {
      emptyInputLabel[index].classList.remove("hidden");
      input.classList.add("empty");
      isValidInputs = false;
    } else {
      emptyInputLabel[index].classList.add("hidden");
      input.classList.remove("empty");
      isValidInputs = true;
    }
  });
}

// Select your plan
const plans = document.querySelector(".plan__options");
const planOptions = [...document.querySelectorAll(".plan")];
let userSelectedPlan = planOptions[0];

plans.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("plan")) {
    if (target.classList.contains("active")) return;
    userSelectedPlan.classList.remove("active");
    userSelectedPlan = target;
    userSelectedPlan.classList.add("active");
  }
});

// toggle functionality
const toggleContainer = document.querySelector(".toggle-container");
const toggleLabel = document.querySelectorAll("[data-active]");
const toggle = document.getElementById("plan_type");
toggleContainer.addEventListener("click", () => {
  toggle.classList.toggle("toggle");
  toggle.checked = !toggle.checked;
  if (toggle.checked) {
    isYearly = true;
    toggle.setAttribute("checked", "");
    toggleLabel[0].setAttribute("data-active", "false");
    toggleLabel[1].setAttribute("data-active", "true");
    setToYearlyPlan();
    setToYearlyAddOns();
  } else {
    isYearly = false;
    toggle.removeAttribute("checked");
    toggleLabel[0].setAttribute("data-active", "true");
    toggleLabel[1].setAttribute("data-active", "false");
    setToMonthlyPlan();
    setToMonthlyAddOns();
  }
});

function setToMonthlyPlan() {
  const monthlyCost = [9, 12, 15];
  const planCosts = document.querySelectorAll(".cost");
  const freebies = document.querySelectorAll(".freebie");
  const plans = document.querySelectorAll(".plan");
  planCosts.forEach((cost, index) => {
    cost.textContent = `$${monthlyCost[index]}/mo`;
    freebies[index].classList.add("hidden");
    plans[index].classList.remove("a-items-start");
  });
}
function setToYearlyPlan() {
  const yearlyCost = [90, 120, 150];
  const planCosts = document.querySelectorAll(".cost");
  const freebies = document.querySelectorAll(".freebie");
  const plans = document.querySelectorAll(".plan");
  planCosts.forEach((cost, index) => {
    cost.textContent = `$${yearlyCost[index]}/yr`;
    freebies[index].classList.remove("hidden");
    plans[index].classList.add("a-items-start");
  });
}

// Pick add-ons
const addOns = document.querySelector(".add-ons");
const selectedAddOnsIndexes = [];
addOns.addEventListener("click", (event) => {
  const target = event.target;
  const checkBox = target.querySelector(".custom-checkbox");

  if (target.classList.contains("add-on")) {
    const index = Array.from(addOns.children).indexOf(target);

    checkBox.checked = !checkBox.checked;

    if (checkBox.checked) {
      checkBox.setAttribute("checked", "");
      selectedAddOnsIndexes.push(index);
      target.setAttribute("data-selected", "true");
    } else {
      checkBox.removeAttribute("checked", "");
      target.setAttribute("data-selected", "false");
      const indexToRemove = selectedAddOnsIndexes.indexOf(index);
      if (indexToRemove > -1) {
        selectedAddOnsIndexes.splice(indexToRemove, 1);
      }
    }
  }
});

function setToMonthlyAddOns() {
  const monthlyCostsAddOns = [1, 2, 2];
  const addOnCosts = document.querySelectorAll(".add-on > p");
  const paymentAddOnsCosts = document.querySelectorAll(
    ".payment > :not(div:first-child) p"
  );
  addOnCosts.forEach((addOnCost, index) => {
    addOnCost.textContent = `$${monthlyCostsAddOns[index]}/mo`;
  });
  paymentAddOnsCosts.forEach((paymentAddOnsCost, index) => {
    paymentAddOnsCost.textContent = `$${monthlyCostsAddOns[index]}/mo`;
  });
}
function setToYearlyAddOns() {
  const yearlyCostsAddOns = [10, 20, 20];
  const addOnCosts = document.querySelectorAll(".add-on > p");
  const paymentAddOnsCosts = document.querySelectorAll(
    ".payment > :not(div:first-child) p"
  );
  addOnCosts.forEach((addOnCost, index) => {
    addOnCost.textContent = `$${yearlyCostsAddOns[index]}/yr`;
  });

  paymentAddOnsCosts.forEach((paymentAddOnsCost, index) => {
    paymentAddOnsCost.textContent = `$${yearlyCostsAddOns[index]}/yr`;
  });
}

let isYearly = false;

function setTotalPayment(selectedPlan) {
  // Setting the chosen plan type for payment
  const paymentPlan = document.querySelector(
    ".payment__information .add-on__description > h4"
  );
  const planCost = document.querySelector(".payment__information > p");
  let planType = isYearly ? "(Yearly)" : "(Monthly)";

  paymentPlan.textContent = `${
    selectedPlan.querySelector(".plan__description > h3").textContent
  } ${planType}`;

  planCost.textContent = selectedPlan.querySelector(
    ".plan__description > p"
  ).textContent;

  // unhidding the selected addOns
  const availablesAddOns = document.querySelectorAll(
    ".payment > :not(div:first-child)"
  );

  selectedAddOnsIndexes.forEach((selectedAddOn) => {
    availablesAddOns[selectedAddOn].classList.toggle("hidden");
  });

  const totalPaymentContainer = document.querySelector(
    ".form:nth-of-type(4) > div"
  );
  const typeOfPayment = totalPaymentContainer.querySelector("p:first-child");
  const paymentCost = totalPaymentContainer.querySelector("p:last-child");
  typeOfPayment.textContent = `Total (${isYearly ? "per year" : "per month"})`;

  const regex = /\d+/;

  let selectedPlanCost = Number(planCost.textContent.match(regex)[0]);
  let seletectedAddOnsTotalCost = 0;
  selectedAddOnsIndexes.forEach((selectedAddOn) => {
    seletectedAddOnsTotalCost += Number(
      availablesAddOns[selectedAddOn]
        .querySelector("p")
        .textContent.match(regex)[0]
    );
  });

  paymentCost.textContent = `+$${
    selectedPlanCost + seletectedAddOnsTotalCost
  }/${isYearly ? "yr" : "mo"}`;
}
