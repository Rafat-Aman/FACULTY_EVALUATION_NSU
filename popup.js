document.getElementById("submit").addEventListener("click", async () => {
  const knowledge = document.getElementById("knowledge").value;
  const clarity = document.getElementById("clarity").value;
  const helpfulness = document.getElementById("helpfulness").value;

  const ratings = {
    knowledge: parseInt(knowledge),
    clarity: parseInt(clarity),
    helpfulness: parseInt(helpfulness)
  };

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: autoFillForm,
    args: [ratings]
  });
});

function autoFillForm(ratings) {
  const questions = document.querySelectorAll('table tr');

  const ratingMap = {
    knowledge: ratings.knowledge,
    clarity: ratings.clarity,
    helpfulness: ratings.helpfulness
  };

  let qIndex = 0;
  for (let key in ratingMap) {
    const row = questions[qIndex];
    if (!row) continue;

    const radios = row.querySelectorAll('input[type=radio]');
    const val = ratingMap[key] - 1; // assume radio buttons are 0-indexed
    if (radios[val]) radios[val].click();

    qIndex++;
  }
}
