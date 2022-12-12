import { createReadStream, createWriteStream } from "fs";
import fs from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { MESSAGES } from "../messages.js";

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
      console.log(MESSAGES.operationSuccessful);
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
