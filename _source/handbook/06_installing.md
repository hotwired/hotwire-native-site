---
permalink: /handbook/installing.html
description: "Learn how to install Strada in your application."
---

# Installing Strada in Your Application

Strada can either be referenced in compiled form via the Strada distributable script directly in the `<head>` of your application, or through npm via a bundler like esbuild.

## Prerequisite: Install Stimulus

Strada leverages [Stimulus](https://stimulus.hotwired.dev) and the core `BridgeComponent` class is an extension of a Stimulus `Controller`. You must have Stimulus installed in your web app before installing Strada. See the [Stimulus installation instructions](https://stimulus.hotwired.dev/handbook/installing).

## In Compiled Form

If you're using [importmap-rails](https://github.com/rails/importmap-rails) you just need to pin Stimulus and Strada in your config/importmap.rb file:

```sh
./bin/importmap pin @hotwired/stimulus @hotwired/strada
```

Alternatively, you can manually define importmap entries for both Strada and Stimulus, pointing to the latest versions of each:

```html
<head>
  <script type="importmap">
    {
      "imports": {
        "@hotwired/stimulus": "https://cdn.jsdelivr.net/npm/@hotwired/stimulus@latest/dist/stimulus.min.js",
        "@hotwired/strada": "https://cdn.jsdelivr.net/npm/@hotwired/strada@latest/dist/strada.min.js"
      }
    }
  </script>
</head>
```

Then you can import Strada anywhere in your application code:

```js
    import { BridgeComponent } from "@hotwired/strada"

    class BridgeTest extends BridgeComponent {
      // ...
    }
```

## As An npm Package

You can install Strada from npm via the `npm` or `yarn` packaging tools and use a JavaScript bundler, like webpack or esbuild, to import it in your application.

```javascript
import "@hotwired/strada"
```

# Installing Strada in Your Native Apps

Dedicated installation instructions are provided for the [iOS](https://github.com/hotwired/strada-ios) and [Android](https://github.com/hotwired/strada-android) libraries in their GitHub repos.

<div class="landing-actions">
  <a class="landing-actions__item" href="https://github.com/hotwired/strada-ios">
    <div class="landing-actions__icon landing-actions__icon--github" aria-hidden="true"></div>
    hotwired/strada-ios
  </a>

  <a class="landing-actions__item" href="https://github.com/hotwired/strada-android">
    <div class="landing-actions__icon landing-actions__icon--github" aria-hidden="true"></div>
    hotwired/strada-android
  </a>
</div>
