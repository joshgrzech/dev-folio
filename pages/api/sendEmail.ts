import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { location } = req.body;

   let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'joshgrzech@icloud.com',
    to: 'contact@joshgrzech.com',
    subject: 'New Portfolio Visit',
    text: `${JSON.stringify(location, null, 2)}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent' });
    console.log('Email sent');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
    console.log('Email not sent');

  }
}
