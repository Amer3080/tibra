import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const name = body.get("name");
    const email = body.get("email");
    const subject = body.get("subject");
    const message = body.get("message");

    // TODO: Add your email sending logic here
    console.log("Contact form submission:", { name, email, subject, message });

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 });
  }
}
