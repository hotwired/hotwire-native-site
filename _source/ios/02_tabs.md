---
permalink: /ios/tabs.html
order: 02
title: "Tabs"
description: "How to add tabs to a Hotwire Native app on iOS."
---

# Tabs

A native tab bar elevates a Hotwire Native app to make it feel more like a native app. Under the hood, Hotwire Native uses a standard `UITabBarController` subclass. This means all the expected features work out of the box, including:

* Customization for tab titles and images
* Separate navigation stacks for each tab
* Tapping an active tab pops the stack to the root screen

## Add a tab bar controller

We'll build on top of the app from the [Getting Started guide](/ios/getting-started). From there, replace the contents of `SceneDelegate` with the following:

```swift
import HotwireNative
import UIKit

let rootURL = URL(string: "https://hotwire-native-demo.dev")!

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    private let tabBarController = HotwireTabBarController()

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        window?.rootViewController = tabBarController
        tabBarController.load(tabs)
    }
}
```

Then, populate the tabs with a `tabs` variable at the bottom of the file:

```swift
let tabs = [
    HotwireTab(
        title: "Navigation",
        image: .init(systemName: "arrow.left.arrow.right")!,
        url: rootURL
    ),

    HotwireTab(
        title: "Bridge Components",
        image: .init(systemName: "square.grid.2x2")!,
        url: rootURL.appendingPathComponent("components")
    )
]
```

This creates two tabs, Navigation and Bridge Components.

<figure>
    <img src="/assets/ios-tabs.png" width="400" alt="Hotwire Native tabs on iOS" />
</figure>

Each `HotwireTab` requires the following parameters:

* `title`: The string to display on the tab
* `image`: The image to display on the tab - the example above uses [SF Symbols](https://developer.apple.com/sf-symbols/)
* `url`: The URL to visit when the tab loads
