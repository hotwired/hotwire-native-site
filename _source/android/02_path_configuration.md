---
permalink: /android/path-configuration.html
title: "Path Configuration"
description: "Customize Android app behavior via the path configuration."
---

# Path Configuration

Building on the [overview of path configuration](/overview/path-configuration), here's an example for an Android app.

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

The [path configuration reference](/reference/path-configuration) provides more information including all the behavior Hotwire Native provides out of the box.
