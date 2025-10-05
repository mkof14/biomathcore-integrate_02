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
export const CATEGORIES: Category[] = [
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
