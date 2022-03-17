require('dotenv').config();
const express = require('express');
const mg = require('mailgun-js');

const mailgun = () =>
  mg({
    apiKey: process.env.API_KEY,
    domain: process.env.DOMAIN,
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/email', (req, res) => {
  console.log(mailgun().messages);
  const { email, message, subject } = req.body;
  const data = {
    from: 'Ahsan Mumtaz <bsf1800411@ue.edu.pk>',
    to: `${email}`,
    subject: `${subject}`,
    html: `<p>${message}</p>`,
  };
  mailgun()
    .messages()
    .send(data, (error, body) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Error in sending the email' });
      } else {
        console.log(body);
        res.status(200).json({ message: 'Email sending to user successfully' });
      }
    });
});

app.listen(process.env.PORT, () => console.log('Server is running'));
