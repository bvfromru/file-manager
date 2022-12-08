import fs from "node:fs/promises";
import path from "node:path";
import { errors } from "../errors.js";

export const nwd = {
  up(changeCurrentPath, currentPath) {
    const resPath = path.resolve(currentPath, "..");
    // console.log("path: ", resPath);
    changeCurrentPath(resPath);
  },

  async cd(changeCurrentPath, currentPath, destPath) {
    const resPath = path.resolve(currentPath, destPath);
    // console.log("path: ", resPath);
    try {
      await fs.access(resPath);
      changeCurrentPath(resPath);
    } catch {
      errors.operationFailed();
    }
  },

  async ls(currentPath) {
    try {
      const dirList = await fs.readdir(currentPath, { withFileTypes: true });
      const sortedDirList = dirList.sort((a, b) => b.isDirectory() - a.isDirectory());
      let result = [];
      sortedDirList.forEach((el) => {
        result.push({ Name: el.name, Type: el.isDirectory() ? "directory" : "file" });
      });
      console.table(result);
    } catch (err) {
      errors.operationFailed();
    }
  },
};
