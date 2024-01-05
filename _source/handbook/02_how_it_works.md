---
permalink: /handbook/how-it-works.html
description: "How Hotwire Native renders web content in a native app."
---

# How it Works

At its core, Hotwire Native works by intercepting link clicks and passing control off to the native adapter. This layer then pushes (or presents) a new screen on the native stack with default, platform-specific animation. The request is then loaded and rendered via the web view.

Every time a new link is clicked a screenshot of the current page is captured. This ensures instant loading when a user navigates "back" to a previous screen. And because we are using native navigation controls, interactive pop gestures work exactly as expected.

Hotwire Native requires iOS 14.3+ or Android SDK 26+. Turbo Drive must be enabled on your web server to inform the clients when links are clicked.
