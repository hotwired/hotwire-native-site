---
permalink: /overview/basic-navigation.html
order: 02
title: "Basic Navigation"
description: "How to navigate between pages in Hotwire Native."
---

# Basic Navigation

The main interaction in Hotwire Native apps is tapping on links. Like the web, every page can link to another.

1. Click a link.
1. A new screen is pushed onto the navigation stack with a native animation.
1. A spinner appears indicating the page is loading.
1. The page contents render inside the web view.

<img src="/assets/basic-navigation.png" width="800" alt="Basic navigation">

## Replacing Screens

By default, every clicked link _pushes_ a new screen onto the stack. Hotwire Native uses platform-specific animations to ensure the interaction feels like a native app.

The framework also applies a few sane defaults. Navigating to the _current_ page's URL path (again) will _replace_ the screen on the stack. And navigating to the _previous_ page's URL path will _pop_ the screen off the stack back to the previous screen.

You can also manually trigger a _replace_ action by adding `data-turbo-action="replace"` to links and forms. This will cause the visited page to replace the current screen (not push a new one) and load the new contents.

## Caching

Tapping the native "back" button instantly shows a snapshot of the previous page, further blending the gap to native apps. On iOS, the interactive pop gesture - dragging your finger from the far left of the screen - is also supported.

## External Links

Note that if the URL of a tapped link is _not_ on the same domain as the current page it is considered _external_. External links are not routed through Hotwire Native. They instead open via an in-app web browser, iOS uses a [`SFSafariViewController`](https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller) and [Android Custom Tabs](Android Custom Tabs) on Android.

## Advanced Navigation

Hotwire Native supports a bunch of other navigation patterns like popping the entire stack and manually refreshing the current page. But individually decorating each link would create a maintenance nightmare.

So we've abstracted these _rules_ into something called the [path configuration](/overview/path-configuration).
