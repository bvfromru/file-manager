import { createReadStream, createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { messages } from "../messages.js";

export const files = {
  async cat(currentPath, args) {
    const filename = args[0];
    const pathToFile = path.resolve(currentPath, filename);
    try {
      await fs.access(pathToFile);
      const readable = createReadStream(pathToFile, "utf-8");
      readable.pipe(process.stdout);
      const end = new Promise((resolve, reject) => {
        readable.on("end", () => resolve());
        readable.on("error", () => reject());
      });
      await end;
    } catch (err) {
      throw err;
    }
  },

  async add(currentPath, filename) {
    const pathToFile = path.resolve(currentPath, filename);
    try {
      await fs.writeFile(pathToFile, "", { flag: "wx" });
      console.log(messages.operationSuccessful);
    } catch (err) {
      throw err;
    }
  },

  async rn(currentPath, oldFilePath, newFileName) {
    const pathToOldFile = path.resolve(currentPath, oldFilePath);
    const pathToNewFile = path.resolve(currentPath, newFileName);
    try {
      // await fs.access(pathToOldFile);
      // TODO check if newFile is already exist
      await fs.rename(pathToOldFile, pathToNewFile);
      console.log(messages.operationSuccessful);
    } catch (err) {
      throw err;
    }
  },

  async cp(currentPath, oldFilePath, newFilePath) {
    const pathToOldFile = path.resolve(currentPath, oldFilePath);
    const pathToNewFile = path.resolve(currentPath, newFilePath);
    try {
      // TODO check if newFile is already exist
      const readable = createReadStream(pathToOldFile);
      const writable = createWriteStream(pathToNewFile);
      readable.pipe(writable);
      const end = new Promise((resolve, reject) => {
        readable.on("end", () => resolve());
        readable.on("error", () => reject());
      });
      await end;
      console.log(messages.operationSuccessful);
    } catch (err) {
      throw err;
    }
  },

  async rm(currentPath, filePath) {
    const pathToFile = path.resolve(currentPath, filePath);
    try {
      await fs.rm(pathToFile);
      console.log(messages.operationSuccessful);
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
