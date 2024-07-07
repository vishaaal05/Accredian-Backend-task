const nodemailer = require('nodemailer');

const sendReferralEmail = async (referral) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: referral.email,
    subject: 'You have been referred!',
    text: `Hello ${referral.name},\n\nYou have been referred by ${referral.referredBy}.\n\nBest Regards,\nAccerdian`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Referral email sent successfully');
  } catch (error) {
    console.error('Error sending referral email:', error);
    throw error;
  }
};

module.exports = {
  sendReferralEmail,
};
