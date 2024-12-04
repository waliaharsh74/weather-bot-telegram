import { Telegraf, Markup } from 'telegraf';
import { getWeather } from './weather';
import { subscribeUser, unsubscribeUser, getAllUsers, blockUser, deleteUser, checkUser } from './adminPanel';
import * as dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
bot.command('start', (ctx) => {
    ctx.reply(
        'Welcome! Choose an option:',
        Markup.inlineKeyboard([
            Markup.button.callback('Get Weather', 'weather'),
            Markup.button.callback('Subscribe', 'subscribe'),
            Markup.button.callback('Unsubscribe', 'unsubscribe'),
        ])
    );
});

bot.command('subscribe', async (ctx) => {
    const userId = ctx.from?.id!;
    await subscribeUser(userId);
    ctx.reply("You have subscribed to weather updates!");
});

bot.command('unsubscribe', async (ctx) => {
    const userId = ctx.from?.id!;
    await unsubscribeUser(userId);
    ctx.reply("You have unsubscribed from weather updates.");
});

bot.command('weather', async (ctx) => {
    const isSubscribed = await checkUser(ctx.from?.id)
    if (isSubscribed) {
        ctx.reply('Please enter the name of the city you want to get weather information for:');

        bot.on('text', async (ctx) => {
            const cityName = ctx.message?.text;

            const weatherInfo = await getWeather(cityName!);
            ctx.reply(`${weatherInfo}`);
        });
    }
    else {
        ctx.reply("You are not subscribed to get info please.");
    }
});

bot.command('admin', async (ctx) => {
    if (ctx.from?.id === Number(process.env.ADMIN_CHAT_ID)) {
        const users = await getAllUsers();
        ctx.reply(`Users: ${users.join(', ')}`);
    } else {
        ctx.reply("You are not authorized.");
    }
});

bot.launch();

