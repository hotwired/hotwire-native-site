---
permalink: /handbook/how-it-works.html
description: "Strada..."
---

# How it Works

Strada uses a component-based approach to create a bidirectional communication channel between [web components](/reference/components#web-components) in the `WebView` and [native components](/reference/components#native-components) in the native app. Strada acts as a "bridge" between your web code and native app code and abstracting away the inherent complexity.

Web components "send" messages to their corresponding native components. Native components "receive" the messages to build and display native controls, populating them with `data` supplied in the messages. When native components want to inform their corresponding web components of a user action or state change, the native components "reply" to the originally received messages. Web components "receive" the replies and invoke a callback to update the web component based on the reply message `data`.

Strada leverages [Stimulus](https://stimulus.hotwired.dev) to bring the same power to your web components. In fact, the core `BridgeComponent` class is an extension of a Stimulus `Controller`, so you should be familiar with Stimulus before building Strada components.

## Demo Examples

If you'd like to see Strada in action with examples, you can run the [Turbo iOS demo app](https://github.com/hotwired/turbo-ios/tree/main/Demo) or the [Turbo Android demo app](https://github.com/hotwired/turbo-android/tree/main/demo). They work together with the [Turbo Native demo web app](https://github.com/hotwired/turbo-native-demo), where you can see the source code for the demo web components.

The full source code for the `"form"` component example below can be found in the demo apps.

## Building a Web Component

Let's say you have a simple `<form>` in your web app with a submit button:

```html
<form method="post">

  <!-- form elements -->

  <button
    class="button"
    type="submit">
    Submit Form
  </button>

</form>
```

Displaying <b>submit</b> buttons in the top-right of the native app bar is a typical convention in mobile apps. It has the benefit of never being hidden underneath the virtual keyboard, and is always visible no matter where you're scrolled on the page. Instead of displaying the submit button in the `WebView`, we can display a native button through a set of `"form"` web and native components.

Let's update the form with bridge attributes and create a new web component, leveraging Strada and Stimulus conventions:
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

Now, we'll create a new `"form"` component. This is similar to the way you create Stimulus controllers, but extending the `BridgeComponent` class:
```javascript
// bridge/form_controller.js

import { BridgeComponent } from "@hotwired/strada"

export default class extends BridgeComponent {
  static component = "form"
  static targets = [ "submit" ]

  // ...
}
```

With the basic `"form"` component created, we can now send a `message` to a corresponding native `"form"` component. We'll send the submit button's title as JSON `data` in the message, so the native component can set the native button's title with the `submitTitle`.
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

Notice the third parameter when calling `send()`. It's a callback function that will be called when the native component replies to the `"connect"` message. The submit button in the `<form>` is clicked, submitting the form to the server, just as if the user had tapped the button directly.

The web component is now ready and we can build a corresponding `"form"` component in the iOS and Android apps.

## Building a Native iOS Component

Let's create a native `"form"` component in a [Turbo iOS](https://github.com/hotwired/turbo-ios) app. First we'll subclass the `BridgeComponent` class:

```swift
final class FormComponent: BridgeComponent {
    override class var name: String { "form" }

    // ...
}
```

Now we can implement the code to handle receiving and replying to messages:

```swift
final class FormComponent: BridgeComponent {
    override class var name: String { "form" }

    // Handle incoming messages based on the message `event`.
    override func onReceive(message: Message) {
        switch message.event {
        case "connect":
            handleConnectEvent(message: message)
        }
    }

    private func handleConnectEvent(message: Message) {
        guard let data: MessageData = message.data() else { return }
        configureBarButton(with: data.submitTitle)
    }

    private func configureBarButton(with title: String) {
        let item = UIBarButtonItem(title: title,
                                   style: .plain,
                                   target: self,
                                   action: #selector(performAction))

        // Display the button in the app bar
    }

    // Reply to the originally received "connect" event message (without any new data).
    @objc func performAction() {
        reply(to: "connect")
    }
}

private extension FormComponent {
    struct MessageData: Decodable {
        let submitTitle: String
    }
}
```

The component receives the `message` for the `"connect"` `event`, displays the native button with the `submitTitle`, and replies to the web component when the native button is tapped.

_Note: There's additional work to set up [Strada iOS](https://github.com/hotwired/strada-ios) in your app for the first time. See the [Quick Start](https://github.com/hotwired/strada-ios/blob/main/docs/QUICK-START.md) guide for complete instructions._

## Building a Native Android Component

Let's create a native `"form"` component in a [Turbo Android](https://github.com/hotwired/turbo-android) app. First we'll subclass the `BridgeComponent` class:

```kotlin
class FormComponent(
    name: String,
    private val delegate: BridgeDelegate<NavDestination>
) : BridgeComponent<NavDestination>(name, delegate) {
    // ...
}
```

Now we can implement the code to handle receiving and replying to messages:

```kotlin
class FormComponent(
    name: String,
    private val delegate: BridgeDelegate<NavDestination>
) : BridgeComponent<NavDestination>(name, delegate) {

    // Handle incoming messages based on the message `event`.
    override fun onReceive(message: Message) {
        when (message.event) {
            "connect" -> handleConnectEvent(message)
        }
    }

    private fun handleConnectEvent(message: Message) {
        val data = message.data<MessageData>() ?: return
        showToolbarButton(data)
    }

    private fun showToolbarButton(data: MessageData) {
        // Display the button in the toolbar

        binding.formSubmit.apply {
            text = data.title
            setOnClickListener {
                performSubmit()
            }
        }
    }

    // Reply to the originally received "connect" event message (without any new data).
    private fun performSubmit(): Boolean {
        return replyTo("connect")
    }

    @Serializable
    data class MessageData(
        @SerialName("submitTitle") val title: String
    )
}
```

The component receives the `message` for the `"connect"` `event`, displays the native button with the `submitTitle`, and replies to the web component when the native button is tapped.

_Note: There's additional work to set up [Strada Android](https://github.com/hotwired/strada-android) in your app for the first time. See the [Quick Start](https://github.com/hotwired/strada-android/blob/main/docs/QUICK-START.md) guide for complete instructions._

## Add CSS to Hide Bridged Elements

We've now set up `"form"` components in the web and native apps. Whenever a native app supports the `"form"` component, it'll receive a message from the web component and display its native button.

There's one final piece to finish. We want to hide the web submit button in the `<form>` when a native button is being displayed. It's easy to write scoped css that is only applied if:
- A particular version of the native app supports the `"form"` component
- A particular `<form>` in your app is connected to a `"form"` component

```css
[data-bridge-components~="form"]
[data-controller~="bridge--form"]
[type="submit"] {
  display: none;
}
```

And now you've got an improved form screen in your app!
