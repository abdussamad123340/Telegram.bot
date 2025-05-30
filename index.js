```js
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply('আসসালামু আলাইকুম! আমি আব্দুস সামাদ আকাশ 😊 কীভাবে আপনাকে সাহায্য করতে পারি...?'));

bot.on('text', async (ctx) => {
  const message = ctx.message.text;

  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    return ctx.reply('আসসালামু আলাইকুম! আমি আব্দুস সামাদ আকাশ 😊 কীভাবে আপনাকে সাহায্য করতে পারি...?');
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    ctx.reply(response.data.choices[0].message.content);
  } catch (error) {
    ctx.reply('দুঃখিত, উত্তর দিতে সমস্যা হচ্ছে 😓 পরে আবার চেষ্টা করুন।');
  }
});

bot.launch();
`
