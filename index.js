const { Telegraf } = require('telegraf');
const { envirionments } = require('./environments');
const { analyzeImageService } = require('./analyze-image.service');

const bot = new Telegraf(envirionments.botToken);

// Maneja las imágenes recibidas
bot.on('photo', analyzeImageService);

// Inicia el bot
bot.launch(() => {
    console.log('Bot started');
});
