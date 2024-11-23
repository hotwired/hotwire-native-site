---
permalink: /ios/path-configuration.html
order: 02
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

This configuration does two things:

1. Sets *all* URL path patterns with pull-to-refresh enabled.
1. Overrides URL path patterns *ending* in `/new` to be presented as a modal with pull-to-refresh disabled. It is helpful to disable pull-to-refresh in modals so it doesn't interfere with the dismiss gesture or clear form data that a user may have entered.

## Sources

Path configuration has an array of `sources`. You can configure the source to be a locally bundled file, a remote file available from your server, or both. We recommend always including a bundled version even when loading remotely, so it will be available in case your app is offline.

```swift
let localPathConfigURL = Bundle.main.url(forResource: "path-configuration", withExtension: "json")!
let remotePathConfigURL = URL(string: "https://example.com/configurations/ios_v1.json")!

let pathConfiguration = PathConfiguration(sources: [
  .file(localPathConfigURL),
  .server(remotePathConfigURL)
])

let navigator = Navigator(pathConfiguration: pathConfiguration)
```

If you provide both a file and a server location, the path configuration will be loaded asynchronously in the following order:
1. The local file bundled with your app.
2. A locally cached copy of the server configuration (if a successful download occurred on a previous app launch).
3. A newly downloaded copy of the server configuration. (Once this has downloaded successfully, it will be cached and used in step 2 on the next app launch.) 

The `PathConfiguration` must be passed into your `Navigator`, so if you followed the [getting started](/ios/getting-started) steps, this code should go into the `SceneDelegate` class.

## Query String Matching

By default, path patterns match against the path component *and* query string of the URL.

To ensure the order of query string parameters don't affect matching, a wildcard `.*` before and after the match is recommended, like so:

```
{
  "patterns": [".*\\?.*foo=bar.*"],
  "properties": {
    "foo": "bar"
  }
}
```

Disable query string matching via:

```swift
Hotwire.config.pathConfiguration.matchQueryStrings = false
```

The [path configuration reference](/reference/path-configuration) provides more information, including all the behavior Hotwire Native provides out of the box.
