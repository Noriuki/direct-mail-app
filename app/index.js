require("dotenv").config();
const express = require("express");
const multer = require("multer");
const directMails = require("./utils/directMails");
const app = express();
const upload = multer({ dest: "uploads/" });

/* config express to render static html files */
app.set("view engine", "html");
app.use(express.static(__dirname + "/views"));
/* routes */
app.get("/", (req, res) => {
  res.render("index.html");
});
app.post("/", upload.single("file"), (req, res) => {
  const { subject, message } = req.body;
  const { originalname, path } = req.file;
  let email = { subject, message };
  let file = { originalname, path };
  directMails(email, file);
  res.redirect("/");
});
app.get("/*", (req, res) => {
  res.send("<center><h1> ( 404 ) Not Found! </h1></center>");
});
/* run app */
app.listen(5000, () => {
  console.log(
    `Running Application!\nopen app: http://localhost:5000
    `
  );
});
