import { Telegraf, Markup } from 'telegraf';
import { getWeather } from './weather';
import { subscribeUser, unsubscribeUser, getAllUsers, blockUser, deleteUser, checkUser } from './adminPanel';
import * as dotenv from 'dotenv';
dotenv.config();

export const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
bot.command('start', (ctx) => {
    ctx.reply(
        'Welcome! Choose an option:',
        Markup.inlineKeyboard([
            Markup.button.callback('Subscribe', 'subscribe'),
            Markup.button.callback('Get Weather', 'weather'),
            Markup.button.callback('Unsubscribe', 'unsubscribe'),
        ])
    );
});

bot.action('subscribe', async (ctx) => {
    const userId = ctx.from?.id!;
    const reply = await subscribeUser(userId);
    if (reply)
        ctx.reply("You have subscribed to weather updates!");
    else {
        ctx.reply("Oops Something went wrong!");
    }
});

bot.action('unsubscribe', async (ctx) => {
    const userId = ctx.from?.id!;
    const reply = await unsubscribeUser(userId);
    if (reply) {
        ctx.reply("You have unsubscribed from weather updates.");
    } else {
        ctx.reply("Oops Something went wrong!");
    }

});

bot.action('weather', async (ctx) => {
    const isSubscribed = await checkUser(ctx.from?.id)
    if (isSubscribed) {
        ctx.reply('Please enter the name of the city you want to get weather information for:');

        bot.on('text', async (ctx) => {
            const isSubscribed = await checkUser(ctx.from?.id)

            if (!isSubscribed) ctx.reply("You are not subscribed to get info.");
            else {

                const cityName = ctx.message?.text;

                const weatherInfo = await getWeather(cityName!);
                ctx.reply(`${weatherInfo}`);

            }

        });
        return
    }
    else {
        ctx.reply("You are not subscribed to get info.");
    }
});
bot.command('subscribe', async (ctx) => {
    const userId = ctx.from?.id!;
    const reply = await subscribeUser(userId);
    if (reply)
        ctx.reply("You have subscribed to weather updates!");
    else {
        ctx.reply("Oops Something went wrong!");
    }
});

bot.command('unsubscribe', async (ctx) => {
    const userId = ctx.from?.id!;
    const reply = await unsubscribeUser(userId);
    if (reply) {
        ctx.reply("You have unsubscribed from weather updates.");
    } else {
        ctx.reply("Oops Something went wrong!");
    }

});

bot.command('weather', async (ctx) => {
    const isSubscribed = await checkUser(ctx.from?.id)
    if (isSubscribed) {
        ctx.reply('Please enter the name of the city you want to get weather information for:');

        bot.on('text', async (ctx) => {
            const isSubscribed = await checkUser(ctx.from?.id)

            if (!isSubscribed) ctx.reply("You are not subscribed to get info.");
            else {

                const cityName = ctx.message?.text;

                const weatherInfo = await getWeather(cityName!);
                ctx.reply(`${weatherInfo}`);

            }

        });
        return
    }
    else {
        ctx.reply("You are not subscribed to get info.");
    }
});

bot.command('admin', async (ctx) => {
    if (ctx.from?.id === Number(process.env.ADMIN_CHAT_ID)) {
        const users = await getAllUsers();
        ctx.reply(`Users: ${users?.join(', ')}`);
    } else {
        ctx.reply("You are not authorized.");
    }
});


