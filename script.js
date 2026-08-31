/**
 * ==============================================================================
 * ScaleVest Venture Studio - Interactive Client Logic & Direct Email Delivery
 * ==============================================================================
 */

// -----------------------------------------------------------------------------
// 1. CONFIGURATION: GOOGLE DIRECT EMAIL APPS SCRIPT WEBHOOK URL
// -----------------------------------------------------------------------------
// Instructions: Once you follow google-email-script.gs and deploy your Google Web App (1 min),
// paste your Web App URL below (looks like https://script.google.com/macros/s/AKfycb.../exec)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXZqVAIxrLStlpIMwP04MgNhGKX96iDXT0iwjxH2aWy6qeziU42GEh3YtMASjXIHBk/exec";


document.addEventListener("DOMContentLoaded", () => {
  initIntroAnimation();
  initNavbar();
  initAnimatedCounters();
  initEquityCalculator();
  initFaqAccordion();
  initEnquiryForm();
});

/* --------------------------------------------------------------------------
   Intro Paper Aeroplane Animation
   -------------------------------------------------------------------------- */
function initIntroAnimation() {
  const introOverlay = document.getElementById("introOverlay");
  const skipIntroBtn = document.getElementById("skipIntroBtn");

  if (!introOverlay) return;

  const dismissIntro = () => {
    introOverlay.classList.add("fade-out");
    setTimeout(() => {
      introOverlay.style.display = "none";
    }, 800);
  };

  // Automatically dismiss after the paper plane swoops across to top-right (~2.4s)
  const timer = setTimeout(dismissIntro, 2400);

  // Skip button handler
  if (skipIntroBtn) {
    skipIntroBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      clearTimeout(timer);
      dismissIntro();
    });
  }

  // Click anywhere to skip
  introOverlay.addEventListener("click", () => {
    clearTimeout(timer);
    dismissIntro();
  });
}

/* --------------------------------------------------------------------------
   Navigation & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavbar() {
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");
  const navbar = document.getElementById("navbar");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });
  }

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(7, 9, 14, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.5)";
    } else {
      navbar.style.background = "rgba(7, 9, 14, 0.85)";
      navbar.style.boxShadow = "none";
    }
  });
}

/* --------------------------------------------------------------------------
   Animated Number Counters
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.getAttribute("data-target"));
        animateValue(entry.target, 0, target, 1800);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const isDecimal = end % 1 !== 0;
  
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = easeOutQuad(progress);
    const current = start + (end - start) * easeProgress;
    
    element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = isDecimal ? end.toFixed(1) : end;
    }
  };
  
  window.requestAnimationFrame(step);
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

/* --------------------------------------------------------------------------
   Interactive Startup Growth & Equity Calculator
   -------------------------------------------------------------------------- */
function initEquityCalculator() {
  const stageBtns = document.querySelectorAll(".stage-btn");
  const stageValueText = document.getElementById("stageValueText");
  const equityRange = document.getElementById("equityRange");
  const equityDisplay = document.getElementById("equityDisplay");
  const durationRange = document.getElementById("durationRange");
  const durationDisplay = document.getElementById("durationDisplay");

  const equivalentValue = document.getElementById("equivalentValue");
  const teamSize = document.getElementById("teamSize");
  const projectedUsers = document.getElementById("projectedUsers");
  const projectedArr = document.getElementById("projectedArr");
  const sprintTierBadge = document.getElementById("sprintTierBadge");
  const serviceList = document.getElementById("serviceList");

  let currentStage = "mvp";

  // Stage Switcher
  stageBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      stageBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentStage = btn.getAttribute("data-stage");
      stageValueText.textContent = btn.textContent;
      recalculate();
    });
  });

  // Sliders
  if (equityRange && durationRange) {
    equityRange.addEventListener("input", (e) => {
      equityDisplay.textContent = `${parseFloat(e.target.value).toFixed(1)}%`;
      recalculate();
    });

    durationRange.addEventListener("input", (e) => {
      durationDisplay.textContent = `${e.target.value} Months`;
      recalculate();
    });
  }

  function recalculate() {
    const equity = parseFloat(equityRange.value);
    const months = parseInt(durationRange.value);

    // Multipliers based on stage
    let stageMultiplier = 1;
    let baseUsers = 5000;
    let baseArr = 40000;

    if (currentStage === "idea") {
      stageMultiplier = 0.75;
      baseUsers = 2500;
      baseArr = 20000;
    } else if (currentStage === "mvp") {
      stageMultiplier = 1.0;
      baseUsers = 6000;
      baseArr = 55000;
    } else if (currentStage === "seed") {
      stageMultiplier = 1.5;
      baseUsers = 15000;
      baseArr = 120000;
    } else if (currentStage === "scaling") {
      stageMultiplier = 2.2;
      baseUsers = 35000;
      baseArr = 280000;
    }

    // Calculations
    const monthlyEquivalent = Math.round((equity * 2400 + 3500) * stageMultiplier);
    const totalEquivalent = monthlyEquivalent * months;

    let teamCount = "2 Specialists";
    if (equity >= 5.0 || months >= 9) teamCount = "5 Specialists (Full Squad)";
    else if (equity >= 3.0) teamCount = "3-4 Specialists";

    const calcUsersLow = Math.round((baseUsers * (equity / 2) * (months / 6)) / 1000) * 1000;
    const calcUsersHigh = Math.round(calcUsersLow * 2.2);

    const calcArr = Math.round((baseArr * (equity / 2.5) * (months / 6)) / 5000) * 5000;

    // Update UI elements
    equivalentValue.textContent = `$${totalEquivalent.toLocaleString()}`;
    teamSize.textContent = teamCount;
    projectedUsers.textContent = `${calcUsersLow > 1000 ? (calcUsersLow/1000).toFixed(0) + 'k' : calcUsersLow} – ${(calcUsersHigh/1000).toFixed(0)}k`;
    projectedArr.textContent = `+$${calcArr.toLocaleString()}`;

    if (equity >= 5.0) {
      sprintTierBadge.textContent = "Co-Founder Growth Tier";
      sprintTierBadge.style.color = "#00f2fe";
    } else if (equity >= 3.0) {
      sprintTierBadge.textContent = "Venture Accelerator Tier";
      sprintTierBadge.style.color = "#10b981";
    } else {
      sprintTierBadge.textContent = "Micro-Equity Sprint Tier";
      sprintTierBadge.style.color = "#f59e0b";
    }

    // Dynamic services included
    let services = [
      "High-Converting GTM Launch Strategy",
      "Meta & Google Performance Ads Setup",
      "Viral Organic Short-form Video Pipeline",
      "Product Hunt #1 Launch Day Playbook"
    ];

    if (equity >= 3.5) {
      services.push("Full Landing Page UI/UX Redesign in Figma");
      services.push("Investor Pitch Deck Narrative & Metric Modeling");
    }
    if (equity >= 5.0) {
      services.push("Dedicated Fractional CMO & Weekly Venture Reviews");
      services.push("Warm VC & Angel Syndicate Introductions");
    }

    serviceList.innerHTML = services.map(s => `<li><i class="fa-solid fa-circle-check"></i> ${s}</li>`).join("");
  }

  // Initial calculation
  recalculate();
}

/* --------------------------------------------------------------------------
   Helper to Select Model from Comparison Cards
   -------------------------------------------------------------------------- */
window.selectModel = function(modelName) {
  const radio = document.querySelector(`input[name="model"][value="${modelName}"]`);
  if (radio) {
    radio.checked = true;
  }
};

/* --------------------------------------------------------------------------
   FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      
      // Close all other items
      faqItems.forEach(otherItem => otherItem.classList.remove("active"));
      
      // Toggle clicked item
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Enquiry Form Handling & Google Apps Script Direct Email Sync
   -------------------------------------------------------------------------- */
function initEnquiryForm() {
  const form = document.getElementById("enquiryForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector(".btn-spinner") : null;
  const successModal = document.getElementById("successModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const submissionSummary = document.getElementById("submissionSummary");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate fields
    if (!validateForm(form)) {
      return;
    }

    // Collect data
    const formData = {
      founderName: (document.getElementById("founderName")?.value || "").trim(),
      email: (document.getElementById("email")?.value || "").trim(),
      startupName: (document.getElementById("startupName")?.value || "").trim(),
      website: (document.getElementById("website")?.value || "").trim() || "N/A",
      stage: document.getElementById("stage")?.value || "",
      budgetOrEquity: (document.getElementById("budgetOrEquity")?.value || "").trim(),
      model: form.querySelector('input[name="Partnership Model"]:checked')?.value || form.querySelector('input[name="model"]:checked')?.value || "Equity Partnership",
      goals: (document.getElementById("goals")?.value || "").trim(),
      pitch: (document.getElementById("pitch")?.value || "").trim() || "N/A"
    };

    // UI Loading State
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.classList.add("hidden");
    if (btnSpinner) btnSpinner.classList.remove("hidden");

    try {
      const isPlaceholder = !GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("YOUR_GOOGLE_APPS_SCRIPT_URL_HERE");

      if (!isPlaceholder) {
        // Send directly to Google Apps Script Web App (MailApp will deliver directly to Gmail)
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Simulated network delay for demo mode
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Show summary in modal
      submissionSummary.innerHTML = `
        <p><strong>Founder:</strong> ${escapeHtml(formData.founderName)} (${escapeHtml(formData.email)})</p>
        <p><strong>Startup:</strong> ${escapeHtml(formData.startupName)} • <em>${escapeHtml(formData.stage)}</em></p>
        <p><strong>Model:</strong> ${escapeHtml(formData.model)} (${escapeHtml(formData.budgetOrEquity)})</p>
        <p><strong>Primary Goal:</strong> ${escapeHtml(formData.goals)}</p>
        ${isPlaceholder ? '<p style="margin-top:0.8rem; color:#f59e0b; font-size:0.8rem;"><i class="fa-solid fa-circle-info"></i> <em>Demo Mode: To receive emails directly in Gmail, paste your deployed Google Apps Script URL into script.js (see google-email-script.gs).</em></p>' : '<p style="margin-top:0.8rem; color:#10b981; font-size:0.8rem;"><i class="fa-solid fa-bolt"></i> <em>Dispatched directly to your Gmail via Google Apps Script!</em></p>'}
      `;

      // Display Success Modal
      successModal.classList.remove("hidden");
      form.reset();

    } catch (err) {
      console.error("Direct Email Submission Error:", err);
      alert("Submission encountered an issue. Please verify your Google Script URL.");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.classList.remove("hidden");
      if (btnSpinner) btnSpinner.classList.add("hidden");
    }
  });

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener("click", () => {
      successModal.classList.add("hidden");
    });
  }
}

function validateForm(form) {
  let isValid = true;

  const founderName = document.getElementById("founderName");
  const email = document.getElementById("email");
  const startupName = document.getElementById("startupName");
  const stage = document.getElementById("stage");
  const budgetOrEquity = document.getElementById("budgetOrEquity");
  const goals = document.getElementById("goals");

  const requiredFields = [
    { el: founderName, group: "founderName" },
    { el: email, group: "email", isEmail: true },
    { el: startupName, group: "startupName" },
    { el: stage, group: "stage" },
    { el: budgetOrEquity, group: "budgetOrEquity" },
    { el: goals, group: "goals" }
  ];

  requiredFields.forEach(field => {
    if (!field.el) return;
    const parent = field.el.closest(".form-group");
    let fieldValid = true;

    if (!field.el.value.trim()) {
      fieldValid = false;
    } else if (field.isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.el.value.trim())) {
        fieldValid = false;
      }
    }

    if (!fieldValid) {
      if (parent) parent.classList.add("has-error");
      isValid = false;
    } else {
      if (parent) parent.classList.remove("has-error");
    }
  });

  return isValid;
}

function escapeHtml(string) {
  const div = document.createElement("div");
  div.textContent = string;
  return div.innerHTML;
}
