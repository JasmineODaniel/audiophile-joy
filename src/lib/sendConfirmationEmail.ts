import { Resend } from "resend";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export async function sendConfirmationEmail(name: string, email: string, orderTotal: number) {
  try {
    await resend.emails.send({
      from: "Audiophile <orders@yourdomain.com>",
      to: email,
      subject: "Order Confirmation - Audiophile",
      html: `
        <h2>Thank you, ${name}</h2>
        <p>Your order was successfully placed.</p>
        <p><strong>Total:</strong> $${orderTotal.toLocaleString()}</p>
        <p>You will receive your items soon.</p>
      `,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
  }
}
