---
permalink: /reference/elements.html
order: 02
title: "Elements"
description: "A reference of everything you can do with bridge elements."
---

# Bridge Elements

The `BridgeElement` class lets you easily use bridge-specific data and behaviors on elements in your components. You can wrap any element in a `new BridgeElement(myElement)` within your bridge components to access the following:

* `title`: Returns the title of the element, attempting to use a `data-bridge-title` value first, the `aria-label` value second, then otherwise falling back to the element's `textContent` or `value`.
* `disabled`: Returns whether the element is disabled with the `data-bridge-disabled` attribute.
* `enabled`: Returns the opposite of `disabled`.
* `enableForComponent(component)`: Removes the `data-bridge-disabled` attribute on the element.
* `hasClass(className)`: Returns whether the element has a particular class in its `classList`.
* `attribute(name)`: Returns the value of an attribute on the element.
* `bridgeAttribute(name)`: Returns the value of a `data-bridge-<name>` attribute on the element.
* `setBridgeAttribute(name, value)`: Sets the value of a `data-bridge-<name>` attribute on the element.
* `removeBridgeAttribute(name)`: Removes the `data-bridge-<name>` attribute on the element.
* `click()`: Performs a click on the element.
