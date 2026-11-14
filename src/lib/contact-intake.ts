export const MAX_BODY_BYTES = 16_384;
export const MAX_NAME_LENGTH = 200;
export const MAX_EMAIL_LENGTH = 254;
export const MAX_COMPANY_LENGTH = 200;
export const MAX_PROJECT_TYPE_LENGTH = 80;
export const MAX_MESSAGE_LENGTH = 8000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactEnv = {
  CONTACT_TO: string;
  CONTACT_FROM: string;
  CONTACT_SUBJECT_PREFIX?: string;
};

export type ContactFields = {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
};

export type MailPayload = {
  personalizations: Array<{
    to: Array<{ email: string }>;
    reply_to: { email: string; name: string };
  }>;
  from: { email: string; name: string };
  subject: string;
  content: Array<{ type: string; value: string }>;
};

export type IntakeFailure = {
  ok: false;
  status: 400 | 413 | 415 | 429 | 405 | 500 | 502;
  error: string;
};

export type IntakeNormalized =
  | { ok: true; outcome: "honeypot" }
  | { ok: true; outcome: "accepted"; data: ContactFields }
  | IntakeFailure;

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
};

export type RateLimiter = {
  check: (key: string) => RateLimitResult;
};

export type ContactHandlerDeps = {
  sendMail?: (payload: MailPayload) => Promise<Response>;
  rateLimiter?: RateLimiter;
  clientKey?: string;
  now?: () => number;
};

const defaultLimiter = createMemoryRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
});

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function stripHeaderName(value: string): string {
  return value.replace(/<[^>]*>/g, "").replace(/[\r\n]+/g, " ").trim();
}

function asRecord(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  return raw as Record<string, unknown>;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function normalizeContactPayload(raw: unknown): IntakeNormalized {
  const record = asRecord(raw);
  if (!record) {
    return { ok: false, status: 400, error: "Invalid payload" };
  }

  const honeypot = readString(record.honeypot) || readString(record.company_website);
  if (honeypot) {
    return { ok: true, outcome: "honeypot" };
  }

  const name = oneLine(readString(record.name));
  const email = oneLine(readString(record.email)).toLowerCase();
  const message = readString(record.message);
  const company = oneLine(readString(record.company));
  const projectType = oneLine(
    readString(record.projectType) || readString(record.project_type),
  );

  if (!name || !email || !message) {
    return { ok: false, status: 400, error: "Missing required fields" };
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    company.length > MAX_COMPANY_LENGTH ||
    projectType.length > MAX_PROJECT_TYPE_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return { ok: false, status: 400, error: "Field too long" };
  }

  if (!EMAIL_RE.test(email)) {
    return { ok: false, status: 400, error: "Invalid email" };
  }

  const data: ContactFields = { name, email, message };
  if (company) data.company = company;
  if (projectType) data.projectType = projectType;
  return { ok: true, outcome: "accepted", data };
}

export function buildEmailBodies(data: ContactFields): {
  text: string;
  html: string;
  subjectBase: string;
} {
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company ?? "-"}`,
    `Project Type: ${data.projectType ?? "-"}`,
    "",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6">
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company ?? "-")}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(data.projectType ?? "-")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
    </div>
  `;

  const subjectBase = data.projectType
    ? `New inquiry: ${data.projectType}`
    : "New inquiry";

  return { text, html, subjectBase };
}

export function createMemoryRateLimiter(options: {
  windowMs: number;
  max: number;
  now?: () => number;
}): RateLimiter {
  const hits = new Map<string, number[]>();
  const nowFn = options.now ?? Date.now;

  return {
    check(key: string): RateLimitResult {
      const now = nowFn();
      const windowStart = now - options.windowMs;
      const recent = (hits.get(key) ?? []).filter((ts) => ts > windowStart);
      if (recent.length >= options.max) {
        hits.set(key, recent);
        return { allowed: false, remaining: 0 };
      }
      recent.push(now);
      hits.set(key, recent);
      return { allowed: true, remaining: options.max - recent.length };
    },
  };
}

function jsonError(status: number, error: string): Response {
  return new Response(error, { status });
}

async function defaultSendMail(payload: MailPayload): Promise<Response> {
  return fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function clientKeyFromRequest(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export async function handleContactRequest(
  request: Request,
  env: ContactEnv,
  deps: ContactHandlerDeps = {},
): Promise<Response> {
  if (request.method !== "POST") {
    return jsonError(405, "Method not allowed");
  }

  if (!env.CONTACT_TO || !env.CONTACT_FROM) {
    return jsonError(500, "Missing CONTACT_TO or CONTACT_FROM");
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError(413, "Payload too large");
  }

  const rawText = await request.text();
  if (rawText.length > MAX_BODY_BYTES) {
    return jsonError(413, "Payload too large");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    return jsonError(400, "Invalid JSON payload");
  }

  const normalized = normalizeContactPayload(parsed);
  if (normalized.ok === false) {
    return jsonError(normalized.status, normalized.error);
  }

  if (normalized.outcome === "honeypot") {
    return new Response("OK", { status: 200 });
  }

  const limiter = deps.rateLimiter ?? defaultLimiter;
  const clientKey = deps.clientKey ?? clientKeyFromRequest(request);
  const limit = limiter.check(clientKey);
  if (!limit.allowed) {
    return jsonError(429, "Too many requests");
  }

  const bodies = buildEmailBodies(normalized.data);
  const subjectPrefix = env.CONTACT_SUBJECT_PREFIX ?? "Danco Analytics";
  const payload: MailPayload = {
    personalizations: [
      {
        to: [{ email: env.CONTACT_TO }],
        reply_to: {
          email: normalized.data.email,
          name: stripHeaderName(normalized.data.name),
        },
      },
    ],
    from: { email: env.CONTACT_FROM, name: "Danco Analytics Website" },
    subject: `${subjectPrefix} · ${bodies.subjectBase}`,
    content: [
      { type: "text/plain", value: bodies.text },
      { type: "text/html", value: bodies.html },
    ],
  };

  const sendMail = deps.sendMail ?? defaultSendMail;
  const upstream = await sendMail(payload);
  if (!upstream.ok) {
    return jsonError(502, "Unable to send message");
  }

  return new Response("OK", { status: 200 });
}
