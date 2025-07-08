const ratingSlider = document.getElementById("rating");
const ratingValue = document.getElementById("ratingValue");

ratingSlider.addEventListener("input", () => {
  ratingValue.textContent = ratingSlider.value;
});

document.getElementById("submit").addEventListener("click", async () => {
  const rating = parseInt(ratingSlider.value);

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: autoFillRatings,
    args: [rating]
  });
});

function autoFillRatings(rating) {
  for (let i = 1; i <= 10; i++) {
    const radios = document.querySelectorAll(`input[name="evaluate[${i}]"]`);
    radios.forEach(radio => {
      if (radio.value === rating.toString()) {
        radio.click();
      }
    });
  }
}
