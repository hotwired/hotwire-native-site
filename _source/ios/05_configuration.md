---
permalink: /ios/configuration.html
order: 05
title: "Configuration"
description: "How to customize a Hotwire Native iOS app."
---

# Configuration

`HotwireConfig` provides a few options to customize your Hotwire Native iOS app. We recommend making all configuration changes *before* instantiating a `Navigator`, ideally in `AppDelegate` or `SceneDelegate`.

Append the following options to `Hotwire.config` to change the global configuration. For example, to enable debug logging call:

```swift
Hotwire.config.debugLoggingEnabled = true
```

## General

* `debugLoggingEnabled` - Enable or disable debug logging for Turbo visits and bridge elements connecting, disconnecting, receiving/sending messages, and more.
* `userAgent` - Override to set a custom user agent for your app's requests. Make sure to include "Hotwire Native" or "Turbo Native" to use `turbo_native_app?` on your Rails server.
* `showDoneButtonOnModals` - When enabled, adds a `UIBarButtonItem` of type `.done` to the left navigation bar button item on screens presented modally.
* `backButtonDisplayMode` - Sets the back button display mode of `HotwireWebViewController`.

## Turbo

* `defaultViewController` - The view controller used in `Navigator` for web requests. Must be a `VisitableViewController` or subclass.
* `defaultNavigationController` - The navigation controller used in `Navigator` for the main and modal stacks. Must be a `UINavigationController` or subclass.
* `makeCustomWebView` - Optionally customize the web views used by each Turbo Session. Ensure you return a new instance each time.

## Path Configuration

* `pathConfiguration.matchQueryStrings` - Enable to match the query string when applying rules in addition to the path.

## Bridge

* `jsonEncoder` - Set a custom JSON encoder when parsing bridge payloads. The custom encoder can be useful when you need to apply specific encoding strategies, like snake case vs. camel case.
* `jsonDecoder` - Set a custom JSON decoder when parsing bridge payloads. The custom decoder can be useful when you need to apply specific decoding strategies, like snake case vs. camel case.
