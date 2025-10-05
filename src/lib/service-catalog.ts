// src/lib/service-catalog.ts

export type Service = {
  slug: string;
  title: string;
  summary?: string;
};

export type Category = {
  slug: string;
  title: string;
  description?: string;
  services: Service[];
};

/**
 * CATEGORIES: top-level catalog used by /services and /svc/[slug]
 */
export const CATEGORIES: Category[] = [] = [
  {
    slug: "womens-health",
    title: "Women’s Health",
    summary: "Cycle, hormones, pregnancy, menopause, and breast-health tools.",
    services: [
      { slug: "cycle-tracker", title: "Cycle Tracker", summary: "Calendar for periods, symptoms, and cycle regularity." },
      { slug: "pregnancy-timeline", title: "Pregnancy Timeline", summary: "Trimester milestones and visit reminders; track daily wellbeing." },
      { slug: "menopause-navigator", title: "Menopause Navigator", summary: "Track hot flashes, mood, and sleep; prepare talking points for clinician." },
      { slug: "breast-health-risk", title: "Breast-Health Risk", summary: "Self-exam reminders and age/family-history screening guidance." },
      { slug: "hormone-dashboard", title: "Hormone Dashboard", summary: "Visualizes estrogen, progesterone, FSH trends across labs." },
      { slug: "endometriosis-symptom-tracker", title: "Endometriosis Symptom Tracker", summary: "Log pain, bleeding, and treatment response to support care." },
      { slug: "pcos-guide", title: "PCOS Guide", summary: "Education plus tracking of weight, cycle, and lab markers." },
      { slug: "pelvic-floor-exercise-plan", title: "Pelvic Floor Exercise Plan", summary: "5–7 minute daily routines to strengthen pelvic-floor muscles." }
    ]
  },
  {
    slug: "mens-health",
    title: "Men’s Health",
    summary: "Androgens, prostate, fertility, performance, and cardiovascular focus.",
    services: [
      { slug: "androgen-dashboard", title: "Androgen Dashboard", summary: "Track testosterone and related biomarkers over time." },
      { slug: "prostate-risk-score", title: "Prostate Risk Score", summary: "Age/family-history-based prostate health flags and guidance." },
      { slug: "fertility-tracker", title: "Fertility Tracker", summary: "Log semen parameters, lifestyle factors, and timing." },
      { slug: "hair-loss-predictor", title: "Hair-Loss Predictor", summary: "Risk cues and habit guidance for hair preservation." },
      { slug: "performance-coach", title: "Performance Coach", summary: "Routine tweaks for strength, stamina, and recovery." },
      { slug: "mens-cardiovascular-risk", title: "Cardiovascular Risk for Men", summary: "Male-specific risk insights and prevention tips." },
      { slug: "male-hormone-optimization", title: "Male Hormone Optimization", summary: "Lifestyle-centered hormone support playbook." },
      { slug: "prostate-health-coach", title: "Prostate Health Coach", summary: "Reminders for screening and symptom tracking." }
    ]
  },
  {
    slug: "beauty-and-skincare",
    title: "Beauty & Skincare",
    summary: "Skin, hair, sun exposure, and ingredient intelligence.",
    services: [
      { slug: "ai-skincare-routine", title: "AI Skincare Routine", summary: "Routine builder tailored to skin type and goals." },
      { slug: "uv-damage-forecast", title: "UV Damage Forecast", summary: "Daily UV risk and protection reminders." },
      { slug: "digital-dermatology-scan", title: "Digital Dermatology Scan", summary: "Photo-based skin check guidance (educational, not diagnostic)." },
      { slug: "hair-porosity-advisor", title: "Hair Porosity Advisor", summary: "Care tips matched to porosity and texture." },
      { slug: "cosmetic-barcode-scan", title: "Cosmetic Barcode Scan", summary: "Ingredient breakdowns and conflict checks." },
      { slug: "facial-massage-routine", title: "Facial Massage Routine", summary: "Step-by-step massage to reduce tension and puffiness." },
      { slug: "ingredient-conflict", title: "Ingredient Conflict", summary: "Flags incompatible actives (e.g., AHA + retinoids)." },
      { slug: "hair-growth-predictor", title: "Hair Growth Predictor", summary: "Habits and signals linked to growth cycles." },
      { slug: "anti-aging-skincare-advisor", title: "Anti-Aging Skincare Advisor", summary: "Prioritizes actives with evidence for your skin goals." },
      { slug: "sunscreen-recommendation-engine", title: "Sunscreen Recommendation Engine", summary: "SPF/PA suggestions by skin type and exposure." }
    ]
  },
  {
    slug: "nutrition-and-diet",
    title: "Nutrition & Diet",
    summary: "Smart food choices, hydration, macros, and metabolism aids.",
    services: [
      { slug: "smart-food-swaps", title: "Smart Food Swaps", summary: "Healthier alternatives matched to your preferences." },
      { slug: "rpm", title: "Remote Patient Monitoring (RPM)", summary: "Optional vitals/nutrition check-ins to stay on track." },
      { slug: "hydration-formula", title: "Hydration Formula", summary: "Daily fluid targets adjusted by activity and climate." },
      { slug: "nutrition-label-decoder", title: "Nutrition Label Decoder", summary: "Explains labels and hidden sugars/sodium." },
      { slug: "budget-meal-kit-builder", title: "Budget Meal Kit Builder", summary: "Low-cost grocery plans with balanced macros." },
      { slug: "sodium-potassium-meter", title: "Sodium–Potassium Meter", summary: "Balance guidance for blood pressure support." },
      { slug: "gut-microbiome-analyzer", title: "Gut Microbiome Analyzer", summary: "Interprets stool-test summaries into simple actions." },
      { slug: "personalized-supplement-guide", title: "Personalized Supplement Guide", summary: "Evidence-weighted supplement suggestions." },
      { slug: "metabolic-rate-calculator", title: "Metabolic Rate Calculator", summary: "Estimates TDEE/BMR to set calorie targets." },
      { slug: "food-sensitivity-tracker", title: "Food Sensitivity Tracker", summary: "Log reactions to spot trigger foods." },
      { slug: "electrolyte-balance-advisor", title: "Electrolyte Balance Advisor", summary: "Adjust sodium/potassium/magnesium around training." },
      { slug: "food-sustainability-score", title: "Food Sustainability Score", summary: "Impact scores for greener meal planning." },
      { slug: "meal-prep-planner", title: "Meal Prep Planner", summary: "Batch-cook templates and shopping lists." },
      { slug: "recipe-nutrient-analyzer", title: "Recipe Nutrient Analyzer", summary: "Macros/micros for your own recipes." },
      { slug: "hydration-goal-setter", title: "Hydration Goal Setter", summary: "Reminders and streaks to hit hydration goals." }
    ]
  },
  {
    slug: "sleep-and-recovery",
    title: "Sleep & Recovery",
    summary: "Light, sleep hygiene, apnea flags, and calm-down tools.",
    services: [
      { slug: "blue-light-planner", title: "Blue Light Planner", summary: "Evening screen/light advice to protect circadian rhythm." },
      { slug: "sleep-hygiene-coach", title: "Sleep Hygiene Coach", summary: "Bedtime routine builder and consistency tracker." },
      { slug: "circadian-light-guide", title: "Circadian Light Guide", summary: "Get light at the right time for better sleep." },
      { slug: "sleep-apnea-screener", title: "Sleep Apnea Screener", summary: "Education and risk prompts to discuss with a clinician." },
      { slug: "micro-meditation-generator", title: "Micro-Meditation Generator", summary: "1–3 minute calming scripts for quick resets." },
      { slug: "sleep-environment-optimizer", title: "Sleep Environment Optimizer", summary: "Noise/temp/air cues to improve sleep quality." },
      { slug: "guided-sleep-meditation", title: "Guided Sleep Meditation", summary: "Audio scripts that ease sleep onset." },
      { slug: "dream-pattern-analysis", title: "Dream Pattern Analysis", summary: "Tags and trends to explore dream/sleep links." }
    ]
  },
  {
    slug: "environmental-health",
    title: "Environmental Health",
    summary: "Air, water, allergens, noise, and daily exposure guidance.",
    services: [
      { slug: "eco-routine-assessment", title: "Eco-Routine Assessment", summary: "Small habit shifts for a lower-toxin routine." },
      { slug: "environmental-exposure", title: "Environmental Exposure", summary: "Track potential exposures (solvents, smoke, VOCs)." },
      { slug: "pollen-defense", title: "Pollen Defense", summary: "Allergy forecasts with prep actions." },
      { slug: "indoor-noise-map", title: "Indoor Noise Map", summary: "Log workspace/bedroom noise hotspots." },
      { slug: "commute-calorie-optimizer", title: "Commute Calorie Optimizer", summary: "Active-commute options and estimates." },
      { slug: "home-air-quality-advisor", title: "Home Air Quality Advisor", summary: "Filter change cadence and IAQ tips." },
      { slug: "water-quality-monitor", title: "Water Quality Monitor", summary: "Local water reports and filter guidance." },
      { slug: "mold-exposure-risk", title: "Mold Exposure Risk Assessment", summary: "Moisture cues and symptom correlations." }
    ]
  },
  {
    slug: "family-health",
    title: "Family Health",
    summary: "Shared tools for households, children, vaccinations, and safety.",
    services: [
      { slug: "family-medication-hub", title: "Family Medication Hub", summary: "Shared med lists, schedules, and refill reminders." },
      { slug: "child-growth-tracker", title: "Child Growth Tracker", summary: "Percentiles and trend alerts for pediatrics." },
      { slug: "genetic-compatibility-screening", title: "Genetic Compatibility Screening", summary: "Education on carrier risks for family planning." },
      { slug: "family-wellness-challenge", title: "Family Wellness Challenge", summary: "Weekly goals and rewards for healthy habits." },
      { slug: "child-immunization-scheduler", title: "Child Immunization Scheduler", summary: "Age-based vaccine timelines and reminders." },
      { slug: "family-first-aid-guide", title: "Family First-Aid Guide", summary: "At-home first-aid reference with checklists." },
      { slug: "sibling-health-comparison", title: "Sibling Health Comparison", summary: "Compare growth and lifestyle (privacy-safe)." }
    ]
  },
  {
    slug: "preventive-medicine-and-longevity",
    title: "Preventive Medicine & Longevity",
    summary: "Screening, cardio-neuro risks, inflammation, immune fitness.",
    services: [
      { slug: "personalized-cancer-screening", title: "Personalized Cancer Screening", summary: "Age/family history guidance for screening conversations." },
      { slug: "cvd-prevention-plan", title: "Cardiovascular Disease Prevention Plan", summary: "BP/lipids/lifestyle plan to reduce risk." },
      { slug: "neurodegenerative-risk", title: "Neurodegenerative Risk Assessment", summary: "Memory/movement prompts to discuss risks." },
      { slug: "inflammation-management", title: "Inflammation Management Program", summary: "CRP trends and habit levers for lower inflammation." },
      { slug: "immune-system-optimization", title: "Immune System Optimization", summary: "Sleep, nutrition, and vaccine hygiene pointers." },
      { slug: "health-wellness-risk-calculator", title: "Health & Wellness Risk Calculator", summary: "Simple composite risk snapshot." },
      { slug: "diabetes-prevention-program", title: "Diabetes Prevention Program", summary: "Weight, diet, and activity roadmap for prediabetes." },
      { slug: "metabolic-syndrome-monitor", title: "Metabolic Syndrome Monitor", summary: "Track waist, BP, HDL, TG, glucose metrics." }
    ]
  },
  {
    slug: "biohacking-and-performance",
    title: "Biohacking & Performance",
    summary: "Cold, light, breath, nootropics—organized, evidence-aware tools.",
    services: [
      { slug: "nootropic-recommendation-engine", title: "Nootropic Recommendation Engine", summary: "Education and stacking safety basics." },
      { slug: "cryotherapy-protocol-generator", title: "Cryotherapy Protocol Generator", summary: "Cold exposure timing and frequency planner." },
      { slug: "red-light-therapy-guide", title: "Red Light Therapy Guide", summary: "Intro to wavelengths, durations, and cautions." },
      { slug: "cold-exposure-training-plan", title: "Cold Exposure Training Plan", summary: "Progressive cold-adaptation routines." },
      { slug: "intermittent-fasting-schedule", title: "Intermittent Fasting Schedule", summary: "Choose an IF window and stick with reminders." },
      { slug: "biofeedback-training-modules", title: "Biofeedback Training Modules", summary: "HRV/breath tools for self-regulation." },
      { slug: "neurofeedback-session-planner", title: "Neurofeedback Session Planner", summary: "Session logging and progress notes." },
      { slug: "wearable-data-integrator", title: "Wearable Data Integrator", summary: "Pull sleep/HR/HRV steps into one view." },
      { slug: "personalized-recovery-modalities", title: "Personalized Recovery Modalities", summary: "Rotations of sauna, cold, massage, stretch." },
      { slug: "nootropic-stack-builder", title: "Nootropic Stack Builder", summary: "Build a cautious protocol (education only)." },
      { slug: "cold-exposure-protocol", title: "Cold Exposure Protocol", summary: "Template and safety checklist for cold work." },
      { slug: "breathwork-optimizer", title: "Breathwork Optimizer", summary: "Patterns for focus, calm, or sleep." },
      { slug: "cognitive-enhancement-plan", title: "Cognitive Enhancement Plan", summary: "Habits for attention, memory, and speed." },
      { slug: "intermittent-fasting-calculator", title: "Intermittent Fasting Calculator", summary: "Eating window math and schedule." },
      { slug: "dopamine-reset-protocol", title: "Dopamine Reset Protocol", summary: "Digital hygiene and reward recalibration plan." },
      { slug: "sensory-deprivation-guide", title: "Sensory Deprivation Guide", summary: "Intro to float/quiet practices (safety first)." },
      { slug: "biofeedback-focus-training", title: "Biofeedback Training for Focus", summary: "Guided focus drills with HRV/respiration." }
    ]
  },
  {
    slug: "senior-care",
    title: "Senior Care",
    summary: "Support for aging at home: safety, meds, cognition, and mobility.",
    services: [
      { slug: "senior-dashboard", title: "Senior Dashboard", summary: "Vitals, meds, and daily check-ins in one place." },
      { slug: "caregiver-portal", title: "Caregiver Portal", summary: "Shared access for trusted family/caregivers." },
      { slug: "fall-detection-alert", title: "Fall Detection Alert", summary: "Wearable-based alerts and follow-up checklist." },
      { slug: "medication-adherence-senior", title: "Medication Adherence", summary: "Simple reminders and refill tracking." },
      { slug: "voice-companion", title: "Voice Companion", summary: "Voice prompts for routine and safety." },
      { slug: "frailty-index", title: "Frailty Index", summary: "Simple composite of strength/weight/speed flags." },
      { slug: "medication-reminder-system", title: "Medication Reminder System", summary: "Household-friendly reminder setup." },
      { slug: "fall-prevention-exercises", title: "Fall Prevention Exercises", summary: "Safe balance and strength routines." },
      { slug: "cognitive-health-games", title: "Cognitive Health Games", summary: "Light brain-training activities." }
    ]
  },
  {
    slug: "eye-health-suite",
    title: "Eye-Health Suite",
    summary: "Simple vision tools for screen life and check reminders.",
    services: [
      { slug: "browser-vision-test", title: "Browser Vision Test", summary: "Quick near-vision checks (not a diagnosis)." },
      { slug: "retina-scan-ai", title: "Retina Scan AI", summary: "Education on retinal findings and next steps." },
      { slug: "blue-light-filter", title: "Blue Light Filter", summary: "Screen/ambient light tips to reduce strain." },
      { slug: "eye-exercise-reminders", title: "Eye Exercise Reminders", summary: "20-20-20 and mobility prompts for eyes." }
    ]
  },
  {
    slug: "digital-therapeutics-store",
    title: "Digital Therapeutics Store",
    summary: "Curated catalog of evidence-based digital therapeutics.",
    services: [
      { slug: "insomnia-cbt-i-app", title: "Insomnia CBT-I App", summary: "CBT-I companion for insomnia care." },
      { slug: "adhd-neuro-game", title: "ADHD Neuro-Game", summary: "Attention training with engaging tasks." },
      { slug: "anxiety-management-app", title: "Anxiety Management App", summary: "Guided tools for worry and panic." },
      { slug: "chronic-pain-relief-vr", title: "Chronic Pain Relief VR", summary: "VR modules for pain perception shifts." },
      { slug: "ptsd-recovery-modules", title: "PTSD Recovery Modules", summary: "Structured support between visits." }
    ]
  },
  {
    slug: "general-sexual-longevity",
    title: "General Sexual Longevity",
    summary: "Long-term sexual wellbeing, hormones, fitness, and connection.",
    services: [
      { slug: "libido-hormonal-optimization", title: "Libido Hormonal Optimization", summary: "Track and support hormone-linked libido." },
      { slug: "sexual-health-biomarkers", title: "Sexual Health Biomarkers", summary: "Key labs and lifestyle correlates." },
      { slug: "aphrodisiac-nutrigenomics", title: "Aphrodisiac Nutrigenomics", summary: "Food/supplement education and cautions." },
      { slug: "microbiome-and-sexuality", title: "Microbiome and Sexuality", summary: "Gut/vaginal microbiome and desire links." },
      { slug: "neuroplasticity-and-libido", title: "Neuroplasticity and Libido", summary: "Habits for novelty and engagement." },
      { slug: "stress-and-cortisol-management", title: "Stress & Cortisol Management", summary: "Lower stress to restore desire." },
      { slug: "circadian-rhythms-and-sexuality", title: "Circadian Rhythms and Sexuality", summary: "Sleep/light alignment for libido." },
      { slug: "physical-fitness-for-sexuality", title: "Physical Fitness for Sexuality", summary: "Strength, mobility, and pelvic health." },
      { slug: "peptide-therapy-for-libido", title: "Peptide Therapy for Libido", summary: "Education-only overview; physician decides." },
      { slug: "xenoestrogen-detoxification", title: "Xenoestrogen Detoxification", summary: "Reduce environmental hormone mimics." },
      { slug: "psychosexual-optimization", title: "Psychosexual Optimization", summary: "Mindset and connection practices." },
      { slug: "partner-synchronization", title: "Partner Synchronization", summary: "Schedules, routines, and timing alignment." },
      { slug: "fertility-health-assessment", title: "Fertility Health Assessment", summary: "Preconception labs and lifestyle." },
      { slug: "hormone-balance-for-libido", title: "Hormone Balance for Libido", summary: "Cycle-aware or age-aware hormone cues." },
      { slug: "sexual-wellness-education", title: "Sexual Wellness Education", summary: "Library of trustworthy resources." },
      { slug: "relationship-communication-coach", title: "Relationship Communication Coach", summary: "Prompts to improve intimacy talk." }
    ]
  },
  {
    slug: "mens-sexual-health",
    title: "Men’s Sexual Health",
    summary: "Potency foundations, TRT education, ED support, and fertility.",
    services: [
      { slug: "vascular-health-for-potency", title: "Vascular Health for Potency", summary: "BP/lipids/fitness for erectile quality." },
      { slug: "male-vitality-and-trt", title: "Male Vitality and TRT", summary: "Education on risks/benefits with MD guidance." },
      { slug: "ed-guide", title: "Erectile Dysfunction (ED) Guide", summary: "Evidence-informed steps to discuss with MD." },
      { slug: "sperm-health-optimization", title: "Sperm Health Optimization", summary: "Habits and timing for fertility." }
    ]
  },
  {
    slug: "womens-sexual-health",
    title: "Women’s Sexual Health",
    summary: "Cycle-aware libido, pelvic care, and pain-free intimacy.",
    services: [
      { slug: "female-hormonal-optimization", title: "Female Hormonal Optimization", summary: "Support cycle-phased energy and desire." },
      { slug: "libido-boosting-nutrition", title: "Libido-Boosting Nutrition", summary: "Foods and timing that support libido." },
      { slug: "pelvic-health-program", title: "Pelvic Health Program", summary: "Pelvic-floor strength and mobility." },
      { slug: "menopausal-intimacy-advisor", title: "Menopausal Intimacy Advisor", summary: "Comfort strategies and options to discuss." }
    ]
  },
  {
    slug: "critical-health",
    title: "Critical Health",
    description:
      "Everything related to medical risks, lab results, medications, and time-sensitive information.",
    services: [
      { slug: "risk-insight", title: "Risk Insight", summary: "Estimates personal risk of chronic diseases using questionnaires and available data (e.g., flags above-average hypertension risk with elevated BP and excess weight)." },
      { slug: "lab-results-explainer", title: "Lab Results Explainer", summary: "Translates confusing lab values into plain language (e.g., explains that elevated ALT is associated with liver function)." },
      { slug: "drug-drug-interaction-checker", title: "Drug-Drug Interaction Checker", summary: "Detects unsafe medication combinations and cautions about high-risk overlaps (e.g., certain analgesics with anticoagulants)." },
      { slug: "symptom-analyzer", title: "Symptom Analyzer", summary: "Suggests possible causes based on your symptoms and answers (e.g., cough + fever may indicate a viral infection; prompts medical follow-up)." },
      { slug: "chronic-disease-coach", title: "Chronic Disease Coach", summary: "Daily guidance and nudges for chronic conditions such as diabetes, asthma, and more." },
      { slug: "ai-medication-adherence", title: "AI Medication Adherence", summary: "Smart reminders and simple logging to help you take medications on schedule." },
      { slug: "care-cost-optimizer", title: "Care Cost Optimizer", summary: "Finds ways to reduce spending on medications and services while preserving quality." },
      { slug: "post-surgery-recovery-tracker", title: "Post-Surgery Recovery Tracker", summary: "Structured reminders and self-care tips to support post-operative recovery." },
      { slug: "clinical-trial-finder", title: "Clinical Trial Finder", summary: "Matches you with relevant clinical studies you can volunteer for." },
      { slug: "pre-surgery-readiness", title: "Pre-Surgery Readiness", summary: "Pre-op preparation checklists to help you arrive ready and reduce last-minute issues." },
      { slug: "rare-disease-navigator", title: "Rare Disease Navigator", summary: "Curated reference information, community resources, and support pathways for rare conditions." },
      { slug: "smart-med-refill", title: "Smart Med Refill", summary: "Predictive reminders to reorder medications before you run out." },
      { slug: "ai-pain-map", title: "AI Pain Map", summary: "Log pain locations and intensity over time; visualize trends and triggers." },
      { slug: "vaccination-passport", title: "Vaccination Passport", summary: "Your digital vaccination record with reminders for boosters and schedules." },
      { slug: "post-covid-planner", title: "Post-COVID Planner", summary: "Recovery planner after COVID-19: pacing, symptom tracking, and follow-up reminders." },
      { slug: "genetic-disease-risk-prediction", title: "Genetic Disease Risk Prediction", summary: "Highlights inherited predispositions—e.g., elevated risk of certain cancers—using genetics and family history." },
      { slug: "emergency-medical-profile", title: "Emergency Medical Profile", summary: "Stores critical information for emergencies: blood type, allergies, conditions, and SOS contacts." },
      { slug: "remote-vitals-monitoring", title: "Remote Vitals Monitoring", summary: "Syncs with wearables to track blood pressure, heart rate, and SpO₂; surfaces trends and alerts." }
    ]
  },
  {
    slug: "everyday-wellness",
    title: "Everyday Wellness",
    description: "Lightweight tools for balance, daily habits, and a better mood.",
    services: [
      { slug: "healthy-travel-kit", title: "Healthy Travel Kit", summary: "Simple guidance to stay well on trips: hydration, sleep, movement, and safety tips." },
      { slug: "goal-assistant", title: "Goal Assistant", summary: "Clarify goals, define milestones, and track consistent progress." },
      { slug: "daily-habit-tracker", title: "Daily Habit Tracker", summary: "Build sustainable habits with streaks, reminders, and gentle accountability." },
      { slug: "stress-reduction-guide", title: "Stress Reduction Guide", summary: "Quick, evidence-based strategies to lower daily stress levels." },
      { slug: "energy-level-optimizer", title: "Energy Level Optimizer", summary: "Personalized suggestions to stabilize energy through sleep, nutrition, and activity." },
      { slug: "mind-body-connection-exercises", title: "Mind-Body Connection Exercises", summary: "Short routines to improve interoception and mind-body awareness." },
      { slug: "positive-affirmation-generator", title: "Positive Affirmation Generator", summary: "Supportive statements tailored to your goals and challenges." },
      { slug: "gratitude-journal-prompts", title: "Gratitude Journal Prompts", summary: "Gentle prompts to cultivate gratitude and positive reflection." },
      { slug: "digital-wellbeing-score", title: "Digital Wellbeing Score", summary: "A simple index of screen time, notifications, and digital balance." },
      { slug: "mindful-eating-assistant", title: "Mindful Eating Assistant", summary: "Practical cues for slower, more intentional meals and better satiety." },
      { slug: "work-life-balance-advisor", title: "Work-Life Balance Advisor", summary: "Suggestions to set boundaries, protect focus, and preserve downtime." },
      { slug: "immunity-booster-plan", title: "Immunity Booster Plan", summary: "Daily basics that support immune health: sleep, nutrients, and movement." },
      { slug: "mindful-breathing-exercises", title: "Mindful Breathing Exercises", summary: "Brief breathing practices to downshift stress and improve focus." },
      { slug: "ergonomic-workspace-setup", title: "Ergonomic Workspace Setup", summary: "Quick posture and desk tweaks to reduce strain and fatigue." },
      { slug: "social-connection-tracker", title: "Social Connection Tracker", summary: "A light tracker for meaningful check-ins and maintaining relationships." }
    ]
  },
  {
    slug: "longevity-and-anti-aging",
    title: "Longevity & Anti-Aging",
    description: "For people who want a deeper view into aging drivers and actionable longevity levers.",
    services: [
      { slug: "biological-age-factors", title: "Biological Age Factors", summary: "Maps lifestyle and biomarker contributors to biological age deltas." },
      { slug: "polygenic-risk-viewer", title: "Polygenic Risk Viewer", summary: "Visualizes polygenic scores and contextual risk percentiles." },
      { slug: "epigenetic-age-dashboard", title: "Epigenetic Age Dashboard", summary: "Tracks methylation-based age metrics and modifiable inputs." },
      { slug: "pharmacogenomics-matcher", title: "Pharmacogenomics Matcher", summary: "Matches medications to genotype-informed response and safety signals." },
      { slug: "genetic-trait-explainer", title: "Genetic Trait Explainer", summary: "Explains common genetic traits and what they may (and may not) imply." },
      { slug: "telomere-length-analysis", title: "Telomere Length Analysis", summary: "Interprets telomere markers with caveats and longitudinal context." },
      { slug: "nad-optimization-guide", title: "NAD+ Optimization Guide", summary: "Evidence-aware guidance around NAD+ pathways, diet, and supplementation." },
      { slug: "senolytics-recommendation", title: "Senolytics Recommendation", summary: "Overviews senolytic concepts and current human-grade evidence." },
      { slug: "mitochondrial-health-assessment", title: "Mitochondrial Health Assessment", summary: "Reviews energy, fatigue, and labs for mitochondrial support levers." },
      { slug: "longevity-diet-planner", title: "Longevity Diet Planner", summary: "Plans that emphasize nutrient density, glycemic control, and satiety." },
      { slug: "glycemic-control-advisor", title: "Glycemic Control Advisor", summary: "Suggestions to smooth glucose variability via timing, fiber, and activity." },
      { slug: "cellular-senescence-score", title: "Cellular Senescence Score", summary: "An exploratory composite score derived from proxy markers and lifestyle factors." },
      { slug: "microbiome-diversity-analysis", title: "Microbiome Diversity Analysis", summary: "Summarizes diversity indices with food-pattern ideas for support." },
      { slug: "longevity-gene-expression-report", title: "Longevity Gene Expression Report", summary: "Explains key pathways and what expression shifts might suggest." },
      { slug: "organ-age-assessment", title: "Organ Age Assessment", summary: "Frames organ-specific aging signals (heart, liver, brain) from available markers." }
    ]
  },
  {
    slug: "mental-wellness",
    title: "Mental Wellness",
    description: "Improve sleep, mood, and stress resilience with practical tools.",
    services: [
      { slug: "mindfulness-guide", title: "Mindfulness Guide", summary: "Short, repeatable practices to cultivate presence and calm." },
      { slug: "motivation-booster", title: "Motivation Booster", summary: "Behavioral tips and prompts to unlock momentum on low-energy days." },
      { slug: "digital-detox-planner", title: "Digital Detox Planner", summary: "Structure a healthy reset for notifications, feeds, and screen time." },
      { slug: "digital-gratitude-wall", title: "Digital Gratitude Wall", summary: "Collect small daily wins and moments of gratitude in one place." },
      { slug: "social-battery-prediction", title: "Social Battery Prediction", summary: "Forecasts social energy and suggests recharge windows." },
      { slug: "social-isolation-coach", title: "Social Isolation Coach", summary: "Gentle steps to rebuild connection and support networks." },
      { slug: "cognitive-performance-enhancer", title: "Cognitive Performance Enhancer", summary: "Focus, task-switching, and working-memory drills you can actually keep up with." },
      { slug: "emotional-regulation-tools", title: "Emotional Regulation Tools", summary: "Skills for naming, reframing, and responding to emotions under stress." },
      { slug: "cbt-modules", title: "CBT Modules", summary: "Structured cognitive-behavioral exercises: thought records, exposures, and more." },
      { slug: "stress-hormone-tracker", title: "Stress Hormone Tracker", summary: "Contextualizes cortisol-related patterns alongside sleep and lifestyle." },
      { slug: "sleep-mood-connection-analysis", title: "Sleep–Mood Connection Analysis", summary: "Maps how sleep duration/quality tracks with mood variability." }
    ]
  },
  {
    slug: "fitness-and-performance",
    title: "Fitness & Performance",
    description: "Programs and helpers for active people and athletes at any level.",
    services: [
      { slug: "personalized-meal-plan", title: "Personalized Meal Plan", summary: "Macro-aware plans aligned with training load, preferences, and goals." },
      { slug: "vo2-max-assessment", title: "VO₂-Max Assessment", summary: "Field-test protocols and guidance to improve aerobic capacity." },
      { slug: "workout-generator", title: "Workout Generator", summary: "Auto-builds sessions based on equipment, time, and target adaptations." },
      { slug: "strength-plateau-breaker", title: "Strength Plateau Breaker", summary: "Periodization tweaks and accessory lifts to move past stalls." },
      { slug: "soft-tissue-release-map", title: "Soft Tissue Release Map", summary: "Region-by-region self-release ideas for common restrictions." },
      { slug: "body-fat-trend-projection", title: "Body Fat Trend Projection", summary: "Forecasts body-comp trends from logs and measurement cadence." },
      { slug: "sport-specific-warm-up", title: "Sport-Specific Warm-up", summary: "Targeted warm-ups for running, lifting, cycling, and more." },
      { slug: "cycling-power-prediction", title: "Cycling Power Prediction", summary: "Estimates FTP and target power zones from recent rides." },
      { slug: "two-minute-hrv-breathwork", title: "2-Minute HRV Breathwork", summary: "A quick protocol to nudge HRV upward before/after sessions." },
      { slug: "active-recovery-timer", title: "Active Recovery Timer", summary: "Simple timers and sequences for between-sets or off-day recovery." },
      { slug: "desk-stretch-breaks", title: "Desk Stretch Breaks", summary: "Short movement breaks to offset sedentary time and stiffness." },
      { slug: "soft-tissue-map", title: "Soft Tissue Map", summary: "A visual atlas to track mobility hotspots and progress." },
      { slug: "endurance-training-plan", title: "Endurance Training Plan", summary: "Progressive blocks for 5K, 10K, half, or cycling endurance goals." },
      { slug: "flexibility-mobility-guide", title: "Flexibility & Mobility Guide", summary: "Efficient routines to expand ROM and maintain joint health." },
      { slug: "post-workout-nutrition-guide", title: "Post-Workout Nutrition Guide", summary: "Refuel timing, protein targets, and carb strategies by session type." },
      { slug: "injury-prevention-plan", title: "Injury Prevention Plan", summary: "Prehab templates to shore up weak links and reduce overuse risk." },
      { slug: "strength-and-conditioning-coach", title: "Strength & Conditioning Coach", summary: "Multi-phase templates for strength, power, and speed development." },
      { slug: "powerlifting-program-generator", title: "Powerlifting Program Generator", summary: "Customizable cycles for squat, bench, and deadlift with load progressions." },
      { slug: "running-gait-analysis", title: "Running Gait Analysis", summary: "Technique cues and drills based on cadence, contact, and symmetry." }
    ]
  }

];

];

export type SvcLite = {
  slug: string;
  title?: string;
  summary?: string;
  categorySlug?: string;
  categoryTitle?: string;
};

export function getServiceBySlug(slug: string): SvcLite | null {
  for (const c of CATEGORIES) {
    const hit = c.services.find((s) => s.slug === slug);
    if (hit) return { ...hit, categorySlug: c.slug, categoryTitle: c.title };
  }
  return null;
}

export type { Service as CatalogService, Category as CatalogCategory };

/** Returns a category by slug or null if not found. */
export function getCategory(slug: string) {
  return CATEGORIES.find(c => c.slug === slug) ?? null;
}
