'use strict';

const nodemailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');


const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

module.exports = class EmailService extends Service {
    async sendWelcomeEmail(userEmail) {
        const mailOptions = {
            from: 'benny.fadel@ethereal.email',
            to: userEmail,
            subject: 'Bienvenue sur notre plateforme',
            text: 'Bienvenue ! Merci de vous être inscrit sur notre plateforme.',
        };
        return await transporter.sendMail(mailOptions);
    }
};