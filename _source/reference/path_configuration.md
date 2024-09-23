---
permalink: /reference/path-configuration.html
order: 02
title: "Path Configuration"
description: "Advanced navigation via the path configuration."
---

# Path Configuration

The basics of *Path Configuration* are explained in the [overview](/overview/03-path-configuration). If you're ready to build your first Path Configuration, keep reading.

## Settings

`settings` is your sandbox for App-level configuration. As explained in the overview, common use cases include feature flags or any additional information that your app may use to configure itself. Feel free to add or modify any objects or arrays here, always remembering to [version](/overview/03-path-configuration) your path configuration if you make breaking changes.

```json
{
  "settings": {
    "use_local_db": true,
    "cable": {
      "script_url": "https://hotwire-native-demo.dev/configurations/action_cable.js"
    },
    "feature_flags": [
        {
          "name": "new_onboarding_flow",
          "enabled": true
        }
      ]
  }
  "rules": []
}
```

## Rules

`rules` contains individual entries that define how different URL path patterns should behave. Each rule consists of the `patterns` to match and the `properties` to apply.

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

Entries in `rules` are read sequentially and are applied to the caught URL (via path pattern regex matching) as they are read. This means that rules earlier in the array can be overwritten by rules further down the array. It's recommended that the first rule should establish the default behavior for all patterns and subsequent rules can override this for specific behavior.

The following *Path Configuration* shows how a rule further down the array can override properties set by previous rules. Notice property `pull_to_refresh_enabled` is `true` for all URLs but `false` for URL path patterns matching `"/new$"`.

```json
{
  "settings": {},
  "rules": [
    {
      "patterns": [
        ".*"
      ],
      "properties": {
        "context": "default",
        "pull_to_refresh_enabled": true
      }
    },
    {
      "patterns": [
        "/new$"
      ],
      "properties": {
        "context": "modal",
        "pull_to_refresh_enabled": false
      }
    }
  ]
}
```

Using the above Path Configuration, when a navigation is requested to `"/"`:
1. *Path Configuration* matches `"/"` to the first rule `".*"`
2. *Path Configuration* sets `pull_to_refresh_enabled = true`
3. Since the second rule does not match the URL path pattern, it is ignored.

However, when navigation is requested to `"/new"`:
1. *Path Configuration* matches `"/new"` to the first rule `".*"`
2. *Path Configuration* sets `pull_to_refresh_enabled = true`
3. *Path Configuration* matches `"/new"` to the second rule `"/new$"`
4. *Path Configuration* sets `pull_to_refresh_enabled = fase`

A rule earlier in the array can be overwritten by rules further down the array.


### Patterns

The `patterns` array defines regular expression patterns that will be used to match URL paths.

### Properties

The `properties` hash contains a handful of key/value pairs that Hotwire Native supports out of the box. 

* `context` — Specifies the presentation context in which the view should be displayed. Hotwire Native will determine what the navigation behavior should be based on this value and `presentation`.
	* Optional.
	* Possible values: `default` or `modal`. Defaults to `default`.
* `presentation` — Specifies what style to use when presenting the given destination. Hotwire Native will determine what the navigation behavior should be based on this value and `context`.
	* Optional.
	* Possible values: `default`, `push`, `pop`, `replace`, `replace_root`, `clear_all`, `refresh`, `none`. Defaults to `default`.
* `pull_to_refresh_enabled` — Whether or not pull-to-refresh should be enabled.
	* Optional.
	* Possible values: `true`, `false`. Defaults to `false` on Android and `true` on iOS.

You are free to add more properties as your app needs, but these are the ones the framework is aware of and will handle automatically.

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
