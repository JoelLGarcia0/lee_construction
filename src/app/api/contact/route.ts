import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, message } = await req.json();

    // Configure Nodemailer Transporter with App Password
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // SMTP Host (e.g., smtp.gmail.com)
      port: parseInt(process.env.EMAIL_PORT || "465"), // SMTP Port
      secure: process.env.EMAIL_SECURE === "true", // Use SSL/TLS
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your App Password
      },
    });

    // Email options
    const mailOptions = {
      from: `"Webpage Contact Form <${process.env.EMAIL_USER}>`,
      to: "joellorenzogarcia0@gmail.com, rbarouh@leecgi.com",
      subject: "New Lee Construction Inquiry",
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { success: false, message: "Email failed to send!" },
      { status: 500 }
    );
  }
}
