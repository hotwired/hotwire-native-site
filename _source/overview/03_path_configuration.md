---
permalink: /overview/path-configuration.html
order: 03
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

## Versioning

It is recommended to version your path configuration file names and use a unique resource per platform, like so:

* `/configurations/ios_v1.json`
* `/configurations/android_v1.json`

This allows forward and backward compatibility with new app versions that you release. If you make breaking changes in a new version of your app then start pointing to `*_v2.json` for the new build. Keep old versions available so older clients can continue to work properly until the app is updated.

See the [iOS](/ios/path-configuration)- and [Android](/android/path-configuration)-specific pages on path configuration for more details and examples.

The [path configuration reference](/reference/path-configuration) provides more information including all the behavior Hotwire Native provides out of the box.
