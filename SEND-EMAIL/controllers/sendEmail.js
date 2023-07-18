
const nodemailer = require("nodemailer");

const sgMail = require("@sendgrid/mail");


const sendEmailEtherel=async(req,res)=>{

    let testAccount=await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "eryn.jacobson@ethereal.email",
        pass: "4ajgTkDFUSSADWSw9T",
      },
    });

    let info=await transporter.sendMail({
        from:"atah habibi <bar@gmail.com>",
        to:"atabhabibi@gmail.com",
        subject:"Salam this is new one",
        html:"<h1>Send emails with node js atah</h1>"
    })



   res.json(info)
}


const sendEmail=async(req,res)=>{

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: "atahhabibi1@gmail.com", 
      from: "atabhabibi@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<h1>and easy to do anywhere, even with Node.js</h1>",
    };
 

    const info=await sgMail.send(msg);

    res.json(info)




}



module.exports=sendEmail;