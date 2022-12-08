import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

export const files = {
  async cat(currentPath, args) {
    const pathToFile = args[0];
    const filename = path.resolve(currentPath, pathToFile);
    try {
      await fs.access(filename);
      const rdStream = createReadStream(filename, "utf-8");
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
