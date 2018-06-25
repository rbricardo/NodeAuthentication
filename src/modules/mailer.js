const path = require('path'),
    nodemailer = require('nodemailer'),
    hbs = require('nodemailer-express-handlebars');

const { host, port, user, pass } = require('../config/mail.json')

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
}))

module.exports = transport;