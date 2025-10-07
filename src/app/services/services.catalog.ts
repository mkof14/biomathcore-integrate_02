export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  shortHint?: string;
};
export type ServiceCategory = {
  slug: string;
  title: string;
  description?: string;
  services: ServiceItem[];
};

export const CATEGORIES: ServiceCategory[] = [
  {
    slug: "critical-health",
    title: "Critical Health",
    services: [
      { id: "1.1", slug: "risk-insight", title: "Risk Insight" },
      {
        id: "1.2",
        slug: "lab-results-explainer",
        title: "Lab Results Explainer",
      },
      {
        id: "1.3",
        slug: "drug-drug-interaction-checker",
        title: "Drug-Drug Interaction Checker",
      },
      { id: "1.4", slug: "symptom-analyzer", title: "Symptom Analyzer" },
      {
        id: "1.5",
        slug: "chronic-disease-coach",
        title: "Chronic Disease Coach",
      },
      {
        id: "1.6",
        slug: "ai-medication-adherence",
        title: "AI Medication Adherence",
      },
      { id: "1.7", slug: "care-cost-optimizer", title: "Care Cost Optimizer" },
      {
        id: "1.8",
        slug: "post-surgery-recovery-tracker",
        title: "Post-Surgery Recovery Tracker",
      },
      {
        id: "1.9",
        slug: "clinical-trial-finder",
        title: "Clinical Trial Finder",
      },
      {
        id: "1.10",
        slug: "pre-surgery-readiness",
        title: "Pre-Surgery Readiness",
      },
      {
        id: "1.11",
        slug: "rare-disease-navigator",
        title: "Rare Disease Navigator",
      },
      { id: "1.12", slug: "smart-med-refill", title: "Smart Med Refill" },
      { id: "1.13", slug: "ai-pain-map", title: "AI Pain Map" },
      {
        id: "1.14",
        slug: "vaccination-passport",
        title: "Vaccination Passport",
      },
      { id: "1.15", slug: "post-covid-planner", title: "Post-COVID Planner" },
      {
        id: "1.16",
        slug: "genetic-disease-risk-prediction",
        title: "Genetic Disease Risk Prediction",
      },
      {
        id: "1.17",
        slug: "emergency-medical-profile",
        title: "Emergency Medical Profile",
      },
      {
        id: "1.18",
        slug: "remote-vitals-monitoring",
        title: "Remote Vitals Monitoring",
      },
    ],
  },
  {
    slug: "everyday-wellness",
    title: "Everyday Wellness",
    services: [
      { id: "2.1", slug: "healthy-travel-kit", title: "Healthy Travel Kit" },
      { id: "2.2", slug: "goal-assistant", title: "Goal Assistant" },
      { id: "2.3", slug: "daily-habit-tracker", title: "Daily Habit Tracker" },
      {
        id: "2.4",
        slug: "stress-reduction-guide",
        title: "Stress Reduction Guide",
      },
      {
        id: "2.5",
        slug: "energy-level-optimizer",
        title: "Energy Level Optimizer",
      },
      {
        id: "2.6",
        slug: "mind-body-connection-exercises",
        title: "Mind-Body Connection Exercises",
      },
      {
        id: "2.7",
        slug: "positive-affirmation-generator",
        title: "Positive Affirmation Generator",
      },
      {
        id: "2.8",
        slug: "gratitude-journal-prompts",
        title: "Gratitude Journal Prompts",
      },
      {
        id: "2.9",
        slug: "digital-wellbeing-score",
        title: "Digital Wellbeing Score",
      },
      {
        id: "2.10",
        slug: "mindful-eating-assistant",
        title: "Mindful Eating Assistant",
      },
      {
        id: "2.11",
        slug: "work-life-balance-advisor",
        title: "Work-Life Balance Advisor",
      },
      {
        id: "2.12",
        slug: "immunity-booster-plan",
        title: "Immunity Booster Plan",
      },
      {
        id: "2.13",
        slug: "mindful-breathing-exercises",
        title: "Mindful Breathing Exercises",
      },
      {
        id: "2.14",
        slug: "ergonomic-workspace-setup",
        title: "Ergonomic Workspace Setup",
      },
      {
        id: "2.15",
        slug: "social-connection-tracker",
        title: "Social Connection Tracker",
      },
    ],
  },
  {
    slug: "longevity-and-anti-aging",
    title: "Longevity & Anti-Aging",
    services: [
      {
        id: "3.1",
        slug: "biological-age-factors",
        title: "Biological Age Factors",
      },
      {
        id: "3.2",
        slug: "polygenic-risk-viewer",
        title: "Polygenic Risk Viewer",
      },
      {
        id: "3.3",
        slug: "epigenetic-age-dashboard",
        title: "Epigenetic Age Dashboard",
      },
      {
        id: "3.4",
        slug: "pharmacogenomics-matcher",
        title: "Pharmacogenomics Matcher",
      },
      {
        id: "3.5",
        slug: "genetic-trait-explainer",
        title: "Genetic Trait Explainer",
      },
      {
        id: "3.6",
        slug: "telomere-length-analysis",
        title: "Telomere Length Analysis",
      },
      {
        id: "3.7",
        slug: "nad-optimization-guide",
        title: "NAD+ Optimization Guide",
      },
      {
        id: "3.8",
        slug: "senolytics-recommendation",
        title: "Senolytics Recommendation",
      },
      {
        id: "3.9",
        slug: "mitochondrial-health-assessment",
        title: "Mitochondrial Health Assessment",
      },
      {
        id: "3.10",
        slug: "longevity-diet-planner",
        title: "Longevity Diet Planner",
      },
      {
        id: "3.11",
        slug: "glycemic-control-advisor",
        title: "Glycemic Control Advisor",
      },
      {
        id: "3.12",
        slug: "cellular-senescence-score",
        title: "Cellular Senescence Score",
      },
      {
        id: "3.13",
        slug: "microbiome-diversity-analysis",
        title: "Microbiome Diversity Analysis",
      },
      {
        id: "3.14",
        slug: "longevity-gene-expression-report",
        title: "Longevity Gene Expression Report",
      },
      {
        id: "3.15",
        slug: "organ-age-assessment",
        title: "Organ Age Assessment",
      },
    ],
  },
  {
    slug: "mental-wellness",
    title: "Mental Wellness",
    services: [
      { id: "4.1", slug: "mindfulness-guide", title: "Mindfulness Guide" },
      { id: "4.2", slug: "motivation-booster", title: "Motivation Booster" },
      {
        id: "4.3",
        slug: "digital-detox-planner",
        title: "Digital Detox Planner",
      },
      {
        id: "4.4",
        slug: "digital-gratitude-wall",
        title: "Digital Gratitude Wall",
      },
      {
        id: "4.5",
        slug: "social-battery-prediction",
        title: "Social Battery Prediction",
      },
      {
        id: "4.6",
        slug: "social-isolation-coach",
        title: "Social Isolation Coach",
      },
      {
        id: "4.7",
        slug: "cognitive-performance-enhancer",
        title: "Cognitive Performance Enhancer",
      },
      {
        id: "4.8",
        slug: "emotional-regulation-tools",
        title: "Emotional Regulation Tools",
      },
      {
        id: "4.9",
        slug: "cognitive-behavioral-therapy-cbt-modules",
        title: "Cognitive Behavioral Therapy (CBT) Modules",
      },
      {
        id: "4.10",
        slug: "stress-hormone-tracker",
        title: "Stress Hormone Tracker",
      },
      {
        id: "4.11",
        slug: "sleep-mood-connection-analysis",
        title: "Sleep-Mood Connection Analysis",
      },
    ],
  },
  {
    slug: "fitness-and-performance",
    title: "Fitness & Performance",
    services: [
      {
        id: "5.1",
        slug: "personalized-meal-plan",
        title: "Personalized Meal Plan",
      },
      { id: "5.2", slug: "vo2-max-assessment", title: "VO₂-Max Assessment" },
      { id: "5.3", slug: "workout-generator", title: "Workout Generator" },
      {
        id: "5.4",
        slug: "strength-plateau-breaker",
        title: "Strength Plateau Breaker",
      },
      {
        id: "5.5",
        slug: "soft-tissue-release-map",
        title: "Soft Tissue Release Map",
      },
      {
        id: "5.6",
        slug: "body-fat-trend-projection",
        title: "Body Fat Trend Projection",
      },
      {
        id: "5.7",
        slug: "sport-specific-warm-up",
        title: "Sport Specific Warm-up",
      },
      {
        id: "5.8",
        slug: "cycling-power-prediction",
        title: "Cycling Power Prediction",
      },
      {
        id: "5.9",
        slug: "2-minute-hrv-breathwork",
        title: "2-Minute HRV Breathwork",
      },
      {
        id: "5.10",
        slug: "active-recovery-timer",
        title: "Active Recovery Timer",
      },
      { id: "5.11", slug: "desk-stretch-breaks", title: "Desk Stretch Breaks" },
      { id: "5.12", slug: "soft-tissue-map", title: "Soft Tissue Map" },
      {
        id: "5.13",
        slug: "endurance-training-plan",
        title: "Endurance Training Plan",
      },
      {
        id: "5.14",
        slug: "flexibility-and-mobility-guide",
        title: "Flexibility & Mobility Guide",
      },
      {
        id: "5.15",
        slug: "post-workout-nutrition-guide",
        title: "Post-Workout Nutrition Guide",
      },
      {
        id: "5.16",
        slug: "injury-prevention-plan",
        title: "Injury Prevention Plan",
      },
      {
        id: "5.17",
        slug: "strength-and-conditioning-coach",
        title: "Strength & Conditioning Coach",
      },
      {
        id: "5.18",
        slug: "powerlifting-program-generator",
        title: "Powerlifting Program Generator",
      },
      {
        id: "5.19",
        slug: "running-gait-analysis",
        title: "Running Gait Analysis",
      },
    ],
  },
  {
    slug: "womens-health",
    title: "Women’s Health",
    services: [
      { id: "6.1", slug: "cycle-tracker", title: "Cycle Tracker" },
      { id: "6.2", slug: "pregnancy-timeline", title: "Pregnancy Timeline" },
      { id: "6.3", slug: "menopause-navigator", title: "Menopause Navigator" },
      { id: "6.4", slug: "breast-health-risk", title: "Breast-Health Risk" },
      { id: "6.5", slug: "hormone-dashboard", title: "Hormone Dashboard" },
      {
        id: "6.6",
        slug: "endometriosis-symptom-tracker",
        title: "Endometriosis Symptom Tracker",
      },
      {
        id: "6.7",
        slug: "pcos-guide",
        title: "Polycystic Ovary Syndrome (PCOS) Guide",
      },
      {
        id: "6.8",
        slug: "pelvic-floor-exercise-plan",
        title: "Pelvic Floor Exercise Plan",
      },
    ],
  },
  {
    slug: "mens-health",
    title: "Men’s Health",
    services: [
      { id: "7.1", slug: "androgen-dashboard", title: "Androgen Dashboard" },
      { id: "7.2", slug: "prostate-risk-score", title: "Prostate Risk Score" },
      { id: "7.3", slug: "fertility-tracker", title: "Fertility Tracker" },
      { id: "7.4", slug: "hair-loss-predictor", title: "Hair-Loss Predictor" },
      { id: "7.5", slug: "performance-coach", title: "Performance Coach" },
      {
        id: "7.6",
        slug: "cardiovascular-risk-for-men",
        title: "Cardiovascular Risk for Men",
      },
      {
        id: "7.7",
        slug: "male-hormone-optimization",
        title: "Male Hormone Optimization",
      },
      {
        id: "7.8",
        slug: "prostate-health-coach",
        title: "Prostate Health Coach",
      },
    ],
  },
  {
    slug: "beauty-and-skincare",
    title: "Beauty & Skincare",
    services: [
      { id: "8.1", slug: "ai-skincare-routine", title: "AI Skincare Routine" },
      { id: "8.2", slug: "uv-damage-forecast", title: "UV Damage Forecast" },
      {
        id: "8.3",
        slug: "digital-dermatology-scan",
        title: "Digital Dermatology Scan",
      },
      {
        id: "8.4",
        slug: "hair-porosity-advisor",
        title: "Hair Porosity Advisor",
      },
      {
        id: "8.5",
        slug: "cosmetic-barcode-scan",
        title: "Cosmetic Barcode Scan",
      },
      {
        id: "8.6",
        slug: "facial-massage-routine",
        title: "Facial Massage Routine",
      },
      { id: "8.7", slug: "ingredient-conflict", title: "Ingredient Conflict" },
      {
        id: "8.8",
        slug: "hair-growth-predictor",
        title: "Hair Growth Predictor",
      },
      {
        id: "8.9",
        slug: "anti-aging-skincare-advisor",
        title: "Anti-Aging Skincare Advisor",
      },
      {
        id: "8.10",
        slug: "sunscreen-recommendation-engine",
        title: "Sunscreen Recommendation Engine",
      },
    ],
  },
  {
    slug: "nutrition-and-diet",
    title: "Nutrition & Diet",
    services: [
      { id: "9.1", slug: "smart-food-swaps", title: "Smart Food Swaps" },
      {
        id: "9.2",
        slug: "remote-patient-monitoring-rpm",
        title: "Remote Patient Monitoring (RPM)",
      },
      { id: "9.3", slug: "hydration-formula", title: "Hydration Formula" },
      {
        id: "9.4",
        slug: "nutrition-label-decoder",
        title: "Nutrition Label Decoder",
      },
      {
        id: "9.5",
        slug: "budget-meal-kit-builder",
        title: "Budget Meal Kit Builder",
      },
      {
        id: "9.6",
        slug: "sodium-potassium-meter",
        title: "Sodium-Potassium Meter",
      },
      {
        id: "9.7",
        slug: "gut-microbiome-analyzer",
        title: "Gut Microbiome Analyzer",
      },
      {
        id: "9.8",
        slug: "personalized-supplement-guide",
        title: "Personalized Supplement Guide",
      },
      {
        id: "9.9",
        slug: "metabolic-rate-calculator",
        title: "Metabolic Rate Calculator",
      },
      {
        id: "9.10",
        slug: "food-sensitivity-tracker",
        title: "Food Sensitivity Tracker",
      },
      {
        id: "9.11",
        slug: "electrolyte-balance-advisor",
        title: "Electrolyte Balance Advisor",
      },
      {
        id: "9.12",
        slug: "food-sustainability-score",
        title: "Food Sustainability Score",
      },
      { id: "9.13", slug: "meal-prep-planner", title: "Meal Prep Planner" },
      {
        id: "9.14",
        slug: "recipe-nutrient-analyzer",
        title: "Recipe Nutrient Analyzer",
      },
      {
        id: "9.15",
        slug: "hydration-goal-setter",
        title: "Hydration Goal Setter",
      },
    ],
  },
  {
    slug: "sleep-and-recovery",
    title: "Sleep & Recovery",
    services: [
      { id: "10.1", slug: "blue-light-planner", title: "Blue Light Planner" },
      { id: "10.2", slug: "sleep-hygiene-coach", title: "Sleep Hygiene Coach" },
      {
        id: "10.3",
        slug: "circadian-light-guide",
        title: "Circadian Light Guide",
      },
      {
        id: "10.4",
        slug: "sleep-apnea-screener",
        title: "Sleep Apnea Screener",
      },
      {
        id: "10.5",
        slug: "micro-meditation-generator",
        title: "Micro-Meditation Generator",
      },
      {
        id: "10.6",
        slug: "sleep-environment-optimizer",
        title: "Sleep Environment Optimizer",
      },
      {
        id: "10.7",
        slug: "guided-sleep-meditation",
        title: "Guided Sleep Meditation",
      },
      {
        id: "10.8",
        slug: "dream-pattern-analysis",
        title: "Dream Pattern Analysis",
      },
    ],
  },
  {
    slug: "environmental-health",
    title: "Environmental Health",
    services: [
      {
        id: "11.1",
        slug: "eco-routine-assessment",
        title: "Eco-Routine Assessment",
      },
      {
        id: "11.2",
        slug: "environmental-exposure",
        title: "Environmental Exposure",
      },
      { id: "11.3", slug: "pollen-defense", title: "Pollen Defense" },
      { id: "11.4", slug: "indoor-noise-map", title: "Indoor Noise Map" },
      {
        id: "11.5",
        slug: "commute-calorie-optimizer",
        title: "Commute Calorie Optimizer",
      },
      {
        id: "11.6",
        slug: "home-air-quality-advisor",
        title: "Home Air Quality Advisor",
      },
      {
        id: "11.7",
        slug: "water-quality-monitor",
        title: "Water Quality Monitor",
      },
      {
        id: "11.8",
        slug: "mold-exposure-risk-assessment",
        title: "Mold Exposure Risk Assessment",
      },
    ],
  },
  {
    slug: "family-health",
    title: "Family Health",
    services: [
      {
        id: "12.1",
        slug: "family-medication-hub",
        title: "Family Medication Hub",
      },
      {
        id: "12.2",
        slug: "child-growth-tracker",
        title: "Child Growth Tracker",
      },
      {
        id: "12.3",
        slug: "genetic-compatibility-screening",
        title: "Genetic Compatibility Screening",
      },
      {
        id: "12.4",
        slug: "family-wellness-challenge",
        title: "Family Wellness Challenge",
      },
      {
        id: "12.5",
        slug: "child-immunization-scheduler",
        title: "Child Immunization Scheduler",
      },
      {
        id: "12.6",
        slug: "family-first-aid-guide",
        title: "Family First-Aid Guide",
      },
      {
        id: "12.7",
        slug: "sibling-health-comparison",
        title: "Sibling Health Comparison",
      },
    ],
  },
  {
    slug: "preventive-medicine-and-longevity",
    title: "Preventive Medicine & Longevity",
    services: [
      {
        id: "13.1",
        slug: "personalized-cancer-screening",
        title: "Personalized Cancer Screening",
      },
      {
        id: "13.2",
        slug: "cardiovascular-disease-prevention-plan",
        title: "Cardiovascular Disease Prevention Plan",
      },
      {
        id: "13.3",
        slug: "neurodegenerative-risk-assessment",
        title: "Neurodegenerative Risk Assessment",
      },
      {
        id: "13.4",
        slug: "inflammation-management-program",
        title: "Inflammation Management Program",
      },
      {
        id: "13.5",
        slug: "immune-system-optimization",
        title: "Immune System Optimization",
      },
      {
        id: "13.6",
        slug: "health-and-wellness-risk-calculator",
        title: "Health & Wellness Risk Calculator",
      },
      {
        id: "13.7",
        slug: "diabetes-prevention-program",
        title: "Diabetes Prevention Program",
      },
      {
        id: "13.8",
        slug: "metabolic-syndrome-monitor",
        title: "Metabolic Syndrome Monitor",
      },
    ],
  },
  {
    slug: "biohacking-and-performance",
    title: "Biohacking & Performance",
    services: [
      {
        id: "14.1",
        slug: "nootropic-recommendation-engine",
        title: "Nootropic Recommendation Engine",
      },
      {
        id: "14.2",
        slug: "cryotherapy-protocol-generator",
        title: "Cryotherapy Protocol Generator",
      },
      {
        id: "14.3",
        slug: "red-light-therapy-guide",
        title: "Red Light Therapy Guide",
      },
      {
        id: "14.4",
        slug: "cold-exposure-training-plan",
        title: "Cold Exposure Training Plan",
      },
      {
        id: "14.5",
        slug: "intermittent-fasting-schedule",
        title: "Intermittent Fasting Schedule",
      },
      {
        id: "14.6",
        slug: "biofeedback-training-modules",
        title: "Biofeedback Training Modules",
      },
      {
        id: "14.7",
        slug: "neurofeedback-session-planner",
        title: "Neurofeedback Session Planner",
      },
      {
        id: "14.8",
        slug: "wearable-data-integrator",
        title: "Wearable Data Integrator",
      },
      {
        id: "14.9",
        slug: "personalized-recovery-modalities",
        title: "Personalized Recovery Modalities",
      },
      {
        id: "14.10",
        slug: "nootropic-stack-builder",
        title: "Nootropic Stack Builder",
      },
      {
        id: "14.11",
        slug: "cold-exposure-protocol",
        title: "Cold Exposure Protocol",
      },
      {
        id: "14.12",
        slug: "breathwork-optimizer",
        title: "Breathwork Optimizer",
      },
      {
        id: "14.13",
        slug: "cognitive-enhancement-plan",
        title: "Cognitive Enhancement Plan",
      },
      {
        id: "14.14",
        slug: "intermittent-fasting-calculator",
        title: "Intermittent Fasting Calculator",
      },
      {
        id: "14.15",
        slug: "dopamine-reset-protocol",
        title: "Dopamine Reset Protocol",
      },
      {
        id: "14.16",
        slug: "sensory-deprivation-guide",
        title: "Sensory Deprivation Guide",
      },
      {
        id: "14.17",
        slug: "biofeedback-training-for-focus",
        title: "Biofeedback Training for Focus",
      },
    ],
  },
  {
    slug: "senior-care",
    title: "Senior Care",
    services: [
      { id: "15.1", slug: "senior-dashboard", title: "Senior Dashboard" },
      { id: "15.2", slug: "caregiver-portal", title: "Caregiver Portal" },
      {
        id: "15.3",
        slug: "fall-detection-alert",
        title: "Fall Detection Alert",
      },
      {
        id: "15.4",
        slug: "medication-adherence",
        title: "Medication Adherence",
      },
      { id: "15.5", slug: "voice-companion", title: "Voice Companion" },
      { id: "15.6", slug: "frailty-index", title: "Frailty Index" },
      {
        id: "15.7",
        slug: "medication-reminder-system",
        title: "Medication Reminder System",
      },
      {
        id: "15.8",
        slug: "fall-prevention-exercises",
        title: "Fall Prevention Exercises",
      },
      {
        id: "15.9",
        slug: "cognitive-health-games",
        title: "Cognitive Health Games",
      },
    ],
  },
  {
    slug: "eye-health-suite",
    title: "Eye-Health Suite",
    services: [
      { id: "16.1", slug: "browser-vision-test", title: "Browser Vision Test" },
      { id: "16.2", slug: "retina-scan-ai", title: "Retina Scan AI" },
      { id: "16.3", slug: "blue-light-filter", title: "Blue Light Filter" },
      {
        id: "16.4",
        slug: "eye-exercise-reminders",
        title: "Eye Exercise Reminders",
      },
    ],
  },
  {
    slug: "digital-therapeutics-store",
    title: "Digital Therapeutics Store",
    services: [
      { id: "17.1", slug: "insomnia-cbt-i-app", title: "Insomnia CBT-I App" },
      { id: "17.2", slug: "adhd-neuro-game", title: "ADHD Neuro-Game" },
      {
        id: "17.3",
        slug: "anxiety-management-app",
        title: "Anxiety Management App",
      },
      {
        id: "17.4",
        slug: "chronic-pain-relief-vr",
        title: "Chronic Pain Relief VR",
      },
      {
        id: "17.5",
        slug: "ptsd-recovery-modules",
        title: "PTSD Recovery Modules",
      },
    ],
  },
  {
    slug: "general-sexual-longevity",
    title: "General Sexual Longevity",
    services: [
      {
        id: "18.1",
        slug: "libido-hormonal-optimization",
        title: "Libido Hormonal Optimization",
      },
      {
        id: "18.2",
        slug: "sexual-health-biomarkers",
        title: "Sexual Health Biomarkers",
      },
      {
        id: "18.3",
        slug: "aphrodisiac-nutrigenomics",
        title: "Aphrodisiac Nutrigenomics",
      },
      {
        id: "18.4",
        slug: "microbiome-and-sexuality",
        title: "Microbiome and Sexuality",
      },
      {
        id: "18.5",
        slug: "neuroplasticity-and-libido",
        title: "Neuroplasticity and Libido",
      },
      {
        id: "18.6",
        slug: "stress-and-cortisol-management",
        title: "Stress and Cortisol Management",
      },
      {
        id: "18.7",
        slug: "circadian-rhythms-and-sexuality",
        title: "Circadian Rhythms and Sexuality",
      },
      {
        id: "18.8",
        slug: "physical-fitness-for-sexuality",
        title: "Physical Fitness for Sexuality",
      },
      {
        id: "18.9",
        slug: "peptide-therapy-for-libido",
        title: "Peptide Therapy for Libido",
      },
      {
        id: "18.10",
        slug: "xenoestrogen-detoxification",
        title: "Xenoestrogen Detoxification",
      },
      {
        id: "18.11",
        slug: "psychosexual-optimization",
        title: "Psychosexual Optimization",
      },
      {
        id: "18.12",
        slug: "partner-synchronization",
        title: "Partner Synchronization",
      },
      {
        id: "18.13",
        slug: "fertility-health-assessment",
        title: "Fertility Health Assessment",
      },
      {
        id: "18.14",
        slug: "hormone-balance-for-libido",
        title: "Hormone Balance for Libido",
      },
      {
        id: "18.15",
        slug: "sexual-wellness-education",
        title: "Sexual Wellness Education",
      },
      {
        id: "18.16",
        slug: "relationship-communication-coach",
        title: "Relationship Communication Coach",
      },
    ],
  },
  {
    slug: "mens-sexual-health",
    title: "Men's Sexual Health",
    services: [
      {
        id: "19.1",
        slug: "vascular-health-for-potency",
        title: "Vascular Health for Potency",
      },
      {
        id: "19.2",
        slug: "male-vitality-and-trt",
        title: "Male Vitality and TRT",
      },
      {
        id: "19.3",
        slug: "erectile-dysfunction-guide",
        title: "Erectile Dysfunction (ED) Guide",
      },
      {
        id: "19.4",
        slug: "sperm-health-optimization",
        title: "Sperm Health Optimization",
      },
    ],
  },
  {
    slug: "womens-sexual-health",
    title: "Women's Sexual Health",
    services: [
      {
        id: "20.1",
        slug: "female-hormonal-optimization",
        title: "Female Hormonal Optimization",
      },
      {
        id: "20.2",
        slug: "libido-boosting-nutrition",
        title: "Libido-Boosting Nutrition",
      },
      {
        id: "20.3",
        slug: "pelvic-health-program",
        title: "Pelvic Health Program",
      },
      {
        id: "20.4",
        slug: "menopausal-intimacy-advisor",
        title: "Menopausal Intimacy Advisor",
      },
    ],
  },
];

export function allServicesFlat(): ServiceItem[] {
  return CATEGORIES.flatMap((c) => c.services);
}
export function findCategory(slug: string): ServiceCategory | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
export function findServiceBySlug(slug: string): ServiceItem | undefined {
  return allServicesFlat().find((s) => s.slug === slug);
}
export function findCategoryByServiceSlug(slug: string) {
  return CATEGORIES.find((c) => c.services.some((s) => s.slug === slug));
}
