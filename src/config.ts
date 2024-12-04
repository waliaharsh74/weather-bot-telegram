import * as dotenv from 'dotenv';

dotenv.config();

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
export const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY!;
export const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID!;
