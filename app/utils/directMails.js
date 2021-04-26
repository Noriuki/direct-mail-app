const emailSender = require("../services/emailSender");
const fs = require("fs");

function directMails(email, file) {
  /* read list and send emails */
  let resFile = fs.readFileSync("app/emailList.txt", "utf8").split("\n");
  try {
    resFile.forEach((dest) => {
      let sent = emailSender(email, file, dest);
      return sent;
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = directMails;
