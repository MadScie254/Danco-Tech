interface Env {
  CONTACT_TO: string;
  CONTACT_FROM: string;
  CONTACT_SUBJECT_PREFIX?: string;
}

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
  honeypot?: string;
};

const buildPlainText = (data: ContactPayload) => {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : "Company: -",
    data.projectType ? `Project Type: ${data.projectType}` : "Project Type: -",
    "",
    data.message,
  ].join("\n");
};

const buildHtml = (data: ContactPayload) => {
  return `
    <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6">
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company ?? "-"}</p>
      <p><strong>Project Type:</strong> ${data.projectType ?? "-"}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, "<br />")}</p>
    </div>
  `;
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.CONTACT_TO || !env.CONTACT_FROM) {
    return new Response("Missing CONTACT_TO or CONTACT_FROM", { status: 500 });
  }

  let data: ContactPayload;
  try {
    data = (await request.json()) as ContactPayload;
  } catch {
    return new Response("Invalid JSON payload", { status: 400 });
  }

  if (data.honeypot) {
    return new Response("OK", { status: 200 });
  }

  if (!data.name || !data.email || !data.message) {
    return new Response("Missing required fields", { status: 400 });
  }

  const subjectBase = data.projectType
    ? `New inquiry: ${data.projectType}`
    : "New inquiry";
  const subjectPrefix = env.CONTACT_SUBJECT_PREFIX ?? "Danco Analytics";
  const subject = `${subjectPrefix} · ${subjectBase}`;

  const payload = {
    personalizations: [
      {
        to: [{ email: env.CONTACT_TO }],
        reply_to: { email: data.email, name: data.name },
      },
    ],
    from: { email: env.CONTACT_FROM, name: "Danco Analytics Website" },
    subject,
    content: [
      { type: "text/plain", value: buildPlainText(data) },
      { type: "text/html", value: buildHtml(data) },
    ],
  };

  const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return new Response(errorText, { status: 500 });
  }

  return new Response("OK", { status: 200 });
};
