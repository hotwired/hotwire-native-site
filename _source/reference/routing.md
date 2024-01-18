---
permalink: /reference/routing.html
order: 01
title: "Routing"
description: "Full documentation on Hotwire Native routing."
---

# Routing

Hotwire Native provides some URL routing options preconfigured out of the box. The following table outlines each scenario and the expected behavior.

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
      <td><code>clearAll</code></td>
      <td>
        Dismiss if modal screen then<br>
        Pop to root then<br>
        Refresh root screen on main stack
      </td>
    </tr>
    <tr>
      <td>(any)</td>
      <td>(any)</td>
      <td><code>replaceRoot</code></td>
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

## Server-Driven Navigation

You can also use these URL paths to drive navigation directly from your server. Either redirect to or link directly to one.

* **Recede**: `/turbo_recede_historical_location_url` - Pops the visible screen off of the navigation stack. If a modal is presented on iOS, the modal is dismissed instead.
* **Resume**: `/turbo_resume_historical_location_url` - No action is taken.
* **Refresh**: `/turbo_refresh_historical_location_url` - Reloads the visible screen by performing a new web request and invalidating the cache.

> **Note**: These are not _currently_ supported in Hotwire Native without first applying the following path configuration.
>
> ```json
> {
>   "settings": {},
>   "rules": [
>     {
>       "patterns": ["/turbo_recede_historical_location_url"],
>       "properties": {"presentation": "pop"}
>     },
>     {
>       "patterns": ["/turbo_resume_historical_location_url"],
>       "properties": {"presentation": "none"}
>     },
>     {
>       "patterns": ["/turbo_refresh_historical_location_url"],
>       "properties": {"presentation": "refresh"}
>     }
>   ]
> }
> ```
