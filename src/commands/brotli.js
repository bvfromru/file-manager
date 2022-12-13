import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { checkThatExist } from "../helpers.js";
import { MESSAGES } from "../messages.js";

export const brotli = {
  async _implementBrotli(pathToSrc, pathToDest, action) {
    await checkThatExist(pathToSrc);
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
  },

  async compress(...args) {
    await this._implementBrotli(...args, "compress");
  },

  async decompress(...args) {
    await this._implementBrotli(...args, "decompress");
  },
};
