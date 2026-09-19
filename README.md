# ScaleVest | Venture Growth & Sweat-Equity Studio 🚀

A modern, high-impact web application created for academic project presentation, demonstrating a disruptive **"Equity-for-Marketing" Venture Studio model**.

---

## 💡 The Business Concept

Early-stage startups and student ventures often build exceptional products but fail due to a lack of distribution and high marketing agency costs ($10k–$25k/month).

**ScaleVest solves this problem with a Dual Partnership Model:**
1. **Sweat Equity Partnership ($0 Upfront Cash)**: ScaleVest invests its full marketing and creative talent in exchange for **2%–7% advisory equity** (vested via standard FAST/SAFE agreements).
2. **Performance Cash Retainer**: For funded or revenue-generating startups wanting zero equity dilution.
3. **Hybrid Model**: 50% reduced cash fee + 1%–3% micro-equity.

---

## 🛠 Features Built Into the Website

- **Hero Section with Metrics & Value Proposition**: Engaging dark-mode aesthetic with live number counters and quick CTAs.
- **Dual-Model Comparison**: Clear cards outlining the deliverables and advantages of Cash vs. Equity.
- **Interactive Startup Growth & Equity Calculator**:
  - Lets the user or professor adjust venture stage (Idea, MVP, Seed, Scaling), equity percentage (1% to 8%), and sprint duration (3 to 12 months).
  - Dynamically calculates equivalent agency value, team squad size, projected lead capacity, and projected ARR.
- **Services Suite**: GTM launches, performance ads, viral short-form video, brand identity/UI redesign, and investor pitch deck polishing.
- **4-Step Due Diligence Framework**: Application ➔ Audit ➔ Agreement ➔ 90-Day Sprint.
- **Simulated Portfolio / Case Studies**: FinTech, AI SaaS, and D2C brand case studies with real metrics.
- **Interactive FAQ Accordion**: Explains legal safety, vesting periods, and risk protection.
- **Lead Capture / Enquiry Form (Google Direct Email Delivery)**:
  - Form validation with error hints.
  - Multi-option model selection (Equity / Cash / Hybrid).
  - Submission modal with summary feedback.
  - Asynchronous AJAX `fetch()` delivering structured enquiry emails natively to Gmail via Google Apps Script MailApp API (Zero third-party tools, Zero spreadsheets).

---

## 📧 Step-by-Step: Connecting Direct Gmail Delivery (1 Minute)

This setup uses Google's official `MailApp` API to deliver emails directly to **`hybyu026@gmail.com`** without Google Sheets or third-party apps:

### Step 1: Create the Standalone Script
1. Open [script.google.com/home](https://script.google.com/home) in your browser.
2. Click **+ New project** (top-left).
3. Name the project **ScaleVest Email Webhook**.
4. Delete any sample code in the editor, and copy-paste the entire contents of [`google-email-script.gs`](google-email-script.gs).
5. Click the **Save** icon (disk) or press `Ctrl+S`.

### Step 2: Deploy as a Web App
1. Click the blue **Deploy** button (top-right) ➔ **New deployment**.
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
3. Set the fields:
   - **Description**: `Direct Email Webhook`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(Crucial: must be "Anyone" so your website can post to it without Google login)*
4. Click **Deploy**.
5. Grant permissions if prompted:
   - Click **Authorize access** ➔ select your Google account.
   - Click **Advanced** ➔ click **Go to ScaleVest Email Webhook (unsafe)** ➔ click **Allow**.
6. Copy the **Web App URL** provided (`https://script.google.com/macros/s/AKfycb.../exec`).

### Step 3: Paste URL into `script.js`
1. Open [`script.js`](script.js).
2. At **Line 12**, replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your copied URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec";
   ```
3. Save the file. Every submission on the website will now be sent directly into your Gmail inbox with 100% native Google delivery!

---

## 💻 How to View & Present

Simply double-click [`index.html`](index.html) to open it in any web browser (Chrome, Edge, Firefox, Safari), or use the VS Code "Live Server" extension.
