// Icon paths
const darkIcon = {
    16: "icons/icon16_dark_greyscale.png",
    48: "icons/icon48_dark_greyscale.png",
    128: "icons/icon128_dark_greyscale.png"
  };
  
  const colorIcon = {
    16: "icons/icon16_color_transparent_glass.png",
    48: "icons/icon48_color_transparent_glass.png",
    128: "icons/icon128_color_transparent_glass.png"
  };
  
  // Set icon based on current setting
  function setExtensionIcon(useColor) {
    chrome.action.setIcon({ path: useColor ? colorIcon : darkIcon });
  }
  
  // On startup
  chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.get(["useColorIcon"], (result) => {
      setExtensionIcon(result.useColorIcon);
    });
  });
  
  // On install
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(["useColorIcon"], (result) => {
      setExtensionIcon(result.useColorIcon);
    });
  });
  
  // Listen for changes to icon preference
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.useColorIcon) {
      setExtensionIcon(changes.useColorIcon.newValue);
    }
  });
  