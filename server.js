const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('.'));

app.post('/send-product', async (req, res) => {
  const { name, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dimzmang@gmail.com',
      pass: 'COBAlagi12@@'
    }
  });

  const mailOptions = {
    from: 'dimzmang@gmail.com',
    to: email,
    subject: 'Your Auto Bot Script',
    text: `Hi ${name},\n\nThanks for purchasing!\n\nHere is your product download link:\nhttps://example.com/product.zip`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});