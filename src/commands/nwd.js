import fs from "fs/promises";
import { checkIsNotFile } from "../helpers.js";

export const nwd = {
  async cd(pathToDir) {
    await checkIsNotFile(pathToDir);
    return pathToDir;
  },

  async ls(currentPath) {
    const dirList = await fs.readdir(currentPath, { withFileTypes: true });
    const sortedDirList = dirList.sort((a, b) => a.isFile() - b.isFile()).filter((item) => !item.isSymbolicLink());
    let result = [];
    sortedDirList.forEach((el) => {
      result.push({ Name: el.name, Type: el.isFile() ? "file" : "directory" });
    });
    console.table(result);
  },
};
