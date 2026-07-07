# 🌅 Lume Clock — Premium Ambient Alarm & Bedside Companion

> A highly polished, hardware-accelerated, dual-theme alarm clock and ambient morning routine application optimized for both mobile wrappers (Ionic Capacitor) and premium web dashboards.

<p align="center">
  <img src="./src/assets/images/lume_clock_promo_1783396821396.jpg" alt="Lume Clock Premium Banner" width="100%" style="border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
</p>

<p align="center">
  <a href="#-play-store-production-readiness"><b>Play Store Ready</b></a> •
  <a href="#-google-play-legal-compliance"><b>Legal Documents</b></a> •
  <a href="#-fumadocs-documentation"><b>Fumadocs Guide</b></a> •
  <a href="#-github-push-guide"><b>GitHub Push Guide</b></a>
</p>

---

## 🌟 Key Product Features

### 1. 🎭 Dynamic Weather Aura Engines
*   **Zero-Lag 60fps Animation:** Built with custom, hardware-accelerated CSS keyframe key-structures and standard browser rendering triggers. Runs at solid 60fps even on lower-end devices.
*   **Circadian Ambient Backdrops:** Transitions beautifully between **Midnight Sparkle**, **Dawn Rise**, **Morning Mist**, and **Sunset Glow** to align with your natural sleep cycles.

### 2. 🎵 Simulated Playlist Sync
*   Supports seamless, randomized alarms based on Spotify, YouTube Music, and Apple Music preference hooks.
*   **Synthesized Acoustic Wakeups:** Generates elegant rising chord synthesizers that prevent abrupt, jarring awakenings.

### 3. 🎯 Gesture Control System
*   **Intuitive Drag Decelerator:** Swipe right to Snooze (with green glowing feedback), swipe left to Dismiss/Stop (with crimson glowing feedback).
*   **Snapping Spring Physics:** Powered by `motion` for satisfying spring-back physics when releasing widgets.

---

## 📦 Play Store Production Readiness

To upload this application as a high-performance native APK/AAB to the **Google Play Console**, follow this complete, pre-configured pipeline:

### 🛠️ Step 1: Capacitor Core Wrapping
The app is fully prepared for Ionic Capacitor. Run these commands from your root terminal:

```bash
# Install core capacitor packages
npm install @capacitor/core @capacitor/cli

# Initialize your Android wrapper
npx cap init "Lume Clock" "com.yuslash.lumeclock" --web-dir=dist

# Add the Android platform support
npm install @capacitor/android
npx cap add android
```

### 🔨 Step 2: Build & Sync
Generate the production static assets and sync them directly with the native Android project:

```bash
# Build production React assets
npm run build

# Sync assets to Android Studio
npx cap sync
```

### 🔑 Step 3: Sign the Release Bundle (AAB)
For Google Play Store submission, you **must** generate a signed Android App Bundle (`.aab`):
1.  Run `npx cap open android` to boot **Android Studio**.
2.  Navigate to **Build > Generate Signed Bundle / APK...**
3.  Select **Android App Bundle** and click **Next**.
4.  Create a new keystore file (save your key password, store password, and alias safely).
5.  Set Build Type to **release** and select **V2 (Full Signature)**.
6.  The compiled `.aab` file will be generated in `android/app/release/app-release.aab`.

---

## ⚖️ Google Play Legal Compliance

Google Play requires strict disclosures regarding user privacy. We have created professional-grade legal documents in the `/legal` directory, ready to be linked to your Play Console:

*   **Privacy Policy (`/legal/privacy-policy.md`):** Explains that Lume Clock is **completely private and offline-first**, storing all configurations locally via secure `localStorage` and requesting zero telemetry.
*   **Terms of Service (`/legal/terms-of-service.md`):** Outlines usage guidelines, intellectual property, and warranty limitations.

*To upload these to the Play Store, you can host them directly on GitHub Pages, Vercel, or within your Fumadocs deploy.*

---

## 📚 Fumadocs Documentation

We have provided a complete documentation structure inside `/docs/content/docs` compatible with **[Fumadocs](https://fumadocs.vercel.app/)**, the premier Next.js documentation framework.

### Document Structure:
*   `index.mdx` — Product Overview & Feature walkthrough
*   `installation.mdx` — Sideloading and device APK setup
*   `playstore.mdx` — step-by-step Play Console checklist and required questionnaire answers
*   `privacy-policy.mdx` — Play Store compliant Privacy Policy
*   `terms-of-service.mdx` — Standard terms and conditions

### To Boot the Fumadocs server:
1.  Fumadocs runs inside a modern Next.js environment. To initiate it:
    ```bash
    npx create-next-app -e docs
    ```
2.  Copy the contents of our `/docs` folder directly into the new site's content directory.

---

## 🚀 GitHub Push Guide

To push Lume Clock to your newly created GitHub repository (`https://github.com/Yuslash/Lume-clock.git`), execute the following terminal commands sequentially:

```bash
# 1. Initialize local git repository
git init

# 2. Add all source files and assets to staging
git add .

# 3. Create initial commit
git commit -m "feat: initial release of Lume Clock premium alarm dashboard with playstore compliance"

# 4. Set default branch to main
git branch -M main

# 5. Add your secure GitHub remote origin
git remote add origin https://github.com/Yuslash/Lume-clock.git

# 6. Push code to the repository (force flags can be added if needed)
git push -u origin main
```

### 🎁 Setting Up GitHub Releases for APK
Once pushed:
1.  Go to your repository on GitHub: `https://github.com/Yuslash/Lume-clock`
2.  Click **Releases** on the right sidebar, then click **Draft a new release**.
3.  Set the tag to `v1.0.0` and title it `Lume Clock Release v1.0.0`.
4.  Write a brief release note (copy-paste `/releases/readme.md`).
5.  Drag and drop the `premium-alarm-clock-v1.0.0.apk` from your local machine (or compiled via Capacitor) into the attachment section.
6.  Click **Publish release**! Your users can now download the APK directly from GitHub.

---
*Designed with meticulous attention to typography, fluid performance, and wake-up aesthetics.*
