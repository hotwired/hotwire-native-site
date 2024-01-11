---
permalink: /handbook/native-screens.html
title: "Native Screens"
description: "Integrate fully native Kotlin and Swift screens in your Hotiwre Native app."
---

# Native Screens

There are times where neither web-based content nor [native components](/handbook/native-components) are enough. Times where you need maximum fidelity or interaction with native SDKs and APIs. For these, you can build fully native screens in Kotlin and Swift.

## Native Screens on Android

> Coming soon...

## Native Screens on iOS

To render a native screen on iOS you need match an identifier in the [path configuration](/handbook/path-configuration) with your `UIViewController`.

First, match a URL path pattern and set the `view_controller` property.

```json
{
  "settings": {},
  "rules": [
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

Then, conform your controller to `PathConfigurationIdentifiable` and provide a matching `pathConfigurationIdentifier`.

```swift
class NumbersViewController: UITableViewController, PathConfigurationIdentifiable {
    static var pathConfigurationIdentifier: String { "numbers" }

    init(url: URL) {
        self.url = url
    }

    // ...
}
```

Finally, tell Hotwire Native to use this new controller when the property matches.

```swift
class SceneDelegate: UIResponder {
    private lazy var navigator = TurboNavigator(delegate: self)

    // ...
}

extension SceneDelegate: TurboNavigatorDelegate {
    func handle(proposal: VisitProposal) -> ProposalResult {
        switch proposal.viewController {
        case NumbersViewController.pathConfigurationIdentifier:
            return .acceptCustom(NumbersViewController(url: proposal.url))
        default:
            return .accept
        }
    }
}
```

Check out the [demo app](#) to see how everything is wired up and for more complex examples.
