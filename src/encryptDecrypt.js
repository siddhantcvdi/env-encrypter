import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';

export const encryptFile = async (filePath, password) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, 'salt', 32);
    const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const outputData = Buffer.concat([iv, encrypted]);
    const outputPath = path.join(path.dirname(filePath), 'dotlock.txt');
    await fs.writeFile(outputPath, outputData);
    console.log(`File encrypted and saved to ${outputPath}`);
  } catch (err) {
    console.error('Encryption failed:', err);
  }
};

export const decryptFile = async (filePath, password) => {
  try {
    const encryptedData = await fs.readFile(filePath);
    const iv = encryptedData.slice(0, 16);
    const data = encryptedData.slice(16);
    const key = crypto.scryptSync(password, 'salt', 32);
    const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
    const outputPath = path.join(path.dirname(filePath), '.env');
    await fs.writeFile(outputPath, decrypted.toString());
    console.log(`File decrypted and saved to ${outputPath}`);
  } catch (err) {
    console.error('Decryption failed:', err);
  }
};
