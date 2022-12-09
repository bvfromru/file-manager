import { createReadStream, createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { messages } from "../messages.js";

export const brotli = {
  async _implementBrotli(currentPath, srcFile, destFile, action) {
    console.log(currentPath, srcFile, destFile, action);
    const pathToSrc = path.resolve(currentPath, srcFile);
    const pathToDest = path.resolve(currentPath, destFile);
    try {
      await fs.access(pathToSrc);
      let brotli;
      if (action === "decompress") {
        brotli = createBrotliDecompress();
      } else {
        brotli = createBrotliCompress();
      }
      const srcStream = createReadStream(pathToSrc);
      const destStream = createWriteStream(pathToDest);
      await pipeline(srcStream, brotli, destStream);
      console.log(messages.operationSuccessful);
    } catch (err) {
      throw err;
    }
  },

  async compress(...args) {
    await this._implementBrotli(...args, "compress");
  },

  async decompress(...args) {
    await this._implementBrotli(...args, "decompress");
  },
};
