import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  contactEmailHtml,
  contactEmailSubject,
  contactEmailText,
} from "@/lib/contact-email";
import { siteConfig } from "@/lib/site-config";

/**
 * Inquiry form endpoint.
 *
 * Sends the enquiry on with Resend. Without RESEND_API_KEY set, the
 * submission is logged and reported as a success so local development and
 * preview deploys work before the mail account is wired up.
 */

interface ContactPayload {
  name?: string;
  email?: string;
  weddingDate?: string;
  venue?: string;
  packageName?: string;
  message?: string;
  /** Honeypot. Anything here means a bot filled the form. */
  company?: string;
}

const MAX_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (payload.company) {
    // Silently accept and discard bot submissions.
    return NextResponse.json({ success: true });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const weddingDate = payload.weddingDate?.trim() ?? "";
  const venue = payload.venue?.trim() ?? "";
  const packageName = payload.packageName?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and a note about your wedding are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (name.length > 200 || email.length > 200 || message.length > MAX_LENGTH) {
    return NextResponse.json({ error: "Submission too long." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.log("💌 Wedding enquiry (RESEND_API_KEY not set):", {
      name,
      email,
      weddingDate,
      venue,
      packageName,
      message,
    });
    return NextResponse.json({ success: true, delivered: false });
  }

  try {
    // Instantiated per request so the module imports cleanly during `next
    // build`, before environment variables are available.
    const resend = new Resend(process.env.RESEND_API_KEY);

    const enquiry = { name, email, message, weddingDate, venue, packageName };

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL ?? siteConfig.contact.email,
      replyTo: email,
      subject: contactEmailSubject(enquiry),
      html: contactEmailHtml(enquiry),
      text: contactEmailText(enquiry),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send enquiry." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, delivered: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
