---
permalink: /reference/attributes.html
order: 03
title: "Attributes"
description: "A reference of everything you can do with element attributes."
---

# Attributes

## Data Attributes

The following data attributes can be applied to any element accessed via the `BridgeElement` class:

* `data-bridge-title="My Title"`: Specifies a custom bridge title for your element.
* `data-bridge-disabled`: Specifies whether the bridge element should be enabled or disabled for a particular platform. Values must be `"true"`, `"false"`, `"ios"`, or `"android"`.
* `data-bridge-*`: Specifies arbitrary attributes prefixed with `data-bridge-` whose values are accessible from a `BridgeElement`.

The following data attributes can be applied to elements associated with a `data-controller` and a `BridgeComponent` class:

* `data-controller-optout-ios`: Opt-out the component for your iOS app using [strada-ios](https://github.com/hotwired/strada-ios). Allows you to conditionally disable a component instance for iOS, even if the native app supports the component.
* `data-controller-optout-android`: Opt-out the component for your Android app using [strada-android](https://github.com/hotwired/strada-android). Allows you to conditionally disable a component instance for Android, even if the native app supports the component.
