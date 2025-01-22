#!/usr/bin/env node
import { program } from "commander";
import { encryptFile, decryptFile } from "../src/encryptDecrypt.js";
import { findEnvFile, findDotLockFile } from "../src/utils.js";
import chokidar from "chokidar";
import chalk from 'chalk';

program
  .command("encrypt")
  .description("Encrypt a .env file")
  .option("-p, --password <password>", "Password for encryption")
  .action(async (options) => {
    const envFile = findEnvFile();
    if (!envFile) {
      console.error("Error: .env file not found in the current directory.");
      process.exit(1);
    }
    const password = options.password;
    await encryptFile(envFile, password);
  });

program
  .command("decrypt")
  .description("Decrypt an encrypted .env file")
  .option("-p, --password <password>", "Password for decryption")
  .action(async (options) => {
    const envFile = findDotLockFile();
    if (!envFile) {
      console.error("Error: dotlock file not found in the current directory.");
      process.exit(1);
    }
    const password = options.password;
    await decryptFile(envFile, password);
  });

program
  .command("watch")
  .description("Automatically encrypt .env file on changes")
  .option("-p, --password <password>", "Password for encryption")
  .action((options) => {
    const envFile = findEnvFile();
    if (!envFile) {
      console.error("Error: .env file not found in the current directory.");
      process.exit(1);
    }
    const password = options.password;
    console.clear();
    console.log(chalk.green(`\nWatching for changes in ${envFile}...`));
    const watcher = chokidar.watch(envFile, { persistent: true });

    watcher.on("change", async () => {
      console.log(`\nDetected change in ${envFile}. \nEncrypting...`);
      await encryptFile(envFile, password);
      console.log(chalk.green(`\nWatching for changes in ${envFile}...`));
    });

    watcher.on("error", (error) => {
      console.error("Watcher error:", error);
    });
  });

program.parse(process.argv);
