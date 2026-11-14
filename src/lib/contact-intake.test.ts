import { describe, expect, it } from "vitest";
import {
  buildEmailBodies,
  createMemoryRateLimiter,
  escapeHtml,
  handleContactRequest,
  MAX_BODY_BYTES,
  normalizeContactPayload,
} from "./contact-intake";

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  projectType: "AI/ML Model",
  message: "Let's collaborate on a pipeline.",
};

describe("escapeHtml", () => {
  it("encodes markup characters so they cannot inject HTML", () => {
    expect(escapeHtml(`<img src=x onerror="alert(1)"> & "quote"`)).toBe(
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &quot;quote&quot;",
    );
  });
});

describe("normalizeContactPayload", () => {
  it("accepts a well-formed inquiry and trims fields", () => {
    const result = normalizeContactPayload({
      ...validPayload,
      name: "  Ada Lovelace  ",
    });
    expect(result).toMatchObject({
      ok: true,
      outcome: "accepted",
      data: {
        name: "Ada Lovelace",
        email: "ada@example.com",
      },
    });
  });

  it("maps project_type from the public form onto projectType", () => {
    const result = normalizeContactPayload({
      name: "Ada",
      email: "ada@example.com",
      message: "Hello",
      project_type: "SaaS Product",
    });
    expect(result.ok).toBe(true);
    if (result.ok && result.outcome === "accepted") {
      expect(result.data.projectType).toBe("SaaS Product");
    }
  });

  it("treats a filled honeypot as a silent success without mail", () => {
    const result = normalizeContactPayload({
      ...validPayload,
      honeypot: "http://spam.example",
    });
    expect(result).toEqual({ ok: true, outcome: "honeypot" });
  });

  it("treats company_website as the form honeypot field", () => {
    const result = normalizeContactPayload({
      ...validPayload,
      company_website: "https://bots.example",
    });
    expect(result).toEqual({ ok: true, outcome: "honeypot" });
  });

  it("rejects missing required fields", () => {
    const result = normalizeContactPayload({ email: "ada@example.com" });
    expect(result).toMatchObject({ ok: false, status: 400 });
  });

  it("strips CR/LF from header-bound fields so they cannot split the subject", () => {
    const result = normalizeContactPayload({
      ...validPayload,
      projectType: "SaaS\r\nBcc: attacker@evil.test",
    });
    expect(result.ok).toBe(true);
    if (result.ok && result.outcome === "accepted") {
      expect(result.data.projectType).not.toMatch(/[\r\n]/);
      const bodies = buildEmailBodies(result.data);
      expect(bodies.subjectBase).not.toMatch(/[\r\n]/);
    }
  });

  it("rejects an invalid email address", () => {
    const result = normalizeContactPayload({
      ...validPayload,
      email: "not-an-email",
    });
    expect(result).toMatchObject({ ok: false, status: 400 });
  });

  it("rejects oversized messages", () => {
    const result = normalizeContactPayload({
      ...validPayload,
      message: "x".repeat(9000),
    });
    expect(result).toMatchObject({ ok: false, status: 400 });
  });
});

describe("buildEmailBodies", () => {
  it("escapes HTML in the HTML body while keeping plain text raw", () => {
    const bodies = buildEmailBodies({
      name: "<script>alert(1)</script>",
      email: "attacker@example.com",
      message: "Line 1\nLine 2",
    });
    expect(bodies.html).not.toContain("<script>");
    expect(bodies.html).toContain("&lt;script&gt;");
    expect(bodies.html).toContain("Line 1<br />Line 2");
    expect(bodies.text).toContain("<script>alert(1)</script>");
    expect(bodies.subjectBase).toBe("New inquiry");
  });
});

describe("createMemoryRateLimiter", () => {
  it("allows traffic under the limit and blocks once exceeded", () => {
    const limiter = createMemoryRateLimiter({
      windowMs: 60_000,
      max: 2,
      now: (() => {
        let t = 1_000;
        return () => t;
      })(),
    });
    expect(limiter.check("1.1.1.1")).toEqual({ allowed: true, remaining: 1 });
    expect(limiter.check("1.1.1.1")).toEqual({ allowed: true, remaining: 0 });
    expect(limiter.check("1.1.1.1").allowed).toBe(false);
    expect(limiter.check("2.2.2.2").allowed).toBe(true);
  });
});

describe("handleContactRequest", () => {
  const env = {
    CONTACT_TO: "owner@example.com",
    CONTACT_FROM: "no-reply@example.com",
    CONTACT_SUBJECT_PREFIX: "Danco Analytics",
  };

  const jsonRequest = (body: unknown, init?: RequestInit) =>
    new Request("https://danco.example/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(init?.headers as Record<string, string> | undefined),
      },
      body: JSON.stringify(body),
      ...init,
    });

  it("rejects non-POST methods", async () => {
    const response = await handleContactRequest(
      new Request("https://danco.example/api/contact", { method: "GET" }),
      env,
    );
    expect(response.status).toBe(405);
  });

  it("rejects oversized JSON bodies", async () => {
    const response = await handleContactRequest(
      new Request("https://danco.example/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "x".repeat(MAX_BODY_BYTES + 1),
      }),
      env,
    );
    expect(response.status).toBe(413);
  });

  it("returns 200 without sending mail when the honeypot is filled", async () => {
    const fetchCalls: unknown[] = [];
    const response = await handleContactRequest(
      jsonRequest({ ...validPayload, honeypot: "bot" }),
      env,
      {
        sendMail: async (payload) => {
          fetchCalls.push(payload);
          return new Response("OK", { status: 202 });
        },
      },
    );
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("OK");
    expect(fetchCalls).toHaveLength(0);
  });

  it("sends escaped HTML mail for a valid inquiry", async () => {
    let sent: unknown;
    const response = await handleContactRequest(
      jsonRequest({
        ...validPayload,
        name: "Ada <b>Lovelace</b>",
      }),
      env,
      {
        sendMail: async (payload) => {
          sent = payload;
          return new Response("OK", { status: 202 });
        },
      },
    );
    expect(response.status).toBe(200);
    expect(sent).toMatchObject({
      subject: "Danco Analytics · New inquiry: AI/ML Model",
      from: { email: "no-reply@example.com" },
      personalizations: [
        {
          to: [{ email: "owner@example.com" }],
          reply_to: { email: "ada@example.com", name: "Ada Lovelace" },
        },
      ],
    });
    const html = (sent as { content: { type: string; value: string }[] })
      .content[1].value;
    expect(html).toContain("Ada &lt;b&gt;Lovelace&lt;/b&gt;");
    expect(html).not.toContain("<b>Lovelace</b>");
  });

  it("does not leak upstream mail provider errors to the client", async () => {
    const response = await handleContactRequest(jsonRequest(validPayload), env, {
      sendMail: async () =>
        new Response("MailChannels internal exception xyz", { status: 500 }),
    });
    expect(response.status).toBe(502);
    expect(await response.text()).toBe("Unable to send message");
  });

  it("rate-limits repeated posts from the same client", async () => {
    const limiter = createMemoryRateLimiter({ windowMs: 60_000, max: 1 });
    const first = await handleContactRequest(jsonRequest(validPayload), env, {
      rateLimiter: limiter,
      clientKey: "203.0.113.9",
      sendMail: async () => new Response("OK", { status: 202 }),
    });
    const second = await handleContactRequest(jsonRequest(validPayload), env, {
      rateLimiter: limiter,
      clientKey: "203.0.113.9",
      sendMail: async () => new Response("OK", { status: 202 }),
    });
    expect(first.status).toBe(200);
    expect(second.status).toBe(429);
  });

  it("returns 500 when mail env is missing", async () => {
    const response = await handleContactRequest(jsonRequest(validPayload), {
      CONTACT_TO: "",
      CONTACT_FROM: "",
    });
    expect(response.status).toBe(500);
  });
});
