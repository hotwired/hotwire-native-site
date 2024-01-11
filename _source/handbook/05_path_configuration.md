---
permalink: /handbook/path-configuration.html
title: "Path Configuration"
description: "Customize app behavior remotely via the path configuration."
---

# Path Configuration

Hotwire Native apps can be configured via a JSON file call the *path configuration*.

The file can be bundled with your app's binary and/or live on your server. Hosting it remotely allows you to change configuration without needing an app update. It is recommended to include both as the local file ensures a smooth initial launch.

The *path configuration* is broken down into two top-level objects: settings and rules. App-level configuration belongs in `settings`, like feature flags. The `rules` array configures how different URL path patterns should behave.

## Android example

Here's an example *path configuration* for an Android app, abridged from the demo app.

```json
{
  "settings": {
    "screenshots_enabled": true
  },
  "rules": [
    {
      "patterns": [
        ".*"
      ],
      "properties": {
        "context": "default",
        "uri": "turbo://fragment/web",
        "pull_to_refresh_enabled": true
      }
    },
    {
      "patterns": [
        "/new$"
      ],
      "properties": {
        "context": "modal",
        "uri": "turbo://fragment/web/modal/sheet",
        "pull_to_refresh_enabled": false
      }
    }
  ]
}
```

This configuration does three things:

1. Enables screenshots for every transition across the app.
2. Sets *all* URL path patterns to render the default fragment with a `turbo://fragment/web` URI with pull-to-refresh enabled.
3. Overrides URL path patterns *ending* in `/new` to be presented as a modal with pull-to-refresh disabled.

## iOS example

And here's an example *path configuration* for an iOS app, also abridged from the demo app.

```json
{
  "settings": {},
  "rules": [
    {
      "patterns": [
        "/new$"
      ],
      "properties": {
        "context": "modal",
        "pull_to_refresh_enabled": false
      }
    },
    {
      "patterns": [
        "/numbers$"
      ],
      "properties": {
        "view_controller": "numbers"
      }
    }
  ]
}
```

This configuration does two things:

1. Overrides URL path patterns *ending* in `/new` to be presented as a modal with pull-to-refresh disabled.
2. Routes the `/number` URL path to a native view controller identified as `"numbers"`.

The [path configuration reference](/reference/path-configuration) provides more information including all the behavior Hotwire Native provides out of the box.
