#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';
import { encryptFile, decryptFile } from '../src/encryptDecrypt.js';
import { findEnvFile, findEnvEncFile} from '../src/utils.js';

program
  .command('encrypt')
  .description('Encrypt a .env file')
  .option('-p, --password <password>', 'Password for encryption')
  .action(async (options) => {
    const envFile = findEnvFile(); 
    if (!envFile) {
      console.error('Error: .env file not found in the current directory or any parent directories.');
      process.exit(1);  
    }
    const password = options.password;
    const outputPath = path.resolve(options.output);

    await encryptFile(envFile, password, outputPath);
  });

program
  .command('decrypt')
  .description('Decrypt an encrypted .env file')
  .option('-p, --password <password>', 'Password for decryption')
  .action(async (options) => {
    const envFile = findEnvEncFile();  
    if (!envFile) {
      console.error('Error: .env.enc file not found in the current directory or any parent directories.');
      process.exit(1);  
    }
    const password = options.password;
    const outputPath = path.resolve(options.output);
    await decryptFile(envFile, password, outputPath);
  });

program.parse(process.argv);

