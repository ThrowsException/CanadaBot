const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: '',
  signingSecret: ''
});

app.message(/canada/i, ({ message, say }) => {
    say(`Hockey is cancelled`);
  });

app.message(/is (.*) cancelled/, ({message, say}) => {
    let event = message.text.match(/is (?<event>.*) cancelled/);
    say(`Yes ${event.groups.event} is cancelled due to COVID-19`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();