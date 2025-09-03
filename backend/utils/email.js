const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const getEmailTemplate = (template, data) => {
  switch (template) {
    case 'contact-confirmation':
      return {
        subject: 'Thank you for contacting Nexture Education',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #7c3aed, #6366f1); padding: 2rem; text-align: center;">
              <h1 style="color: white; margin: 0;">Nexture Education</h1>
            </div>
            <div style="padding: 2rem; background: #f9fafb;">
              <h2 style="color: #374151;">Thank You for Contacting Us!</h2>
              <p>Dear ${data.firstName},</p>
              <p>We have received your message regarding "<strong>${data.subject}</strong>" and appreciate you reaching out to us.</p>
              <p>Our team will review your inquiry and get back to you within 24-48 hours. If your matter is urgent, please don't hesitate to call us directly.</p>
              <div style="background: white; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #7c3aed;">
                <h3 style="margin-top: 0; color: #7c3aed;">What happens next?</h3>
                <ul style="color: #6b7280;">
                  <li>We'll assign your inquiry to the appropriate specialist</li>
                  <li>You'll receive a personalized response within 24-48 hours</li>
                  <li>If needed, we'll schedule a consultation to discuss your goals</li>
                </ul>
              </div>
              <p>Thank you for choosing Nexture Education for your international education journey!</p>
              <p>Best regards,<br>The Nexture Education Team</p>
            </div>
            <div style="background: #374151; color: white; padding: 1rem; text-align: center; font-size: 0.875rem;">
              <p>© 2024 Nexture Education. All rights reserved.</p>
            </div>
          </div>
        `
      };

    case 'contact-notification':
      return {
        subject: `New Contact Form Submission - ${data.contact.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #dc2626; padding: 1.5rem; text-align: center;">
              <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
            </div>
            <div style="padding: 2rem; background: #f9fafb;">
              <h2 style="color: #374151;">Contact Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 0.5rem; font-weight: bold;">Name:</td><td style="padding: 0.5rem;">${data.fullName}</td></tr>
                <tr><td style="padding: 0.5rem; font-weight: bold;">Email:</td><td style="padding: 0.5rem;">${data.contact.email}</td></tr>
                <tr><td style="padding: 0.5rem; font-weight: bold;">Phone:</td><td style="padding: 0.5rem;">${data.contact.phone}</td></tr>
                <tr><td style="padding: 0.5rem; font-weight: bold;">Country:</td><td style="padding: 0.5rem;">${data.contact.country}</td></tr>
                <tr><td style="padding: 0.5rem; font-weight: bold;">Service Type:</td><td style="padding: 0.5rem;">${data.contact.serviceType}</td></tr>
                <tr><td style="padding: 0.5rem; font-weight: bold;">Urgency:</td><td style="padding: 0.5rem;">${data.contact.urgency}</td></tr>
                <tr><td style="padding: 0.5rem; font-weight: bold;">Subject:</td><td style="padding: 0.5rem;">${data.contact.subject}</td></tr>
              </table>
              <h3 style="color: #374151;">Message:</h3>
              <div style="background: white; padding: 1rem; border-radius: 4px; border: 1px solid #d1d5db;">
                ${data.contact.message}
              </div>
              <p style="margin-top: 2rem; font-size: 0.875rem; color: #6b7280;">
                Submitted on: ${new Date(data.contact.createdAt).toLocaleString()}<br>
                Contact ID: ${data.contact._id}
              </p>
            </div>
          </div>
        `
      };

    case 'consultation-confirmation':
      return {
        subject: 'Consultation Booking Confirmation - Nexture Education',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #7c3aed, #6366f1); padding: 2rem; text-align: center;">
              <h1 style="color: white; margin: 0;">Consultation Booked!</h1>
            </div>
            <div style="padding: 2rem; background: #f9fafb;">
              <h2 style="color: #374151;">Thank You, ${data.firstName}!</h2>
              <p>Your free consultation has been successfully booked. Here are the details:</p>
              <div style="background: white; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; border: 1px solid #d1d5db;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 0.5rem; font-weight: bold;">Service Type:</td><td style="padding: 0.5rem;">${data.serviceType}</td></tr>
                  <tr><td style="padding: 0.5rem; font-weight: bold;">Preferred Date:</td><td style="padding: 0.5rem;">${data.preferredDate}</td></tr>
                  <tr><td style="padding: 0.5rem; font-weight: bold;">Preferred Time:</td><td style="padding: 0.5rem;">${data.preferredTime}</td></tr>
                  <tr><td style="padding: 0.5rem; font-weight: bold;">Communication Mode:</td><td style="padding: 0.5rem;">${data.communicationMode}</td></tr>
                  <tr><td style="padding: 0.5rem; font-weight: bold;">Booking ID:</td><td style="padding: 0.5rem;">${data.consultationId}</td></tr>
                </table>
              </div>
              <div style="background: #fef3c7; padding: 1rem; border-radius: 4px; border-left: 4px solid #f59e0b; margin: 1rem 0;">
                <p style="margin: 0; color: #92400e;"><strong>What's Next?</strong></p>
                <p style="margin: 0.5rem 0 0 0; color: #92400e;">Our team will review your request and confirm the final meeting details within 24 hours. You'll receive another email with the meeting link and counselor information.</p>
              </div>
              <p>We're excited to help you achieve your international education goals!</p>
              <p>Best regards,<br>The Nexture Education Team</p>
            </div>
            <div style="background: #374151; color: white; padding: 1rem; text-align: center; font-size: 0.875rem;">
              <p>© 2024 Nexture Education. All rights reserved.</p>
            </div>
          </div>
        `
      };

    case 'consultation-confirmed':
      return {
        subject: 'Consultation Confirmed - Meeting Details',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #059669; padding: 2rem; text-align: center;">
              <h1 style="color: white; margin: 0;">Consultation Confirmed!</h1>
            </div>
            <div style="padding: 2rem; background: #f9fafb;">
              <h2 style="color: #374151;">Hi ${data.firstName},</h2>
              <p>Great news! Your consultation has been confirmed. Here are your meeting details:</p>
              <div style="background: white; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; border: 1px solid #d1d5db;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 0.5rem; font-weight: bold;">Date:</td><td style="padding: 0.5rem;">${data.actualDate}</td></tr>
                  <tr><td style="padding: 0.5rem; font-weight: bold;">Time:</td><td style="padding: 0.5rem;">${data.actualTime}</td></tr>
                  <tr><td style="padding: 0.5rem; font-weight: bold;">Counselor:</td><td style="padding: 0.5rem;">${data.counselor ? data.counselor.firstName + ' ' + data.counselor.lastName : 'TBD'}</td></tr>
                  ${data.meetingLink ? `<tr><td style="padding: 0.5rem; font-weight: bold;">Meeting Link:</td><td style="padding: 0.5rem;"><a href="${data.meetingLink}" style="color: #7c3aed;">Join Meeting</a></td></tr>` : ''}
                </table>
              </div>
              <div style="background: #dbeafe; padding: 1rem; border-radius: 4px; border-left: 4px solid #3b82f6; margin: 1rem 0;">
                <p style="margin: 0; color: #1e40af;"><strong>Preparation Tips:</strong></p>
                <ul style="margin: 0.5rem 0 0 0; color: #1e40af;">
                  <li>Prepare a list of questions about your education goals</li>
                  <li>Have your academic transcripts ready (if applicable)</li>
                  <li>Think about your preferred countries and programs</li>
                </ul>
              </div>
              <p>We look forward to speaking with you!</p>
              <p>Best regards,<br>The Nexture Education Team</p>
            </div>
          </div>
        `
      };

    default:
      return {
        subject: 'Nexture Education',
        html: '<p>Thank you for contacting Nexture Education!</p>'
      };
  }
};

// Send email function
const sendEmail = async ({ to, subject, template, data, html, text }) => {
  try {
    const transporter = createTransporter();

    let emailContent;
    if (template && data) {
      emailContent = getEmailTemplate(template, data);
      subject = emailContent.subject;
      html = emailContent.html;
    }

    const mailOptions = {
      from: `"Nexture Education" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

module.exports = { sendEmail };
