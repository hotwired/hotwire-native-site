---
permalink: /android/reference.html
order: 06
title: "Reference"
description: "An reference guide to the Hotwire Native Android library."
---

# Reference

## Navigator

The `Navigator` is the central coordinator in a Hotwire Native Android application. Each `NavigatorHost` in your Activity maintains a `Navigator` instance, which manages the stack of `HotwireFragment` screens with a single, shared `WebView` instance. It lets your app choose how to handle link taps, present new screens, and deal with errors.

## Custom WebView

You can customize and subclass the `HotwireWebView` class to provide custom behaviors in your app:

```kotlin
Hotwire.config.makeCustomWebView = { context ->
    MyCustomWebView(context, null)
}
```

## Handling URL routes

By default, all external urls outside of your app's domain are opened in the default browser on the device. This is easily customizable, though. Out-of-the-box, Hotwire Native provides three route decision handlers for you to use to control how urls are routed:
- `AppNavigationRouteDecisionHandler`: Routes all internal urls through your app (enabled by default).
- `BrowserRouteDecisionHandler`: Routes all external urls to the device's default browser (enabled by default).
- `BrowserTabRouteDecisionHandler`: Routes all external urls to a [Custom Tab](https://developer.chrome.com/docs/android/custom-tabs) in your app (disabled by default).

If you'd like to customize this behavior, it's easy to do. For example, if you'd like to route external urls to Custom Tabs instead of the default browser, you can register the relevant decision handlers in order of importance:

```kotlin
Hotwire.registerRouteDecisionHandlers(
    AppNavigationRouteDecisionHandler(),
    BrowserTabRouteDecisionHandler()
)
```

You can also implement your own `Router.RouteDecisionHandler` classes and register them the same way.
