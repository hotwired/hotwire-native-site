---
permalink: /overview/path-configuration.html
title: "Path Configuration"
description: "Customize app behavior remotely via the path configuration."
---

# Path Configuration

Hotwire Native apps can be configured via a JSON file called the *path configuration*.

The file can be bundled with your app's binary and/or live on your server. Hosting it remotely allows you to change configuration without needing an app update. It is recommended to include both as the local file ensures a smooth initial launch.

The *path configuration* is broken down into two top-level objects: settings and rules. App-level configuration belongs in `settings`, like feature flags. The `rules` array configures how different URL path patterns should behave.

An empty path configuration requires both keys, as follows.

```json
{
  "settings": {},
  "rules": []
}
```

See the [iOS](/ios/path-configuration)- and [Android](/android/path-configuration)-specific pages on path configuration for more details and examples.

The [path configuration reference](/reference/path-configuration) provides more information including all the behavior Hotwire Native provides out of the box.
