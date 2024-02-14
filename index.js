const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cors = require('cors');
const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use(cors())


app.post('/send-email', (req, res) => {
	const { name, phone } = req.body

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'palguev.alexey@gmail.com',
			pass: 'wupqybqsloeccfon'
		}
	})

	const mailOptions = {
		from: 'AV Style',
		to: 'palguev.alexey@gmail.com',
		text: `Name: ${name}\nPhone: ${phone}\n`			
		}

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
			res.status(500).json('Error sending email')
		} else {
			console.log('Email sent: ' + info.response)
			res.status(200).json('Email sent successfully')
		}
	})
})

app.listen(port, () => {
    console.log('Application listening on port 3333!')
})
