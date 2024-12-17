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
* `applicationUserAgentPrefix` - Set a custom user agent application prefix for every `WKWebView` instance. The library will automatically append a substring to your prefix which includes:
    * "Hotwire Native iOS; Turbo Native iOS;" - for `hotwire_native_app?` on your [Rails server](https://github.com/hotwired/turbo-rails/blob/1aa7ba9d38dee1e1b4078a74404131122b907176/app/controllers/turbo/native/navigation.rb#L14)
    * "bridge-components: [your bridge components];"
    * `WKWebView`'s default user agent string (at the beginning of the user agent)
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
