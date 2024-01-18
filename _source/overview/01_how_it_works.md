---
permalink: /overview/how-it-works.html
description: "How Hotwire Native renders web content in a native app."
---

# How it works

Hotwire Native makes your mobile web content feel at home on Android and iOS by using standard, platform-specific components and animations. To all but the most tech-savvy users, it will feel like a fully native app.

Under the hood, it’s a glorified web browser. Hotwire Native displays whatever HTML and CSS your server renders. Here's an example from the Basecamp iOS app. Only the green content is native, everything else is from the web.

<img src="/assets/native-vs-web.png" width="600" alt="Native vs. web">

Basecamp Hotwire Native app on iOS

At its core, Hotwire Native intercepts link clicks and passes control off to a native adapter. This layer then pushes (or presents) new screens on the native stack with default, platform-specific animation. The request is then loaded and rendered via the web view.

Every time a new link is clicked a screenshot of the current page is captured. This ensures instant loading when a user navigates "back" to a previous screen. And because we are using native navigation controls, interactive pop gestures work exactly as expected.

Adding new screens is as straightforward as building new pages in your web app. Your Android and iOS clients see updates as soon as you deploy. All without new submissions to the app stores.

And upgrading to native isn’t an all-or-nothing decision. You are free to choose specific screens or even specific *components* to migrate when you’re ready. It truly is progressive enhancement.
