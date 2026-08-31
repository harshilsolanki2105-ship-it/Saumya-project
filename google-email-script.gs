/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT: DIRECT EMAIL WEBHOOK (NO SPREADSHEETS NEEDED)
 * ==============================================================================
 * 
 * ------------------------------------------------------------------------------
 * IMPORTANT: DEPLOY AS "WEB APP" (NOT AS A LIBRARY)
 * ------------------------------------------------------------------------------
 * 1. Open your project at https://script.google.com
 * 2. Delete existing code in Code.gs, paste this entire code, and press Save (Ctrl+S).
 * 3. Click "Deploy" (blue button at top right) > "New deployment".
 * 4. Click the gear icon (⚙️) next to "Select type" and choose "Web app" (NOT Library).
 * 5. Configuration:
 *      • Description: "ScaleVest Email Webhook"
 *      • Execute as: "Me (hybyu026@gmail.com)"
 *      • Who has access: "Anyone"   <--- (CRITICAL: Select "Anyone")
 * 6. Click "Deploy" > "Authorize access" > "Advanced" > "Go to ScaleVest Email Webhook (unsafe)" > "Allow".
 * 7. Copy the "Web app URL" (Must end in "/exec", e.g. https://script.google.com/macros/s/AKfycb.../exec).
 * 8. Paste this URL into script.js at Line 12.
 * ==============================================================================
 */

var RECIPIENT_EMAIL = "hybyu026@gmail.com";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var data = {};

    // 1. Try parsing JSON from postData
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = {};
      }
    }

    // 2. Merge url-encoded parameters if present
    if (e && e.parameter) {
      for (var key in e.parameter) {
        if (!data[key]) {
          data[key] = e.parameter[key];
        }
      }
    }

    // Helper to get field with case-insensitive and alternative name fallbacks
    function getVal(keys) {
      if (!data) return "N/A";
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (data[k] !== undefined && data[k] !== null && String(data[k]).trim() !== "") {
          return String(data[k]).trim();
        }
      }
      return "N/A";
    }

    var founderName = getVal(["founderName", "Founder Name", "name", "founder", "Name"]);
    var email = getVal(["email", "Work Email", "Contact Email", "Email", "mail"]);
    var startupName = getVal(["startupName", "Startup Name", "startup", "venture", "Venture Name"]);
    var website = getVal(["website", "Website / Deck URL", "Website or Pitch URL", "Website", "url", "pitchUrl"]);
    var stage = getVal(["stage", "Venture Stage", "Current Venture Stage", "Stage"]);
    var model = getVal(["model", "Partnership Model", "modelType", "partnershipModel"]);
    var budgetOrEquity = getVal(["budgetOrEquity", "Budget or Equity Offer", "Budget / Equity %", "budget", "equity"]);
    var goals = getVal(["goals", "Primary Marketing Goals", "Primary Goals", "marketingGoals", "Goals"]);
    var pitch = getVal(["pitch", "Product Pitch & Details", "Product Pitch & Value", "Pitch", "details"]);

    var subject = "🚀 ScaleVest Application: " + (startupName !== "N/A" ? startupName : "New Startup") + " (" + (founderName !== "N/A" ? founderName : "Founder") + ")";

    var htmlBody = 
      '<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 20px auto; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; background-color: #0d1117; color: #f1f5f9;">' +
        '<div style="background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%); padding: 24px; color: #07090e; text-align: center;">' +
          '<h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">🚀 New Venture Application Received</h1>' +
          '<p style="margin: 6px 0 0 0; font-size: 14px; font-weight: 600; opacity: 0.85;">ScaleVest Venture Studio Portal</p>' +
        '</div>' +
        '<div style="padding: 24px; background-color: #0d1117;">' +
          '<table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #cbd5e1;">' +
            '<tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 12px 0; font-weight: 600; color: #94a3b8; width: 35%;">Founder Name:</td><td style="padding: 12px 0; color: #ffffff; font-weight: bold;">' + escapeHtml(founderName) + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Work Email:</td><td style="padding: 12px 0;"><a href="mailto:' + escapeHtml(email) + '" style="color: #00f2fe; text-decoration: none; font-weight: bold;">' + escapeHtml(email) + '</a></td></tr>' +
            '<tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Startup Name:</td><td style="padding: 12px 0; color: #ffffff; font-weight: bold; font-size: 15px;">' + escapeHtml(startupName) + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Website / Deck URL:</td><td style="padding: 12px 0;">' + (website !== "N/A" ? '<a href="' + escapeHtml(website) + '" target="_blank" style="color: #00f2fe;">' + escapeHtml(website) + '</a>' : '<span style="color: #64748b;">N/A</span>') + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Venture Stage:</td><td style="padding: 12px 0; color: #f8fafc;">' + escapeHtml(stage) + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Partnership Model:</td><td style="padding: 12px 0; color: #00f2fe; font-weight: bold;">' + escapeHtml(model) + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Budget or Equity:</td><td style="padding: 12px 0; color: #10b981; font-weight: bold;">' + escapeHtml(budgetOrEquity) + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 12px 0; font-weight: 600; color: #94a3b8; vertical-align: top;">Marketing Goals:</td><td style="padding: 12px 0; color: #e2e8f0; line-height: 1.5;">' + escapeHtml(goals) + '</td></tr>' +
            '<tr><td style="padding: 12px 0; font-weight: 600; color: #94a3b8; vertical-align: top;">Product Pitch & Value:</td><td style="padding: 12px 0; color: #e2e8f0; line-height: 1.5;">' + escapeHtml(pitch) + '</td></tr>' +
          '</table>' +
        '</div>' +
        '<div style="background-color: #07090e; border-top: 1px solid #1e293b; padding: 14px; text-align: center; font-size: 12px; color: #64748b;">' +
          'Delivered directly via Google Apps Script MailApp API &bull; ' + new Date().toLocaleString() +
        '</div>' +
      '</div>';

    // Send email natively via Google MailApp API
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      replyTo: (email !== "N/A" && email.indexOf("@") > -1) ? email : undefined
    });

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "message": "Email delivered directly via Google MailApp!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      "status": "ScaleVest Direct Email Webhook is active and running!",
      "recipient": RECIPIENT_EMAIL,
      "instructions": "Send a POST request with JSON or form parameters to trigger native email delivery via MailApp."
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
