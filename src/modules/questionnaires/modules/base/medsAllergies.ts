
import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseMedsAllergiesModule(): ModuleConfig {
  return { key:"base_meds_allergies", title:"Medications & allergies", description:"Current meds/supplements and known allergies.", questions:[
    { id:"meds.current", type:"textarea", label:"Current medications", placeholder:"Name, dose, frequency — one per line" },
    { id:"meds.supplements", type:"textarea", label:"Supplements", placeholder:"e.g. vitamin D3 2000 IU daily" },
    { id:"allergies.list", type:"textarea", label:"Allergies & reactions", placeholder:"e.g. penicillin — hives; latex — rash" }
  ]};
}
