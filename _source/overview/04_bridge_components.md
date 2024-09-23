---
permalink: /overview/bridge-components.html
order: 04
title: "Bridge Components"
description: "Build HTML-driven native bridge components."
---

# Bridge Components

Hotwire Native apps seamlessly display your mobile web content in a native container with fully native animations and behaviors. If we were to use this binary approach exclusively, we'd quickly run into a major limitation: there’s no way for the native app to know what’s happening within the web view and adapt to the content that it’s displaying. 

To overcome this gap in communication, your app can use Bridge Components.

A Bridge Component is made up of two parts: a _web_ component (Stimulus) and a _native_ counterpart (Swift/Kotlin). Your web code and your native app code communicate through Hotwire Native's component-based framework that abstracts away the complexity of communicating with JavaScript code in a web view and native code in your app.

<figure>
    <img src="/assets/bridge-ios-button.png" width="500" alt="Native button component on iOS">
    "Profile" is declared by the web component and displayed natively by the native component.
</figure>

This component-based framework allows some web features to break out of the web view container and drive native features — whether it’s displaying native buttons in the top app bar, displaying native menu sheets, or calling native platform APIs. Bridge components enable you to do all of this and give you the flexibility to build components that are specific to your app’s needs.

Example components include native buttons to submit forms, web dialogs rendered as a `UIActionSheet` on iOS or `BottomSheetDialog` on Android, and more. Check out the [iOS](/ios/bridge-components)- and [Android](/android/bridge-components)-specific pages for information and code snippets.

<figure>
    <img src="/assets/bridge-examples.png" width="600" alt="Web and Native Components">
    Web content displayed natively as your app needs it.
</figure>

Being web-first means that _you_ get to decide which parts of your web-app become native. You can choose to quickly ship a purely web screen and then iterate natively. Maybe some features require a more responsive interface so you use Bridge Components. Yet, in rare cases, you should go fully native. 

If that's the case, integrating fully native code is easy too.
