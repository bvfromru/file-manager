import fs from "node:fs/promises";
import path from "node:path";

export const nwd = {
  up(changeCurrentPath, currentPath) {
    const resPath = path.resolve(currentPath, "..");
    changeCurrentPath(resPath);
  },

  async cd(changeCurrentPath, currentPath, args) {
    const destPath = args[0];
    const resPath = path.resolve(currentPath, destPath);
    try {
      await fs.access(resPath);
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
