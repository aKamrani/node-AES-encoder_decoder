const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { buffer } = require('stream/consumers');

const inputFile = process.argv[2];
const outputFile = process.argv[3];
const key = new Uint8Array([
    126, 60, 47, 217, 20, 244, 162, 166,
    228, 169, 255, 78,  25, 212, 167, 206,
    93,  139, 94, 44,  31, 140, 55, 209,
    166, 211, 159, 140, 90,  46, 123, 64
  ]);

const ivKey = Buffer.from('05e1044cea8ebff6e22451a32164937b.dat', 'hex');
const decipher = crypto.createDecipheriv('aes-256-ctr', key, ivKey);

const inputStream = fs.createReadStream(inputFile);
const outputStream = fs.createWriteStream(outputFile);

inputStream.pipe(decipher).pipe(outputStream);

outputStream.on('finish', () => {
  console.log(`Decryption completed. Decrypted video saved to ${outputFile}`);
});

outputStream.on('error', (err) => {
  console.error('Error occurred while writing the output file:', err);
});

