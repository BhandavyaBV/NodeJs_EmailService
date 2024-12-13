var express = require('express');
const nodemailer = require('nodemailer')
const multer = require('multer')
var router = express.Router();
const storage = multer.memoryStorage();  // Store files in memory
const upload = multer({ storage });

/* GET home page. */
router.post('/send-email', upload.single('file'), function(req, res, next) {
  const pdfBuffer = req.file.buffer;
  const subject = req.body.subject

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bhandavyabv01@gmail.com',
      pass: '',//password go here
    },
  });

  const mailOptions = {
    from: 'bhandavyabv01@gmail.com', // Sender email
    to: 'mxu@centra.ca,VKhatri@centra.ca',                    // Recipient email
    subject: subject, // Email subject
    text: 'All fields from the form', // Email body text
    attachments: [
      {
        filename: 'generated-file.pdf',
        content: pdfBuffer,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

module.exports = router;
