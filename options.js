function loadWikis() {
  chrome.storage.sync.get(["wikis", "defaultWiki"], (result) => {
    const defaultUrl = result.defaultWiki;
    const wikis = result.wikis || [];
    const tbody = document.querySelector("#wikiTable tbody");
    tbody.innerHTML = "";

    wikis.sort((a, b) => a.name.localeCompare(b.name));

    wikis.forEach((wiki, index) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = wiki.name;
      if (wiki.url === defaultUrl) {
        nameCell.textContent += " (default)";
        nameCell.style.fontWeight = "bold";
      }
      row.appendChild(nameCell);
      
      const urlCell = document.createElement("td");
      urlCell.textContent = wiki.url;
      row.appendChild(urlCell);

      const actionCell = document.createElement("td");
      const delBtn = document.createElement("button");
      delBtn.textContent = "Remove";
      delBtn.onclick = () => {
        wikis.splice(index, 1);
        chrome.storage.sync.set({ wikis }, loadWikis);
      };
      actionCell.appendChild(delBtn);
      const setDefaultBtn = document.createElement("button");
      setDefaultBtn.textContent = "Set Default";
      setDefaultBtn.onclick = () => {
        chrome.storage.sync.set({ defaultWiki: wiki.url }, loadWikis);
      };
      actionCell.appendChild(setDefaultBtn);
            row.appendChild(actionCell);

      tbody.appendChild(row);
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

// Load current icon preference
chrome.storage.sync.get(["useColorIcon"], (result) => {
  document.getElementById("useColorIcon").checked = result.useColorIcon || false;
});

// Save preference when toggled
document.getElementById("useColorIcon").addEventListener("change", (e) => {
  const useColor = e.target.checked;
  chrome.storage.sync.set({ useColorIcon: useColor });
});

document.addEventListener("DOMContentLoaded", loadWikis);