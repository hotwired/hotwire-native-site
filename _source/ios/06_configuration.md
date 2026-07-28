---
permalink: /ios/configuration.html
order: 06
title: "Configuration"
description: "How to customize a Hotwire Native iOS app."
---

# Configuration

Hotwire Native provides a few options to customize your iOS app. We recommend making all configuration changes *before* instantiating a `Navigator`, ideally in `AppDelegate.swift`.

## General

* `Hotwire.config.debugLoggingEnabled` - Enable or disable debug logging for Turbo visits and bridge elements connecting, disconnecting, receiving/sending messages, and more.
* `Hotwire.config.log` - Provide a custom [`Logger`](https://github.com/hotwired/hotwire-native-ios/blob/main/Source/Logging/Logger.swift) implementation to handle library logs in your app, for example to forward them to your own logging framework. Only used when `debugLoggingEnabled` is enabled.

```swift
Hotwire.config.debugLoggingEnabled = true
Hotwire.config.log = MyAppLogger()

struct MyAppLogger: Logger {
    func log(message: String, level: LogLevel, file: String, function: String, line: UInt) {
        // Forward to your logging framework of choice.
    }
}
```

* `Hotwire.config.applicationUserAgentPrefix` - Set a custom user agent application prefix for every `WKWebView` instance. The library will automatically append a substring to your prefix which includes:
    * `"Hotwire Native iOS; Turbo Native iOS;"` - for `hotwire_native_app?` on your [Rails server](https://github.com/hotwired/turbo-rails/blob/1aa7ba9d38dee1e1b4078a74404131122b907176/app/controllers/turbo/native/navigation.rb#L14)
    * `"bridge-components: [your bridge components];"`
    * `WKWebView`'s default user agent string (at the beginning of the user agent)
* `Hotwire.config.showDoneButtonOnModals` - When enabled, adds a `UIBarButtonItem` of type `.done` to the left navigation bar button item on screens presented modally.
* `Hotwire.config.backButtonDisplayMode` - Sets the back button display mode of `HotwireWebViewController`.
* `Hotwire.config.hideTabBarWhenPushed` - Set to `true` to only show the [tab bar](/ios/tabs) on each tab's root screen. Defaults to `false`.
* `Hotwire.config.animateReplaceActions` - Set to `true` to fade content when performing a `replace` visit. Defaults to `false`.
* `Hotwire.config.redirectResolutionTimeout` - Timeout (in seconds) for the request that resolves redirects before a visit. Defaults to 30.

## Turbo

* `Hotwire.config.defaultViewController` - The view controller used in `Navigator` for web requests. Must be a [`VisitableViewController`](https://github.com/hotwired/hotwire-native-ios/blob/main/Source/Turbo/Visitable/VisitableViewController.swift) or subclass. Defaults to an instance of [`HotwireWebViewController`](https://github.com/hotwired/hotwire-native-ios/blob/main/Source/Turbo/ViewControllers/HotwireWebViewController.swift).

```swift
Hotwire.config.defaultViewController = { url in
    CustomViewController(url: url)
}
```

* `Hotwire.config.defaultNavigationController` - The navigation controller used in `Navigator` for the main and modal stacks. Must be a [`UINavigationController`](https://developer.apple.com/documentation/uikit/uinavigationcontroller) or subclass. Defaults to an instance of [`HotwireNavigationController`](https://github.com/hotwired/hotwire-native-ios/blob/main/Source/Turbo/ViewControllers/HotwireNavigationController.swift).

```swift
Hotwire.config.defaultNavigationController = {
    CustomNavigationController()
}
```

* `Hotwire.config.makeCustomWebView` - Optionally customize the web views used by each Turbo Session. Ensure you return a new instance each time.

* `Hotwire.config.makeCustomErrorView` - Optionally customize the native SwiftUI view presented when a visit fails. The block receives the [`HotwireNativeError`](https://github.com/hotwired/hotwire-native-ios/blob/main/Source/Turbo/Errors/HotwireNativeError.swift) and an optional retry handler and must return a view conforming to `ErrorPresentableView`. Defaults to an instance of [`DefaultErrorView`](https://github.com/hotwired/hotwire-native-ios/blob/main/Source/Turbo/Navigator/Helpers/ErrorHandling/DefaultErrorView.swift).

```swift
Hotwire.config.makeCustomErrorView = { error, handler in
    MyErrorView(error: error, handler: handler)
}

struct MyErrorView: ErrorPresentableView {
    let error: HotwireNativeError
    let handler: ErrorPresenter.Handler?

    var body: some View {
        VStack(spacing: 16) {
            Text(error.localizedDescription)

            if let handler {
                Button("Retry") {
                    handler()
                }
            }
        }
    }
}
```

## Path Configuration

* `Hotwire.config.pathConfiguration.matchQueryStrings` - Enable to match the query string when applying rules in addition to the path.

Load path configuration with `Hotwire.loadPathConfiguration(from:)`, like so:

```swift
let localPathConfigURL = Bundle.main.url(forResource: "path-configuration", withExtension: "json")!
let remotePathConfigURL = URL(string: "https://example.com/configurations/ios_v1.json")!

Hotwire.loadPathConfiguration(from: [
    .file(localPathConfigURL),
    .server(remotePathConfigURL)
])
```

## Bridge

* `Hotwire.config.jsonEncoder` - Set a custom JSON encoder when parsing bridge payloads. The custom encoder can be useful when you need to apply specific encoding strategies, like snake case vs. camel case.
* `Hotwire.config.jsonDecoder` - Set a custom JSON decoder when parsing bridge payloads. The custom decoder can be useful when you need to apply specific decoding strategies, like snake case vs. camel case.

Register bridge components with `Hotwire.registerBridgeComponents()`, like so:

```swift
Hotwire.registerBridgeComponents([
    FormComponent.self,
    MenuComponent.self,
    OverflowMenuComponent.self,
    // ...
])
```
