const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const port = process.env.PORT || 3000;
const qrcode = require("qrcode");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.get("/", (req, resp, next) => {
  resp.render("index");
});

app.post("/scan", (req, resp, next) => {
  const input_text = req.body.text;

  qrcode.toDataURL(input_text, (error, src) => {
    resp.render("scan", {
      qr_code: src,
    });
    
  });
});
app.listen(port, () => {
  console.log(`Listening on port number : ${port}`);
});
