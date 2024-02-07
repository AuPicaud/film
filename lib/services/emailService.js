'use strict';

const nodemailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'benny.fadel@ethereal.email',
        pass: 'bPC486MExyun8k26R4'
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