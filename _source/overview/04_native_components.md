---
permalink: /overview/native-components.html
order: 04
title: "Native Components"
description: "Build HTML-driven native components with Strada."
---

# Native Components

You can build Hotwire Native apps to enjoy the best of the web alongside the best of native apps and fully native screens. But there’s a major limitation: there’s no way for the native app to know what’s happening within the web view and adapt to the content that it’s displaying.

Additionally, it’d be great for some web features to break out of the web view container and drive native features — whether it’s displaying native buttons in the top app bar, displaying native menu sheets, or calling native platform APIs. Strada enables you to do all of this and gives you the flexibility to build components that are specific to your app’s needs.

Strada acts a "bridge" between your web code and your native app code, letting your web app and native app communicate through a component-based framework. It abstracts away the complexity of communicating with JavaScript code in a web view and native code in your app.

Example components include native buttons to submit forms, web dialogs rendered as a `UIActionSheet` on iOS or `BottomSheetDialog` on Android, and more.

<img src="/assets/bridge-examples.png" width="600" alt="Basic navigation">

Check out the [iOS](/ios/native-components)- and [Android](/android/native-components)-specific pages for information and code snippets.
