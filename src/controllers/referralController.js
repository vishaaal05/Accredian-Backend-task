const prisma = require('../prismaClient');
const { sendReferralEmail } = require('../services/emailService');

const createReferral = async (req, res) => {
  const { name, email, referredBy } = req.body;

  if (!name || !email || !referredBy) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newReferral = await prisma.referral.create({
      data: { name, email, referredBy }
    });

    res.status(201).json({
      message: 'Referral submitted successfully',
      referral: newReferral
    });

    // Send the email after sending the response
    try {
      await sendReferralEmail(newReferral);
    } catch (emailError) {
      console.error('Error sending referral email:', emailError);
    }
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      console.error('Internal server error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = {
  createReferral,
};
