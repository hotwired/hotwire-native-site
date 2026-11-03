---
permalink: /android/reference.html
order: 07
title: "Reference"
description: "A reference guide to the Hotwire Native Android library."
---

# Reference

## Navigator

The `Navigator` is the central coordinator in a Hotwire Native Android application. Each `NavigatorHost` in your Activity maintains a `Navigator` instance, which manages the stack of `HotwireFragment` screens with a single, shared `WebView` instance. It lets your app choose how to handle link taps, present new screens, and deal with errors.

The `Navigator` replaces its session and `WebView` if the `WebView` render process is gone, so don't keep a reference to `navigator.session` or its `WebView`.

## Custom WebView

You can customize and subclass the `HotwireWebView` class to provide custom behaviors in your app:

```kotlin
Hotwire.config.makeCustomWebView = { context ->
    MyCustomWebView(context, null)
}
```

Return a new instance every time. The library destroys a `NavigatorHost`'s `WebView` when the host is destroyed, and it creates a new one if the render process is gone. Apply all of your `WebView` customizations here, so every new `WebView` gets them.

## Permissions

The `WebView` asks for location, camera and microphone permissions when a page requests them, as long as your `AndroidManifest.xml` declares them.

For `navigator.geolocation`:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

For `getUserMedia()`:

```xml
<!-- Camera -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Microphone: the WebView needs both -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
```

If a permission is missing from the manifest, the library denies the request and logs a warning, and the page gets a `NotAllowedError`. Pages only get these permissions on origins your app [trusts](/android/configuration#origin-trust).

You don't need any permission for photos from a file input like `<input type="file" accept="image/*">`. The library opens the camera app for it.

## Errors

When a visit fails, the destination shows the view from `createErrorView()`. Override it in your web fragment to show your own view, and match on the error to change it:

```kotlin
override fun createErrorView(error: VisitError): View {
    val message = when (error) {
        is LoadError.UntrustedOrigin -> "This page can't open in the app."
        is LoadError.WebViewNotSupported -> "Update Android System WebView to continue."
        else -> error.description
    }

    return layoutInflater.inflate(R.layout.error, null).apply {
        findViewById<TextView>(R.id.error_message).text = message
    }
}
```

Starting in version `1.4.0`, `LoadError` includes 2 new errors:

- `LoadError.UntrustedOrigin(location)`: the page is on an origin your app doesn't [trust](/android/configuration#origin-trust).
- `LoadError.WebViewNotSupported`: the device's `WebView` is too old for Hotwire Native, which needs version 88 or later.

## Custom HTML data attributes

- `data-native-prevent-pull-to-refresh`: Apply to any element in your web app whose touch events conflict with the native pull-to-refresh behavior in the `WebView`. By default, scrollable elements prevent pull-to-refresh, but you may need to apply this custom attribute to elements that have draggable or swipeable behaviors.
