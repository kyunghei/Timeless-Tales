/* exported nextCustomizeStep, submitCustomization */

function nextCustomizeStep(currentStep) {
  const customTabs = document.querySelectorAll('.custom-tabs')
  customTabs.forEach((tab) => tab.removeAttribute('checked'))// Unhighlight all three custom tabs
  document.getElementById(`${currentStep}-tab`).checked = true // Highlight current tab displayed

  const steps = document.querySelectorAll('.customize-steps')
  steps.forEach((step) => step.style.display = 'none') // Hide all three forms
  document.getElementById(`${currentStep}-step`).style.display = 'block' // Display current step form
}

function submitCustomization() {
  const genre = document.querySelector('input[name="genre"]:checked').value
  const length = document.querySelector('input[name="length"]').value
  const avatar = document.querySelector('input[name="avatar"]:checked').value
  const characterName = document.querySelector('input[name="character-name"]').value

  /* eslint-disable no-unused-vars */
  const formData = {
    genre,
    length,
    avatar,
    characterName
  }
  /* eslint-enable no-unused-vars */

  // Send data to backend
  confirm('User data sent to backend!')
}
