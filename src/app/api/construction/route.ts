import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, projectType, timeline, budget, message } = body;

    if (!name || !phone || !projectType || !message) {
      return NextResponse.json(
        { error: "Name, phone, project type, and message are required" },
        { status: 400 }
      );
    }

    const emailContent = `
New Construction Project Inquiry

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}

Project Type: ${projectType}
Timeline: ${timeline || "Not specified"}
Budget: ${budget || "Not specified"}

Message:
${message}
    `.trim();

    const { data, error } = await resend.emails.send({
      from: "Woodstock Renewal Contracting <onboarding@resend.dev>",
      to: "sambuckler06@gmail.com",
      subject: `New Construction Inquiry: ${projectType} - ${name}`,
      text: emailContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("Error processing construction inquiry:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

