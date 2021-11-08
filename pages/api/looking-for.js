import nodemailer from "nodemailer";
require("dotenv").config();
const PASSWORD = process.env.PASSWORD;

export default function (req, res) {
  let template = `
  <h1>Hi Mani!</h1>
  <div><strong>Looking for:</strong> ${req.body.category}</div>
  <br>
  <div><strong>Description:</strong> ${req.body.description}</div>
  <br>
  <div><strong>In size:</strong> ${req.body.size}</div>
  <br>
  <strong>My measurements are:</strong>
  <ul>
  <li>Bust: ${req.body.bust}</li>
  <li>Hip: ${req.body.hip}</li>
  <li>Waist: ${req.body.waist}</li>
  <li>Arm: ${req.body.arm}</li>
  <li>Length: ${req.body.length}</li>
  </ul>
  <div><strong>I need this:</strong> ${req.body.time}</div>
  <p>Sent from: ${req.body.email}</p>
  `;

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "manivintagetest@gmail.com",
      pass: PASSWORD,
    },
    secure: true,
  });

  const mailData = {
    from: "manivintagetest@gmail.com",
    to: "manivintagetest@gmail.com",
    subject: `Looking for! Message From ${req.body.email}`,
    text: req.body.description + " | Sent from: " + req.body.email,
    html: template,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      res.status(200);
      res.send("success");
    }
  });
}
