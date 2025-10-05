export type Service = { slug: string; title: string; summary?: string; };
export type Category = { slug: string; title: string; summary?: string; services?: Service[]; };

export const CATEGORIES: Category[] = [
  {
    slug: "critical-health",
    title: "Critical Health",
    summary: "High-priority risk checks and urgent insights.",
    services: [
      { slug: "risk-insight", title: "Risk Insight" },
      { slug: "lab-results-explainer", title: "Lab Results Explainer" },
      { slug: "drug-drug-interaction-checker", title: "Drug-Drug Interaction Checker" },
      { slug: "symptom-analyzer", title: "Symptom Analyzer" },
      { slug: "chronic-disease-coach", title: "Chronic Disease Coach" },
      { slug: "ai-medication-adherence", title: "AI Medication Adherence" },
      { slug: "care-cost-optimizer", title: "Care Cost Optimizer" },
      { slug: "post-surgery-recovery-tracker", title: "Post-Surgery Recovery Tracker" },
      { slug: "clinical-trial-finder", title: "Clinical Trial Finder" },
      { slug: "pre-surgery-readiness", title: "Pre-Surgery Readiness" },
      { slug: "rare-disease-navigator", title: "Rare Disease Navigator" },
      { slug: "smart-med-refill", title: "Smart Med Refill" },
      { slug: "ai-pain-map", title: "AI Pain Map" },
      { slug: "vaccination-passport", title: "Vaccination Passport" },
      { slug: "post-covid-planner", title: "Post-COVID Planner" },
      { slug: "genetic-disease-risk-prediction", title: "Genetic Disease Risk Prediction" },
      { slug: "emergency-medical-profile", title: "Emergency Medical Profile" },
      { slug: "remote-vitals-monitoring", title: "Remote Vitals Monitoring" }
    ]
  },
  {
    slug: "everyday-wellness",
    title: "Everyday Wellness",
    summary: "Daily health maintenance.",
    services: [
      { slug: "healthy-travel-kit", title: "Healthy Travel Kit" },
      { slug: "goal-assistant", title: "Goal Assistant" },
      { slug: "daily-habit-tracker", title: "Daily Habit Tracker" },
      { slug: "stress-reduction-guide", title: "Stress Reduction Guide" },
      { slug: "energy-level-optimizer", title: "Energy Level Optimizer" },
      { slug: "mind-body-connection-exercises", title: "Mind-Body Connection Exercises" },
      { slug: "positive-affirmation-generator", title: "Positive Affirmation Generator" },
      { slug: "gratitude-journal-prompts", title: "Gratitude Journal Prompts" },
      { slug: "digital-wellbeing-score", title: "Digital Wellbeing Score" },
      { slug: "mindful-eating-assistant", title: "Mindful Eating Assistant" },
      { slug: "work-life-balance-advisor", title: "Work-Life Balance Advisor" },
      { slug: "immunity-booster-plan", title: "Immunity Booster Plan" },
      { slug: "mindful-breathing-exercises", title: "Mindful Breathing Exercises" },
      { slug: "ergonomic-workspace-setup", title: "Ergonomic Workspace Setup" },
      { slug: "social-connection-tracker", title: "Social Connection Tracker" }
    ]
  },
  {
    slug: "longevity-and-anti-aging",
    title: "Longevity & Anti-Aging",
    summary: "Protocols to extend healthspan.",
    services: [
      { slug: "biological-age-factors", title: "Biological Age Factors" },
      { slug: "polygenic-risk-viewer", title: "Polygenic Risk Viewer" },
      { slug: "epigenetic-age-dashboard", title: "Epigenetic Age Dashboard" },
      { slug: "pharmacogenomics-matcher", title: "Pharmacogenomics Matcher" },
      { slug: "genetic-trait-explainer", title: "Genetic Trait Explainer" },
      { slug: "telomere-length-analysis", title: "Telomere Length Analysis" },
      { slug: "nad-optimization-guide", title: "NAD+ Optimization Guide" },
      { slug: "senolytics-recommendation", title: "Senolytics Recommendation" },
      { slug: "mitochondrial-health-assessment", title: "Mitochondrial Health Assessment" },
      { slug: "longevity-diet-planner", title: "Longevity Diet Planner" },
      { slug: "glycemic-control-advisor", title: "Glycemic Control Advisor" },
      { slug: "cellular-senescence-score", title: "Cellular Senescence Score" },
      { slug: "microbiome-diversity-analysis", title: "Microbiome Diversity Analysis" },
      { slug: "longevity-gene-expression-report", title: "Longevity Gene Expression Report" },
      { slug: "organ-age-assessment", title: "Organ Age Assessment" }
    ]
  },
  {
    slug: "mental-wellness",
    title: "Mental Wellness",
    summary: "Stress, cognition, and mood tools.",
    services: [
      { slug: "mindfulness-guide", title: "Mindfulness Guide" },
      { slug: "motivation-booster", title: "Motivation Booster" },
      { slug: "digital-detox-planner", title: "Digital Detox Planner" },
      { slug: "digital-gratitude-wall", title: "Digital Gratitude Wall" },
      { slug: "social-battery-prediction", title: "Social Battery Prediction" },
      { slug: "social-isolation-coach", title: "Social Isolation Coach" },
      { slug: "cognitive-performance-enhancer", title: "Cognitive Performance Enhancer" },
      { slug: "emotional-regulation-tools", title: "Emotional Regulation Tools" },
      { slug: "cbt-modules", title: "Cognitive Behavioral Therapy (CBT) Modules" },
      { slug: "stress-hormone-tracker", title: "Stress Hormone Tracker" },
      { slug: "sleep-mood-connection-analysis", title: "Sleep-Mood Connection Analysis" }
    ]
  },
  {
    slug: "fitness-and-performance",
    title: "Fitness & Performance",
    summary: "Training and recovery.",
    services: [
      { slug: "personalized-meal-plan", title: "Personalized Meal Plan" },
      { slug: "vo2-max-assessment", title: "VO₂-Max Assessment" },
      { slug: "workout-generator", title: "Workout Generator" },
      { slug: "strength-plateau-breaker", title: "Strength Plateau Breaker" },
      { slug: "soft-tissue-release-map", title: "Soft Tissue Release Map" },
      { slug: "body-fat-trend-projection", title: "Body Fat Trend Projection" },
      { slug: "sport-specific-warm-up", title: "Sport Specific Warm-up" },
      { slug: "cycling-power-prediction", title: "Cycling Power Prediction" },
      { slug: "two-minute-hrv-breathwork", title: "2-Minute HRV Breathwork" },
      { slug: "active-recovery-timer", title: "Active Recovery Timer" },
      { slug: "desk-stretch-breaks", title: "Desk Stretch Breaks" },
      { slug: "soft-tissue-map", title: "Soft Tissue Map" },
      { slug: "endurance-training-plan", title: "Endurance Training Plan" },
      { slug: "flexibility-and-mobility-guide", title: "Flexibility & Mobility Guide" },
      { slug: "post-workout-nutrition-guide", title: "Post-Workout Nutrition Guide" },
      { slug: "injury-prevention-plan", title: "Injury Prevention Plan" },
      { slug: "strength-and-conditioning-coach", title: "Strength & Conditioning Coach" },
      { slug: "powerlifting-program-generator", title: "Powerlifting Program Generator" },
      { slug: "running-gait-analysis", title: "Running Gait Analysis" }
    ]
  },
  {
    slug: "womens-health",
    title: "Women’s Health",
    summary: "Female-specific tracks.",
    services: [
      { slug: "cycle-tracker", title: "Cycle Tracker" },
      { slug: "pregnancy-timeline", title: "Pregnancy Timeline" },
      { slug: "menopause-navigator", title: "Menopause Navigator" },
      { slug: "breast-health-risk", title: "Breast-Health Risk" },
      { slug: "hormone-dashboard", title: "Hormone Dashboard" },
      { slug: "endometriosis-symptom-tracker", title: "Endometriosis Symptom Tracker" },
      { slug: "pcos-guide", title: "Polycystic Ovary Syndrome (PCOS) Guide" },
      { slug: "pelvic-floor-exercise-plan", title: "Pelvic Floor Exercise Plan" }
    ]
  },
  {
    slug: "mens-health",
    title: "Men’s Health",
    summary: "Male-specific tracks.",
    services: [
      { slug: "androgen-dashboard", title: "Androgen Dashboard" },
      { slug: "prostate-risk-score", title: "Prostate Risk Score" },
      { slug: "fertility-tracker", title: "Fertility Tracker" },
      { slug: "hair-loss-predictor", title: "Hair-Loss Predictor" },
      { slug: "performance-coach", title: "Performance Coach" },
      { slug: "cardiovascular-risk-for-men", title: "Cardiovascular Risk for Men" },
      { slug: "male-hormone-optimization", title: "Male Hormone Optimization" },
      { slug: "prostate-health-coach", title: "Prostate Health Coach" }
    ]
  },
  {
    slug: "beauty-and-skincare",
    title: "Beauty & Skincare",
    summary: "Skin and hair routines.",
    services: [
      { slug: "ai-skincare-routine", title: "AI Skincare Routine" },
      { slug: "uv-damage-forecast", title: "UV Damage Forecast" },
      { slug: "digital-dermatology-scan", title: "Digital Dermatology Scan" },
      { slug: "hair-porosity-advisor", title: "Hair Porosity Advisor" },
      { slug: "cosmetic-barcode-scan", title: "Cosmetic Barcode Scan" },
      { slug: "facial-massage-routine", title: "Facial Massage Routine" },
      { slug: "ingredient-conflict", title: "Ingredient Conflict" },
      { slug: "hair-growth-predictor", title: "Hair Growth Predictor" },
      { slug: "anti-aging-skincare-advisor", title: "Anti-Aging Skincare Advisor" },
      { slug: "sunscreen-recommendation-engine", title: "Sunscreen Recommendation Engine" }
    ]
  },
  {
    slug: "nutrition-and-diet",
    title: "Nutrition & Diet",
    summary: "Diet planning and analysis.",
    services: [
      { slug: "smart-food-swaps", title: "Smart Food Swaps" },
      { slug: "remote-patient-monitoring", title: "Remote Patient Monitoring (RPM)" },
      { slug: "hydration-formula", title: "Hydration Formula" },
      { slug: "nutrition-label-decoder", title: "Nutrition Label Decoder" },
      { slug: "budget-meal-kit-builder", title: "Budget Meal Kit Builder" },
      { slug: "sodium-potassium-meter", title: "Sodium-Potassium Meter" },
      { slug: "gut-microbiome-analyzer", title: "Gut Microbiome Analyzer" },
      { slug: "personalized-supplement-guide", title: "Personalized Supplement Guide" },
      { slug: "metabolic-rate-calculator", title: "Metabolic Rate Calculator" },
      { slug: "food-sensitivity-tracker", title: "Food Sensitivity Tracker" },
      { slug: "electrolyte-balance-advisor", title: "Electrolyte Balance Advisor" },
      { slug: "food-sustainability-score", title: "Food Sustainability Score" },
      { slug: "meal-prep-planner", title: "Meal Prep Planner" },
      { slug: "recipe-nutrient-analyzer", title: "Recipe Nutrient Analyzer" },
      { slug: "hydration-goal-setter", title: "Hydration Goal Setter" }
    ]
  },
  {
    slug: "sleep-and-recovery",
    title: "Sleep & Recovery",
    summary: "Sleep and recovery tools.",
    services: [
      { slug: "blue-light-planner", title: "Blue Light Planner" },
      { slug: "sleep-hygiene-coach", title: "Sleep Hygiene Coach" },
      { slug: "circadian-light-guide", title: "Circadian Light Guide" },
      { slug: "sleep-apnea-screener", title: "Sleep Apnea Screener" },
      { slug: "micro-meditation-generator", title: "Micro-Meditation Generator" },
      { slug: "sleep-environment-optimizer", title: "Sleep Environment Optimizer" },
      { slug: "guided-sleep-meditation", title: "Guided Sleep Meditation" },
      { slug: "dream-pattern-analysis", title: "Dream Pattern Analysis" }
    ]
  },
  {
    slug: "environmental-health",
    title: "Environmental Health",
    summary: "Environment exposure literacy.",
    services: [
      { slug: "eco-routine-assessment", title: "Eco-Routine Assessment" },
      { slug: "environmental-exposure", title: "Environmental Exposure" },
      { slug: "pollen-defense", title: "Pollen Defense" },
      { slug: "indoor-noise-map", title: "Indoor Noise Map" },
      { slug: "commute-calorie-optimizer", title: "Commute Calorie Optimizer" },
      { slug: "home-air-quality-advisor", title: "Home Air Quality Advisor" },
      { slug: "water-quality-monitor", title: "Water Quality Monitor" },
      { slug: "mold-exposure-risk-assessment", title: "Mold Exposure Risk Assessment" }
    ]
  },
  {
    slug: "family-health",
    title: "Family Health",
    summary: "Household health playbooks.",
    services: [
      { slug: "family-medication-hub", title: "Family Medication Hub" },
      { slug: "child-growth-tracker", title: "Child Growth Tracker" },
      { slug: "genetic-compatibility-screening", title: "Genetic Compatibility Screening" },
      { slug: "family-wellness-challenge", title: "Family Wellness Challenge" },
      { slug: "child-immunization-scheduler", title: "Child Immunization Scheduler" },
      { slug: "family-first-aid-guide", title: "Family First-Aid Guide" },
      { slug: "sibling-health-comparison", title: "Sibling Health Comparison" }
    ]
  },
  {
    slug: "preventive-medicine-and-longevity",
    title: "Preventive Medicine & Longevity",
    summary: "Screening and prevention.",
    services: [
      { slug: "personalized-cancer-screening", title: "Personalized Cancer Screening" },
      { slug: "cardiovascular-disease-prevention-plan", title: "Cardiovascular Disease Prevention Plan" },
      { slug: "neurodegenerative-risk-assessment", title: "Neurodegenerative Risk Assessment" },
      { slug: "inflammation-management-program", title: "Inflammation Management Program" },
      { slug: "immune-system-optimization", title: "Immune System Optimization" },
      { slug: "health-and-wellness-risk-calculator", title: "Health & Wellness Risk Calculator" },
      { slug: "diabetes-prevention-program", title: "Diabetes Prevention Program" },
      { slug: "metabolic-syndrome-monitor", title: "Metabolic Syndrome Monitor" }
    ]
  },
  {
    slug: "biohacking-and-performance",
    title: "Biohacking & Performance",
    summary: "N=1 tools and protocols.",
    services: [
      { slug: "nootropic-recommendation-engine", title: "Nootropic Recommendation Engine" },
      { slug: "cryotherapy-protocol-generator", title: "Cryotherapy Protocol Generator" },
      { slug: "red-light-therapy-guide", title: "Red Light Therapy Guide" },
      { slug: "cold-exposure-training-plan", title: "Cold Exposure Training Plan" },
      { slug: "intermittent-fasting-schedule", title: "Intermittent Fasting Schedule" },
      { slug: "biofeedback-training-modules", title: "Biofeedback Training Modules" },
      { slug: "neurofeedback-session-planner", title: "Neurofeedback Session Planner" },
      { slug: "wearable-data-integrator", title: "Wearable Data Integrator" },
      { slug: "personalized-recovery-modalities", title: "Personalized Recovery Modalities" },
      { slug: "nootropic-stack-builder", title: "Nootropic Stack Builder" },
      { slug: "cold-exposure-protocol", title: "Cold Exposure Protocol" },
      { slug: "breathwork-optimizer", title: "Breathwork Optimizer" },
      { slug: "cognitive-enhancement-plan", title: "Cognitive Enhancement Plan" },
      { slug: "intermittent-fasting-calculator", title: "Intermittent Fasting Calculator" },
      { slug: "dopamine-reset-protocol", title: "Dopamine Reset Protocol" },
      { slug: "sensory-deprivation-guide", title: "Sensory Deprivation Guide" },
      { slug: "biofeedback-training-for-focus", title: "Biofeedback Training for Focus" }
    ]
  },
  {
    slug: "senior-care",
    title: "Senior Care",
    summary: "Aging support and safety.",
    services: [
      { slug: "senior-dashboard", title: "Senior Dashboard" },
      { slug: "caregiver-portal", title: "Caregiver Portal" },
      { slug: "fall-detection-alert", title: "Fall Detection Alert" },
      { slug: "medication-adherence", title: "Medication Adherence" },
      { slug: "voice-companion", title: "Voice Companion" },
      { slug: "frailty-index", title: "Frailty Index" },
      { slug: "medication-reminder-system", title: "Medication Reminder System" },
      { slug: "fall-prevention-exercises", title: "Fall Prevention Exercises" },
      { slug: "cognitive-health-games", title: "Cognitive Health Games" }
    ]
  },
  {
    slug: "eye-health-suite",
    title: "Eye-Health Suite",
    summary: "Vision hygiene tools.",
    services: [
      { slug: "browser-vision-test", title: "Browser Vision Test" },
      { slug: "retina-scan-ai", title: "Retina Scan AI" },
      { slug: "blue-light-filter", title: "Blue Light Filter" },
      { slug: "eye-exercise-reminders", title: "Eye Exercise Reminders" }
    ]
  },
  {
    slug: "digital-therapeutics-store",
    title: "Digital Therapeutics Store",
    summary: "Validated digital tools.",
    services: [
      { slug: "insomnia-cbt-i-app", title: "Insomnia CBT-I App" },
      { slug: "adhd-neuro-game", title: "ADHD Neuro-Game" },
      { slug: "anxiety-management-app", title: "Anxiety Management App" },
      { slug: "chronic-pain-relief-vr", title: "Chronic Pain Relief VR" },
      { slug: "ptsd-recovery-modules", title: "PTSD Recovery Modules" }
    ]
  },
  {
    slug: "general-sexual-longevity",
    title: "General Sexual Longevity",
    summary: "Foundations of sexual vitality.",
    services: [
      { slug: "libido-hormonal-optimization", title: "Libido Hormonal Optimization" },
      { slug: "sexual-health-biomarkers", title: "Sexual Health Biomarkers" },
      { slug: "aphrodisiac-nutrigenomics", title: "Aphrodisiac Nutrigenomics" },
      { slug: "microbiome-and-sexuality", title: "Microbiome and Sexuality" },
      { slug: "neuroplasticity-and-libido", title: "Neuroplasticity and Libido" },
      { slug: "stress-and-cortisol-management", title: "Stress and Cortisol Management" },
      { slug: "circadian-rhythms-and-sexuality", title: "Circadian Rhythms and Sexuality" },
      { slug: "physical-fitness-for-sexuality", title: "Physical Fitness for Sexuality" },
      { slug: "peptide-therapy-for-libido", title: "Peptide Therapy for Libido" },
      { slug: "xenoestrogen-detoxification", title: "Xenoestrogen Detoxification" },
      { slug: "psychosexual-optimization", title: "Psychosexual Optimization" },
      { slug: "partner-synchronization", title: "Partner Synchronization" },
      { slug: "fertility-health-assessment", title: "Fertility Health Assessment" },
      { slug: "hormone-balance-for-libido", title: "Hormone Balance for Libido" },
      { slug: "sexual-wellness-education", title: "Sexual Wellness Education" },
      { slug: "relationship-communication-coach", title: "Relationship Communication Coach" }
    ]
  },
  {
    slug: "mens-sexual-health",
    title: "Men's Sexual Health",
    summary: "Male sexual wellness.",
    services: [
      { slug: "vascular-health-for-potency", title: "Vascular Health for Potency" },
      { slug: "male-vitality-and-trt", title: "Male Vitality and TRT" },
      { slug: "erectile-dysfunction-guide", title: "Erectile Dysfunction (ED) Guide" },
      { slug: "sperm-health-optimization", title: "Sperm Health Optimization" }
    ]
  },
  {
    slug: "womens-sexual-health",
    title: "Women's Sexual Health",
    summary: "Female sexual wellness.",
    services: [
      { slug: "female-hormonal-optimization", title: "Female Hormonal Optimization" },
      { slug: "libido-boosting-nutrition", title: "Libido-Boosting Nutrition" },
      { slug: "pelvic-health-program", title: "Pelvic Health Program" },
      { slug: "menopausal-intimacy-advisor", title: "Menopausal Intimacy Advisor" }
    ]
  }
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
