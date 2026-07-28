---
permalink: /android/tabs.html
order: 02
title: "Tabs"
description: "How to add bottom tabs to a Hotwire Native app on Android."
---

# Tabs

A native bottom tab bar elevates a Hotwire Native app to make it feel more like a native app. Under the hood, Hotwire Native drives a standard `BottomNavigationView` from [Material Components](https://github.com/material-components/material-components-android). This means all the expected features work out of the box, including:

* Customization for tab titles and icons
* A separate navigator and navigation stack for each tab
* Reselecting the active tab clears its stack back to the start screen

## Add a bottom navigation view

We'll build on top of the app from the [Getting Started guide](/android/getting-started). Each tab needs its own `NavigatorHost` in the layout so it maintains its own navigation stack. From there, replace the contents of `activity_main.xml` with the following:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/root"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <androidx.fragment.app.FragmentContainerView
        android:id="@+id/navigation_navigator_host"
        android:name="dev.hotwire.navigation.navigator.NavigatorHost"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toTopOf="@id/bottom_nav"
        app:defaultNavHost="false" />

    <androidx.fragment.app.FragmentContainerView
        android:id="@+id/bridge_components_navigator_host"
        android:name="dev.hotwire.navigation.navigator.NavigatorHost"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toTopOf="@id/bottom_nav"
        app:defaultNavHost="false" />

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottom_nav"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

## Define the tabs

Then, define a tab for each `NavigatorHost` with a `tabs` variable in `MainActivity.kt`:

```kotlin
val tabs = listOf(
    HotwireBottomTab(
        title = "Navigation",
        iconResId = R.drawable.ic_tab_navigation,
        configuration = NavigatorConfiguration(
            name = "navigation",
            navigatorHostId = R.id.navigation_navigator_host,
            startLocation = "https://hotwire-native-demo.dev"
        )
    ),

    HotwireBottomTab(
        title = "Bridge Components",
        iconResId = R.drawable.ic_tab_bridge_components,
        configuration = NavigatorConfiguration(
            name = "bridge-components",
            navigatorHostId = R.id.bridge_components_navigator_host,
            startLocation = "https://hotwire-native-demo.dev/components"
        )
    )
)
```

This creates two tabs, Navigation and Bridge Components. The tab bar's menu is populated automatically from the tabs, so there's no need to create a menu resource.

Each `HotwireBottomTab` requires the following parameters:

* `title`: The string to display on the tab
* `iconResId`: The [drawable resource](https://developer.android.com/develop/ui/views/graphics/drawables) to display as the tab's icon
* `configuration`: The `NavigatorConfiguration` for the tab, with a unique `name`, the ID of the tab's `NavigatorHost` in your layout, and the URL to visit when the tab loads

Optionally, pass `isVisible = false` to hide a tab.

## Set up the controller

Finally, replace the `MainActivity` class with the following to wire everything up with a `HotwireBottomNavigationController`:

```kotlin
class MainActivity : HotwireActivity() {
    private lateinit var bottomNavigationController: HotwireBottomNavigationController

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        findViewById<View>(R.id.root).applyDefaultImeWindowInsets()

        bottomNavigationController = HotwireBottomNavigationController(
            activity = this,
            view = findViewById(R.id.bottom_nav)
        )
        bottomNavigationController.load(tabs)
    }

    override fun navigatorConfigurations() = tabs.navigatorConfigurations
}
```

Every tab's start location is loaded up front, so switching tabs is instant. Pass a second argument to `load()` to select a different initial tab, and use `setOnTabSelectedListener` to be notified when the selected tab changes:

```kotlin
bottomNavigationController.load(tabs, selectedTabIndex = 1)
bottomNavigationController.setOnTabSelectedListener { index, tab ->
    // ...
}
```

## Lazy loading

Each tab performs a web visit for its start location. If loading every tab up front is too expensive, opt into lazy loading by passing `lazyLoadTabs = true` to the controller. A lazily loaded tab doesn't visit its start location until the user first selects it. The initially selected tab always loads right away.

```kotlin
HotwireBottomNavigationController(
    activity = this,
    view = findViewById(R.id.bottom_nav),
    lazyLoadTabs = true
)
```
