const facultySlider = document.getElementById("facultyRating");
const courseSlider = document.getElementById("courseRating");

const facultyValue = document.getElementById("FacultyRatingValue");
const courseValue = document.getElementById("CourseRatingValue");

facultySlider.addEventListener("input", async () => {
  facultyValue.textContent = facultySlider.value;
  await fillRatings();
});

courseSlider.addEventListener("input", async () => {
  courseValue.textContent = courseSlider.value;
  await fillRatings();
});

async function fillRatings() {
  const facultyRating = parseInt(facultySlider.value);
  const courseRating = parseInt(courseSlider.value);

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: autoFillRatings,
    args: [facultyRating, courseRating]
  });
}

function autoFillRatings(facultyRating, courseRating) {
  for (let i = 1; i <= 10; i++) {
    const radios = document.querySelectorAll(`input[name="evaluate[${i}]"]`);
    radios.forEach(radio => {
      if (radio.value === facultyRating.toString()) {
        radio.click();
      }
    });
  }

  for (let i = 11; i <= 15; i++) {
    const radios = document.querySelectorAll(`input[name="evaluate[${i}]"]`);
    radios.forEach(radio => {
      if (radio.value === courseRating.toString()) {
        radio.click();
      }
    });
  }
}
