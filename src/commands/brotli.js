import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { checkThatExist, checkThatNotExist } from "../helpers.js";
import { MESSAGES } from "../messages.js";

const implementBrotli = async (pathToSrc, pathToDest, action) => {
  await checkThatExist(pathToSrc);
  await checkThatNotExist(pathToDest);
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
};

export const compress = async (...args) => {
  await implementBrotli(...args, "compress");
};

export const decompress = async (...args) => {
  await implementBrotli(...args, "decompress");
};
