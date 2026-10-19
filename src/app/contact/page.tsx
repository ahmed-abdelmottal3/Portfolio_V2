"use client";
import { useState } from "react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { BsArrowUpRight, BsDownload, BsEnvelope } from "react-icons/bs";
import PageHeader, { SectionLabel } from "@/src/components/ui/page-header";
import NextPage from "@/src/components/shared/NextPage";
import Reveal from "@/src/components/ui/reveal";

const EMAIL = "abdelmottale3@gmail.com";
// Public form key from web3forms.com; it only allows sending to the owner's inbox.
const FORM_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const channels = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: <BsEnvelope /> },
  { label: "WhatsApp", value: "+20 109 717 5212", href: "https://wa.me/201097175212", icon: <FaWhatsapp /> },
  { label: "LinkedIn", value: "in/abdelmottalie", href: "https://www.linkedin.com/in/abdelmottalie", icon: <FaLinkedinIn /> },
  { label: "GitHub", value: "ahmed-abdelmottal3", href: "https://github.com/ahmed-abdelmottal3", icon: <FaGithub /> },
];

const freelance = [
  { label: "Mostaql", href: "https://mostaql.com/u/Ahmed_Abdo1712" },
];

type Status = "idle" | "sending" | "sent" | "error";
const empty = { name: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>("idle");

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const mailtoLink = () =>
    `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject || `Message from ${form.name}`)}&body=${encodeURIComponent(
      `${form.message}\n\n${form.name}\n${form.email}`,
    )}`;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Without a form key, hand the message to the visitor's email app instead of pretending to send it.
    if (!FORM_KEY) {
      window.location.href = mailtoLink();
      return;
    }

    const botcheck = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    if (botcheck) return;

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_KEY,
          from_name: "Portfolio contact form",
          subject: form.subject || `New message from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || "Send failed");
      setStatus("sent");
      setForm(empty);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="container mx-auto px-5 sm:px-8 pt-20 pb-40">
      <PageHeader
        index="04"
        eyebrow="CONTACT"
        title="Let's talk"
        intro="Open to React Native roles, remote or in Cairo, and to freelance mobile work. Email or WhatsApp is the fastest way to reach me, and the form below lands in my inbox too."
      />

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        {/* direct channels */}
        <div className="hero-rise" style={{ "--d": "0.18s" } as React.CSSProperties}>
          <SectionLabel>REACH ME DIRECTLY</SectionLabel>
          <ul className="mt-6 divide-y divide-white/10 border-b border-white/10">
            {channels.map((c) => (
              <Reveal as="li" shape="line-top" key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-silver transition group-hover:border-cyan group-hover:text-cyan">
                    {c.icon}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-mono text-[11px] tracking-[0.2em] text-white/35">{c.label.toUpperCase()}</span>
                    <span className="block truncate text-background transition group-hover:text-cyan">{c.value}</span>
                  </span>
                  <BsArrowUpRight className="text-silver transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                </a>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-3 text-sm text-silver">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Usually replies within a day
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href="/Ahmed-Abdelmottalie-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-background hover:text-cyan"
            >
              <BsDownload /> Download CV
            </a>
            <span className="text-white/20">|</span>
            <span className="text-silver">Freelance profile:</span>
            {freelance.map((f) => (
              <a key={f.label} href={f.href} target="_blank" rel="noopener noreferrer" className="text-background hover:text-cyan">
                {f.label}
              </a>
            ))}
          </div>
        </div>

        {/* form */}
        <div className="hero-rise" style={{ "--d": "0.24s" } as React.CSSProperties}>
          <SectionLabel>SEND A MESSAGE</SectionLabel>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" value={form.name} onChange={update} autoComplete="name" />
              <Field label="Email" name="email" type="email" value={form.email} onChange={update} autoComplete="email" />
            </div>
            <Field label="Subject" name="subject" value={form.subject} onChange={update} required={false} />
            <label className="block">
              <span className="font-mono text-[11px] tracking-[0.2em] text-white/40">MESSAGE</span>
              <textarea
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={update}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-background placeholder:text-white/25 outline-none transition focus:border-cyan/60"
                placeholder="Tell me about the role or the project"
              />
            </label>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-cyan px-7 py-3 text-sm font-semibold text-[#050507] transition hover:brightness-110 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : FORM_KEY ? "Send message" : "Send via email app"}
              </button>

              <p aria-live="polite" className="text-sm">
                {status === "sent" && <span className="text-cyan">Thanks, your message is on its way. I will reply by email.</span>}
                {status === "error" && (
                  <span className="text-[#ff8f80]">
                    That did not go through. Please email me at{" "}
                    <a href={mailtoLink()} className="underline">{EMAIL}</a>.
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>

      <NextPage />
    </section>
  );
}

function Field({
  label,
  required = true,
  ...props
}: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-[0.2em] text-white/40">
        {label.toUpperCase()}
        {!required && <span className="text-white/20"> (OPTIONAL)</span>}
      </span>
      <input
        required={required}
        {...props}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-background placeholder:text-white/25 outline-none transition focus:border-cyan/60"
      />
    </label>
  );
}
