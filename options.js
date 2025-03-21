function loadWikis() {
  chrome.storage.sync.get(["wikis"], (result) => {
    const wikis = result.wikis || [];
    const list = document.getElementById("wikiList");
    list.innerHTML = "";

    wikis.sort((a, b) => a.name.localeCompare(b.name));

    wikis.forEach((wiki, index) => {
      const li = document.createElement("li");
      li.textContent = `${wiki.name} - ${wiki.url} `;
      const delBtn = document.createElement("button");
      delBtn.textContent = "Remove";
      delBtn.onclick = () => {
        wikis.splice(index, 1);
        chrome.storage.sync.set({ wikis }, loadWikis);
      };
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  });
}

document.getElementById("addBtn").addEventListener("click", () => {
  const name = document.getElementById("wikiName").value.trim();
  const url = document.getElementById("wikiURL").value.trim();

  if (name && url) {
    chrome.storage.sync.get(["wikis"], (result) => {
      const wikis = result.wikis || [];
      wikis.push({ name, url });
      chrome.storage.sync.set({ wikis }, () => {
        document.getElementById("wikiName").value = "";
        document.getElementById("wikiURL").value = "";
        loadWikis();
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", loadWikis);