let config = {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
};
let observer = new MutationObserver(function(mutations) {
  for (let mutation of mutations) {
    if (mutation.addedNodes && mutation.addedNodes.length) {
      for (let target of mutation.addedNodes) {
				if (target.nodeName == "IMG") {
					try {
						let str = target.getAttribute("style") || ""; // clears null
						if (!str.includes("max-width:")) {
							if (str) str += " ";
							target.setAttribute("style", `${str}max-width: 100%;`);
							target.removeAttribute("width");
							target.removeAttribute("height");
						}
					}
					catch (err) {
						console.log(err);
					}
				}
      }
    }
  }
});
observer.observe(document.body, config);
