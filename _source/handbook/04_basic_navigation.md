---
permalink: /handbook/basic-navigation.html
title: "Basic Navigation"
description: "Execute common navigation patterns via the path configuration and Turbo Navigator."
---

# Basic Navigation

By default, every clicked link _pushes_ a new screen onto the stack. Hotwire Native uses platform-specific animations to ensure the interaction feels like a native app.

The framework also applies a few sane defaults. Navigating to the _current_ page's URL path (again) will _replace_ the screen on the stack. And navigating to the _previous_ page's URL path will _pop_ the screen off the stack back to the previous screen.

You can also manually trigger a _replace_ action by adding `data-turbo-action="replace"` to links and forms. This will cause the visited page to replace the current screen (not push a new one) and load the new contents.

Hotwire Native supports a bunch of other navigation patterns like popping the entire stack and manually refreshing the current page. But individually decorating each link would create a maintenance nightmare.

So we've abstracted these _rules_ into something called the path configuration.
