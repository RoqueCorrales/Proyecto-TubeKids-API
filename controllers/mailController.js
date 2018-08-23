var nodemailer = require('nodemailer');

// email sender function
/**
 * Description
 * @method sendEmail
 * @param {} body
 * @param {} res
 * @return 
 */
exports.sendEmail = function(body, res){
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'roke12chacon@gmail.com',
            pass: 'Saprissa'
        }
    });
// Definimos el email
var mailOptions = {
    from: 'Remitente',
    to: body.email,
    subject: 'Confirmacion de registro TUBEKIDS',
    text: 'TUBEKIDS  link de confirmacion : '+body.link
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, err.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(body);
    }
});
};