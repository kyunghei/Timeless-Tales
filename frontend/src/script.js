function nextCustomizeStep(currentStep) {
    let customTabs = document.querySelectorAll('.custom-tabs');
    customTabs.forEach((tab) => tab.removeAttribute('checked'));// Unhighlight all three custom tabs
    document.getElementById(`${currentStep}-tab`).checked = true; // Highlight current tab displayed

    let steps = document.querySelectorAll('.customize-steps');
    steps.forEach((step) => step.style.display = 'none'); // Hide all three forms
    document.getElementById(`${currentStep}-step`).style.display = 'block'; // Display current step form
}

function submitCustomization() {
    let genre = document.querySelector('input[name="genre"]:checked').value;
    let length = document.querySelector('input[name="length"]').value;
    let avatar = document.querySelector('input[name="avatar"]:checked').value;
    let characterName = document.querySelector('input[name="character-name"]').value;

    const formData = {
        genre,
        length,
        avatar,
        characterName
    };

    // Send data to backend
    confirm('User data sent to backend!')
}