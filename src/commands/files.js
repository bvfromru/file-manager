import { createReadStream, createWriteStream } from "fs";
import fs from "fs/promises";
import { isExist, resolvePath } from "../helpers.js";
import { MESSAGES } from "../messages.js";

export const files = {
  async cat(currentPath, filename) {
    const pathToFile = resolvePath(currentPath, filename);
    try {
      await isExist(pathToFile);
      const readable = createReadStream(pathToFile, "utf-8");
      readable.pipe(process.stdout);
      const end = new Promise((resolve, reject) => {
        readable.on("end", () => resolve());
        readable.on("error", () => reject());
      });
      await end;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async add(currentPath, filename) {
    const pathToFile = resolvePath(currentPath, filename);
    try {
      await fs.writeFile(pathToFile, "", { flag: "wx" });
      console.log(MESSAGES.operationSuccessful);
    } catch (err) {
      throw err;
    }
  },

  async rn(currentPath, oldFilePath, newFileName) {
    const pathToOldFile = resolvePath(currentPath, oldFilePath);
    const pathToNewFile = resolvePath(currentPath, newFileName);
    try {
      // await fs.access(pathToOldFile);
      // TODO check if newFile is already exist
      await fs.rename(pathToOldFile, pathToNewFile);
      console.log(MESSAGES.operationSuccessful);
    } catch (err) {
      throw err;
    }
  },

  async cp(currentPath, oldFilePath, newFilePath) {
    const pathToOldFile = resolvePath(currentPath, oldFilePath);
    const pathToNewFile = resolvePath(currentPath, newFilePath);
    try {
      // TODO check if newFile is already exist
      // TODO newFilePath should be directory
      const readable = createReadStream(pathToOldFile);
      const writable = createWriteStream(pathToNewFile);
      readable.pipe(writable);
      const end = new Promise((resolve, reject) => {
        readable.on("end", () => resolve());
        readable.on("error", () => reject());
      });
      await end;
      console.log(MESSAGES.operationSuccessful);
    } catch (err) {
      throw err;
    }
  },

  async rm(currentPath, filePath) {
    const pathToFile = resolvePath(currentPath, filePath);
    try {
      await fs.rm(pathToFile);
      console.log(MESSAGES.operationSuccessful);
    } catch (err) {
      throw err;
    }
  },

  async mv(currentPath, oldFilePath, newFilePath) {
    await this.cp(currentPath, oldFilePath, newFilePath);
    await this.rm(currentPath, oldFilePath);
    // TODO checks and remove double clg;
  },
};
