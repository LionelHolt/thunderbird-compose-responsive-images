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
						target.removeAttribute("width");
						target.removeAttribute("height");
						target.setAttribute("style", "max-width:100%");
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
