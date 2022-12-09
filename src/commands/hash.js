import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

export const hash = async (currentPath, args) => {
  const filename = args[0];
  const pathToFile = path.resolve(currentPath, filename);
  try {
    await fs.access(pathToFile);
    const hash = createHash("sha256").update(pathToFile).digest("hex");
    console.log(`Hash of ${pathToFile} is: ${hash}`);
  } catch (err) {
    throw err;
  }
};
