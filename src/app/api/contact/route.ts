import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.message.trim()
  ) {
    return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(body.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // Delivery hook: wire this up to a transactional email provider (e.g. Resend,
  // Postmark, SMTP) before launch. Currently the submission is accepted but not sent anywhere.
  console.log("Contact form submission:", {
    name: body.name,
    email: body.email,
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}
