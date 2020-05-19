const sendGridApiKey = process.env.SENDGRID_API_KEY;
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(sendGridApiKey);

const sendWelcomeMessage = (email, name) => {
    sgMail.send({
        to: email,
        from:'animesh.ranchi91@gmail.com',
        subject : 'Thanks for Joining',
        text : `Welcome to the App, ${name}. Keep working!`
    })
}

const sendCancellationMessage = (email, name) => {
    sgMail.send({
        to: email,
        from:'animesh.ranchi91@gmail.com',
        subject : 'Sorry to see you go.',
        text : `Goodbye ${name}. See you soon!`
    })
}

module.exports = {
    sendWelcomeMessage,
    sendCancellationMessage
}
