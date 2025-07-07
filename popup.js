document.getElementById("submit").addEventListener("click", async () => {
  const rating = parseInt(document.getElementById("rating").value);

  if (rating < 1 || rating > 5) {
    alert("Rating must be between 1 and 5");
    return;
  }

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
