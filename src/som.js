window.som = {
	create(string) {
		const container = document.createElement("template");
		container.innerHTML = string.trim();
		return container.content.firstChild;
	},
	after(node, node2) {
		node.parentNode.insertBefore(node2, node.nextSibling);
	},
	before(node, node2) {
		node.parentNode.insertBefore(node2, node);
	},
	append(parent, node) {
		parent.appendChild(node);
	},
	wrap(node, parent) {
		som.before(node, parent);
		som.append(parent, node);
	},
	find(selector, scope) {
		return (scope || document).querySelectorAll(selector);
	},
	remove(node) {
		node.parentNode.removeChild(node);
		return node;
	},
	empty(node) {
		const { childNodes } = node;
		const arr = [];
		let firstChild = node.firstChild;
		while (firstChild) {
			arr.push(som.remove(node.firstChild));
			firstChild = node.firstChild;
		}
		return arr;
	},
	attr(node, name, value) {
		if (arguments.length === 3) {
			node.setAttribute(name, value);
		} else {
			return node.getAttribute(name);
		}
	},
	text(node, string) {
		if (arguments.length === 2) {
			if ("innerText" in node) {
				node.innerText = string;
			} else {
				node.textContent = string;
			}
		} else if (arguments.length === 1) {
			if ("innerText" in node) {
				return node.innerText;
			} else {
				return node.textContent;
			}
		}
	},
	html(node, string) {
		if (arguments.length === 2) {
			node.innerHTML = string;
		} else if (arguments.length === 1) {
			return node.innerHTML;
		}
	},
	style(node, name, value) {
		if (arguments.length === 3) {
			//som.style(div, "color", "red")
			node.style[name] = value;
		} else if (arguments.length === 2) {
			if (typeof name === "string") {
				//som.style(div, "color")
				return node.style[name];
			} else if (name instanceof Object) {
				//som.style(div, {color: "red"})
				const object = name;
				for (let key in object) {
					node.style[key] = object[key];
				}
			}
		}
	},
	each(nodeList, fn) {
		for (let i = 0; i < nodeList.length; i++) {
			fn.call(null, nodeList[i]);
		}
	},
	class: {
		add(node, className) {
			node.classList.add(className);
		},
		remove(node, className) {
			node.classList.remove(className);
		},
		has(node, className) {
			return node.classList.contains(className);
		},
	},
	on(node, eventName, fn) {
		node.addEventListener(eventName, fn);
	},
	off(node, eventName, fn) {
		node.removeEventListener(eventName, fn);
	},
	find(selector, scope) {
		return (scope || document).querySelectorAll(selector);
	},
	parent(node) {
		return node.parentNode;
	},
	children(node) {
		return node.children;
	},
	siblings(node) {
		return Array.from(node.parentNode.children).filter((n) => n !== node);
	},
	next(node) {
		let x = node.nextSibling;
		while (x && x.nodeType === 3) {
			x = x.nextSibling;
		}
		return x;
	},
	previous(node) {
		let x = node.previousSibling;
		while (x && x.nodeType === 3) {
			x = x.previousSibling;
		}
		return x;
	},
	index(node) {
		const list = som.children(node.parentNode);
		let i;
		for (i = 0; i < list.length; i++) {
			if (list[i] === node) {
				break;
			}
		}
		return i;
	},
	drag(node, initialTop, initialLeft) {
		node.style.position = "absolute"
		node.style.top = initialTop + 'px'
		node.style.left = initialLeft + 'px'

		var dragging = false;
		var position = null;

		node.addEventListener("mousedown", function (e) {
			dragging = true;
			position = [e.clientX, e.clientY];
		});

		document.addEventListener("mousemove", function (e) {
			if (dragging === false) {
				return;
			}
			const x = e.clientX;
			const y = e.clientY;
			const deltaX = x - position[0];
			const deltaY = y - position[1];
			const left = parseInt(node.style.left || 0);
			const top = parseInt(node.style.top || 0);
			node.style.left = left + deltaX + "px";
			node.style.top = top + deltaY + "px";
			position = [x, y];
		});
		document.addEventListener("mouseup", function (e) {
			dragging = false;
		});
	}
};
