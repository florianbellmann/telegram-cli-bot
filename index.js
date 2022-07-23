const https = require('https');

const dotenv = require("dotenv")
dotenv.config()
const botToken = process.env.TELEGRAM_TOKEN
const chatId = process.env.TELEGRAM_CHATID

const cliMessage = process.argv[2] // first cli param
if (!cliMessage) {
  console.error("No cli message set.")
  process.exit(1)
}
console.log(`Received cli message ${cliMessage}`)
const urlMessage = encodeURI(cliMessage)

const apiPath = `/bot${botToken}/sendMessage?chat_id=${chatId}&text=${urlMessage}`
const requestOptions = {
  hostname: 'api.telegram.org',
  port: 443,
  path: apiPath,
  method: 'GET',
};

const apiRequest = https.request(requestOptions, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

apiRequest.on('error', error => {
  console.error(error);
});

apiRequest.end();
