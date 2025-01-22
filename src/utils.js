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
  const envFilePath = path.join(currentDir, "dotlock.txt");

  if (fs.existsSync(envFilePath)) {
    return envFilePath;
  } else {
    return null;
  }
};
