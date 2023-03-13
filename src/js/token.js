const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const credentials = require('./credentials.json');

const code = '4/0AWtgzh6AS53Z5Cwt4zmRcpRg7Kc5ktFzV4p69L-yj0W26IND64mOymY3vu2gsfNG-8XlPQ';

const { client_secret, client_id, redirect_uris } = credentials.web;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

oAuth2Client.getToken(code).then(({ tokens }) => {
	const tokenPath = path.join(__dirname, 'token.json');
	fs.writeFileSync(tokenPath, JSON.stringify(tokens));
	console.log('Access token and refresh token stored to token.json');
});
