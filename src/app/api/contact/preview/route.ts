import { NextResponse } from "next/server";

import {
  contactEmailHtml,
  contactEmailSubject,
  contactEmailText,
  type ContactEnquiry,
} from "@/lib/contact-email";

/**
 * Dev-only preview of the enquiry notification email.
 *
 *   http://localhost:3000/api/contact/preview          the HTML, as Bre sees it
 *   http://localhost:3000/api/contact/preview?text=1   the plain-text alternative
 *   http://localhost:3000/api/contact/preview?bare=1   only the required fields
 *
 * Returns 404 outside `next dev`, so it never exists in production. Not in
 * sitemap.ts for the same reason.
 *
 * This renders the same functions the real send uses, so what you see here is
 * what actually goes out — edit `src/lib/contact-email.ts` and refresh.
 */

const SAMPLE: ContactEnquiry = {
  name: "Anna Whitfield",
  email: "anna@example.com",
  weddingDate: "2027-04-17",
  venue: "The Cotton Room, Florence SC",
  packageName: "The Full Day",
  message:
    "Hi Bre! We're getting married in April and I keep hearing that the day " +
    "goes by in a blur, which is exactly what I'm worried about.\n\n" +
    "About 140 guests, getting ready at the venue from around 11. My sister " +
    "is my maid of honour and I'd love the bridal suite covered — that's the " +
    "part I most want back.",
};

/** Only the required fields, to check the table with every optional row dropped. */
const BARE: ContactEnquiry = {
  name: "Jess Moore",
  email: "jess@example.com",
  message: "Do you have any Saturdays left this October?",
};

export async function GET(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const enquiry = searchParams.has("bare") ? BARE : SAMPLE;

  if (searchParams.has("text")) {
    return new NextResponse(
      `Subject: ${contactEmailSubject(enquiry)}\n\n${contactEmailText(enquiry)}`,
      { headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  return new NextResponse(contactEmailHtml(enquiry), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
