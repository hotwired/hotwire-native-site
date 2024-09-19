---
permalink: /reference/path-configuration.html
order: 02
title: "Path Configuration"
description: "Advanced navigation via the path configuration."
---

# Path Configuration

The *path configuration* is broken down into two top-level objects: settings and rules. An empty configuration looks like this.

```json
{
  "settings": {},
  "rules": []
}
```

## Settings

App-level configuration belongs in `settings`. This is useful when you have a remote configuration file, since you can add your own custom settings and use them as remote feature-flags.

## Rules

The `rules` array defines how different URL path patterns should behave. Each rule consists of the `patterns` to match and the `properties` to apply.

```json
{
  "settings": {},
  "rules": [
    {
      patterns: "",
      properties: {}
    }
  ]
}
```

The top-most declaration should establish the default behavior for all patterns and subsequent rules can override this for specific behavior.

### Patterns

The `patterns` array defines regular expression patterns that will be used to match URL paths.

### Properties

The `properties` hash contains a handful of key/value pairs that Hotwire Native supports out of the box. You are free to add more properties as your app needs, but these are the ones the framework is aware of and will handle automatically.

* `context` — Specifies the presentation context in which the view should be displayed. Hotwire Native will determine what the navigation behavior should be based on this value and `presentation`.
	* Optional.
	* Possible values: `default` or `modal`. Defaults to `default`.
* `presentation` — Specifies what style to use when presenting the given destination. Hotwire Native will determine what the navigation behavior should be based on this value and `context`.
	* Optional.
	* Possible values: `default`, `push`, `pop`, `replace`, `replace_root`, `clear_all`, `refresh`, `none`. Defaults to `default`.
* `pull_to_refresh_enabled` — Whether or not pull-to-refresh should be enabled.
	* Optional.
	* Possible values: `true`, `false`. Defaults to `false` on Android and `true` on iOS.

### Android-specific properties

* `uri` — The target destination URI to navigate to. Must map to an Activity or Fragment that has implemented the [`TurboNavGraphDestination`](../turbo/src/main/kotlin/dev/hotwire/turbo/nav/TurboNavGraphDestination.kt) annotation with a matching `uri` value.
	* **Required**. 
	* No explicit value options. No default value.
* `fallback_uri` — Provides a fallback URI in case a destination cannot be found that maps to the `uri`. Can be useful in cases when pointing to a new `uri` that may not be available yet in older versions of the app.
	* Optional.
	* No explicit value options. No default value.
* `title` —  Specifies a default title that will be displayed in the toolbar for the destination. This is most useful for native destinations, since web destinations will render their title from the web view page's `<title>` tag.
    * Optional.
    * No explicit value options. No default value.

### iOS-specific properties

* `view_controller` — The identifier for a native `UIViewController` to navigate to. Conform your custom controller to `PathConfigurationIdentifiable` to it to this identifier.
    * Optional.
    * No explicit value options. No default value.
