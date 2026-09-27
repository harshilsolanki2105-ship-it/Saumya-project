/**
 * ==============================================================================
 * CREATORS® Venture Studio - Interactive Client Logic & Direct Email Delivery
 * Built to be seen.
 * ==============================================================================
 */

// -----------------------------------------------------------------------------
// 1. CONFIGURATION: GOOGLE APPS SCRIPT WEBHOOK URL
// -----------------------------------------------------------------------------
// Instructions: Once you deploy google-email-script.gs as a Web App,
// replace the placeholder string below with your actual Google Script Web App URL!
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";


document.addEventListener("DOMContentLoaded", () => {
  initIntroAnimation();
  initHeroBulbEnlightenment();
  initNavbar();
  initAnimatedCounters();
  initEquityCalculator();
  initFaqAccordion();
  initEnquiryForm();
});

/* --------------------------------------------------------------------------
   Hero Dramatic Bulb Enlightenment & Interactive Switch
   -------------------------------------------------------------------------- */
function initHeroBulbEnlightenment() {
  const hero = document.getElementById("hero");
  const heroBulb = document.getElementById("heroBulb");
  const bulbChain = document.getElementById("bulbChain");
  const bulbBurst = document.getElementById("bulbBurst");
  const bulbDarkPrompt = document.getElementById("bulbDarkPrompt");

  if (!hero || !heroBulb) return;

  let isLightOn = false;

  const turnLightOn = (playBurst = true) => {
    isLightOn = true;
    hero.classList.remove("lights-off");
    hero.classList.add("lights-on");

    if (playBurst && bulbBurst) {
      bulbBurst.classList.remove("active-burst");
      void bulbBurst.offsetWidth; // Force reflow
      bulbBurst.classList.add("active-burst");
    }
  };

  const turnLightOff = () => {
    isLightOn = false;
    hero.classList.remove("lights-on");
    hero.classList.add("lights-off");
  };

  const toggleLight = () => {
    // Animate pull chain
    if (bulbChain) {
      bulbChain.classList.add("pulled");
      setTimeout(() => bulbChain.classList.remove("pulled"), 220);
    }

    if (isLightOn) {
      turnLightOff();
    } else {
      turnLightOn(true);
    }
  };

  // Click bulb, chain, or prompt pill to toggle light
  heroBulb.addEventListener("click", toggleLight);
  if (bulbDarkPrompt) {
    bulbDarkPrompt.addEventListener("click", toggleLight);
  }

  heroBulb.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleLight();
    }
  });
}

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
   Interactive Startup Growth & Revenue Share Simulator (in Rupees ₹)
   -------------------------------------------------------------------------- */
function initEquityCalculator() {
  const stageBtns = document.querySelectorAll(".stage-btn");
  const stageValueText = document.getElementById("stageValueText");
  const calcModelBtns = document.querySelectorAll(".calc-model-btn");
  const calcModelText = document.getElementById("calcModelText");
  const sliderLabelText = document.getElementById("sliderLabelText");
  const sliderMarkers = document.getElementById("sliderMarkers");
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
  let currentModel = "sales"; // "sales" or "equity"

  // Stage Switcher
  stageBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      stageBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentStage = btn.getAttribute("data-stage");
      if (stageValueText) stageValueText.textContent = btn.textContent;
      recalculate();
    });
  });

  // Model Switcher (Share per Sales vs Strategic Equity Partner)
  calcModelBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      calcModelBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentModel = btn.getAttribute("data-calc-model");
      
      if (currentModel === "sales") {
        if (calcModelText) calcModelText.textContent = "Share per Sales (% on Sales)";
        if (sliderLabelText) sliderLabelText.textContent = "Share per Sales Commission";
        if (equityRange) {
          equityRange.min = "5";
          equityRange.max = "25";
          equityRange.step = "1";
          equityRange.value = "12";
          if (equityDisplay) equityDisplay.textContent = "12%";
        }
        if (sliderMarkers) {
          sliderMarkers.innerHTML = `
            <span>5% (High AOV)</span>
            <span>12% (Standard D2C/B2B)</span>
            <span>25% (High Margin SaaS)</span>
          `;
        }
      } else {
        if (calcModelText) calcModelText.textContent = "Strategic Equity Partner (High-Potential)";
        if (sliderLabelText) sliderLabelText.textContent = "Strategic Equity Allocation";
        if (equityRange) {
          equityRange.min = "1.0";
          equityRange.max = "8.0";
          equityRange.step = "0.5";
          equityRange.value = "3.5";
          if (equityDisplay) equityDisplay.textContent = "3.5%";
        }
        if (sliderMarkers) {
          sliderMarkers.innerHTML = `
            <span>1.0% (Micro-Advisory)</span>
            <span>3.5% (Branding Partner)</span>
            <span>8.0% (Co-Founder Tier)</span>
          `;
        }
      }
      recalculate();
    });
  });

  // Sliders
  if (equityRange && durationRange) {
    equityRange.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      if (equityDisplay) {
        equityDisplay.textContent = `${currentModel === "equity" ? val.toFixed(1) : val}%`;
      }
      recalculate();
    });

    durationRange.addEventListener("input", (e) => {
      if (durationDisplay) durationDisplay.textContent = `${e.target.value} Months`;
      recalculate();
    });
  }

  function recalculate() {
    const rangeVal = parseFloat(equityRange ? equityRange.value : (currentModel === "sales" ? 12 : 3.5));
    const months = parseInt(durationRange ? durationRange.value : 6);

    // Multipliers based on stage
    let stageMultiplier = 1;
    let baseOrders = 500;
    let baseRevenue = 800000; // Base ₹8 Lakhs

    if (currentStage === "idea") {
      stageMultiplier = 0.75;
      baseOrders = 200;
      baseRevenue = 350000;
    } else if (currentStage === "mvp") {
      stageMultiplier = 1.0;
      baseOrders = 650;
      baseRevenue = 950000;
    } else if (currentStage === "seed") {
      stageMultiplier = 1.8;
      baseOrders = 1800;
      baseRevenue = 2400000;
    } else if (currentStage === "scaling") {
      stageMultiplier = 2.8;
      baseOrders = 4500;
      baseRevenue = 6000000;
    }

    if (currentModel === "sales") {
      // Share per Sales model math
      const commissionPercent = rangeVal; // 5 - 25%
      const monthlyEquivalent = Math.round((commissionPercent * 28000 + 120000) * stageMultiplier);
      const totalEquivalent = monthlyEquivalent * months;

      let teamCount = "3 Specialists";
      if (commissionPercent >= 18 || months >= 9) teamCount = "5 Specialists (Full Growth Squad)";
      else if (commissionPercent >= 10) teamCount = "3-4 Specialists";

      const lowOrders = Math.round((baseOrders * (commissionPercent / 10) * (months / 6)) / 50) * 50;
      const highOrders = Math.round(lowOrders * 2.4);

      const generatedSales = Math.round((baseRevenue * (commissionPercent / 10) * (months / 6)) / 50000) * 50000;

      if (equivalentValue) equivalentValue.textContent = `₹${totalEquivalent.toLocaleString('en-IN')}`;
      if (teamSize) teamSize.textContent = teamCount;
      if (projectedUsers) projectedUsers.textContent = `${lowOrders.toLocaleString('en-IN')} – ${highOrders.toLocaleString('en-IN')} Orders`;
      if (projectedArr) projectedArr.textContent = `+₹${generatedSales.toLocaleString('en-IN')}`;

      if (sprintTierBadge) {
        sprintTierBadge.textContent = "Performance Revenue Accelerator (₹0 Upfront)";
        sprintTierBadge.style.color = "#34d399";
      }

      // Services
      let services = [
        "High-Converting Funnels & Landing Page CRO",
        "Multi-Channel Paid Ads (Meta, Google, YouTube)",
        "Viral Organic Short-form Reels & Video Production",
        "Automated Email & WhatsApp Retention Flows"
      ];
      if (commissionPercent >= 12) {
        services.push("Creative A/B Ad Sprints & UGC Influencer Network");
      }
      if (commissionPercent >= 18) {
        services.push("Dedicated Media Buying Director & Weekly Revenue Reviews");
      }

      if (serviceList) {
        serviceList.innerHTML = services.map(s => `<li><i class="fa-solid fa-circle-check"></i> ${s}</li>`).join("");
      }

    } else {
      // Strategic Equity Partner model math
      const equity = rangeVal; // 1.0 - 8.0%
      const monthlyEquivalent = Math.round((equity * 45000 + 60000) * stageMultiplier);
      const totalEquivalent = monthlyEquivalent * months;

      let teamCount = "3 Specialists";
      if (equity >= 5.0 || months >= 9) teamCount = "5 Specialists (Fractional CMO Squad)";
      else if (equity >= 3.0) teamCount = "3-4 Specialists";

      const lowUsers = Math.round((baseOrders * (equity / 2) * (months / 6)) / 50) * 50;
      const highUsers = Math.round(lowUsers * 2.8);

      const generatedValuation = Math.round((baseRevenue * (equity / 2) * (months / 6)) / 50000) * 50000;

      if (equivalentValue) equivalentValue.textContent = `₹${totalEquivalent.toLocaleString('en-IN')}`;
      if (teamSize) teamSize.textContent = teamCount;
      if (projectedUsers) projectedUsers.textContent = `${lowUsers.toLocaleString('en-IN')} – ${highUsers.toLocaleString('en-IN')} Users`;
      if (projectedArr) projectedArr.textContent = `+₹${generatedValuation.toLocaleString('en-IN')}`;

      if (sprintTierBadge) {
        if (equity >= 5.0) {
          sprintTierBadge.textContent = "Co-Founder Equity Tier (High-Potential)";
          sprintTierBadge.style.color = "#ffe77f";
        } else {
          sprintTierBadge.textContent = "Strategic Branding Partner Tier";
          sprintTierBadge.style.color = "#34d399";
        }
      }

      let services = [
        "Full Brand Identity, Narrative & UI/UX Redesign",
        "Fractional CMO & End-to-End Marketing Strategy",
        "Investor Pitch Deck Polish & VC Introduction Access",
        "National PR, Tech Spotlight & Viral Social Blitz"
      ];
      if (equity >= 3.5) {
        services.push("Product Hunt #1 Launch Architecture");
      }

      if (serviceList) {
        serviceList.innerHTML = services.map(s => `<li><i class="fa-solid fa-circle-check"></i> ${s}</li>`).join("");
      }
    }
  }

  // Initial calculation
  recalculate();
}

/* --------------------------------------------------------------------------
   Helper to Select Model from Comparison Cards
   -------------------------------------------------------------------------- */
window.selectModel = function(modelName) {
  const radio = document.querySelector(`input[name="Partnership Model"][value*="${modelName}"], input[name="model"][value*="${modelName}"], input[type="radio"][value*="${modelName}"]`);
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
