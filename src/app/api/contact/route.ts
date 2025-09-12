import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, type, timeline, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Swiftware <noreply@swiftware.ca>',
      to: ['swiftwareco@gmail.com'], // Your email
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Someone is interested in your services!</p>
            </div>

            <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="margin-bottom: 30px;">
                <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">Contact Details</h2>

                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <strong style="width: 120px; color: #666;">Name:</strong>
                  <span style="color: #333;">${name}</span>
                </div>

                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <strong style="width: 120px; color: #666;">Email:</strong>
                  <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                </div>

                ${company ? `
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <strong style="width: 120px; color: #666;">Company:</strong>
                  <span style="color: #333;">${company}</span>
                </div>
                ` : ''}

                ${type ? `
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <strong style="width: 120px; color: #666;">Project Type:</strong>
                  <span style="color: #333;">${type}</span>
                </div>
                ` : ''}

                ${timeline ? `
                <div style="display: flex; align-items: center; margin-bottom: 30px;">
                  <strong style="width: 120px; color: #666;">Timeline:</strong>
                  <span style="color: #333;">${timeline}</span>
                </div>
                ` : ''}
              </div>

              <div style="border-top: 1px solid #eee; padding-top: 30px;">
                <h3 style="color: #333; margin: 0 0 20px 0; font-size: 20px;">Message</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                  <p style="margin: 0; color: #333; white-space: pre-line;">${message}</p>
                </div>
              </div>

              <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee; text-align: center;">
                <p style="color: #666; margin: 0; font-size: 14px;">
                  This message was sent from your website contact form
                </p>
                <p style="color: #999; margin: 5px 0 0 0; font-size: 12px;">
                  ${new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
