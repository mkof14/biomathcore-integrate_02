"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
const KEY="bmc_questionnaire_started";
export default function StartContinue(){
  const [started,setStarted]=useState(false);
  useEffect(()=>{ try{ setStarted(localStorage.getItem(KEY)==="1"); }catch{} },[]);
  const mark=()=>{ try{ localStorage.setItem(KEY,"1"); }catch{} };
  return started
    ? <Link href="/member/questionnaires" className="inline-flex px-4 py-2 rounded-md" onClick={mark}>Continue →</Link>
    : <Link href="/member/questionnaires?start=1" className="inline-flex px-4 py-2 rounded-md" onClick={mark}>Start →</Link>;
}
