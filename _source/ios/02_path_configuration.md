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

This configuration overrides URL path patterns *ending* in `/new` to be presented as a modal with pull-to-refresh disabled. It is helpful to disable pull-to-refresh in modals so it doesn't interfere with the dismiss gesture.

## Sources

Path configuration has an array of `sources`. You can configure the source to be a locally bundled file, a remote file available from your server, or both. We recommend always including a bundled version even when loading remotely, so it will be available in case your app is offline.

```swift
let localPathConfigURL = Bundle.main.url(forResource: "path-configuration", withExtension: "json")!
let remotePathConfigURL = URL(string: "https://example.com/your-path-config.json")!

let pathConfiguration = PathConfiguration(sources: [
  .file(localPathConfigURL),
  .server(remotePathConfigURL)
])

let navigator = Navigator(pathConfiguration: pathConfiguration)
```

`PathConfiguration` will always load locally available configurations first. When providing both a bundled file and a server location, load order is as follows:

1. The bundled file
2. The cached server file (if a successful download has previously occurred)
3. The downloaded server file

Providing a bundled file and a server location will cause the path configuration to immediately load from the bundled version and – if it exists – a cached version of the server file. Then it will begin downloading the server file. Once the server file is successfully downloaded, it is loaded and cached for further use.

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

The [path configuration reference](/reference/path-configuration) provides more information including all the behavior Hotwire Native provides out of the box.
