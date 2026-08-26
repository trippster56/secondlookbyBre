import { siteConfig } from "@/lib/site-config";

/**
 * The notification email sent to Bre when a couple fills in the inquiry form.
 *
 * Written as table-based HTML with everything inlined, because Gmail and
 * Outlook strip `<style>` blocks, ignore flexbox and grid, and drop
 * `@font-face` entirely. That last one is why the display face here is
 * Georgia rather than Cormorant Garamond — a web font would silently fall back
 * to whatever the client picked, so we choose the fallback ourselves.
 *
 * Colours are the brand tokens from globals.css, hardcoded because an email
 * has no stylesheet to read `var(--plum)` from.
 */

const SHELL = "#fcfafb";
const LILAC = "#f5edf6";
const RULE = "#eadceb";
const PLUM = "#531f55";
const PLUM_MID = "#8a3c8d";
const ORCHID_DEEP = "#c86acd";
const INK = "#47324a";
const INK_SOFT = "#6b4e6d";
const INK_QUIET = "#9b6c9e";

const SERIF = "Georgia, 'Times New Roman', Times, serif";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

export interface ContactEnquiry {
  name: string;
  email: string;
  message: string;
  weddingDate?: string;
  venue?: string;
  packageName?: string;
}

/** Escape user input before it goes into the email's HTML. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** One label/value pair in the details table. */
function row(label: string, value: string, isLast = false) {
  const border = isLast ? "none" : `1px solid ${RULE}`;
  return `
              <tr>
                <td style="padding: 12px 0; border-bottom: ${border}; font-family: ${SANS}; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${INK_QUIET}; vertical-align: top; width: 140px;">${label}</td>
                <td style="padding: 12px 0; border-bottom: ${border}; font-family: ${SANS}; font-size: 15px; color: ${INK}; vertical-align: top;">${escapeHtml(value)}</td>
              </tr>`;
}

/** Turn a yyyy-mm-dd value from the date picker into readable text. */
function formatWeddingDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function contactEmailSubject(enquiry: ContactEnquiry) {
  const suffix = enquiry.weddingDate
    ? ` — ${formatWeddingDate(enquiry.weddingDate)}`
    : "";
  return `New wedding enquiry from ${enquiry.name}${suffix}`;
}

/**
 * Plain-text alternative. Sent alongside the HTML: spam filters score
 * multipart messages better, and it is what watches and screen readers show.
 */
export function contactEmailText(enquiry: ContactEnquiry) {
  const lines = [
    `NEW WEDDING ENQUIRY — ${siteConfig.name}`,
    "",
    `Name:     ${enquiry.name}`,
    `Email:    ${enquiry.email}`,
  ];

  if (enquiry.weddingDate) {
    lines.push(`Date:     ${formatWeddingDate(enquiry.weddingDate)}`);
  }
  if (enquiry.venue) lines.push(`Venue:    ${enquiry.venue}`);
  if (enquiry.packageName) lines.push(`Package:  ${enquiry.packageName}`);

  lines.push(
    "",
    "ABOUT THE WEDDING",
    enquiry.message,
    "",
    `Reply to ${enquiry.email}.`,
  );

  return lines.join("\n");
}

export function contactEmailHtml(enquiry: ContactEnquiry) {
  const { name, email, message, weddingDate, venue, packageName } = enquiry;

  const optional = [
    weddingDate
      ? { label: "Wedding date", value: formatWeddingDate(weddingDate) }
      : null,
    venue ? { label: "Venue", value: venue } : null,
    packageName ? { label: "Package", value: packageName } : null,
  ].filter((entry) => entry !== null);

  const rows = [
    row("Name", name),
    row("Email", email, optional.length === 0),
    ...optional.map((entry, index) =>
      row(entry.label, entry.value, index === optional.length - 1),
    ),
  ].join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(contactEmailSubject(enquiry))}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: ${LILAC}; -webkit-font-smoothing: antialiased;">
    <!-- Preview text: what inboxes show next to the subject line. -->
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${escapeHtml(
      message.slice(0, 140),
    )}</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${LILAC}; border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 32px 16px;">

          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; border-collapse: collapse;">

            <!-- Masthead -->
            <tr>
              <td align="center" style="padding: 0 0 24px 0;">
                <div style="font-family: ${SERIF}; font-size: 24px; letter-spacing: 0.06em; text-transform: uppercase; color: ${PLUM};">${siteConfig.name}</div>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td style="background-color: ${SHELL}; border-radius: 6px; overflow: hidden;">

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                  <tr>
                    <td style="height: 4px; background-color: ${ORCHID_DEEP}; font-size: 0; line-height: 0;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding: 32px;">

                      <p style="margin: 0 0 6px 0; font-family: ${SANS}; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: ${INK_QUIET};">New enquiry</p>
                      <h1 style="margin: 0 0 28px 0; font-family: ${SERIF}; font-size: 26px; font-weight: normal; line-height: 1.3; color: ${PLUM};">${escapeHtml(
                        name,
                      )} got in touch</h1>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">${rows}
                      </table>

                      <!-- Message -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-top: 28px;">
                        <tr>
                          <td style="background-color: ${LILAC}; border-left: 3px solid ${ORCHID_DEEP}; border-radius: 0 6px 6px 0; padding: 20px 24px;">
                            <p style="margin: 0 0 10px 0; font-family: ${SANS}; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: ${INK_QUIET};">About the wedding</p>
                            <p style="margin: 0; font-family: ${SANS}; font-size: 15px; line-height: 1.65; color: ${INK}; white-space: pre-wrap;">${escapeHtml(
                              message,
                            )}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Reply button -->
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-top: 28px;">
                        <tr>
                          <td align="center" style="background-color: ${PLUM}; border-radius: 999px;">
                            <a href="mailto:${encodeURI(email)}" style="display: inline-block; padding: 14px 32px; font-family: ${SANS}; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #fbf3fc; text-decoration: none;">Reply to ${escapeHtml(
                              name,
                            )}</a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 24px 16px 0 16px;">
                <p style="margin: 0; font-family: ${SANS}; font-size: 12px; line-height: 1.6; color: ${INK_SOFT};">Sent from the inquiry form at <a href="${siteConfig.url}" style="color: ${PLUM_MID}; text-decoration: underline;">${siteConfig.url.replace(/^https?:\/\//, "")}</a>.<br />Replying to this email goes straight to ${escapeHtml(
                  name,
                )}.</p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
</html>`;
}
