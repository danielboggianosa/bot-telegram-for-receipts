const fetch = require("node-fetch");
const fs = require("fs");
const { envirionments } = require("./environments");
const { recognizeTextInImage, saveFileInRepository } = require("./aws.services");
const { generateJSONFromReceipt } = require("./open-ai.services");
const { saveReceiptInfo } = require("./mongodb");
const { randomUUID } = require("crypto");

async function analyzeImageService(ctx) {
    try {
        const photo = ctx.message.photo[ctx.message.photo.length - 1];
        const path = `./.temp/${photo.file_id}.jpg`;
        const id = randomUUID();
        const filename = `${id}.jpg`;

        const file = await ctx.telegram.getFile(photo.file_id);

        const photoUrl = `https://api.telegram.org/file/bot${envirionments.botToken}/${file.file_path}`;

        const res = await fetch(photoUrl);

        const fileStream = await res.buffer();

        fs.writeFileSync(path, fileStream);

        const textInPhoto = await recognizeTextInImage(path);
        const { caption } = ctx.message

        let response = "No se ha reconocido el texto en la imagen";

        if (textInPhoto) {
            const {
                success,
                data_in_text,
                ...rest
            } = await generateJSONFromReceipt(
                textInPhoto,
                caption
            );

            const image_key = await saveFileInRepository(filename, path);

            receipt = {
                success,
                ...rest,
                image_key,
            };

            await saveReceiptInfo({ id, ...receipt })

            response = data_in_text;
        }

        ctx.reply(response);
    } catch (error) {
        console.error({ error });
        ctx.reply("Ha ocurrido un error inesperado, por favor vuelve a intentar");
    } finally {
        fs.readdir(".temp", (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(`.temp/${file}`, (err) => {
                    if (err) throw err;
                });
            }
        });
    }
}

module.exports = { analyzeImageService };
