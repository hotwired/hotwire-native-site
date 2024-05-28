---
permalink: /android/native-screens.html
order: 04
title: "Native Screens"
description: "Integrate fully native Kotlin screens in your Hotiwre Native app."
---

# Native Screens

To render a native screen on Android you need match an identifier in the [path configuration](/overview/path-configuration) with your fragment.

First, match a URL path pattern and set the `uri` property. This path configuration routes all URLs ending in `/numbers`. You can also set a `title` to set the native title when the fragment is presented.

```json
{
  "settings": {},
  "rules": [
    {
      "patterns": [
        "/numbers$"
      ],
      "properties": {
        "uri": "turbo://fragment/numbers",
         "title": "Numbers"
      }
    }
  ]
}
```

Then, create a new fragment and provide a matching `HotwireDestination`.

```kotlin
@HotwireDestination(uri = "turbo://fragment/numbers")
class NumbersFragment : HotwireFragment() {
    // ...
}
```

Finally, register this fragment with Hotwire Native to use it when the URL path matches. See the [configuration](/android/configuration) docs for a recommendation on where to register fragments in your code.

```kotlin
Hotwire.registerFragmentDestinations(listOf(
    NumbersFragment::class
))
```

Check out the [demo app](https://github.com/hotwired/hotwire-native-android/tree/main/demo) to see how everything is wired up and for more complex examples.
