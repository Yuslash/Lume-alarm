# Premium Alarm Clock - Android Release v1.0.0

This directory contains the release build and integration files for the **Premium Alarm Clock** Android Application.

## APK Installer Info
- **File Name:** `premium-alarm-clock-v1.0.0.apk`
- **Version:** `1.0.0 (Build 1)`
- **Target SDK:** Android 34 (Android 14)
- **Minimum SDK:** Android 26 (Android 8.0)
- **Signature:** Release Signed (V2+V3)
- **File Size:** ~12.4 MB

## Features Packaged in this Build
1. **Dynamic Weather Backgrounds**: Real-time morning light and weather visualizers.
2. **Custom Playlist Alarm Sync**: Integrates playlist lookups from Spotify, YouTube, and Apple Music to trigger randomized audio morning alarms.
3. **Gesture Snooze & Dismiss Engine**: Swipe left/right to snooze, drag up to dismiss.
4. **Intelligent Fade-In Volume**: Optional ascending alarms configured from 10% to 100%.

## Installation Guide
1. Transfer the `premium-alarm-clock-v1.0.0.apk` file to your Android device.
2. Open your device's File Manager and locate the APK.
3. Tap on the APK file to initiate installation.
4. If prompted, enable "Install from Unknown Sources" for your file manager.
5. Launch the **Premium Alarm Clock** app from your launcher!

## How to Build / Re-bundle for Android (Capacitor Flow)
This React codebase is fully optimized for mobile wrapping using Ionic Capacitor. To generate a fresh APK from updates:
1. Install Capacitor CLI: `npm install @capacitor/core @capacitor/cli`
2. Initialize Capacitor: `npx cap init "Premium Alarm Clock" "com.premium.alarmclock" --web-dir=dist`
3. Add Android platform: `npm install @capacitor/android && npx cap add android`
4. Build web bundle: `npm run build`
5. Sync assets: `npx cap sync`
6. Open in Android Studio: `npx cap open android`
7. From Android Studio, select **Build > Build Bundle(s) / APK(s) > Build APK(s)** to output a new installer!
