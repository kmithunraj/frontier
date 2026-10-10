"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Loader2, Lock } from "lucide-react";
import { contactEmail } from "@/lib/data";
import {
  eventDays,
  formatDays,
  formatINR,
  getPass,
  passes,
  priceFor,
  type PassId,
} from "@/lib/passes";
import {
  attendeeTypes,
  fieldErrors,
  heardFromOptions,
  interestOptions,
  registrationSchema,
} from "@/lib/registration";
import { cn } from "@/lib/utils";

type FormState = {
  passType: PassId;
  passDays: string[];
  fullName: string;
  email: string;
  phone: string;
  city: string;
  organization: string;
  designation: string;
  attendeeType: string;
  linkedinUrl: string;
  interests: string[];
  heardFrom: string;
  gstin: string;
  consentTerms: boolean;
  consentUpdates: boolean;
  website: string;
};

const initialState: FormState = {
  passType: "summit",
  passDays: [],
  fullName: "",
  email: "",
  phone: "",
  city: "",
  organization: "",
  designation: "",
  attendeeType: "",
  linkedinUrl: "",
  interests: [],
  heardFrom: "",
  gstin: "",
  consentTerms: false,
  consentUpdates: true,
  website: "",
};

const steps = [
  { title: "Choose your pass", fields: ["passType", "passDays"] },
  {
    title: "About you",
    fields: [
      "fullName",
      "email",
      "phone",
      "city",
      "organization",
      "designation",
      "attendeeType",
      "linkedinUrl",
    ],
  },
  {
    title: "Final details",
    fields: ["interests", "heardFrom", "gstin", "consentTerms", "consentUpdates"],
  },
] as const;

type Order = {
  reference: string;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  prefill: { name: string; email: string; contact: string };
};

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = {
  open: () => void;
  on: (event: string, cb: (res: { error?: { description?: string } }) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

function loadRazorpay(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function RegistrationForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "verifying">("idle");
  const [notice, setNotice] = useState<string | null>(null);
  const [done, setDone] = useState<{ reference: string; email: string } | null>(null);
  // Reuse the order if the buyer closes checkout and retries without edits.
  const lastOrder = useRef<{ key: string; order: Order } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const pass = getPass(form.passType);
  const total = priceFor(form.passType, form.passDays);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function toggle(key: "passDays" | "interests", value: string) {
    const list = form[key];
    update(key, list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function validate(upToStep: number): boolean {
    const result = registrationSchema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const all = fieldErrors(result.error);
    const relevant = steps
      .slice(0, upToStep + 1)
      .flatMap((s) => s.fields as readonly string[]);
    const scoped = Object.fromEntries(
      Object.entries(all).filter(([k]) => relevant.includes(k))
    );
    setErrors(scoped);
    if (Object.keys(scoped).length === 0) return true;

    // Jump back to the earliest step with an error.
    const firstBad = steps.findIndex((s) =>
      (s.fields as readonly string[]).some((f) => scoped[f])
    );
    if (firstBad !== -1 && firstBad < step) setStep(firstBad);
    return false;
  }

  function goTo(next: number) {
    setNotice(null);
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function next() {
    if (validate(step)) goTo(step + 1);
  }

  async function createOrder(): Promise<Order | null> {
    const key = JSON.stringify(form);
    if (lastOrder.current?.key === key) return lastOrder.current.order;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (data.fields) {
        setErrors(data.fields);
        const firstBad = steps.findIndex((s) =>
          (s.fields as readonly string[]).some((f) => data.fields[f])
        );
        if (firstBad !== -1) setStep(firstBad);
      }
      setNotice(data.error ?? "Something went wrong. Please try again.");
      return null;
    }
    lastOrder.current = { key, order: data };
    return data;
  }

  async function verify(response: RazorpayResponse) {
    setStatus("verifying");
    try {
      const res = await fetch("/api/register/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setNotice(data.error ?? "We couldn't confirm your payment yet.");
        setStatus("idle");
        return;
      }
      setDone({ reference: data.reference, email: data.email });
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setNotice(
        `We received your payment but couldn't confirm it. Please write to ${contactEmail} if you don't get an email shortly.`
      );
      setStatus("idle");
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (step < steps.length - 1) return next();
    if (!validate(steps.length - 1)) return;

    setStatus("submitting");
    setNotice(null);
    try {
      const [loaded, order] = await Promise.all([loadRazorpay(), createOrder()]);
      if (!order) return setStatus("idle");
      if (!loaded || !window.Razorpay) {
        setNotice("Couldn't load the payment window. Check your connection and try again.");
        return setStatus("idle");
      }

      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "Headstart",
        description: `Frontier Tech Week — ${pass.name}`,
        prefill: order.prefill,
        notes: { reference: order.reference },
        theme: { color: "#75fe72" },
        handler: (response: RazorpayResponse) => verify(response),
        modal: {
          ondismiss: () => {
            setStatus("idle");
            setNotice("Payment cancelled. Your details are still here — pay whenever you're ready.");
          },
        },
      });
      rzp.on("payment.failed", (res) => {
        setNotice(res.error?.description ?? "Payment failed. Please try again.");
      });
      rzp.open();
    } catch {
      setNotice("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  if (done) {
    return (
      <div ref={topRef} className="scroll-mt-24">
        <SuccessView reference={done.reference} email={done.email} passName={pass.name} />
      </div>
    );
  }

  const busy = status !== "idle";

  return (
    <div ref={topRef} className="scroll-mt-24 grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8 lg:gap-12 items-start">
      <form onSubmit={submit} noValidate className="min-w-0">
        <StepIndicator step={step} />

        <h2 className="mt-8 font-display text-2xl sm:text-3xl font-bold tracking-tight">
          {steps[step].title}
        </h2>

        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
          className="hidden"
          aria-hidden
        />

        <div className="mt-6">
          {step === 0 && (
            <div className="space-y-6">
              <fieldset>
                <legend className="sr-only">Pass</legend>
                <div className="grid sm:grid-cols-3 gap-3">
                  {passes.map((p) => {
                    const selected = form.passType === p.id;
                    return (
                      <label
                        key={p.id}
                        className={cn(
                          "relative flex flex-col cursor-pointer border p-5 transition-colors",
                          selected
                            ? "border-accent bg-accent-soft"
                            : "border-border hover:border-border-strong bg-elevated/30"
                        )}
                      >
                        <input
                          type="radio"
                          name="passType"
                          value={p.id}
                          checked={selected}
                          onChange={() => update("passType", p.id)}
                          className="sr-only"
                        />
                        {p.featured ? (
                          <span className="absolute -top-2.5 left-4 bg-accent text-[#0a0a0a] font-mono-meta text-[0.6rem] tracking-[0.14em] uppercase px-2 py-0.5">
                            Popular
                          </span>
                        ) : null}
                        <span className="flex items-start justify-between gap-2">
                          <span className="font-display font-bold text-lg leading-tight">
                            {p.name}
                          </span>
                          <span
                            className={cn(
                              "mt-0.5 size-4 shrink-0 rounded-full border flex items-center justify-center",
                              selected ? "border-accent bg-accent" : "border-border-strong"
                            )}
                            aria-hidden
                          >
                            {selected ? <Check size={10} className="text-[#0a0a0a]" strokeWidth={3} /> : null}
                          </span>
                        </span>
                        <span className="mt-3 font-display text-2xl font-extrabold tracking-tight">
                          {formatINR(p.price)}
                          {p.priceNote ? (
                            <span className="ml-1 font-sans text-xs font-normal text-muted">
                              {p.priceNote}
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-2 text-sm text-muted">{p.summary}</span>
                        <ul className="mt-4 space-y-1.5">
                          {p.perks.map((perk) => (
                            <li key={perk} className="flex gap-2 text-xs text-muted">
                              <Check size={12} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {form.passType === "day" && (
                <fieldset>
                  <legend className="text-sm font-medium mb-3">
                    Which days will you attend?{" "}
                    <span className="text-muted font-normal">{formatINR(pass.price)} per day</span>
                  </legend>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {eventDays.map((d) => {
                      const on = form.passDays.includes(d.date);
                      return (
                        <button
                          key={d.date}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle("passDays", d.date)}
                          className={cn(
                            "border py-3 text-center transition-colors",
                            on
                              ? "border-accent bg-accent-soft"
                              : "border-border hover:border-border-strong"
                          )}
                        >
                          <span className="block font-mono-meta text-[0.65rem] tracking-[0.14em] uppercase text-muted">
                            {d.label}
                          </span>
                          <span className="block font-display font-bold">{d.day}</span>
                        </button>
                      );
                    })}
                  </div>
                  <FieldError message={errors.passDays} />
                </fieldset>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-5">
              <Field label="Full name" error={errors.fullName} className="sm:col-span-2">
                <input
                  className={inputClass(errors.fullName)}
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  autoComplete="name"
                  autoFocus
                />
              </Field>
              <Field label="Email" error={errors.email} hint="Your confirmation goes here">
                <input
                  type="email"
                  inputMode="email"
                  className={inputClass(errors.email)}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone" error={errors.phone} hint="WhatsApp preferred">
                <input
                  type="tel"
                  inputMode="tel"
                  className={inputClass(errors.phone)}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                />
              </Field>
              <Field label="Organisation" error={errors.organization}>
                <input
                  className={inputClass(errors.organization)}
                  value={form.organization}
                  onChange={(e) => update("organization", e.target.value)}
                  autoComplete="organization"
                  placeholder="Company, fund, institution"
                />
              </Field>
              <Field label="Role / designation" error={errors.designation}>
                <input
                  className={inputClass(errors.designation)}
                  value={form.designation}
                  onChange={(e) => update("designation", e.target.value)}
                  autoComplete="organization-title"
                />
              </Field>
              <Field label="I am a" error={errors.attendeeType}>
                <select
                  className={inputClass(errors.attendeeType)}
                  value={form.attendeeType}
                  onChange={(e) => update("attendeeType", e.target.value)}
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {attendeeTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="City" error={errors.city}>
                <input
                  className={inputClass(errors.city)}
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  autoComplete="address-level2"
                />
              </Field>
              <Field
                label="LinkedIn"
                optional
                error={errors.linkedinUrl}
                className="sm:col-span-2"
                hint="Helps us with matchmaking"
              >
                <input
                  type="url"
                  inputMode="url"
                  className={inputClass(errors.linkedinUrl)}
                  value={form.linkedinUrl}
                  onChange={(e) => update("linkedinUrl", e.target.value)}
                  placeholder="https://linkedin.com/in/…"
                />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <fieldset>
                <legend className="text-sm font-medium mb-3">
                  What are you most interested in? <span className="text-muted font-normal">Optional</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((opt) => {
                    const on = form.interests.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle("interests", opt)}
                        className={cn(
                          "border px-3 py-2 text-sm transition-colors",
                          on
                            ? "border-accent bg-accent-soft text-foreground"
                            : "border-border text-muted hover:border-border-strong hover:text-foreground"
                        )}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid sm:grid-cols-2 gap-x-4 gap-y-5">
                <Field label="How did you hear about us?" optional error={errors.heardFrom}>
                  <select
                    className={inputClass(errors.heardFrom)}
                    value={form.heardFrom}
                    onChange={(e) => update("heardFrom", e.target.value)}
                  >
                    <option value="">Select one</option>
                    {heardFromOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="GSTIN" optional error={errors.gstin} hint="For a GST invoice">
                  <input
                    className={cn(inputClass(errors.gstin), "uppercase")}
                    value={form.gstin}
                    onChange={(e) => update("gstin", e.target.value)}
                    maxLength={15}
                    placeholder="29ABCDE1234F1Z5"
                  />
                </Field>
              </div>

              <div className="space-y-3 border-t border-border pt-6">
                <Checkbox
                  checked={form.consentTerms}
                  onChange={(v) => update("consentTerms", v)}
                  error={errors.consentTerms}
                >
                  I agree to the event terms and to Headstart processing my details to run
                  Frontier Tech Week.
                </Checkbox>
                <Checkbox
                  checked={form.consentUpdates}
                  onChange={(v) => update("consentUpdates", v)}
                >
                  Send me updates about speakers, schedules and side events.
                </Checkbox>
              </div>
            </div>
          )}
        </div>

        {notice ? (
          <p role="alert" className="mt-6 border border-danger/50 bg-danger/10 px-4 py-3 text-sm">
            {notice}
          </p>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className="btn-ghost" disabled={busy}>
              <ArrowLeft size={14} aria-hidden />
              Back
            </button>
          ) : (
            <span />
          )}
          {step < steps.length - 1 ? (
            <button type="submit" className="btn-primary">
              Continue
              <ArrowRight size={14} aria-hidden />
            </button>
          ) : (
            <button type="submit" className="btn-primary disabled:opacity-60" disabled={busy}>
              {busy ? (
                <>
                  <Loader2 size={14} className="animate-spin" aria-hidden />
                  {status === "verifying" ? "Confirming" : "Opening payment"}
                </>
              ) : (
                <>
                  <Lock size={13} aria-hidden />
                  Pay {total > 0 ? formatINR(total) : ""}
                </>
              )}
            </button>
          )}
        </div>
      </form>

      <OrderSummary passType={form.passType} days={form.passDays} total={total} />
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Progress">
      {steps.map((s, i) => (
        <li key={s.title} className="flex items-center gap-2 flex-1 min-w-0">
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center border font-mono-meta text-[0.7rem]",
              i < step && "border-accent bg-accent text-[#0a0a0a]",
              i === step && "border-accent text-accent",
              i > step && "border-border text-dim"
            )}
            aria-current={i === step ? "step" : undefined}
          >
            {i < step ? <Check size={12} strokeWidth={3} /> : i + 1}
          </span>
          <span
            className={cn(
              "hidden sm:block truncate font-mono-meta text-[0.65rem] tracking-[0.14em] uppercase",
              i === step ? "text-foreground" : "text-dim"
            )}
          >
            {s.title}
          </span>
          {i < steps.length - 1 ? (
            <span className={cn("h-px flex-1", i < step ? "bg-accent" : "bg-border")} aria-hidden />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function OrderSummary({ passType, days, total }: { passType: PassId; days: string[]; total: number }) {
  const pass = getPass(passType);
  return (
    <aside className="lg:sticky lg:top-24 border border-border bg-elevated/40 p-6">
      <p className="eyebrow">Order summary</p>
      <p className="mt-4 font-display text-xl font-bold">{pass.name}</p>
      <p className="mt-1 text-sm text-muted">Bangalore · Dec 7–12, 2026</p>
      {passType === "day" ? (
        <p className="mt-3 text-sm">
          {days.length > 0 ? (
            <>
              {formatDays(days)}
              <span className="text-muted">
                {" "}
                · {days.length} × {formatINR(pass.price)}
              </span>
            </>
          ) : (
            <span className="text-muted">No days selected yet</span>
          )}
        </p>
      ) : null}
      <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
        <span className="font-mono-meta text-[0.7rem] tracking-[0.14em] uppercase text-muted">
          Total
        </span>
        <span className="font-display text-2xl font-extrabold">{formatINR(total)}</span>
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs text-dim">
        <Lock size={12} aria-hidden />
        Secure payment via Razorpay — UPI, cards, netbanking
      </p>
    </aside>
  );
}

function SuccessView({ reference, email, passName }: { reference: string; email: string; passName: string }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-8">
      <span className="mx-auto flex size-14 items-center justify-center bg-accent text-[#0a0a0a]">
        <Check size={28} strokeWidth={3} aria-hidden />
      </span>
      <p className="eyebrow mt-8">Registration confirmed</p>
      <h2 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
        You&apos;re in.
      </h2>
      <p className="mt-5 text-lg text-muted">
        Your {passName} for Frontier Tech Week Bangalore is confirmed. We&apos;ve sent a
        confirmation to <span className="text-foreground">{email}</span>.
      </p>
      <div className="mt-8 inline-flex flex-col items-center border border-accent/40 bg-accent-soft px-8 py-5">
        <span className="font-mono-meta text-[0.65rem] tracking-[0.16em] uppercase text-muted">
          Your reference
        </span>
        <span className="mt-1 font-mono-meta text-2xl font-semibold tracking-wider text-accent">
          {reference}
        </span>
      </div>
      <div className="mt-10 border border-border p-6 text-left">
        <p className="font-display font-bold">Your attendee dashboard</p>
        <p className="mt-2 text-sm text-muted">
          Coming soon — your events, schedule and details will live here. We&apos;ll email you
          when it&apos;s ready.
        </p>
      </div>
      <Link href="/" className="btn-secondary mt-10">
        Back to Frontier Tech Week
      </Link>
    </div>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full min-h-12 bg-elevated/40 border px-4 py-3 text-base text-foreground placeholder:text-dim transition-colors outline-none",
    "focus:border-accent focus-visible:outline-none",
    error ? "border-danger" : "border-border-strong hover:border-[rgba(243,241,234,0.28)]"
  );
}

function Field({
  label,
  error,
  hint,
  optional,
  className,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="flex items-baseline justify-between gap-2 mb-2">
        <span className="text-sm font-medium">
          {label}
          {optional ? <span className="ml-1.5 text-muted font-normal">Optional</span> : null}
        </span>
        {hint && !error ? <span className="text-xs text-dim">{hint}</span> : null}
      </span>
      {children}
      <FieldError message={error} />
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="mt-1.5 block text-xs text-danger">{message}</span>;
}

function Checkbox({
  checked,
  onChange,
  error,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex gap-3 cursor-pointer text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
      />
      <span>
        <span className="text-muted">{children}</span>
        <FieldError message={error} />
      </span>
    </label>
  );
}
