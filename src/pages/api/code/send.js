import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import VerifyCode from 'src/models/VerifyCode';
import dbConnect from 'src/utils/dbConnect';

const OTPHandler = async (req, res) => {
  const { method } = req;
  const { email } = req.body;

  const OAuth = google.auth.OAuth2;
  const Oauth2Client = new OAuth(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
    process.env.GOOGLE_EMAIL_REDIRECT,
  );
  Oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_OAUTH_RF_TOKEN,
  });
  try {
    await dbConnect();
    switch (method) {
      case 'POST':
        const accessToken = await Oauth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 465,
          secure: process.env.NODE_ENV === 'production',
          auth: {
            type: 'OAuth2',
            user: process.env.GOOGLE_EMAIL,
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            refreshToken: process.env.GOOGLE_OAUTH_RF_TOKEN,
            accessToken,
          },
        });

        const randomCode = Math.random()
          .toString()
          .slice(2, 2 + 6);

        const emailOptions = {
          from: 'Miki Jewelry <ngockhoi9671@gmail.com>',
          to: email,
          subject: 'Verification Email',
          html: `<h1>hello from miki shop ${randomCode}</h1>`,
        };
        await Promise.all([
          transport.sendMail(emailOptions),
          VerifyCode.create({
            email,
            code: randomCode,
          }),
        ]);
        transport.close();
        return res.status(201).json({
          message: 'Mã xác thực đã gửi tới email của bạn.',
          code: 201,
        });

      default:
        return res.status(400).json({
          message: 'Yêu cầu không hợp lệ',
          code: 400,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

export default OTPHandler;
