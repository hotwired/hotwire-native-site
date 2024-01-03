---
permalink: /reference/components.html
order: 01
title: "Components"
description: "A reference of everything you can do with bridge components."
---

# Bridge Components

## Web Components

The `BridgeComponent` class is an extension of a Stimulus [Controller](https://stimulus.hotwired.dev/reference/controllers). You have everything available in a standard `Controller` in addition to the following Strada-specific bridge functionality:

* `static component`: The unique name of the component. This must match the name you use for the corresponding native component.
* `this.platformOptingOut`: Specifies whether the controller is opted out for the current platform using the `data-controller-optout-<platform>` attribute.
* `this.enabled`: Specifies whether the component is enabled and supported by the current version of the native app.
* `this.bridgeElement`: Provides `this.element` for the component instance wrapped in a `BridgeElement`.
* `this.send(event, data = {}, callback)`: Sends a message to the native component with the `event` name, optional JSON `data`, and a `callback` to be run when the native component replies to the message.

For example, to create a `"form"` component that displays a native submit button in your native app, you'd add the following controller, target, and title attributes to your web `<form>`:

```html
<form
  method="post"
  data-controller="bridge--form">

  <!-- form elements -->

  <button
    class="button"
    type="submit"
    data-bridge--form-target="submit"
    data-bridge-title="Submit">
    Submit Form
  </button>

</form>
```

Next, create a `BridgeComponent` with named `"form"` that sends a message to the native component with `data` that contains the form's `submitTitle`. Provide a callback to run when the native component replies to the message.

```javascript
// bridge/form_controller.js

import { BridgeComponent, BridgeElement } from "@hotwired/strada"

export default class extends BridgeComponent {
  static component = "form"
  static targets = [ "submit" ]

  submitTargetConnected(target) {
    const submitButton = new BridgeElement(target)
    const submitTitle = submitButton.title

    this.send("connect", { submitTitle }, () => {
      target.click()
    })
  }
}
```

_Note: It's recommended to place your bridge components in a `/bridge` subdirectory where your Stimulus controllers live to make them easily identifiable and isolated from your other Stimulus controllers._

## Native Components

See the documentation for building the corresponding native components in the [hotwired/strada-ios](https://github.com/hotwired/strada-ios/blob/main/docs/BUILD-COMPONENTS.md) and [hotwired/strada-android](https://github.com/hotwired/strada-android/blob/main/docs/BUILD-COMPONENTS.md) repos.

<br/>
