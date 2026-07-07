# Privacy Policy for Lume Clock

**Last Updated:** July 6, 2026

**Lume Clock** ("the App") is committed to protecting your privacy. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you use our mobile application.

---

## 1. Summary of Our Philosophy
Lume Clock is designed to be an **offline-first, zero-telemetry, fully private** application. 
*   **We do not collect any personal data.**
*   **We do not run tracking cookies, third-party analytics (like Google Analytics or Firebase Analytics), or user profiling scripts.**
*   **All alarm settings, preferences, and playlists selections are stored strictly on your local device.**

---

## 2. Information We Collect (Or Rather, Do Not Collect)

### A. Personal Data
The App does not require user accounts, registrations, emails, phone numbers, or social media logins. We do not collect, transmit, or store any personal data whatsoever.

### B. Device & Settings Data
All settings (such as alarm times, custom labels, volume thresholds, selected musical genres, and weather themes) are saved locally on your device via standard client-side storage (`localStorage` in the browser / SQLite database in the native app wrapper). None of this data is sent to our servers.

### C. Permissions Used by the App
To function properly, the native Android application built from this code requires specific system permissions. Here is how they are used:
1.  **Notification Permission (`android.permission.POST_NOTIFICATIONS`):** Used solely to display the upcoming alarm notifications, active snooze indicators, and weather notifications.
2.  **Alarm Permission (`android.permission.SCHEDULE_EXACT_ALARM`):** Used to schedule exact wake-up routines so that your alarm triggers at the exact second configured, even when the device is sleeping or in Doze mode.
3.  **Vibration Permission (`android.permission.VIBRATE`):** Used to vibrate the device during active alarms for physically alerting the user.

---

## 3. Play Store "Data Safety" Questionnaire Declarations
When uploading Lume Clock to the Google Play Console, you will be required to fill out the **Data Safety** form. Use the following declarations:

*   **Does your app collect or share any of the required user data types?**  
    👉 **No**
*   **Is all of the user data collected by your app encrypted in transit?**  
    👉 **Not applicable** (Since no data is collected or transmitted).
*   **Do you provide a way for users to request that their data be deleted?**  
    👉 **Not applicable** (Since all data is local, users can clear data instantly by clearing the app cache or uninstalling).

---

## 4. Third-Party Services
Lume Clock contains configuration preferences for playlist lookups (e.g., Spotify, YouTube Music, Apple Music). 
*   **Simulated Integration:** The app currently performs localized lookups. 
*   **External Links:** If the user clicks external links, they are directed to those third-party applications. We do not transmit authentication tokens or account details. Third-party apps operate under their own independent privacy policies.

---

## 5. Children's Privacy (COPPA Compliance)
Our App is not targeted at children under the age of 13. Because we do not collect any personal information, we are fully compliant with the Children's Online Privacy Protection Act (COPPA). We recommend setting your target age group in the Play Console to **13 and older**.

---

## 6. Changes to This Privacy Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy here and updating the "Last Updated" date at the top of this document.

---

## 7. Contact Us
If you have any questions or suggestions about this Privacy Policy, feel free to open an issue on our GitHub repository:
[https://github.com/Yuslash/Lume-clock](https://github.com/Yuslash/Lume-clock)
