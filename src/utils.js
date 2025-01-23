import path from "path";
import fs from "fs";

export const findEnvFile = () => {
  const currentDir = process.cwd();
  const envFilePath = path.join(currentDir, ".env");

  if (fs.existsSync(envFilePath)) {
    return envFilePath;
  } else {
    return null;
  }
};

export const findDotLockFile = () => {
  const currentDir = process.cwd();
  const envFilePath = path.join(currentDir, "env.dotlock");

  if (fs.existsSync(envFilePath)) {
    return envFilePath;
  } else {
    return null;
  }
};

export async function setReadOnly(filePath) {
  await fs.promises.chmod(filePath, 0o444);
}
export async function setWritable(filePath) {
  try {
    await fs.promises.chmod(filePath, 0o644);
  } catch (err) {
    console.error("Creating dotlock file");
  }
}
