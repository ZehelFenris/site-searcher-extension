document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("wikiSelect");
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchBtn");

  chrome.storage.sync.get(["wikis"], (result) => {
    const wikis = result.wikis || [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/" },
      { name: "Wiktionary", url: "https://en.wiktionary.org/wiki/" }
    ];

    wikis.sort((a, b) => a.name.localeCompare(b.name));

    wikis.forEach(wiki => {
      const opt = document.createElement("option");
      opt.value = wiki.url;
      opt.textContent = wiki.name;
      select.appendChild(opt);
    });
  });

  input.focus();

  function searchWiki() {
    const term = input.value.trim();
    const baseUrl = select.value;
    if (term) {
      chrome.tabs.create({ url: baseUrl + encodeURIComponent(term) });
    }
  }

  button.addEventListener("click", searchWiki);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchWiki();
    }
  });
});