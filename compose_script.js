// console.log('Hello from Compose Responsive Images [CRI]');
let config = {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
};
let observer = new MutationObserver(function(mutations) {
  for (let mutation of mutations) {
    if (mutation.addedNodes && mutation.addedNodes.length) {
			let strNodes = mutation.addedNodes.length == 1 ? "node" : "nodes";
			// console.log(`[CRI] ${mutation.addedNodes.length} ${strNodes} added`);
      for (let target of mutation.addedNodes) ProcessNodes(target);
    }
  }
});
observer.observe(document.body, config);

async function ProcessNodes(target) {
	if (target.nodeName == "IMG") {
		try {
			// console.log("[CRI] <IMG> found, source is " + target.src.substring(0, 100) + (target.src.length <= 100 ? "" : "\u2026"));
			let parent = target.parentNode;
			while (parent && "classList" in parent) {
				if (parent.classList.contains("moz-signature")) {
					// console.log("Not resizing - image is part of signature");
					return;
				}
				if (parent.getAttribute("type") == "cite") {
					// console.log("Not resizing - image is part of message being replied to");
					return;
				}
				if (parent.classList.contains("moz-forward-container")) {
					// console.log("Not resizing - image is part of forwarded message");
					return;
				}
				parent = parent.parentNode;
			}
			let str = target.getAttribute("style") || ""; // clears null
			if (!str.includes("max-width:")) {
				if (str) str += " ";
				target.setAttribute("style", `${str}max-width: 100%;`);
				target.removeAttribute("width");
				target.removeAttribute("height");
			}
		}
		catch (err) {
			// console.log(err);
		}
	}
	else if (target.nodeType == Node.ELEMENT_NODE) {
		// console.log("[CRI] <" + target.nodeName + "> found, checking children");
		for (let child of target.children) {
			ProcessNodes(child);
		}
	}
}
