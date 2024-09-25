---
permalink: /android/path-configuration.html
order: 02
title: "Path Configuration"
description: "Customize Android app behavior via the path configuration."
---

# Path Configuration

Building on the [overview of path configuration](/overview/path-configuration), here's an example for an Android app.

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
        "uri": "hotwire://fragment/web",
        "pull_to_refresh_enabled": true
      }
    },
    {
      "patterns": [
        "/new$"
      ],
      "properties": {
        "context": "modal",
        "uri": "hotwire://fragment/web/modal/sheet",
        "pull_to_refresh_enabled": false
      }
    }
  ]
}
```

This configuration does two things:

1. Sets *all* URL path patterns to render the default fragment with a `hotwire://fragment/web` URI with pull-to-refresh enabled.
1. Overrides URL path patterns *ending* in `/new` to be presented as a modal with pull-to-refresh disabled. It is helpful to disable pull-to-refresh in modals so it doesn't interfere with the dismiss gesture or clear form data that a user may have entered.

## Location

Path configuration has a `location` that can be loaded from your app. You can configure the `location` to be a locally bundled file, a remote file available from your server, or both. We recommend always including a bundled version even when loading remotely, so it will be available in case your app is offline.

```kotlin
Hotwire.loadPathConfiguration(
    context = this,
    location = PathConfiguration.Location(
        assetFilePath = "json/configuration.json",
        remoteFileUrl = "https://example.com/configurations/android_v1.json"
    )
)
```

`Path Configuration` will always load locally available configurations first. When providing both a bundled file and a server location, load order is as follows:

1. The bundled file
2. The cached server file (if a successful download has previously occurred)
3. The downloaded server file

Providing a bundled file and a server location will cause the path configuration to immediately load from the bundled version and – if it exists – a cached version of the server file. Then it will begin downloading the server file. Once the server file is successfully downloaded, it is loaded and cached for further use.

The [path configuration reference](/reference/path-configuration) provides more information including all the behavior Hotwire Native provides out of the box.
