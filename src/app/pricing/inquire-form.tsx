"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDatePicker,
  FieldInput,
  FieldSelect,
  FieldTextarea,
} from "@/components/ui/field";
import { packages } from "@/data/packages";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const STATUS_MESSAGES = {
  idle: "",
  submitting: "",
  success:
    "Thank you — your enquiry is on its way. I’ll be in touch soon, usually within a couple of days.",
  error: `Something went wrong sending your enquiry. Please email ${siteConfig.contact.email} instead.`,
} as const;

const EMPTY_FORM = {
  name: "",
  email: "",
  weddingDate: "",
  venue: "",
  packageId: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

/** The drafted tiers, plus room for a couple who hasn't picked one. */
const packageOptions = [
  ...packages.map((pkg) => ({ value: pkg.id, label: pkg.name })),
  { value: "unsure", label: "Not sure yet" },
];

export default function InquireForm() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const statusMessage = STATUS_MESSAGES[status];

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  /** The select and the date picker report a value, not a change event. */
  const setField = (name: keyof typeof EMPTY_FORM) => (value: string) =>
    setFormData((previous) => ({ ...previous, [name]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    // Bots fill every field they find; a submission with this one populated
    // is dropped without troubling the mail API.
    const honeypot = new FormData(event.currentTarget).get("company");
    if (honeypot) {
      setStatus("success");
      setFormData(EMPTY_FORM);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // Send the label rather than the id — the notification email is read
          // by a person, not parsed.
          packageName:
            packageOptions.find((option) => option.value === formData.packageId)
              ?.label ?? "",
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setFormData(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-[6px] border border-rule bg-shell p-6 sm:p-8 lg:p-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="name" label="Name *">
            <FieldInput
              type="text"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Field>
          <Field name="email" label="Email *">
            <FieldInput
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="weddingDate" label="Wedding date">
            <FieldDatePicker
              value={formData.weddingDate}
              onValueChange={setField("weddingDate")}
              placeholder="Select a date"
            />
          </Field>
          <Field name="venue" label="Venue / location">
            <FieldInput
              type="text"
              value={formData.venue}
              onChange={handleInputChange}
            />
          </Field>
        </div>

        <Field name="packageId" label="Package you have in mind">
          <FieldSelect
            options={packageOptions}
            placeholder="Not sure yet"
            value={formData.packageId}
            onValueChange={setField("packageId")}
          />
        </Field>

        <Field name="message" label="Tell me about your wedding! *">
          <FieldTextarea
            rows={5}
            required
            placeholder="Where you’re getting married, what the day looks like, and what you’d most want to see again…"
            value={formData.message}
            onChange={handleInputChange}
          />
        </Field>

        {/* Honeypot — hidden from people, irresistible to bots. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} />
        </div>

        {/* Button and status share one slot so the empty live region adds no
            spacing while the form sits idle. */}
        <div>
          <Button
            type="submit"
            tone="primary"
            size="block"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Send my enquiry"}
          </Button>

          <p
            role="status"
            aria-live="polite"
            className={cn("type-body text-ink-soft", statusMessage && "mt-4")}
          >
            {statusMessage}
          </p>
        </div>
      </form>
    </div>
  );
}
