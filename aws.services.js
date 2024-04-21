const {
    S3Client,
    PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { DetectTextCommand, RekognitionClient } = require("@aws-sdk/client-rekognition");
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

// Función para detectar texto en una imagen
async function recognizeTextInImage(imagePath) {
    try {
        const client = new RekognitionClient(awsConfig);
        const imageBytes = fs.readFileSync(imagePath);
        const params = {
            Image: {
                Bytes: imageBytes,
            },
        };
        const command = new DetectTextCommand(params);
        const result = await client.send(command)

        return result.TextDetections.map(text => text.DetectedText);
    } catch (error) {
        console.error("Error al detectar texto:", error);
        throw error;
    }
}

module.exports = { recognizeTextInImage, saveFileInRepository };
