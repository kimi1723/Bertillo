const fs = require('fs');
const path = require('path');
const sendMail = require('./gmail');
const express = require('express');
const app = express();
const port = 443;

app.use(express.static('./'));

app.use(express.json());

app.listen(port, () => {
	console.log(`Bertillo app listening on port ${port}`);
});

app.post('/', (req, res) => {
	const { userName, userEmail, userTel, userMsg } = req.body;

	res.status(200).send({ status: 'received' });

	const main = async e => {
		const options = {
			to: 'patrykskontakt@gmail.com',
			subject: 'Wiadomość wysłana ze strony Bertillo.pl',
			html: `<b>Imie:</b> ${userName} <br>
			<b>E-mail:</b> ${userEmail} <br>
            <b>Telefon:</b> ${userTel} <br>
           <b>Wiadomość:</b>  ${userMsg}`,
			textEncoding: 'base64',
			headers: [
				{ key: 'X-Application-Developer', value: 'Amit Agarwal' },
				{ key: 'X-Application-Version', value: 'v1.0.0.2' },
			],
		};

		const messageId = await sendMail(options);
		return messageId;
	};

	main()
		.then(messageId => console.log('Message sent successfully:', messageId))
		.catch(err => console.error(err));
});
