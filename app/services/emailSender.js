const nodemailer = require("nodemailer");
const fsExtra = require("fs-extra");

function emailSender(email, file, dest) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.User,
        pass: process.env.Pass,
      },
    });

    const mailOptions = {
      to: dest,
      from: process.env.User,
      subject: email.subject,
      text: email.message,
      attachments: file && [
        {
          filename: file.originalname,
          path: file.path,
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error: ", error);
      } else {
        console.log("Email sent: " + info.response);
        /* delete file after email sent */
        fsExtra.remove(mailOptions.attachments[0].path, (err) => {
          if (err) return console.error(err);
          console.log("file removed!");
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = emailSender;
