const nextStepBtns = document.querySelectorAll('.next-step');
const prevStepBtns = document.querySelectorAll('.prev-step');
const toReviewBtns = document.querySelectorAll('.to-review');
const editBtns = document.querySelectorAll('.review__detail--edit');
const progressBar = document.querySelector('.progress-bar--filled');
const attendingBtn = document.querySelector('input#attending-true');
const dependents = document.querySelectorAll('.dependent');
const noDietaryRestriction = document.querySelector('#dietary-false');
let currentStep = 0;

function validateAndProgress() {
  if (this.dataset.step === '1') {
    nextStep();
  } else {
    let formValid = false;
    const inputs = document.querySelectorAll(`.step-${this.dataset.step} .required`);

    let i = 0;
    while (!formValid && i < inputs.length) {
      if ((inputs[i].type === 'radio' && inputs[i].checked) || (inputs[i].type === 'text' && inputs[i].value !== '')) {
        formValid = true;
      }

      i += 1;
    }

    if (formValid) {
      const errored = document.querySelector(`.step-${this.dataset.step} .error-active`);
      if (errored) errored.classList.remove('error-active');
      nextStep();
    } else {
      document.querySelector(`.step-${this.dataset.step} .error`).classList.add('error-active');
    }
  }
}

function nextStep() {
  if (document.querySelector('input#attending-false:checked')) {
    goToEnd();
    return;
  }

  const active = document.querySelector('.active');
  const next = active === null
    ? document.querySelector('.step-1')
    : active.nextElementSibling;

  if (active) {
    active.classList.remove('active');
  }
  setTimeout(() => {
    next.classList.add('active');
  }, 300);

  currentStep += 1;
  progressBar.style.width = `${currentStep * 16.6667}%`;

  if (currentStep === 6) {
    populateReview();
  }
}

function prevStep() {
  const active = document.querySelector('.active');
  const prev = active === null
    ? document.querySelector('.step-6')
    : active.previousElementSibling;

  if (active) {
    active.classList.remove('active');
  }
  setTimeout(() => {
    prev.classList.add('active');
  }, 300);

  currentStep -= 1;
  progressBar.style.width = `${currentStep * 16.6667}%`;
}

function goToStep(stepNo) {
  document.querySelectorAll('.step').forEach((step) => {
    step.classList.remove('active');
  });
  setTimeout(() => {
    document.querySelector(`.step-${stepNo}`).classList.add('active');
  }, 300);

  currentStep = stepNo - 1;
  progressBar.style.width = `${currentStep * 16.6667}%`;
}

function goToEnd() {
  populateReview();
  goToStep(7);
}

function populateReview() {
  const fields = ['respondant', 'havePartner', 'partnerName', 'attending', 'needsTransportation', 'hasDietaryRequirements', 'dietaryRequirements', 'accommodation'];

  fields.forEach((field) => {
    // If it's a 'string' field...
    if (['respondant', 'partnerName', 'dietaryRequirements'].includes(field)) {
      const elementValue = document.querySelector(`input[name="${field}"]`).value;
      if (elementValue !== '') {
        document.querySelector(`.review--${field}`).style.display = 'initial';
        document.querySelector(`.review__detail--${field}`).innerText = elementValue;
      } else {
        document.querySelector(`.review--${field}`).style.display = 'none';
      }

    // If it's a checkbox/radio field
    } else {
      const element = document.querySelector(`input[name="${field}"]:checked`);
      if (element !== null) {
        document.querySelector(`.review--${field}`).style.display = 'block';
        document.querySelector(`.review__detail--${field}`).innerText = element.value;
      } else {
        document.querySelector(`.review--${field}`).style.display = 'none';
      }
    }
  });
}

function editStep() {
  console.log(this.dataset.step);
  document.querySelector(`.step-${this.dataset.step}`).querySelector('.next-step').style.display = 'none';
  document.querySelector(`.step-${this.dataset.step}`).querySelector('.prev-step').style.display = 'none';
  document.querySelector(`.step-${this.dataset.step}`).querySelector('.to-review').style.display = 'initial';

  goToStep(this.dataset.step);
}

function showNextAndPrev() {
  document.querySelectorAll('.next-step').forEach((btn) => {
    btn.style.display = 'inline-block';
  });

  document.querySelectorAll('.prev-step').forEach((btn) => {
    btn.style.display = 'inline-block';
  });
}

function scrollToForm() {
  const intro = document.querySelector('.intro');
  const formTop = intro.offsetHeight + intro.offsetTop;
  window.scrollTo(0, formTop);
}

function handleDependentCheck() {
  if (this.checked) {
    this.parentElement.nextElementSibling.style.display = 'block';
  } else {
    this.parentElement.nextElementSibling.style.display = 'none';
  }
}

function hideDietaryRestrictions() {
  document.querySelector('.dietary-restriction').style.display = 'none';
}

nextStepBtns.forEach((btn) => {
  btn.addEventListener('click', validateAndProgress);
  btn.addEventListener('click', scrollToForm);
});

prevStepBtns.forEach((btn) => {
  btn.addEventListener('click', prevStep);
  btn.addEventListener('click', scrollToForm);
});

toReviewBtns.forEach((btn) => {
  btn.addEventListener('click', goToEnd);
  btn.addEventListener('click', scrollToForm);
});

editBtns.forEach((btn) => {
  btn.addEventListener('click', editStep);
  btn.addEventListener('click', scrollToForm);
});

dependents.forEach((btn) => {
  btn.addEventListener('change', handleDependentCheck);
});

noDietaryRestriction.addEventListener('change', hideDietaryRestrictions);
attendingBtn.addEventListener('click', showNextAndPrev);
