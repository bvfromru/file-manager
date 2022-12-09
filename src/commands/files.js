import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

export const files = {
  async cat(currentPath, args) {
    const filename = args[0];
    const pathToFile = path.resolve(currentPath, filename);
    try {
      await fs.access(pathToFile);
      const rdStream = createReadStream(pathToFile, "utf-8");
      rdStream.pipe(process.stdout);
      const end = new Promise((resolve, reject) => {
        rdStream.on("end", () => resolve());
        rdStream.on("error", () => reject());
      });
      await end;
    } catch (err) {
      throw err;
    }
  },
};
