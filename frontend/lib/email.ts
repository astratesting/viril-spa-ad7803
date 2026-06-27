import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWaitlistConfirmation(to: string, firstName: string) {
  try {
    await resend.emails.send({
      from: 'Goon <hello@goon.club>',
      to,
      subject: 'Welcome to the Goon Waitlist',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #000; color: #fff;">
          <h1 style="font-size: 32px; font-weight: 900; color: #FF3B30; margin-bottom: 24px;">GOON</h1>
          <p style="font-size: 18px; color: #fff; line-height: 1.6;">Dear ${firstName},</p>
          <p style="font-size: 16px; color: #ccc; line-height: 1.6;">Thank you for your interest in Goon. We have received your application and our team will review it shortly.</p>
          <p style="font-size: 16px; color: #ccc; line-height: 1.6;">As an exclusive private members club for discerning individuals, we carefully review each application to ensure our community maintains the highest standards of discretion, sophistication, and mutual respect.</p>
          <p style="font-size: 16px; color: #ccc; line-height: 1.6;">We will be in touch within 5-7 business days.</p>
          <p style="font-size: 14px; color: #8E8E93; margin-top: 40px; border-top: 1px solid #3A3A3C; padding-top: 20px;">Goon Private Members Club &mdash; West Hollywood</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send waitlist confirmation email:', error)
  }
}

export async function sendAdminNotification(to: string, applicantName: string, applicantEmail: string) {
  try {
    await resend.emails.send({
      from: 'Goon Admin <admin@goon.club>',
      to,
      subject: `New Waitlist Application: ${applicantName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #000; color: #fff;">
          <h1 style="font-size: 24px; font-weight: 900; color: #FF3B30; margin-bottom: 24px;">New Waitlist Application</h1>
          <p style="font-size: 16px; color: #ccc; line-height: 1.6;"><strong>Name:</strong> ${applicantName}</p>
          <p style="font-size: 16px; color: #ccc; line-height: 1.6;"><strong>Email:</strong> ${applicantEmail}</p>
          <p style="font-size: 14px; color: #8E8E93; margin-top: 40px;">Review this application in the Goon admin dashboard.</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send admin notification email:', error)
  }
}
