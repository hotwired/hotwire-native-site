---
permalink: /android/configuration.html
order: 05
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
