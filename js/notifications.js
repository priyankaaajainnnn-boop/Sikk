/**
 * SikshaSetu Notification Service
 * ==================================
 * Currently a stub — no emails are actually sent.
 *
 * HOW TO INTEGRATE A REAL EMAIL SERVICE:
 * ─────────────────────────────────────────
 * Option A — EmailJS (client-side, free tier):
 *   1. Sign up at https://emailjs.com
 *   2. Create an email service + template
 *   3. Replace the console.log bodies below with:
 *      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
 *
 * Option B — Backend API (recommended for production):
 *   1. Create a server endpoint POST /api/notify
 *   2. Replace the console.log bodies with:
 *      fetch('/api/notify', { method: 'POST', body: JSON.stringify(payload) })
 *   3. Handle email sending server-side using Nodemailer / SendGrid / AWS SES
 *
 * IMPORTANT: Never expose email service secret keys in client-side code.
 */

const Notifications = {
  /**
   * Notify a student that their enrollment was received.
   * @param {object} enrollment
   */
  async sendEnrollmentConfirmation(enrollment) {
    // ── Stub ──────────────────────────────────────────────────────────────
    console.info('[Notification] Would send enrollment confirmation:', {
      to:      enrollment.email,
      subject: `Your enrollment for ${enrollment.courseName} is confirmed — SikshaSetu`,
      data: {
        studentName:  enrollment.fullName,
        courseName:   enrollment.courseName,
        enrollmentId: enrollment.enrollmentId,
        price:        enrollment.coursePrice,
        mode:         enrollment.mode,
      },
    });
    // ── Future integration point ──────────────────────────────────────────
    // return await emailjs.send('SERVICE_ID', 'ENROLL_TEMPLATE', { ...data });
  },

  /**
   * Notify the student (and admin) that a payment was submitted pending verification.
   * @param {object} enrollment
   */
  async sendPaymentSubmittedNotification(enrollment) {
    console.info('[Notification] Would send payment-submitted notification:', {
      to:      enrollment.email,
      subject: `Payment received — under verification | SikshaSetu`,
      data: {
        studentName:  enrollment.fullName,
        enrollmentId: enrollment.enrollmentId,
        courseName:   enrollment.courseName,
        amount:       enrollment.coursePrice,
        utr:          enrollment.payment?.utr,
        paymentDate:  enrollment.payment?.paymentDate,
      },
    });
    // Also notify admin
    console.info('[Notification] Would notify admin of new payment submission:', {
      enrollmentId: enrollment.enrollmentId,
      student:      enrollment.fullName,
      course:       enrollment.courseName,
      utr:          enrollment.payment?.utr,
    });
  },

  /**
   * Notify the student that their payment was verified by admin.
   * @param {object} enrollment
   */
  async sendPaymentVerifiedNotification(enrollment) {
    console.info('[Notification] Would send payment-verified notification:', {
      to:           enrollment.email,
      enrollmentId: enrollment.enrollmentId,
      courseName:   enrollment.courseName,
    });
  },

  /**
   * Notify the student that their payment was rejected by admin.
   * @param {object} enrollment
   */
  async sendPaymentRejectedNotification(enrollment) {
    console.info('[Notification] Would send payment-rejected notification:', {
      to:           enrollment.email,
      enrollmentId: enrollment.enrollmentId,
    });
  },
};
