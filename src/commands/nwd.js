import fs from "fs/promises";
import { isExist, resolvePath } from "../helpers.js";

export const nwd = {
  up(changeCurrentPath, currentPath) {
    const resPath = resolvePath(currentPath, "..");
    changeCurrentPath(resPath);
  },

  async cd(changeCurrentPath, currentPath, destPath) {
    const resPath = resolvePath(currentPath, destPath);
    try {
      await isExist(resPath);
      changeCurrentPath(resPath);
    } catch (err) {
      throw err;
    }
  },

  async ls(currentPath) {
    try {
      const dirList = await fs.readdir(currentPath, { withFileTypes: true });
      const sortedDirList = dirList.sort((a, b) => a.isFile() - b.isFile());
      let result = [];
      sortedDirList.forEach((el) => {
        result.push({ Name: el.name, Type: el.isFile() ? "file" : "directory" });
      });
      console.table(result);
    } catch (err) {
      throw err;
    }
  },
};
