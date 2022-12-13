import { createReadStream, createWriteStream } from "fs";
import fs from "fs/promises";
import { pipeline } from "stream/promises";
import { checkThatExist, checkThatNotExist } from "../helpers.js";
import { MESSAGES } from "../messages.js";

export const files = {
  async _copyFile(pathToOldFile, pathToNewFile) {
    await checkThatExist(pathToNewFile);
    const readable = createReadStream(pathToOldFile);
    const writable = createWriteStream(pathToNewFile);
    await pipeline(readable, writable);
  },

  async _removeFile(pathToFile) {
    await fs.rm(pathToFile);
  },

  async cat(pathToFile) {
    await checkThatExist(pathToFile);
    const readable = createReadStream(pathToFile, "utf-8");
    readable.pipe(process.stdout);
    const end = new Promise((resolve, reject) => {
      readable.on("end", () => resolve());
      readable.on("error", () => reject());
    });
    await end;
  },

  async add(newFileName) {
    await fs.writeFile(newFileName, "", { flag: "wx" });
    console.log(MESSAGES.operationSuccessful);
  },

  async rn(pathToFile, newPathToFile) {
    await checkThatNotExist(newPathToFile);
    await fs.rename(pathToFile, newPathToFile);
    console.log(MESSAGES.operationSuccessful);
  },

  async cp(pathToOldFile, pathToNewFile) {
    await checkThatNotExist(pathToNewFile);
    const readable = createReadStream(pathToOldFile);
    const writable = createWriteStream(pathToNewFile);
    await pipeline(readable, writable);
    console.log(MESSAGES.operationSuccessful);
  },

  async rm(pathToFile) {
    await this._removeFile(pathToFile);
    console.log(MESSAGES.operationSuccessful);
  },

  async mv(pathToOldFile, pathToNewFile) {
    await this._copyFile(pathToOldFile, pathToNewFile);
    await this._removeFile(pathToOldFile);
    console.log(MESSAGES.operationSuccessful);
  },
};
