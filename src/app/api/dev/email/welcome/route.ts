import { NextResponse } from "next/server";

export async function GET() {
  const ORIGIN = new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ).origin;
  const LOGO = `${ORIGIN}/images/BMCore-Logo-33.png`;
  const SITE = "https://biomathcore.com";
  const YEAR = new Date().getFullYear();
  const BTN = `${SITE}/member`;

  const html = `<!doctype html><html><head><meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Welcome — BioMath Core</title>
  <style>
    body{margin:0;background:#f5f9ff;font-family:Arial,Helvetica,sans-serif;color:#0f172a;}
    .wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;
          box-shadow:0 6px 24px rgba(0,0,0,.08);}
    .header{text-align:center;padding:28px 0;background:linear-gradient(90deg,#0ea5e9,#10b981);}
    .brand{text-decoration:none;display:inline-flex;align-items:center;gap:10px;}
    .brand img{max-height:80px;display:block;background:none;}
    .bm{font-size:30px;font-weight:700;color:#1d4ed8;text-shadow:0 1px 2px rgba(0,0,0,.2);}
    .core{font-size:30px;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.3);}
    .body{padding:32px 24px;text-align:center;}
    .body p{font-size:16px;line-height:22px;margin:0 0 22px;}
    .btn{display:inline-block;background:linear-gradient(90deg,#38bdf8,#34d399);color:#fff;
         padding:14px 36px;border-radius:8px;font-weight:600;text-decoration:none;font-size:16px;}
    .footer{font-size:13px;color:#64748b;text-align:center;padding:18px 0;}
    .footer a{color:#38bdf8;text-decoration:none;}
  </style></head><body>
  <div class="wrap">
    <div class="header">
      <a class="brand" href="${SITE}" target="_blank" rel="noopener">
        <img src="${LOGO}" alt="BioMath Core" onerror="this.style.display='none'">
        <span class="bm">BioMath</span><span class="core">Core</span>
      </a>
    </div>
    <div class="body">
      <h2>Welcome to BioMath Core</h2>
      <p>Thank you for joining BioMath Core. Click below to open your Member Zone and start using our services.</p>
      <a class="btn" href="${BTN}" target="_blank" rel="noopener">Go to Member Zone</a>
    </div>
    <div class="footer">© ${YEAR} BioMath Core • <a href="${SITE}" target="_blank">biomathcore.com</a></div>
  </div>
  </body></html>`;

  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
