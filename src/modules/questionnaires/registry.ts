import type { ModuleConfig, Plan } from "@/modules/questionnaires/types";

// Base modules
import { baseDemographicsModule } from "@/modules/questionnaires/modules/base/demographics";
import { baseMedicalHistoryModule } from "@/modules/questionnaires/modules/base/medicalHistory";
import { baseMedsAllergiesModule } from "@/modules/questionnaires/modules/base/medsAllergies";
import { baseFamilyHistoryModule } from "@/modules/questionnaires/modules/base/familyHistory";
import { baseImmunizationsModule } from "@/modules/questionnaires/modules/base/immunizations";
import { baseVitalsLifestyleModule } from "@/modules/questionnaires/modules/base/vitalsLifestyle";
import { baseSymptomsModule } from "@/modules/questionnaires/modules/base/symptoms";
import { baseCareTeamModule } from "@/modules/questionnaires/modules/base/careTeam";
import { baseConsentsModule } from "@/modules/questionnaires/modules/base/consents";

// Plan-specific (мы включим всё сразу)
import { patientModule } from "@/modules/questionnaires/modules/patient";
import { lifestyleModule } from "@/modules/questionnaires/modules/lifestyle";
import { cardiometabolicModule } from "@/modules/questionnaires/modules/cardiometabolic";
import { mentalHealthModule } from "@/modules/questionnaires/modules/mentalHealth";
import { labsModule } from "@/modules/questionnaires/modules/labs";
import { sexualHealthAdvancedModule } from "@/modules/questionnaires/modules/sexualHealthAdvanced";

function baseStack(): ModuleConfig[] {
  return [
    baseDemographicsModule(),
    baseMedicalHistoryModule(),
    baseMedsAllergiesModule(),
    baseFamilyHistoryModule(),
    baseImmunizationsModule(),
    baseVitalsLifestyleModule(),
    baseSymptomsModule(),
    baseCareTeamModule(),
    baseConsentsModule(),
  ];
}

export function modulesForPlan(_plan: Plan): ModuleConfig[] {
  const base = baseStack();
  return [
    ...base,
    patientModule(),
    lifestyleModule(),
    cardiometabolicModule(),
    mentalHealthModule(),
    labsModule(),
    sexualHealthAdvancedModule(),
  ];
}
