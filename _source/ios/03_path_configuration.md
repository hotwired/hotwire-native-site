---
permalink: /ios/path-configuration.html
order: 03
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

## Sources

A path configuration has an array of `sources`. You can configure the source to be a locally bundled file, a remote file available from your server, or both. We recommend always including a bundled version even when loading remotely, so it will be available in case your app is offline.

Providing a bundled file and a server location will cause the path configuration to immediately load from the bundled version and then download the server version. When downloading from a server, it will also cache that latest version locally, and attempt to load it before making the network request. That way you have a chain of configurations available, always using the latest version when available, but falling back to cache or bundle as needed.

```swift
let pathConfiguration = PathConfiguration(sources: [
  .file(Bundle.main.url(forResource: "path-configuration", withExtension: "json")!),
  .server(URL(string: "https://example.com/your-path-config.json")!)
])

let navigator = Navigator(pathConfiguration: pathConfiguration)
```

## Query String Matching

By default, path patterns only match against the path component of the URL. Enable query string matching via:

```swift
Hotwire.config.pathConfiguration.matchQueryStrings = true
```

To ensure the order of query string parameters don't affect matching, a wildcard `.*` before and after the match is recommended, like so:

```
{
  "patterns": [".*\\?.*foo=bar.*"],
  "properties": {
    "foo": "bar"
  }
}
```

The [path configuration reference](/reference/path-configuration) provides more information including all the behavior Hotwire Native provides out of the box.
