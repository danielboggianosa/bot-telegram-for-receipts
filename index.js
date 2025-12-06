const { Telegraf } = require('telegraf');
const { envirionments } = require('./environments');
const { analyzeImageService } = require('./analyze-image.service');
const { app } = require('./src/api');

const bot = new Telegraf(envirionments.botToken);

// Maneja las imágenes recibidas
bot.on('photo', analyzeImageService);

// Inicia el bot
bot.launch(() => {
    console.log('Telegram Bot started');
});

// Start Rest API
app.listen(envirionments.port, () => {
    console.log(`Server running on port ${envirionments.port}`);
})