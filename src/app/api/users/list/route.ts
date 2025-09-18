import { NextResponse } from "next/server";
export const runtime = "nodejs";

function user(i:number){
  const roles = ["User","Analyst","TechOperator","ContentManager","Moderator","SuperAdmin"];
  return {
    id: "U"+(1000+i),
    email: `user${i}@example.com`,
    role: roles[i % roles.length],
    active: Math.random() > 0.15,
    lastSeen: Date.now() - Math.round(Math.random()*7*24*60*60*1000)
  };
}

export async function GET() {
  const users = Array.from({length: 42}).map((_,i)=>user(i+1));
  return NextResponse.json({ users });
}
