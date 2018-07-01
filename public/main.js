const nextStepBtns = document.querySelectorAll('.next-step');
const prevStepBtns = document.querySelectorAll('.prev-step');
const progressBar = document.querySelector('.progress-bar--filled');
let currentStep = 0;

function nextStep() {
  const active = document.querySelector('.active');
  const next = active === null
    ? document.querySelector('.step-1')
    : active.nextElementSibling;

  console.log(active);
  console.log(next);

  if (active) {
    active.classList.remove('active');
  }
  setTimeout(() => {
    next.classList.add('active');
  }, 300);

  currentStep += 1;
  progressBar.style.width = `${currentStep * 16.6667}%`;
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
  makeStepActive(7);
}

nextStepBtns.forEach((btn) => {
  btn.addEventListener('click', nextStep);
});

prevStepBtns.forEach((btn) => {
  btn.addEventListener('click', prevStep);
});
