import * as React from "react";

/* ─── Reset Password Email ─── */
export function ResetPasswordEmail({ resetUrl }: { resetUrl: string }) {
  return (
    <html>
      <body style={{margin:0,padding:0,fontFamily:"Arial,Helvetica,sans-serif",background:"#f5f9ff"}}>
        <div style={{maxWidth:600,margin:"0 auto",padding:"32px 24px",background:"#fff",
                     borderRadius:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.05)"}}>
          <a href="https://biomathcore.com" style={{display:"inline-block",marginBottom:24}}>
            <img src="https://biomathcore.com/logo512.png"
                 alt="BioMath Core"
                 width="260"
                 style={{display:"block",margin:"0 auto"}}/>
          </a>
          <h1 style={{textAlign:"center",color:"#0f172a",margin:"0 0 16px"}}>Reset your BioMath Core password</h1>
          <p style={{textAlign:"center",color:"#334155",fontSize:"15px",lineHeight:"22px"}}>
            Click the button below to create a new password.
          </p>
          <div style={{textAlign:"center",margin:"32px 0"}}>
            <a href={resetUrl}
               style={{background:"linear-gradient(90deg,#38bdf8,#34d399)",color:"#fff",
                       padding:"14px 36px",borderRadius:"8px",fontWeight:600,
                       textDecoration:"none",fontSize:"16px"}}>
              Reset Password
            </a>
          </div>
          <p style={{fontSize:"12px",color:"#64748b",textAlign:"center",marginTop:32}}>
            © {new Date().getFullYear()} BioMath Core – Charlotte, NC 28202, USA
          </p>
        </div>
      </body>
    </html>
  );
}

/* ─── Welcome Email ─── */
export function WelcomeEmail({ name }: { name?: string }) {
  return (
    <html>
      <body style={{margin:0,padding:0,fontFamily:"Arial,Helvetica,sans-serif",background:"#f5f9ff"}}>
        <div style={{maxWidth:600,margin:"0 auto",padding:"32px 24px",background:"#fff",
                     borderRadius:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.05)"}}>
          <a href="https://biomathcore.com" style={{display:"inline-block",marginBottom:24}}>
            <img src="https://biomathcore.com/logo512.png"
                 alt="BioMath Core"
                 width="260"
                 style={{display:"block",margin:"0 auto"}}/>
          </a>
          <h1 style={{textAlign:"center",color:"#0f172a",margin:"0 0 16px"}}>
            Welcome{ name ? `, ${name}` : "" } to BioMath Core!
          </h1>
          <p style={{textAlign:"center",color:"#334155",fontSize:"15px",lineHeight:"22px"}}>
            We’re excited to have you onboard. Explore your member dashboard to
            start questionnaires, connect your devices, and access AI-powered reports.
          </p>
          <div style={{textAlign:"center",margin:"32px 0"}}>
            <a href="https://biomathcore.com/member"
               style={{background:"linear-gradient(90deg,#38bdf8,#34d399)",color:"#fff",
                       padding:"14px 36px",borderRadius:"8px",fontWeight:600,
                       textDecoration:"none",fontSize:"16px"}}>
              Go to Dashboard
            </a>
          </div>
          <p style={{fontSize:"12px",color:"#64748b",textAlign:"center",marginTop:32}}>
            © {new Date().getFullYear()} BioMath Core – Charlotte, NC 28202, USA
          </p>
        </div>
      </body>
    </html>
  );
}

/* ─── Report Ready Email ─── */
export function ReportReadyEmail({ reportName, reportUrl }: { reportName: string; reportUrl: string }) {
  return (
    <html>
      <body style={{margin:0,padding:0,fontFamily:"Arial,Helvetica,sans-serif",background:"#f5f9ff"}}>
        <div style={{maxWidth:600,margin:"0 auto",padding:"32px 24px",background:"#fff",
                     borderRadius:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.05)"}}>
          <a href="https://biomathcore.com" style={{display:"inline-block",marginBottom:24}}>
            <img src="https://biomathcore.com/logo512.png"
                 alt="BioMath Core"
                 width="260"
                 style={{display:"block",margin:"0 auto"}}/>
          </a>
          <h1 style={{textAlign:"center",color:"#0f172a",margin:"0 0 16px"}}>Your report is ready</h1>
          <p style={{textAlign:"center",color:"#334155",fontSize:"15px",lineHeight:"22px"}}>
            The <strong>{reportName}</strong> report is now available in your account.<br/>
            Click the button below to view it.
          </p>
          <div style={{textAlign:"center",margin:"32px 0"}}>
            <a href={reportUrl}
               style={{background:"linear-gradient(90deg,#38bdf8,#34d399)",color:"#fff",
                       padding:"14px 36px",borderRadius:"8px",fontWeight:600,
                       textDecoration:"none",fontSize:"16px"}}>
              View Report
            </a>
          </div>
          <p style={{fontSize:"12px",color:"#64748b",textAlign:"center",marginTop:32}}>
            © {new Date().getFullYear()} BioMath Core – Charlotte, NC 28202, USA
          </p>
        </div>
      </body>
    </html>
  );
}
