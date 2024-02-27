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

    async sendNewMovieNotification(userEmail, movieTitle) {
        const mailOptions = {
            from: 'benny.fadel@ethereal.email',
            to: userEmail,
            subject: 'Nouveau film ajouté',
            text: `Un nouveau film "${movieTitle}" a été ajouté à notre plateforme. Venez le découvrir !`,
        };
        return await transporter.sendMail(mailOptions);
    }

    async sendMovieModifiedNotification(userEmail, movieTitle) {
        const mailOptions = {
            from: 'benny.fadel@ethereal.email',
            to: userEmail,
            subject: 'Film modifié',
            text: `Le film "${movieTitle}" que vous avez en favoris a été modifié. Découvrez les dernières mises à jour !`,
        };
        return await transporter.sendMail(mailOptions);
    }
};