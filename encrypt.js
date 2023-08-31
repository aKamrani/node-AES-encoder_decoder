const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const inputFile = process.argv[2];
const outputFile = process.argv[3];
const key = new Uint8Array([
    126, 60, 47, 217, 20, 244, 162, 166,
    228, 169, 255, 78,  25, 212, 167, 206,
    93,  139, 94, 44,  31, 140, 55, 209,
    166, 211, 159, 140, 90,  46, 123, 64
  ]);

const cipher = crypto.createCipheriv('aes-256-ctr', key, Buffer.alloc(16));

const inputStream = fs.createReadStream(inputFile);
const outputStream = fs.createWriteStream(outputFile);

inputStream.pipe(cipher).pipe(outputStream);

outputStream.on('finish', () => {
  console.log(`Encryption completed. Encrypted video saved to ${outputFile}`);
});

outputStream.on('error', (err) => {
  console.error('Error occurred while writing the output file:', err);
});