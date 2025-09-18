import { NextResponse } from "next/server";
export const runtime = "nodejs";

function rand(n:number){ return Math.round(n + (Math.random()-0.5)*n*0.2); }

export async function GET() {
  const usersTodayIn = rand(120);
  const usersTodayOut = rand(15);
  const usersMonthIn = rand(3200);
  const usersMonthOut = rand(420);
  const usersYearIn = rand(38000);
  const usersYearOut = rand(5100);

  const revDay = +(8000 + Math.random()*4000).toFixed(2);
  const revMonth = Math.round(180000 + Math.random()*60000);
  const revYear = Math.round(2100000 + Math.random()*400000);

  return NextResponse.json({
    users: {
      today: { in: usersTodayIn, out: usersTodayOut },
      month: { in: usersMonthIn, out: usersMonthOut },
      year: { in: usersYearIn, out: usersYearOut }
    },
    revenue: {
      day: revDay,
      month: revMonth,
      year: revYear
    }
  });
}
