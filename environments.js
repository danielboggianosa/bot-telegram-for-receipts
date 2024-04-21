const { config } = require('dotenv');
config();

const envirionments = {
    botToken: process.env.BOT_TOKEN,
    awsApiKey: process.env.AWS_API_KEY,
    awsApiSecret: process.env.AWS_API_SECRET,
    awsRegion: process.env.AWS_REGION,
    awsBucket: process.env.AWS_BUCKET,
    awsFolder: process.env.AWS_FOLDER,
    openAiSecret: process.env.OPENAI_SECRET,
    openAiModel: process.env.OPENAI_MODEL,
    openAiTemperature: Number(process.env.OPENAI_TEMPERATURE),
    openAiMaxTokens: Number(process.env.OPENAI_MAX_TOKENS),
    mongoDBUser: process.env.MONGODB_USER,
    mongoDBPassword: process.env.MONGODB_PASSWORD,
    mongoDBHost: process.env.MONGODB_HOST,
    mongoDBPort: process.env.MONGODB_PORT,
    mongoDBDatabase: process.env.MONGODB_DATABASE,
    mongoDBCollection: process.env.MONGODB_COLLECTION,
}

module.exports = { envirionments }