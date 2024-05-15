const {
    S3Client,
    PutObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs");
const { envirionments } = require("./environments");

// Configura las credenciales y la región
const awsConfig = {
    region: envirionments.awsRegion,
    credentials: {
        accessKeyId: envirionments.awsApiKey,
        secretAccessKey: envirionments.awsApiSecret,
    },
};

async function saveFileInRepository(filename, path) {
    try {
        const client = new S3Client(awsConfig);
        const bucketName = envirionments.awsBucket;
        const fileStream = fs.createReadStream(path);
        const params = {
            Bucket: bucketName,
            Key: filename,
            Body: fileStream,
        };
        const command = new PutObjectCommand(params);
        const result = await client.send(command);

        return filename;
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        throw error;
    }
}

module.exports = { saveFileInRepository };
