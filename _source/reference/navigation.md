---
permalink: /reference/navigation.html
order: 01
title: "Navigation"
description: "How to navigate between screens with Hotwire Native."
---

# Navigation

Navigating between screens is a core concept of building Hotwire Native apps. By default, all screens will be pushed onto the main navigation stack with animation. You can customize the navigation behavior by providing path configuration rules or manually routing in Swift or Kotlin.

## Routing

Set `context` or `presentation` to a [path configuration](/reference/path-configuration) rule to apply the logic in the following table.

* **State** describes what state the app is currently in: `modal` if a modal is presented, `default` otherwise.
* **Context** is the value of the `context` property on the tapped link: `modal` or `default`. No value defaults to `default`.
* **Presentation** is the value of the `presentation` property on the tapped link: `replace`, `pop`, `refresh`, `clear_all`, `replace_root`, `none`, or `default`. No value defaults to `default`.

<table>
  <thead>
    <tr>
      <th>State</th>
      <th>Context</th>
      <th>Presentation</th>
      <th>Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>default</code></td>
      <td><code>default</code></td>
      <td><code>default</code></td>
      <td>
        Push on main stack (or)<br>
        Replace if visiting same page (or)<br>
        Pop then visit if previous screen is same URL
      </td>
    </tr>
    <tr>
      <td><code>default</code></td>
      <td><code>default</code></td>
      <td><code>replace</code></td>
      <td>Replace screen on main stack</td>
    </tr>
    <tr>
      <td><code>default</code></td>
      <td><code>modal</code></td>
      <td><code>default</code></td>
      <td>Present a modal with only this screen</td>
    </tr>
    <tr>
      <td><code>default</code></td>
      <td><code>modal</code></td>
      <td><code>replace</code></td>
      <td>Present a modal with only this screen</td>
    </tr>
    <tr>
      <td><code>modal</code></td>
      <td><code>default</code></td>
      <td><code>default</code></td>
      <td>Dismiss then Push on main stack</td>
    </tr>
    <tr>
      <td><code>modal</code></td>
      <td><code>default</code></td>
      <td><code>replace</code></td>
      <td>Dismiss then Replace on main stack</td>
    </tr>
    <tr>
      <td><code>modal</code></td>
      <td><code>modal</code></td>
      <td><code>default</code></td>
      <td>Push on the modal stack</td>
    </tr>
    <tr>
      <td><code>modal</code> </td>
      <td><code>modal</code></td>
      <td><code>replace</code></td>
      <td>Replace screen on modal stack</td>
    </tr>
    <tr>
      <td><code>default</code></td>
      <td>(any)</td>
      <td><code>pop</code></td>
      <td>Pop screen off main stack</td>
    </tr>
    <tr>
      <td><code>default</code></td>
      <td>(any)</td>
      <td><code>refresh</code></td>
      <td>Pop on main stack then</td>
    </tr>
    <tr>
      <td><code>modal</code></td>
      <td>(any)</td>
      <td><code>pop</code></td>
      <td>
        Pop screen off modal stack (or)<br>
        Dismiss if one modal screen
      </td>
    </tr>
    <tr>
      <td><code>modal</code></td>
      <td>(any)</td>
      <td><code>refresh</code></td>
      <td>
        Pop screen off modal stack then<br>
        Refresh last screen on modal stack<br>
        (or)<br>
        Dismiss if one modal screen then<br>
        Refresh last screen on main stack
      </td>
    </tr>
    <tr>
      <td>(any)</td>
      <td>(any)</td>
      <td><code>clear_all</code></td>
      <td>
        Dismiss if modal screen then<br>
        Pop to root then<br>
        Refresh root screen on main stack
      </td>
    </tr>
    <tr>
      <td>(any)</td>
      <td>(any)</td>
      <td><code>replace_root</code></td>
      <td>
        Dismiss if modal screen then<br>
        Pop to root then<br>
        Replace root screen on main stack
      </td>
    </tr>
    <tr>
      <td>(any)</td>
      <td>(any)</td>
      <td><code>none</code></td>
      <td>Nothing</td>
    </tr>
  </tbody>
</table>

### Server-Driven Routing in Rails

If you're using Ruby on Rails, the [turbo-rails](https://github.com/hotwired/turbo-rails) gem provides the following additional routes. Use these to customize the behavior for Hotwire Native apps but falling back to redirecting elsewhere.

* `recede_or_redirect_to(url, **options)` - Pops the visible screen off of the navigation stack. If a modal is presented on iOS, the modal is dismissed instead.
* `resume_or_redirect_to(url **options)` - No action is taken.
* `refresh_or_redirect_to(url, **options)` - Reloads the visible screen by performing a new web request and invalidating the cache.

Add the following to your path configuration to apply the presentation logic.

```json
{
  "settings": {},
  "rules": [
    {
      "patterns": ["/turbo_recede_historical_location_url"],
      "properties": {"presentation": "pop"}
    },
    {
      "patterns": ["/turbo_resume_historical_location_url"],
      "properties": {"presentation": "none"}
    },
    {
      "patterns": ["/turbo_refresh_historical_location_url"],
      "properties": {"presentation": "refresh"}
    }
  ]
}
```

## Manual Navigation

`Navigator` can be used to navigate from a [native screen](/overview/native-screens) to another native screen or back to a web context.

### iOS

```swift
let rootURL = URL(string: "...")!
let navigator = Navigator()

// Visit a new page.
navigator.route(rootURL.appending(path: "foo"))

// Pop the top controller off the stack.
navigator.pop()

// Pop the entire stack of controllers.
navigator.clearAll()
```

Disable the animation via the optional `animated` parameter.

```swift
navigator.route(rootURL.appending(path: "foo"), animated: false)
navigator.pop(animated: false)
navigator.clearAll(animated: false)
```

### Android

Inside of a `HotwireActivity` class:

```kotlin
val location = "https://..."
val navigator = delegate.currentNavigator

// Visit a new page.
navigator?.route("$location/foo")

// Pop the backstack to the previous destination.
navigator?.pop()

// Clear the navigation backstack to the start destination.
navigator?.clearAll()
```

Inside of a `HotwireFragment` class:

```kotlin
val location = "https://..."

// Visit a new page.
navigator.route("$location/foo")

// Pop the backstack to the previous destination.
navigator.pop()

// Clear the navigation backstack to the start destination.
navigator.clearAll()
```
