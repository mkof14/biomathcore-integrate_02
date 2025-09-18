"use client";
import type { Dispatch, SetStateAction } from "react";
import type { UnitsMode } from "@/modules/questionnaires/units";

export default function UnitsToolbar(
  { units, setUnits }:{
    units: UnitsMode;
    setUnits: Dispatch<SetStateAction<UnitsMode>>;
  }
){
  return (
    <div className="mb-4">
      <div className="metric-toolbar"
        style={{display:"flex",gap:12,alignItems:"center",padding:"8px 12px",
                border:"1px solid rgba(0,0,0,.12)",borderRadius:10,background:"rgba(255,255,255,.65)"}}>
        <strong>Units:</strong>
        <label style={{display:"inline-flex",gap:6,alignItems:"center"}}>
          <input type="radio" name="units" checked={units==="metric"} onChange={()=>setUnits("metric")} />
          <span>Metric <span style={{opacity:.7}}>(cm, kg)</span></span>
        </label>
        <label style={{display:"inline-flex",gap:6,alignItems:"center"}}>
          <input type="radio" name="units" checked={units==="imperial"} onChange={()=>setUnits("imperial")} />
          <span>Imperial <span style={{opacity:.7}}>(ft/in, lb)</span></span>
        </label>
      </div>
    </div>
  );
}
