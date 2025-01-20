#!/usr/bin/env node
import { program } from 'commander';
import { encryptFile, decryptFile } from '../src/encryptDecrypt.js';
import { findEnvFile, findDotLockFile} from '../src/utils.js';

program
  .command('encrypt')
  .description('Encrypt a .env file')
  .option('-p, --password <password>', 'Password for encryption')
  .action(async (options) => {
    const envFile = findEnvFile(); 
    if (!envFile) {
      console.error('Error: .env file not found in the current directory.');
      process.exit(1);  
    }
    const password = options.password;
    await encryptFile(envFile, password);
  });

program
  .command('decrypt')
  .description('Decrypt an encrypted .env file')
  .option('-p, --password <password>', 'Password for decryption')
  .action(async (options) => {
    const envFile = findDotLockFile();  
    if (!envFile) {
      console.error('Error: .dotlock file not found in the current directory.');
      process.exit(1);  
    }
    const password = options.password;
    await decryptFile(envFile, password);
  });

program.parse(process.argv);

