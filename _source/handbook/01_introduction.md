---
permalink: /handbook/introduction.html
redirect_from: /handbook/
description: "Strada is a set of three libraries that coordinate across the web, iOS, and Android to solve limitations in hybrid mobile apps."
---

# Introduction

You can build [Turbo Native](https://turbo.hotwired.dev/handbook/native) apps to enjoy the best of the web alongside the best of native apps and fully native screens. But, there's a major limitation: there's no way for the native app to know what's happening within the `WebView` and adapt to the content that it's displaying.

Additionally, it'd be great for some web features to break out of the `WebView` container and drive native features — whether it's displaying native buttons in the top app bar, displaying native menu sheets, or calling native platform APIs. <strong>Strada</strong> enables you to do all of this and gives you the flexibility to build components that are specific to your app's needs.

Strada acts a "bridge" between your web code and your native app code, letting your web app and native app communicate through a component-based framework. It abstracts away the complexity of communicating with JavaScript code in a `WebView` and native code in your app.
