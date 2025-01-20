# env-encrypter

A simple command-line tool to encrypt and decrypt your `.env` files using a password. This tool ensures that you can safely push sensitive `.env` files to a public GitHub repository without exposing sensitive keys.

# Installation

You can install `env-encrypter` globally or locally in your project.

## Global Installation (Recommended)

To install `env-encrypter` globally, run the following command:

```bash
npm install -g env-encrypter
```
## Usage

You can use `env-encrypter` via the command line with the following commands:

### Encrypt a `.env` File

Encrypt your `.env` file with a password:

```bash
envenc encrypt --password your_password
envenc encrypt -p your_password
```

- `-password`: The password used to encrypt the file.


### Decrypt an Encrypted `.env` File

Decrypt a previously encrypted `.env.enc` file with the same password:

```bash
envenc decrypt --password your_password
envenc decrypt --p your_password
```

- `-password`: The password used to decrypt the file.

### Use Locally
 You can use `npx` to use this locally
```bash
 npx envenc encrypt --password your_password
```


