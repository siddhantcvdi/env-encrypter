# dotlock

A simple command-line tool to encrypt and decrypt your `.env` files using a password. This tool ensures that you can safely push sensitive `.env` files to a public GitHub repository without exposing sensitive keys.

# Installation

You can install `dotlock` globally or locally in your project.

## Global Installation (Recommended)

To install `dotlock` globally, run the following command:

```bash
npm install -g dotlock
```
# Usage

You can use `dotlock` via the command line with the following commands:

## Continuously encrypt a `.env` file
```bash
dotlock watch --password your_password
dotlock watch -p your_password
```
This will monitor your `.env` file for changes and will automatically encrypt it when it is saved.
## Encrypt a `.env` File

Encrypt your `.env` file with a password:

```bash
dotlock encrypt --password your_password
dotlock encrypt -p your_password
```

## Decrypt an Encrypted `.env` File

Decrypt a previously encrypted `.env.enc` file with the same password:

```bash
dotlock decrypt --password your_password
dotlock decrypt --p your_password
```


Note: The decryption process will complete even if the password is incorrect, but the file contents will be **corrupted and unreadable**.

### Use Locally
 You can use `npx` to use this locally
```bash
 npx dotlock encrypt --password your_password
```


