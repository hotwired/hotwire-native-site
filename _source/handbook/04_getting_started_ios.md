---
permalink: /handbook/getting-started-ios.html
description: "How to create a new Hotwire Native app on iOS."
---

# Getting Started on iOS

Follow these steps to create a minimal Hotwire Native application on iOS. This will support basic back/forward navigation but will not be a fully functional application.

First, download and install [Xcode 15+](https://developer.apple.com/xcode/).

Open Xcode and create a new iOS app via File → New → Project… Choose the default iOS "App" template, select "Swift" under "Language", and "Storyboard" under "Interface" in the project creation dialog.

Then add the Hotwire Native package via File → Add Packages Dependencies… and enter `https://github.com/hotwired/hotwire-native-ios`.

Finally, open `SceneDelegate` and replace the entire file with this code:

```swift
import Hotwire
import UIKit

let rootURL = URL(string: "https://turbo-native-demo.glitch.me")!

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    private let navigator = TurboNavigator()

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        Hotwire.registerStradaComponents([])
        window?.rootViewController = navigator.rootViewController
        navigator.route(rootURL)
    }
}
```

Click Product → Run and the app should launch in the simulator.

Note that we are pointing to a demo application server that expects a bit more native functionality. Some of the links, like native controls, won't work out of the box. Check out the [demo app](#) included in the repo for examples on how to handle those.

This example only touches on the core requirements of creating a `TurboNavigator` and routing the root URL. Feel free to can change the URL used for the initial visit to point to your web app.
