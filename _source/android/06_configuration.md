---
permalink: /android/configuration.html
order: 06
title: "Configuration"
description: "How to customize a Hotwire Native Android app."
---

# Configuration

## Create an Application Instance

Customize your app by configuring options before your `HotwireActivity` instance is created by the system. We recommend using an `Application` instance to place the configuration code.


```kotlin
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        // Set configuration options
    }
}
```

To ensure this is invoked when the app starts, add the name of your `Application` instance to `AndroidManifest.xml` via the `android:name` property on the `<application>` node.

```xml
<application android:name=".MyApplication">
    <!-- ... -->
</application>
```

## Options

Enable debug logging and WebView debugging in debug builds:

```kotlin
if (BuildConfig.DEBUG) {
    Hotwire.config.logger.logLevel = HotwireLogLevel.DEBUG
}
Hotwire.config.webViewDebuggingEnabled = BuildConfig.DEBUG
```

By default, the library logs to Logcat with the log level set to `HotwireLogLevel.NONE`, so no logs are emitted. All library logging, including HTTP request logging, is controlled by the logger's `logLevel`. The available levels are `VERBOSE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, and `NONE`.

To handle library logs in your app, for example to forward them to your own logging framework, provide a custom implementation of the [HotwireLogger](https://github.com/hotwired/hotwire-native-android/blob/main/core/src/main/kotlin/dev/hotwire/core/logging/HotwireLogger.kt) interface:

```kotlin
Hotwire.config.logger = MyAppLogger

object MyAppLogger : HotwireLogger {
    override var logLevel = HotwireLogLevel.DEBUG

    override fun v(tag: String, msg: () -> String) { /* ... */ }
    override fun d(tag: String, msg: () -> String) { /* ... */ }
    override fun i(tag: String, msg: () -> String) { /* ... */ }
    override fun w(tag: String, msg: () -> String) { /* ... */ }
    override fun e(tag: String, throwable: Throwable?, msg: () -> String) { /* ... */ }
}
```

Set the default fragment destination:

```kotlin
Hotwire.defaultFragmentDestination = HotwireWebFragment::class
```

Register fragment destinations:

```kotlin
Hotwire.registerFragmentDestinations(
    HotwireWebFragment::class, // Don't forget to register this for regular destinations
    MyCustomFragment::class
)
```

Register bridge components, where the first argument is the component name to match in Stimulus:

```kotlin
Hotwire.registerBridgeComponents(
    BridgeComponentFactory("my-custom", ::MyCustomComponent)
)
```

Set the JSON converter used for bridge components:

```kotlin
Hotwire.config.jsonConverter = KotlinXJsonConverter()
```

Set a custom user agent application prefix for every `WebView` instance. The library will automatically append a substring to your prefix which includes:
* - `"Hotwire Native Android; Turbo Native Android;"` - for `hotwire_native_app?` on your [Rails server](https://github.com/hotwired/turbo-rails/blob/1aa7ba9d38dee1e1b4078a74404131122b907176/app/controllers/turbo/native/navigation.rb#L14)
* - `"bridge-components: [your bridge components];"`
* - The `WebView`'s default Chromium user agent string

```kotlin
Hotwire.config.applicationUserAgentPrefix = "My Application;"
```

## Origin Trust

Starting in version `1.4.0`, Hotwire Native checks the origin of a page before it lets the page navigate in-app or reach native code. An origin is the full scheme, host and port, so `http://example.com` and `https://example.com:8443` are different origins from `https://example.com`.

The library checks the origin for:

- Route decisions: whether a link opens in the app or outside it
- Deep links: a start location from a deep link must have the same origin as the navigator's start location, or the navigator uses its own start location instead
- Injecting the library's JavaScript into a page
- Turbo and bridge component messages, which only work from the main frame
- The file chooser
- Location, camera and microphone [permissions](/android/reference#permissions)

The library only checks origins that the `WebView` or your app reports, never values a page provides. When it blocks something, it logs a warning, so set `Hotwire.config.logger.logLevel` to `HotwireLogLevel.WARN`, `INFO`, `DEBUG` or `VERBOSE` while you set up a policy.

### Default Policy

By default, `DefaultOriginTrustPolicy` trusts the origins of your `NavigatorHost` start locations. If your app loads pages from a single origin, you don't need to configure anything.

Each `NavigatorHost` registers its start location while it exists, and it removes the registration when it's destroyed. Every navigator opens all registered origins in the app, including the origins of other navigators. `Hotwire.config.registeredOrigins` lists the origins that are registered right now.

If your app doesn't use `NavigatorHost`, nothing gets registered, so the default policy doesn't trust any origin. You must set your own policy.

### Custom Policy

To trust more origins, set `Hotwire.config.originTrustPolicy`. You can build on the default:

```kotlin
private val accounts = Origin.parse("https://accounts.example.com")

Hotwire.config.originTrustPolicy = object : OriginTrustPolicy() {
    override fun isTrustedForNavigation(origin: Origin) =
        origin == accounts || DefaultOriginTrustPolicy.isTrustedForNavigation(origin)

    override fun isTrustedForNativeAccess(origin: Origin) =
        origin == accounts || DefaultOriginTrustPolicy.isTrustedForNativeAccess(origin)
}
```

A policy makes 2 decisions:

- `isTrustedForNavigation()`: whether a url on the origin opens in the app. Urls on other origins open in a browser tab, or through the system for other schemes like `mailto:`.
- `isTrustedForNativeAccess()`: whether pages on the origin can reach native code. The library only grants native access to origins that are also trusted for navigation.

Trust the origins of your web pages for both. Navigation trust on its own is for urls your path configuration routes to a native screen, like CDN images opened in a native image viewer. A web page on an origin trusted only for navigation won't load.

The library only asks your policy about `http` and `https` urls, and it passes an `Origin` it has already parsed, so you can compare origins with `==`. Create your own with `Origin.parse()`, or `Origin.parseOrNull()` if the url might not be valid.

### Pages Outside Turbo

A page can still load in the `WebView` without a Turbo visit, for example after a form with `data-turbo="false"` posts to another origin. If that origin isn't trusted for native access, the page loads, but it can't send messages to your app or use its permissions.

## Passkeys

Starting in version `1.4.0`, you can allow WebAuthn (passkey) requests from your `WebView` instances. Set this in your `Application` instance, before any `WebView` is created:

```kotlin
Hotwire.config.webAuthenticationEnabled = true
```

Passkeys also need:

- Your app associated with your website through [Digital Asset Links](https://developers.google.com/digital-asset-links)
- A server that accepts your app's `android:apk-key-hash:<hash>` origin, because the `WebView` sends your app's identity instead of the page's origin
- A device `WebView` that supports web authentication. On other devices, this setting has no effect.

Only turn this on if your `WebView` instances load nothing but your own sites. Any page in the `WebView` can request passkeys for your associated sites, including cross-origin iframes your pages allow `publickey-credentials-get` or `publickey-credentials-create`.
