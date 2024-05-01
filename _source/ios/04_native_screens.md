---
permalink: /ios/native-screens.html
order: 04
title: "Native Screens"
description: "Integrate fully native Swift screens in your Hotiwre Native app."
---

# Native Screens

To render a native screen on iOS you need match an identifier in the [path configuration](/overview/path-configuration) with your `UIViewController`.

First, match a URL path pattern and set the `view_controller` property. This path configuration routes all URLs ending in `/numbers`.

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
    private lazy var navigator = Navigator(delegate: self)

    // ...
}

extension SceneDelegate: NavigatorDelegate {
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

Check out the [demo app](https://github.com/hotwired/hotwire-native-ios/tree/main/Demo) to see how everything is wired up and for more complex examples.
