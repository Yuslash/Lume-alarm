# 📋 Google Play Store Submission Checklist & Assets

This document contains all the metadata, descriptions, and declaration templates needed to successfully submit **Lume Clock** to the Google Play Console.

---

## 1. App Store Listing Metadata

### App Title
*   **Proposed Name:** `Lume Clock - Premium Ambient Alarm` (34 / 50 characters)

### Short Description (Max 80 characters)
*   `Smooth ambient alarm clock with customizable playlists and dynamic weather themes.` (82 -> Let's trim to 79:
*   `Ambient alarm clock with custom playlist links and fluid sunrise weather themes.` (80 -> Let's trim to:
*   `Ambient alarm clock with custom music links and fluid sunrise weather themes.` (77 characters)

### Full Description (Max 4000 characters)
```text
Experience premium, gentle wakeups with Lume Clock — a beautifully crafted ambient alarm clock and bedside companion designed to harmonize with your natural circadian cycles.

Transform your morning routine from a jarring, loud noise into a serene transition. Lume Clock pairs luxurious typography, immersive atmospheric backdrops, and advanced user-control gestures to create the ultimate aesthetic bedside table companion.

🌟 UNIQUE FEATURES:

• DYNAMIC ATMOSPHERIC WEATHERS
Immerse yourself in solid 60fps weather particles and ambient backdrop gradients that shift beautifully across Midnight Sparkles, Dawn Sunrise, Morning Mists, and Sunset Glows.

• PLAYLIST MUSIC ALARM SYNC
Select and configure personalized playlists linking your Spotify, YouTube Music, or Apple Music library to trigger randomized, gentle waking sounds. 

• SYNTHESIZED ACOUSTIC CHORDS
Don't wake up in panic. Lume Clock utilizes customized, pleasant, ascending synthesized waking frequencies that gradually rise in volume to coax you into consciousness.

• HIGH-PERFORMANCE SWIPE GESTURES
A custom-engineered drag decelerator allows you to handle snooze or stop triggers with seamless, zero-lag swiping physics. Drag right to snooze in a soothing emerald glow; drag left to stop/dismiss in a crimson dawn aura.

🔒 ZERO-TELEMETRY PRIVACY
Your morning routine is yours alone. Lume Clock operates strictly offline and stores all settings locally on your device. No user accounts, no tracking cookies, and no telemetry data collection.

Design your perfect wakeup aesthetic with Lume Clock today.
```

---

## 2. Store Asset Dimensions

To publish your listing, Google Play Console requires the following graphic assets:
1.  **App Icon:** `512 x 512 px` (PNG, Transparent background, max 1MB).
2.  **Feature Graphic:** `1024 x 500 px` (JPEG or 24-bit PNG, no transparency). *You can crop our generated `/src/assets/images/lume_clock_promo_1783396821396.jpg` for this!*
3.  **Phone Screenshots:** Minimum 2 screenshots (up to 8), 16:9 or 9:16 aspect ratio, between `320px` and `3840px` on any side.

---

## 3. Play Console Questionnaire Answers

### A. Target Audience & Content
*   **Target Age Group:** Select **13-15**, **16-17**, and **18 and older**.
*   **Children's Online Privacy Protection Act (COPPA):** Select **No** (the app does not collect personal data and is not specifically directed at children under 13).

### B. News App Declarations
*   **Is your app a news app?** Select **No**.

### C. COVID-19 Contact Tracing
*   **Is your app a contact tracing or status app?** Select **No**.

### D. Data Safety Declaration (Crucial)
*   **Data Collection:** Select **No** (this app does not collect or share any user data).
*   *This will output a simple, clean Data Safety badge on your store page!*

### E. Financial Features
*   **Does your app provide financial features?** Select **No**.

### F. Device Permissions (Declared in Manifest)
When uploading, you may be prompted to declare why you use exact alarms. Use this pre-drafted response:
> "Lume Clock is a primary alarm clock utility that requires exact alarm scheduling (`android.permission.SCHEDULE_EXACT_ALARM`) to ensure custom morning wake-up routines, music-linked alarms, and circadian light transitions trigger at the exact, user-configured second even when the device is in deep sleep or Doze state. This permission is critical to the core user-facing functionality of the application."
