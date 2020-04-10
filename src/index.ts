const dotenv = require('dotenv');
const { App } = require('@slack/bolt');

dotenv.config();

// Initializes your app with your bot token and signing secret
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});
(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

app.message(/canada/i, async ({ message, say }) => {
  await say(`Hockey is cancelled`);
});

app.message(/is (.*) cancelled/, async ({ message, say }) => {
  let event = message.text.match(/is (?<event>.*) cancelled/);
  await say(`Yes ${event.groups.event} is cancelled due to COVID-19`);
});

app.message(/^spongebob/i, async ({ message, say }) => {
  let res = message.text
    .slice(9)
    .split('')
    .map((item) =>
      Math.round(Math.random()) ? item.toUpperCase() : item.toLowerCase()
    )
    .join('');

  await say({
    blocks: [
      {
        type: 'image',
        image_url: 'https://i.imgflip.com/1p74ap.jpg',
        alt_text: 'spongebob',
      },
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: res,
        },
      },
    ],
  });
});
