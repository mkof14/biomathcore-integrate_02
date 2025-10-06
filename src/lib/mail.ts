import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export function getTransport() {
  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  if (!host || !user || !pass) {
    throw new Error("SMTP credentials are not set");
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 -> SSL
    auth: { user, pass },
  });
}

// путь к логотипу в репозитории
function getLogoPath() {
  const p = path.join(process.cwd(), "public", "images", "BMCore-Logo-33.png");
  return fs.existsSync(p) ? p : "";
}

function brandWrap(innerHtml: string, previewText?: string) {
  const appName = "BioMath Core";
  const baseUrl =
    process.env.APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
  // На случай, если CID не сработает в каком-то клиенте — дадим абсолютную ссылку (не все клиенты грузят локалхост)
  const httpLogoUrl = `${baseUrl.replace(/\/$/, "")}/images/BMCore-Logo-33.png`;

  return `
<!doctype html>
<html>
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${appName}</title>
    ${previewText ? `<style> .preview-text { display:none; font-size:1px; color:#fff; max-height:0; max-width:0; opacity:0; overflow:hidden; } </style>` : ""}
  </head>
  <body style="margin:0;padding:0;background:#0b1220;">
    ${previewText ? `<div class="preview-text">${previewText}</div>` : ""}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b1220;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0f172a;border-radius:16px;box-shadow:0 6px 24px rgba(0,0,0,.35);overflow:hidden;">
            <tr>
              <td align="center" style="background:#0b1220;padding:28px 24px;">
                <!-- Пытаемся вывести CID-логотип -->
                <img src="cid:bmcore-logo" alt="${appName}" width="180" height="64" style="display:block; margin:0 auto;"/>
                <!-- Фолбэк на http-url (если CID заблокирован) -->
                <div style="font-size:0;line-height:0;height:0;overflow:hidden;">
                  <img src="${httpLogoUrl}" alt="" width="1" height="1" style="display:none;" />
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 8px 24px;">
                ${innerHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:24px;color:#93adc8;font-size:12px;border-top:1px solid rgba(255,255,255,.06);">
                <div style="text-align:center;opacity:.8;">
                  © ${new Date().getFullYear()} ${appName}. All rights reserved.
                </div>
              </td>
            </tr>
          </table>
          <div style="color:#64748b;font-size:11px;margin-top:16px;max-width:560px;">
            You received this email because a request was made from the ${appName} app on this device.
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function btn(href: string, text: string) {
  const safeHref = href.replace(/"/g, "&quot;");
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0;">
    <tr>
      <td>
        <a href="${safeHref}"
           style="display:inline-block;background:#0ea5e9;color:#fff;text-decoration:none;
                  padding:12px 16px;border-radius:10px;font-weight:600;">
          ${text}
        </a>
      </td>
    </tr>
  </table>`;
}

function sectionTitle(text: string) {
  return `<h2 style="color:#e2e8f0;margin:0 0 8px 0;font-size:18px;font-weight:700;">${text}</h2>`;
}

function paragraph(text: string, muted = false) {
  return `<p style="margin:8px 0;color:${muted ? "#93adc8" : "#cfd8e3"};font-size:14px;line-height:1.6">${text}</p>`;
}

function renderResetPasswordHTML(link: string) {
  const body = `
    ${sectionTitle("Reset your password")}
    ${paragraph("We received a request to reset your password for your BioMath Core account.")}
    ${btn(link, "Reset password")}
    ${paragraph("If you didn’t request this, you can safely ignore this email.", true)}
    ${paragraph(`Link (for reference): <span style="word-break:break-all;color:#9bd2ff">${link}</span>`, true)}
  `;
  return brandWrap(body, "Reset your BioMath Core password");
}

export async function sendPasswordReset(toEmail: string, link: string) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const transport = getTransport();
  const logoPath = getLogoPath();

  const attachments = logoPath
    ? [{ filename: "BMCore-Logo-33.png", path: logoPath, cid: "bmcore-logo" }]
    : [];

  const html = renderResetPasswordHTML(link);

  await transport.sendMail({
    from,
    to: toEmail,
    subject: "Reset your BioMath Core password",
    html,
    attachments,
  });
}

// Универсальная отправка (на будущее/тесты)
export async function sendGeneric(
  toEmail: string,
  subject: string,
  htmlInner: string,
) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const transport = getTransport();
  const logoPath = getLogoPath();
  const attachments = logoPath
    ? [{ filename: "BMCore-Logo-33.png", path: logoPath, cid: "bmcore-logo" }]
    : [];

  const html = brandWrap(htmlInner);

  await transport.sendMail({
    from,
    to: toEmail,
    subject,
    html,
    attachments,
  });
}
