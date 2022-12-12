import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";

export const hash = async (currentPath, filename) => {
  const pathToFile = path.resolve(currentPath, filename);
  try {
    await fs.access(pathToFile);
    const hash = createHash("sha256").update(pathToFile).digest("hex");
    console.log(`Hash of ${pathToFile} is: ${hash}`);
  } catch (err) {
    throw err;
  }
};
