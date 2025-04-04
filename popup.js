document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("wikiSelect");
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchBtn");

  chrome.storage.sync.get(["wikis", "defaultWiki"], (result) => {
    const wikis = result.wikis || [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/" },
      { name: "Wiktionary", url: "https://en.wiktionary.org/wiki/" }
    ];
    const defaultUrl = result.defaultWiki;
  
    wikis.sort((a, b) => a.name.localeCompare(b.name));
  
    wikis.forEach(wiki => {
      const opt = document.createElement("option");
      opt.value = wiki.url;
      opt.textContent = wiki.name;
      if (wiki.url === defaultUrl) {
        opt.selected = true;
      }
      select.appendChild(opt);
    });
  });
      
  input.focus();

  function searchWiki() {
    const term = document.getElementById("searchInput").value.trim();
    const baseUrl = document.getElementById("wikiSelect").value;
  
    if (term) {
      let url = baseUrl;
  
      if (url.includes("{[searchTerm]}")) {
        url = url.replace("{[searchTerm]}", encodeURIComponent(term));
      } else {
        url += encodeURIComponent(term);
      }
  
      chrome.tabs.create({ url });
    }
  }
  

  button.addEventListener("click", searchWiki);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchWiki();
    }
  });
});