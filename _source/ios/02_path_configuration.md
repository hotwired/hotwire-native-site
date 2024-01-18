---
permalink: /ios/path-configuration.html
title: "Path Configuration"
description: "Customize iOS app behavior via the path configuration."
---

# Path Configuration

Building on the [overview of path configuration](/overview/path-configuration), here's an example for an iOS app.

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
